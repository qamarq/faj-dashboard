"use client"

import React from 'react'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, User, getKeyValue } from '@nextui-org/react'
import { formatPrice } from '@/lib/utils';
import { EuroIcon } from 'lucide-react';
  
const columns = [
    {
        key: "owner",
        label: "OWNER",
    },
    {
        key: "name",
        label: "NAME",
    },
    {
        key: "price",
        label: "PRICE",
    },
    {
        key: "country",
        label: "COUNTRY",
    }
];

export default function OrderDetailsTable({ ticketsData, prices, tickets }: { ticketsData: TicketData[], prices: Price[], tickets: Ticket[] }) {
    const renderCell = React.useCallback((order: TicketData, columnKey: React.Key) => {
        const ticket = tickets.find((ticket) => ticket.id === order.ticketID)
        if (!ticket) return null
        const cellValue = order[columnKey as keyof TicketData];
            switch (columnKey) {
                case "name":
                    return (
                        <div className="flex flex-col">
                            <p className="text-bold text-sm capitalize">{ticket.name}</p>
                        </div>
                    );
                case "price":
                    const price = prices.find((price) => price.id === ticket.default_price)
                    if (!price) return null
                    return (
                        <div className="flex flex-row items-center">
                            <EuroIcon className='mr-1' size={16} />
                            <p className="text-extrabold text-sm capitalize">{formatPrice(price.unit_amount)}</p>
                        </div>
                    );
                case "owner":
                    return (
                        <User
                            avatarProps={{radius: "lg", src: ""}}
                            name={`${order.name} ${order.surname}`}
                            description={order.email}
                        >
                            {order.name}
                        </User>
                    );
                case "country":
                    return (
                        <div className="flex flex-col">
                            <p className="text-bold text-sm capitalize">{order.country}</p>
                        </div>
                    );
                default:
                    return cellValue;
            }
    }, [prices, tickets]);

    return (
        <Table border={0} shadow='none' aria-label="Example table with dynamic content">
            <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody emptyContent={"No rows to display."} items={ticketsData}>
                {(item) => (
                    <TableRow key={item.id.toString()}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}
