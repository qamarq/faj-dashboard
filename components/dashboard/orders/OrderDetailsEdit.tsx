"use client"

import { paymentStatuses } from '@/constants'
import { Autocomplete, AutocompleteItem, Button } from '@nextui-org/react'
import { EditIcon } from 'lucide-react'
import { updatePaymentStatus } from '@/actions/orders'
import React from 'react'

export default function OrderDetailsEdit({ orderID, paymentStatus }: { orderID: string, paymentStatus: PaymentStatus}) {
    const [inEditing, setInEditing] = React.useState(false)
    const [actualStatus, setActualStatus] = React.useState(paymentStatus)

    const changeMode = () => {
        if (inEditing) {
            updatePaymentStatus(orderID, actualStatus)
            setInEditing(false)
        } else {
            setInEditing(true)
        }
    }

    return (
        <>
            <Autocomplete 
                label="Select payment status" 
                selectedKey={actualStatus}
                isDisabled={!inEditing}
                onSelectionChange={(key) => setActualStatus(key as PaymentStatus)}
                className="max-w-xs" 
            >
                {Object.entries(paymentStatuses).map(([key, value]) => (
                    <AutocompleteItem key={key} value={key}>
                        {value}
                    </AutocompleteItem>  
                ))}
            </Autocomplete>
            <Button color='primary' className='mt-[20px]' startContent={<EditIcon size={16} />} onClick={changeMode}>
                {inEditing ? "Save" : "Edit"} payment status
            </Button>
        </>
    )
}
