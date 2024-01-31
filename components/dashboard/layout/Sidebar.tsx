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
        "link": "/",
        "last": "",
        "icon": <HomeIcon size={16} />
    },
    {
        "title": "Products",
        "link": "/products",
        "last": "products",
        "icon": <PackageSearchIcon size={16} />
    },
    {
        "title": "Prices",
        "link": "/prices",
        "last": "prices",
        "icon": <BadgeDollarSignIcon size={16} />
    },
    {
        "title": "Discounts",
        "link": "/discounts",
        "last": "discounts",
        "icon": <TagIcon size={16} />
    },
    {
        "title": "Tickets orders",
        "link": "/orders",
        "last": "orders",
        "icon": <TicketIcon size={16} />
    },
    {
        "title": "Users list",
        "link": "/users",
        "last": "users",
        "icon": <UserIcon size={16} />
    }
]

export default function Sidebar() {
    const pathname = usePathname();
    const activePage = pathname.split("/")[pathname.split("/").length - 1];

    return (
        <div className={styles.items}>

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
