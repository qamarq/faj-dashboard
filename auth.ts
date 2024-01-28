import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { prisma } from "@/app/db"
import { hashPassword, isPasswordCorrect } from './lib/utils';

async function getUser(email: string): Promise<User | null> {
    try {
        const user = await prisma.users.findUnique({
            where: {
                email: email
            }
        })
        return user;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}
 
export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;

                    // await prisma.users.create({
                    //     data: {
                    //         email,
                    //         username: "Kamil Marczak",
                    //         credentials: undefined,
                    //         password: await hashPassword(password)
                    //     }
                    // })

                    const user = await getUser(email);
                    if (!user) return null;

                    const passwordsMatch = await isPasswordCorrect(password, user.password);
 
                    if (passwordsMatch) return user;
                }
            
                console.log('Invalid credentials');
                return null;
            },
        }),
    ],
});