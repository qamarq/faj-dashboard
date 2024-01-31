"use server"

import { signIn } from "@/auth"
import { getUserByEmail } from "@/data/user"
import { LoginSchema } from "@/schemas"
import { AuthError } from "next-auth"
import { z } from "zod"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"

export const login = async (values: z.infer<typeof LoginSchema>, callbackUrl?: string | null) => {
    const validationSchema = LoginSchema.safeParse(values)

    if (!validationSchema.success) {
        console.error("Invalid fields!")
        return { error: "Invalid fields!" }
    }

    const { email, password } = validationSchema.data

    const existingUser = await getUserByEmail(email)
    if (!existingUser || !existingUser.email || !existingUser.password) { return { error: "Invalid credentials!" } }

    if (!existingUser.emailVerified) {
        // const verificationToken = await generateVerificationToken(email)
        // await sendVerificationEmail(verificationToken.email, verificationToken.token)
        
        return { success: "Oczekiwanie na akceptacje konta!" }
    }
    
    try {
        await signIn("credentials", { email, password, redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    console.error("Invalid credentials!")
                    return { error: "Invalid credentials!" }
                default:
                    console.error("Something went wrong!")
                    return { error: "Something went wrong!" }
            }
        }

        throw error
    }
}