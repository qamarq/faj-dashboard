"use server"

import createInvoice, { type InvoiceOptions } from "@/lib/invoice"
import fs from "fs"
// import { createInvoice, type InvoiceOptions } from "@qamarq/invoice.js"


const deliveryOptions: InvoiceOptions = {
    seller: {
        logo: "https://i.imgur.com/5BSokEf.png",
        name: "Fundacja Aleksandra Jabłońskiego",
        address1: "Grudziądzka 5/7",
        address2: "87-100 Toruń",
        nip: "9562260573",
        regon: "340651872",
    },
    customer: {
        name: "Kamil Marczak",
        email: "kamilm@you2.pl",
        VAT: "PL1234567890",
    },
    orderId: "439489082834",
    date: "17 cze 2024",
    paymentTerms: "Potwierdzenie zakupu biletów",
    items: [
        {
            name: "SINGLE BED_SHEET",
            qty: 3,
            rate: "10.00",
            amount: "30.00"
        },
        {
            name: "DOUBLE BED_SHEET",
            qty: 2,
            rate: "20.00",
            amount: "40.00"
        },
        {
            name: "TOWELS",
            qty: 3,
            rate: "5.00",
            amount: "15.00"
        },
        {
            name: "CLOTHES",
            qty: 3,
            rate: "50.00",
            amount: "150.00"
        }
    ],
    total: "235.00",
    balanceDue: "235.00",
    notes: "Thank you for purchasing tickets for the conference! If you have any questions, please contact the organizer. We hope you enjoy the event!",
    terms: "This invoice is generated automatically at the time of delivery. If any problem occurs, please contact your supplier."
}

export const makePDF = async () => {
    // createInvoice(deliveryOptions).then((pdf) => {
    //     fs.writeFileSync(`invoices/${deliveryOptions.orderId}.pdf`, pdf)
    // })
}