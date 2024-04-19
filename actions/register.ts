"use server"

import { RegisterSchema } from "@/schemas"
import { z } from "zod"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/db"
import { getUserByEmail } from "@/data/user"
import { revalidatePath } from "next/cache"
import { currentUser } from "@/lib/auth"

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const user = await currentUser()
    if (!user) { return { success: false, message: "Not logged in" } }

    const validationSchema = RegisterSchema.safeParse(values)

    if (!validationSchema.success) {
        // return { error: validationSchema.error.formErrors.fieldErrors}
        return { success: false, message: validationSchema.error.errors[0].message }
    }

    const { email, password, name, repassword } = validationSchema.data

    if (password !== repassword) { return { error: "Hasła nie są takie same" } }

    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await getUserByEmail(email)
    if (existingUser) { return { error: "Email already exists" } }

    await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name
        }
    })

    revalidatePath("/settings")

    return { success: true, message: "Zarejestrowano nowego użytkownika!" }
}