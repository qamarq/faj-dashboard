"use client"

import { downloadOrdersInCsv } from '@/actions/raports'
import { Button } from '@nextui-org/react'
import React from 'react'
import { PiMicrosoftExcelLogoBold } from 'react-icons/pi'

export default function DownloadCSV() {
    const [isDownloading, startTransition] = React.useTransition()

    const downloadOrdersInCsvHandle = () => {
        startTransition(async () => {
            await downloadOrdersInCsv()
                .then(csv => {
                    var data = new Blob([csv], {type: 'text/csv'});
                    var csvURL = window.URL.createObjectURL(data);
                    const tempLink = document.createElement('a');
                    tempLink.href = csvURL;
                    tempLink.setAttribute('download', `orders_raport_${new Date().toISOString()}.csv`);
                    tempLink.click();

                    window.URL.revokeObjectURL(csvURL)
                })
        })
    }

    return (
        <Button color='primary' onClick={downloadOrdersInCsvHandle} isLoading={isDownloading}>
            {!isDownloading && <PiMicrosoftExcelLogoBold className='' />}
            Pobierz raport (.csv)
        </Button>
    )
}
