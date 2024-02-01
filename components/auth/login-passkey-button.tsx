"use client"

import { Button } from "@nextui-org/react";
import { signInWithPasskey } from "@teamhanko/passkeys-next-auth-provider/client";
import { UserCogIcon } from "lucide-react";
import { useState } from "react";

const SignInWithPasskey = () => {
    const [isPending, setIsPending] = useState(false)

    return (
        <Button 
            onClick={() => {
                setIsPending(true)
                signInWithPasskey({ 
                    tenantId: process.env.NEXT_PUBLIC_PASSKEYS_TENANT_ID!, 
                    callbackUrl: `${window.location.origin}/` 
                })
            }} 
            className="mt-4 w-full" color="default" variant="flat"
            isLoading={isPending}
        > 
            {!isPending && <UserCogIcon className="w-4 h-4 mr-2" />} 
            Sign in with a passkey 
        </Button>
    )
}

export default SignInWithPasskey