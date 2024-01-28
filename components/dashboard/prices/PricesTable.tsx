"use client"

import React, { useState } from 'react'
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, ChipProps, RadioGroup, Radio, Pagination} from "@nextui-org/react";
import { DeleteIcon, EditIcon, EuroIcon, EyeIcon } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { Tickets } from '@prisma/client';
import { paymentStatuses, statusColorMap } from '@/constants';
import Link from 'next/link';

const columns = [
    {name: "PRICE", uid: "unit_amount"},
    {name: "STATUS", uid: "active"},
    {name: "CURRENCY", uid: "currency"},
    {name: "PAYMENT TYPE", uid: "type"},
    {name: "ID", uid: "id"}
];

export default function PricesTable({ prices }: { prices: Price[] }) {
    const [page, setPage] = React.useState(1);
    const rowsPerPage = 10;

    const pages = Math.ceil(prices.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return prices.slice(start, end);
    }, [page, prices]);

    const renderCell = React.useCallback((price: Price, columnKey: React.Key) => {
        const cellValue = price[columnKey as keyof Price];
            switch (columnKey) {
                case "unit_amount":
                    return (
                        <div className="flex flex-row items-center">
                            <p className="text-extrabold text-sm capitalize">{formatPrice(price.unit_amount)}</p>
                        </div>
                    );
                case "active":
                    return (
                        <Chip className="capitalize" color={price.active ? "success" : "danger"} size="sm" variant="flat">
                            {price.active ? "active" : "inactive"}
                        </Chip>
                    );
                case "currency":
                    return (
                        <div className="flex flex-col">
                            <EuroIcon className='mr-1' size={16} />
                        </div>
                    );
                default:
                    return cellValue;
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
