import NextAuth from "next-auth"
import authConfig from "@/auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/db"
import { z } from "zod"
import { getAccountByUserId } from "./data/account"
import { getUserById } from "./data/user"

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
    // update
} = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error"
    },
    events: {
        async linkAccount({ user }) {
            await prisma.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            })
        }
    },
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider !== "credentials") return true

            const existingUser = await getUserById(user.id)
            if (!existingUser?.emailVerified) return false

            return true
        },
        async session({ session, token }) {
            if (session.user && token.sub) {
                session.user.id = token.sub
            }

            if (session.user) {
                session.user.isOAuth = token.isOAuth as boolean
                session.user.image = token.image as string | null | undefined
                session.user.passkey = token.passkey as boolean
            }

            return session
        },
        async jwt({ token }) {
            if (!token.sub) return token

            const user = await getUserById(token.sub)
            if (!user) return token

            const exisingAccount = await getAccountByUserId(user.id)

            token.name = user.name
            token.email = user.email
            token.image = user.image
            token.passkey = user.passkey
            token.isOAuth = !!exisingAccount
            return token
        }
    },
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    ...authConfig,
})