"use server"

import { prisma } from '@/app/db';
import { auth, signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';
 
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
    revalidatePath('/dashboard/orders'+orderID)
    console.log("updated", orderID, status)
}
 
export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function getUser() {
    const data = await auth();
    const user = await prisma.users.findUnique({
        where: {
            email: data?.user?.email || ""
        }
    })
    return user as User
}

export async function registerAccount(
    prevState: string | undefined,
    formData: FormData,
) {
    console.log(formData)
}