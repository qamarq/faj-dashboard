"use client"

import React from 'react'
import Link from 'next/link';
import styles from "@/styles/DashboardLayout.module.scss"
import { BadgeDollarSignIcon, HomeIcon, PackageSearchIcon, TagIcon, TicketIcon, UserIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Button } from '@nextui-org/react';

const pages = [
    {
        "title": "Dashboard",
        "link": "/dashboard",
        "last": "dashboard",
        "icon": <HomeIcon size={16} />
    },
    {
        "title": "Products",
        "link": "/dashboard/products",
        "last": "products",
        "icon": <PackageSearchIcon size={16} />
    },
    {
        "title": "Prices",
        "link": "/dashboard/prices",
        "last": "prices",
        "icon": <BadgeDollarSignIcon size={16} />
    },
    {
        "title": "Discounts",
        "link": "/dashboard/discounts",
        "last": "discounts",
        "icon": <TagIcon size={16} />
    },
    {
        "title": "Tickets orders",
        "link": "/dashboard/orders",
        "last": "orders",
        "icon": <TicketIcon size={16} />
    },
    {
        "title": "Users list",
        "link": "/dashboard/users",
        "last": "users",
        "icon": <UserIcon size={16} />
    }
]

export default function Sidebar() {
    const pathname = usePathname();
    const activePage = pathname.split("/")[pathname.split("/").length - 1];

    return (
        <div className={styles.items}>
            {/* <Link href="/dashboard" className={`${styles.item} ${activePage == "dashboard" ? styles.active : ""}`}>
                <div className={styles.icon}>
                    <HomeIcon size={16} />
                </div>
                <p>Dashboard</p>
            </Link>
            <Link href="/dashboard/products" className={`${styles.item} ${activePage == "products" ? styles.active : ""}`}>
                <div className={styles.icon}>
                    <PackageSearchIcon size={16} />
                </div>
                <p>Products</p>
            </Link>
            <Link href="/dashboard/prices" className={`${styles.item} ${activePage == "prices" ? styles.active : ""}`}>
                <div className={styles.icon}>
                    <BadgeDollarSignIcon size={16} />
                </div>
                <p>Prices</p>
            </Link>
            <Link href="/dashboard/discounts" className={`${styles.item} ${activePage == "discounts" ? styles.active : ""}`}>
                <div className={styles.icon}>
                    <TagIcon size={16} />
                </div>
                <p>Discounts</p>
            </Link>
            <Link href="/dashboard/orders" className={`${styles.item} ${activePage == "orders" ? styles.active : ""}`}>
                <div className={styles.icon}>
                    <TicketIcon size={16} />
                </div>
                <p>Tickets orders</p>
            </Link>
            <Link href="/dashboard/users" className={`${styles.item} ${activePage == "users" ? styles.active : ""}`}>
                <div className={styles.icon}>
                    <UserIcon size={16} />
                </div>
                <p>Users list</p>
            </Link> */}

            {pages.map((page, index) => (
                <Link key={page.link} href={page.link}>
                    <Button className='justify-start w-[100%]' startContent={page.icon} size='lg' radius="lg" color={activePage === page.last ? "primary" : "default"} variant={activePage === page.last ? "shadow" : "light"}>
                        {page.title}
                    </Button>
                </Link>
            ))}
        </div>
    )
}
