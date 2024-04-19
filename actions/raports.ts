"use server"

import { paymentStatuses } from "@/constants"
import { prisma } from "@/lib/db"
import { formattedPrice } from "@/lib/utils"
import { format } from "date-fns"

export const downloadOrdersInCsv = async () => {
    const orders = await prisma.tickets.findMany({})
    
    const preparedData = orders.map(order => {
        const ticketsData = JSON.parse(order.ticketData) as TicketData[]
        return {
            orderId: order.id,
            name: order.buyerName,
            email: order.buyerEmail,
            clientVatNumber: order.buyerVAT || 'Brak',
            date: format(order.timestamp, 'yyyy-MM-dd HH:mm'),
            paymentStatus: paymentStatuses[order.paymentStatus as keyof typeof paymentStatuses],
            total: order.paymentAmount/100,
            currency: order.paymentCurrency,
            paymentId: order.paymentID,
            orderedTickets: ticketsData.length,
            ticketsData: order.ticketData
        }
    })

    // Create CSV
    const csv = [
        Object.keys(preparedData[0]).join(';'),
        ...preparedData.map(order => Object.values(order).join(';'))
    ].join('\n')

    // Download CSV
    return csv
}