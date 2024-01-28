"use client"

import React from 'react'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, User, getKeyValue } from '@nextui-org/react'
import { formatPrice } from '@/lib/utils';
import { EuroIcon } from 'lucide-react';
  
const columns = [
    {
        key: "title",
        label: "TITLE",
    },
    {
        key: "person",
        label: "PERSON",
    },
    {
        key: "participation",
        label: "PARTICIPATION",
    },
    {
        key: "affiliation",
        label: "AFFILIATION",
    },
    {
        key: "address",
        label: "ADDRESS",
    },
    {
        key: "diet",
        label: "DIET",
    }
];

export default function OrderDetailsTablePersons({ ticketsData }: { ticketsData: TicketData[] }) {
    const renderCell = React.useCallback((order: TicketData, columnKey: React.Key) => {
        const cellValue = order[columnKey as keyof TicketData];
            switch (columnKey) {
                case "person":
                    return (
                        <div className="flex flex-col">
                            <p className="text-bold text-sm capitalize">{order.name} {order.surname}</p>
                            <p className="text-bold text-sm text-default-400">{order.email}</p>
                        </div>
                    );
                case "participation":
                    return (
                        <div className="flex flex-col">
                            <p className="text-bold text-sm capitalize">{order.participation}</p>
                        </div>
                    );
                case "affiliation":
                    return (
                        <div className="flex flex-col">
                            <p className="text-bold text-sm capitalize">{order.affiliation}</p>
                        </div>
                    );
                case "address":
                    return (
                        <div className="flex flex-col">
                            <p className="text-bold text-sm capitalize">{order.street}, {order.postcode} {order.city}, {order.country}</p>
                        </div>
                    );
                case "diet":
                    return (
                        <div className="flex flex-col">
                            <p className="text-bold text-sm capitalize">{order.diet}</p>
                        </div>
                    );
                default:
                    return cellValue;
            }
    }, []);

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
