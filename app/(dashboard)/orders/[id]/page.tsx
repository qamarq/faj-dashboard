import React, { Suspense } from 'react'
import styles from "@/styles/DashboardItem.module.scss"
import BreadCrumbsComponent from '@/components/BreadCrumbsComponent'
import { prisma } from '@/lib/db'
import { Autocomplete, AutocompleteItem, Button, Card, CardBody, CardHeader, Chip, Divider } from '@nextui-org/react'
import OrderDetailsTable from '@/components/dashboard/orders/OrderDetailsTable'
import { Tickets } from '@prisma/client'
import OrderDetailsTablePersons from '@/components/dashboard/orders/OrderDetailsTablePersons'
import { paymentStatuses, statusColorMap } from '@/constants'
import { EditIcon, EuroIcon } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import OrderDetailsEdit from '@/components/dashboard/orders/OrderDetailsEdit'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const getDetails = async (id: string) => {
    const order = await prisma.tickets.findUnique({
        where: {
            id
        }
    })

    const products = await stripe.products.list({
        limit: 100,
    });

    const prices = await stripe.prices.list({
        limit: 100,
    });

    return { order, shopData: { prices, products } }
}

export default async function OrderPage({
    params
}: {
    params: { id: string }
}) {
    const details = await getDetails(params.id) as { order: Tickets, shopData: TicketsResult }
    const ticketsData = JSON.parse(details.order.ticketData) as TicketType[]
    const outputArray = Object.values(ticketsData).map((item) => ({ ...item }));

    console.log("Details", details)
    console.log("Tickets data", ticketsData)
    console.log("Output array", outputArray)

    const calculateTotalPrice = () => {
        let totalPrice = 0;

        outputArray.map((item) => {
            const product = details.shopData.products.data.find((product) => product.id === String(item.ticketID));
            const price = details.shopData.prices.data.find((price) => price.id === product?.default_price);

            if (product && price) {
                totalPrice += price.unit_amount;
            }
        })
        
        return totalPrice;
    };

    return (
        <div className={styles.itemContent}>
            <BreadCrumbsComponent />
            <h1 className={styles.title}>Order details</h1>
            
            <div className={styles.productDetailsPage}>
                <div className={styles.left}>
                    <Card>
                        <CardHeader className="pb-0 pt-4 px-8 flex-col items-start">
                            <h4 className="font-bold text-large">Tickets details</h4>
                        </CardHeader>
                        <CardBody>
                            <OrderDetailsTable ticketsData={outputArray as any} prices={details.shopData.prices.data} tickets={details.shopData.products.data} />
                        </CardBody>
                    </Card> 
                    <Card>
                        <CardHeader className="pb-0 pt-4 px-8 flex-col items-start">
                            <h4 className="font-bold text-large">Persons details</h4>
                        </CardHeader>
                        <CardBody>
                            <Suspense>
                                <OrderDetailsTablePersons ticketsData={outputArray as any} />
                            </Suspense>
                        </CardBody>
                    </Card> 
                </div>
                <div className={styles.right}>
                    <Card>
                        <CardHeader className="pb-0 pt-4 px-5 flex-col items-start">
                            <h4 className="font-bold text-large">Payment details</h4>
                        </CardHeader>
                        <CardBody>
                            <div className={styles.payment_details}>
                                <div className={styles.payment_details_item}>
                                    <p className={styles.payment_details_item_label}>Payment status</p>
                                    <Chip className="capitalize" color={statusColorMap[details.order.paymentStatus]} size="sm" variant="flat">
                                        {paymentStatuses[details.order.paymentStatus as PaymentStatus]}
                                    </Chip>
                                </div>
                                <Divider orientation='horizontal' />
                                <div className={styles.payment_details_item}>
                                    <p className={styles.payment_details_item_label}>Payment amount</p>
                                    <div className="flex flex-row items-center">
                                        <EuroIcon className='mr-1' size={16} />
                                        <p className="text-extrabold text-sm capitalize">{formatPrice(details.order.paymentAmount)}</p>
                                    </div>
                                </div>
                                <Divider orientation='horizontal' />
                                <div className={styles.payment_details_item}>
                                    <p className={styles.payment_details_item_label}>Payment date</p>
                                    <p className={styles.payment_details_item_value}>{details.order.timestamp.toLocaleDateString("pl-PL", { dateStyle: "medium" })}</p>
                                </div>
                                <Divider orientation='horizontal' />
                                <div className={styles.payment_details_item}>
                                    <p className={styles.payment_details_item_label}>Payment time</p>
                                    <p className={styles.payment_details_item_value}>{details.order.timestamp.toLocaleTimeString("pl-PL", { timeStyle: "short" })}</p>
                                </div>
                            </div>
                        </CardBody>
                    </Card> 
                    {/* <Card>
                        <CardBody>
                            <div className={`${styles.payment_details} ${styles.nomargin}`}>
                                <div className={styles.payment_details_item}>
                                    <p className={styles.payment_details_item_label}>Total</p>
                                    <div className="flex flex-row items-center">
                                        <EuroIcon className='mr-1' size={16} />
                                        <p className="text-extrabold text-sm capitalize">{formatPrice(calculateTotalPrice())}</p>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>  */}
                    <Card>
                        <CardHeader className="pb-0 pt-4 px-5 flex-col items-start">
                            <h4 className="font-bold text-large">Payer details</h4>
                        </CardHeader>
                        <CardBody>
                        <div className={styles.payment_details}>
                                <div className={styles.payment_details_item}>
                                    <p className={styles.payment_details_item_label}>Name</p>
                                    <p className={styles.payment_details_item_value}>{details.order.buyerName}</p>
                                </div>
                                <Divider orientation='horizontal' />
                                <div className={styles.payment_details_item}>
                                    <p className={styles.payment_details_item_label}>E-mail</p>
                                    <p className={styles.payment_details_item_value}>{details.order.buyerEmail}</p>
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardBody>
                            <div className={styles.edit_content}>
                                <OrderDetailsEdit orderID={details.order.id} paymentStatus={details.order.paymentStatus as PaymentStatus} />
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    )
}

