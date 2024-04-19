import React from 'react'
import styles from "@/styles/DashboardItem.module.scss"
import { prisma } from "@/lib/db"
import { Tickets } from '@prisma/client'
import OrdersTable from '@/components/dashboard/orders/OrdersTable'
import { Button } from '@nextui-org/react'
import { PiMicrosoftExcelLogoBold } from "react-icons/pi";
import BreadCrumbsComponent from '@/components/BreadCrumbsComponent'
import DownloadCSV from './_components/DownloadCSV'

const getOrders = async () => {
    const orders = await prisma.tickets.findMany({})
    return orders.reverse()
}

export default async function Products() {
    const data = await getOrders() as Tickets[];

    return (
        <div className={styles.itemContent}>
            <BreadCrumbsComponent />
            <div className='flex items-center justify-between'>
                <h1 className={styles.title}>Orders</h1>

                <DownloadCSV />
            </div>

            <div className={styles.table}>
                <OrdersTable orders={data} />
            </div>
        </div>
    )
}
