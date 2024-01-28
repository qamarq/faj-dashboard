"use client"

import React, { useState } from 'react'
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, ChipProps, RadioGroup, Radio, Pagination} from "@nextui-org/react";
import { DeleteIcon, EditIcon, EuroIcon, EyeIcon } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { Tickets } from '@prisma/client';
import { paymentStatuses, statusColorMap } from '@/constants';
import Link from 'next/link';

const columns = [
    {name: "NAME", uid: "buyerName"},
    {name: "AMOUNT", uid: "paymentAmount"},
    {name: "TIMESTAMP", uid: "timestamp"},
    {name: "PAYMENT STATUS", uid: "paymentStatus"},
    {name: "TICKETS", uid: "tickets"},
    {name: "ACTIONS", uid: "actions"},
];

export default function OrdersTable({ orders }: { orders: Tickets[] }) {
    const [page, setPage] = React.useState(1);
    const rowsPerPage = 10;

    const pages = Math.ceil(orders.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return orders.slice(start, end);
    }, [page, orders]);

    const renderCell = React.useCallback((order: Tickets, columnKey: React.Key) => {
        const cellValue = order[columnKey as keyof Tickets];
            switch (columnKey) {
                case "buyerName":
                    return (
                        <User
                            avatarProps={{radius: "lg", src: ""}}
                            name={order.buyerName}
                            description={order.buyerEmail}
                        >
                            {order.buyerName}
                        </User>
                    );
                case "paymentAmount":
                    return (
                        <div className="flex flex-row items-center">
                            <EuroIcon className='mr-1' size={16} />
                            <p className="text-extrabold text-sm capitalize">{formatPrice(order.paymentAmount)}</p>
                        </div>
                    );
                case "timestamp":
                    return (
                        <div className="flex flex-col">
                            <p className="text-bold text-sm capitalize">{order.timestamp.toLocaleString()}</p>
                        </div>
                    );
                case "paymentStatus":
                    return (
                        <Chip className="capitalize" color={statusColorMap[order.paymentStatus]} size="sm" variant="flat">
                            {paymentStatuses[order.paymentStatus as PaymentStatus]}
                        </Chip>
                    );
                case "tickets":
                    const tickets = JSON.parse(order.ticketData) as TicketType
                    let ticketsCount = 0
                    let users: string[] = []
                    
                    Object.values(tickets).forEach(participant => {
                        ticketsCount += 1;
                        users.push(participant.name + " " + participant.surname);
                    });

                    return (
                        <div className="flex flex-col">
                            <p className="text-bold text-sm"><span style={{ color: "hsl(var(--nextui-primary))", fontWeight: 900 }}>{ticketsCount}</span> tickets were bought for</p>
                            <p className="text-bold text-sm capitalize text-default-400">{users.map((user, index) => (<React.Fragment key={index}>{user}{index !== users.length - 1 && ", "}</React.Fragment>))}</p>
                        </div>
                    );
                case "actions":
                    return (
                        <div className="relative flex items-center gap-2">
                            <Link href={`/dashboard/orders/${order.id}`} onClick={(e) => e.stopPropagation()}>
                                <Tooltip content="Details / Edit order">
                                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                        <EditIcon />
                                    </span>
                                </Tooltip>
                            </Link>
                        </div>
                    );
                default:
                    return typeof cellValue === 'object' && cellValue instanceof Date ? cellValue.toLocaleString() : cellValue;
            }
    }, []);

    return (
        <div>
            <Table 
                selectionMode="multiple" 
                aria-label="Example table with custom cells"
                bottomContent={
                    <div className="flex w-full justify-start">
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="primary"
                            page={page}
                            total={pages}
                            onChange={(page) => setPage(page)}
                        />
                    </div>
                }
            >
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody emptyContent={"No rows to display."} items={items}>
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
