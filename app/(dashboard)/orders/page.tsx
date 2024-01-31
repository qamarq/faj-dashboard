import React from 'react'
import styles from "@/styles/DashboardItem.module.scss"
import { prisma } from "@/lib/db"
import { Tickets } from '@prisma/client'
import OrdersTable from '@/components/dashboard/orders/OrdersTable'
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react'
import BreadCrumbsComponent from '@/components/BreadCrumbsComponent'

const getOrders = async () => {
    const orders = await prisma.tickets.findMany({})
    return orders.reverse()
}

export default async function Products() {
    const data = await getOrders() as Tickets[];

    return (
        <div className={styles.itemContent}>
            <BreadCrumbsComponent />
            <h1 className={styles.title}>Orders</h1>

            <div className={styles.table}>
                <OrdersTable orders={data} />
            </div>
        </div>
    )
}
