"use client"

import React, { useState } from 'react'
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, ChipProps, RadioGroup, Radio} from "@nextui-org/react";
import { DeleteIcon, EditIcon, EuroIcon, EyeIcon } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';

const columns = [
    {name: "NAME", uid: "name"},
    {name: "DESCRIPTION", uid: "description"},
    {name: "ID", uid: "id"},
    {name: "PRICE", uid: "price"},
    {name: "STATUS", uid: "status"},
    {name: "ACTIONS", uid: "actions"},
];

export default function ProductsTable({ tickets, prices }: { tickets: Ticket[], prices: Price[] }) {
    const renderCell = React.useCallback((ticket: Ticket, columnKey: React.Key) => {
        const editLink = `https://dashboard.stripe.com/${process.env.NEXT_PUBLIC_STRIPE_TESTING == "true" ? 'test/' : ''}products/${ticket.id}`
        const cellValue = ticket[columnKey as keyof Ticket];
            switch (columnKey) {
                case "id":
                    return (
                        <div className="flex flex-col">
                            <p className="text-bold text-sm text-default-400">{ticket.id}</p>
                        </div>
                    );
                case "name":
                    return (
                        <User
                            avatarProps={{radius: "lg", src: ticket.images[0]}}
                            name={cellValue}
                        >
                            {ticket.name}
                        </User>
                    );
                case "description":
                    return (
                        <div className="flex flex-col">
                            <p className="text-bold text-sm capitalize">{ticket.description}</p>
                        </div>
                    );
                case "price":
                    return (
                        <div className="flex flex-row items-center">
                            <EuroIcon className='mr-1' size={16} />
                            <p className="text-extrabold text-sm capitalize">{formatPrice(prices.filter((price) => price.id === ticket.default_price)[0]?.unit_amount)}</p>
                        </div>
                    );
                case "status":
                    return (
                        <Chip className="capitalize" color={ticket.active ? "success" : "danger"} size="sm" variant="flat">
                            {ticket.active ? "active" : "inactive"}
                        </Chip>
                    );
                case "actions":
                    return (
                        <div className="relative flex items-center gap-2">
                            {/* <Tooltip content="Details">
                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                    <EyeIcon />
                                </span>
                            </Tooltip> */}
                            <Link target='_blank' href={editLink}>
                                <Tooltip content="Edit user">
                                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                        <EditIcon />
                                    </span>
                                </Tooltip>
                            </Link>
                            {/* <Tooltip color="danger" content="Delete user">
                                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                    <DeleteIcon />
                                </span>
                            </Tooltip> */}
                        </div>
                    );
                default:
                    return cellValue;
            }
    }, [prices]);

    return (
        <div>
            <Table selectionMode="multiple" defaultSelectedKeys={["2", "3"]} aria-label="Example table with custom cells">
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody emptyContent={"No rows to display."} items={tickets}>
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
