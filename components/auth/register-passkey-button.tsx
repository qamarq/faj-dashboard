"use client"

// import { finishServerPasskeyRegistration, getServerPasskeyCredentials, startServerPasskeyRegistration } from '@/lib/passkey';
import {
    create,
    get,
    type CredentialCreationOptionsJSON,
} from "@github/webauthn-json";
import { Button } from '@nextui-org/react';
import { UserCogIcon } from 'lucide-react';
import { useState } from 'react';

export default function RegisterNewPasskeyButton() {
    const [isPending, setIsPending] = useState(false)

    async function registerPasskey() {
        setIsPending(true)
        // const createOptions = await startServerPasskeyRegistration();
        // const credential = await create(createOptions as CredentialCreationOptionsJSON);
        // await finishServerPasskeyRegistration(credential);
    }

    // async function getPasskey() {
    //     const options = await getServerPasskeyCredentials();
    //     console.log(options)
    //     const test = await get({
    //         publicKey: options[0].public_key
    //     })
    // }
    // getPasskey()

    return (
        <Button
            onClick={() => registerPasskey()}
            className="flex justify-center items-center space-x-2"
            isLoading={isPending}
        >
            {!isPending && <UserCogIcon className="w-4 h-4 mr-2" />}
            Register a new passkey
        </Button>
    )
}
