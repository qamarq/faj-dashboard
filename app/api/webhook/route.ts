import { prisma } from "@/lib/db"
import createInvoice, { InvoiceOptions } from "@/lib/invoice";
import { formattedPrice } from "@/lib/utils";
import PaymentConfirmEmail from "@/mails/PaymentConfirm";
import { render } from "@react-email/components";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { format } from "date-fns"
import fs from "fs"

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API);

export async function POST(req: Request) {
	const rawBody = await req.text();
    const sig = req.headers.get("stripe-signature");

    let event;

    try {
        event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
    } catch (err: any) {
        console.log(err.message)
        return NextResponse.json({ message: err.message }, { status: 500 })
    }

    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntentSucceeded = event.data.object;
            await prisma.tickets.findFirst({
                where: {
                    paymentID: paymentIntentSucceeded.id
                }
            }).then(async (ticket) => {
                if (ticket) {
                    await prisma.tickets.update({
                        where: {
                            id: ticket.id
                        },
                        data: {
                            paymentStatus: paymentIntentSucceeded.status
                        }
                    })

                    try {
                        const tickets = JSON.parse(ticket.ticketData) as TicketType[]
                        const emailHTML = render(PaymentConfirmEmail({ 
                            username: ticket.buyerName,
                            email: ticket.buyerEmail,
                            orderId: ticket.id,
                            orderDate: ticket.timestamp.toLocaleString('en-US', { timeZone: 'Europe/Warsaw' }),
                            orderTotal: formattedPrice(ticket.paymentAmount),
                            paymentStatus: "Paid",
                            tickets: tickets.map((ticketItem) => {
                                return {
                                    name: `${ticketItem.name} ${ticketItem.surname}`,
                                    quantity: 1,
                                }
                            })
                        }))

                        const deliveryOptions: InvoiceOptions = {
                            seller: {
                                logo: "/loga/faj-logo.svg",
                                name: "Fundacja Aleksandra Jabłońskiego",
                                address1: "Grudziądzka 5/7",
                                address2: "87-100 Toruń",
                                nip: "9562260573",
                                regon: "340651872",
                            },
                            customer: {
                                name: ticket.buyerName,
                                email: ticket.buyerEmail,
                                VAT: ticket.buyerVAT || "",
                            },
                            orderId: ticket.id,
                            date: format(ticket.timestamp, "dd MMM yyyy"),
                            paymentTerms: "Confirmation of ticket purchase",
                            items: tickets.map((ticketItem) => {
                                return {
                                    name: `${ticketItem.name} ${ticketItem.surname}`,
                                    qty: 1,
                                    rate: "23%",
                                    amount: ticketItem.price.toString()
                                }
                            }),
                            total: (ticket.paymentAmount/100).toString(),
                            balanceDue: (ticket.paymentAmount/100).toString(),
                            notes: "Thank you for purchasing tickets for the conference! If you have any questions, please contact the organizer. We hope you enjoy the event!",
                            terms: "This invoice is generated automatically at the time of delivery. If any problem occurs, please contact your supplier."
                        }

                        createInvoice(deliveryOptions).then(async (pdf) => {
                            const { data, error } = await resend.emails.send({
                                from: 'Islandhouse FAJ <biuro@islandhouse.it>',
                                to: [paymentIntentSucceeded.receipt_email],
                                reply_to: 'kontakt@faj.org.pl',
                                subject: 'Payment confirmation - FAJ: New ticket buyed',
                                html: emailHTML,
                                attachments: [
                                    {
                                        filename: `invoice-${ticket.id}.pdf`,
                                        content: pdf,
                                    }
                                ]
                            });
                            
                            fs.writeFileSync(`invoices/invoice-${deliveryOptions.orderId}.pdf`, pdf)

                            console.log(data, error)
                        }).catch((err) => {
                            console.log(err)
                        })
                    } catch (err: any) {

                    }
                }
            
            })
            break;

        case 'payment_intent.payment_failed':
            const paymentIntentFailed = event.data.object;
            await prisma.tickets.findFirst({
                where: {
                    paymentID: paymentIntentFailed.id
                }
            }).then(async (ticket) => {
                if (ticket) {
                    await prisma.tickets.update({
                        where: {
                            id: ticket.id
                        },
                        data: {
                            paymentStatus: paymentIntentFailed.status
                        }
                    })
                }
            
            })
            break;

        case 'payment_intent.processing':
            const paymentIntentProcessing = event.data.object;
            await prisma.tickets.findFirst({
                where: {
                    paymentID: paymentIntentProcessing.id
                }
            }).then(async (ticket) => {
                if (ticket) {
                    await prisma.tickets.update({
                        where: {
                            id: ticket.id
                        },
                        data: {
                            paymentStatus: paymentIntentProcessing.status
                        }
                    })
                }
            
            })
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ message: "success" }, { status: 200 })
}