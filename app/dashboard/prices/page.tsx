import React from 'react'
import styles from "@/styles/DashboardItem.module.scss"
import { prisma } from "@/app/db"
import { Tickets } from '@prisma/client'
import OrdersTable from '@/components/dashboard/orders/OrdersTable'
import BreadCrumbsComponent from '@/components/BreadCrumbsComponent'
import PricesTable from '@/components/dashboard/prices/PricesTable'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const getPrices = async () => {
    const prices = await stripe.prices.list({
        limit: 100,
    });

    return prices.data
}

export default async function Prices() {
    const data = await getPrices() as Price[];

    return (
        <div className={styles.itemContent}>
            <BreadCrumbsComponent />
            <h1 className={styles.title}>Prices</h1>

            <div className={styles.table}>
                <PricesTable prices={data} />
            </div>
        </div>
    )
}
