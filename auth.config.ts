import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "./schemas"
import type { NextAuthConfig } from "next-auth"
import { getUserByEmail, getUserById } from "./data/user"
import bcrypt from "bcryptjs"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
// import {
//     tenant,
//   } from "@teamhanko/passkeys-next-auth-provider";
// import { PasskeyProvider } from "./data/passkey-provider"
// import { prisma } from "./lib/db"



export default {
    providers: [
        // Github({
        //     clientId: process.env.GITHUB_CLIENT_ID,
        //     clientSecret: process.env.GITHUB_CLIENT_SECRET,
        // }),
        // Google({
        //     clientId: process.env.GOOGLE_CLIENT_ID,
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        // }),
        Credentials({
            async authorize(credentials) {
                const validationSchema = LoginSchema.safeParse(credentials)
                
                if (validationSchema.success) {
                    const { email, password } = validationSchema.data

                    const user = await getUserByEmail(email)
                    if (!user || !user.password) { return null }

                    const passwordMatch = await bcrypt.compare(password, user.password)

                    if (passwordMatch) {
                        return user
                    }
                }

                return null
            }
        }),
        // PasskeyProvider({
        //     tenant: tenant({
        //         apiKey: process.env.PASSKEYS_API_KEY!,
        //         tenantId: process.env.NEXT_PUBLIC_PASSKEYS_TENANT_ID!,
        //     }),
        //     async authorize({ userId }) {
        //         const user = await getUserById(userId);
        //         if (!user) return null;
        //         return user;
        //     },
        // })
        // PasskeyProvider({
        //     tenant: tenant({
        //         apiKey: process.env.PASSKEYS_API_KEY!,
        //         tenantId: process.env.NEXT_PUBLIC_PASSKEYS_TENANT_ID!,
        //     }),
        //     async authorize({ userId }) {
        //         const user = await prisma.user.findUnique({ where: { id: userId } });
        //         if (!user) return null;
        //         return user;
        //     },
        // }),
    ],
} satisfies NextAuthConfig