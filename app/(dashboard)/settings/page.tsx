import RegisterNewPasskeyButton from '@/components/auth/register-passkey-button'
import { currentUser } from '@/lib/auth'
import PaymentConfirmEmail from '@/mails/PaymentConfirm'
import React from 'react'

export default async function SettingsPage() {
    const user = await currentUser()
    return (
        <div>
            settings
            {JSON.stringify(user)}
            <RegisterNewPasskeyButton />
        </div>
    )
}
