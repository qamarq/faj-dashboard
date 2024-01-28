"use client"

import React from 'react'
import { Button } from '@nextui-org/react'
import { startRegistration } from '@simplewebauthn/browser';

export default function PasskeyComponent({ challenge }: { challenge: string }) {
    const registerPasskey = async () => {
        console.log('register passkey')

        const publicKeyCredentialCreationOptions: any = {
            challenge: Uint8Array.from(
                challenge, c => c.charCodeAt(0)),
            rp: {
                name: "Duo Security",
                id: "localhost",
            },
            user: {
                id: Uint8Array.from(
                    "UZSL85T9AFC", c => c.charCodeAt(0)),
                name: "lee@webauthn.guide",
                displayName: "Lee",
            },
            pubKeyCredParams: [{alg: -7, type: "public-key"}],
            authenticatorSelection: {
                authenticatorAttachment: "cross-platform",
            },
            timeout: 60000,
            attestation: "direct"
        };

        const credential = await navigator.credentials.create({
            publicKey: publicKeyCredentialCreationOptions
        });

        console.log(credential);

        await fetch('/api/auth/webauthn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ test: "testset", credential })
        })
            .then(response => {
                // Obsłuż odpowiedź
            })
            .catch(error => {
                // Obsłuż błąd
            });
    }

    return (
        <div>
            <Button type='submit' className='mt-2 max-w-xs' color="primary" variant="solid" onClick={registerPasskey}>
                Add passkey
            </Button>
        </div>
    )
}
