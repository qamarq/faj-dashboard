import NextAuth, { type DefaultSession } from "next-auth"

export type ExtendedUser = DefaultSession["user"] & {
    isOAuth: boolean
    passkey: boolean
}

declare module "next-auth" {
    interface Session {
        user: ExtendedUser
    }
}