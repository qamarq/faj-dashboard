"use client"

import { Button } from '@nextui-org/react'
import React from 'react'
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import { toast } from 'sonner';

export default function DownloadInvoiceBtn({ orderId }: { orderId: string }) {
    const [isDownloading, setIsDownloading] = React.useState(false)

    const handleDownload = async () => {
        setIsDownloading(true)
        try {
            const res = await fetch(`/api/invoices/${orderId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/pdf',
                },
            })
            if (!res.ok) {
                toast.error('Failed to download invoice. Maybe it does not exist.')
                return 
            }
            const blob = await res.blob()
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `invoice-${orderId}.pdf`
            a.click()
        } catch (error) {
            console.error(error)
        } finally {
            setIsDownloading(false)
        }
    
    }

    return (
        <Button color='primary' isLoading={isDownloading} onClick={handleDownload}>
            {!isDownloading && <BsFileEarmarkPdfFill />}
            Download invoice
        </Button>
    )
}
