"use server"

import { auth } from "@/auth"
// import { tenant } from "@teamhanko/passkeys-next-auth-provider";
import { prisma } from "@/lib/db";

// const passkeyApi = tenant({
//     apiKey: process.env.PASSKEYS_API_KEY!,
//     tenantId: process.env.NEXT_PUBLIC_PASSKEYS_TENANT_ID!,
// });

export async function getServerPasskeyCredentials() {
    const session = await auth()
    const sessionUser = session?.user;

    // const credentials = await passkeyApi.user(sessionUser?.id || "").credentials();

    // return credentials;
}

export async function startServerPasskeyRegistration() {
    const session = await auth()
    const sessionUser = session?.user;

    const user = await prisma.user.findUnique({
        where: { email: sessionUser?.email as string },
        select: { id: true, name: true },
    });

    // const createOptions = await passkeyApi.registration.initialize({
    //     userId: user!.id,
    //     username: user!.name || "",
    // });

    // await prisma.user.update({
    //     where: { id: user!.id },
    //     data: { passkey: true },
    // });

    // return createOptions;
}

export async function finishServerPasskeyRegistration(credential: any) {
    const session = await auth()
    if (!session) throw new Error("Not logged in");

    // await passkeyApi.registration.finalize(credential);

    // console.log(credential)
}