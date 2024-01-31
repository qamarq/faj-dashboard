import React from 'react'
import styles from "@/styles/DashboardItem.module.scss"
import ProductsTable from '@/components/dashboard/products/ProductsTable'
import BreadCrumbsComponent from '@/components/BreadCrumbsComponent';

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const getProducts = async () => {
    const products = await stripe.products.list();
    const prices = await stripe.prices.list();
    
    return {
        products,
        prices
    }
}

export default async function Products() {
    const data = await getProducts() as TicketsResult;

    return (
        <div className={styles.itemContent}>
            <BreadCrumbsComponent />
            <h1 className={styles.title}>Products</h1>

            <div className={styles.table}>
                <ProductsTable tickets={data.products.data} prices={data.prices.data} />
            </div>
        </div>
    )
}
