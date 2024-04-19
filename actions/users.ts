"use server"

import { currentUser } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"

export const deleteUserFromDB = async (userId: string) => {
    const user = await currentUser()
    if (!user) { return { success: false, message: "Not logged in" } }

    if (user.id === userId) { return { success: false, message: "You can't delete yourself" } }

    if (!userId) { return { success: false, message: "No user selected" } }

    await prisma.user.delete({
        where: {
            id: userId
        }
    })

    revalidatePath("/settings")
    return { success: true, message: "User deleted" }
}