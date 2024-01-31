"use server"

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updatePaymentStatus(
    orderID: string,
    status: PaymentStatus,
) {
    await prisma.tickets.update({
        where: {
            id: orderID,
        },
        data: {
            paymentStatus: status
        },
    });
    revalidatePath('/orders/'+orderID)
    console.log("updated", orderID, status)
}