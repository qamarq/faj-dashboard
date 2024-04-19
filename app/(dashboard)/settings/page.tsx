import { currentUser } from '@/lib/auth'
import { prisma } from '@/lib/db'
import PaymentConfirmEmail from '@/mails/PaymentConfirm'
import React from 'react'
import AddUserForm from './_components/AddUserForm'
import RemoveUserForm from './_components/RemoveUserForm'

export default async function SettingsPage() {
    const user = await currentUser()

    const users = await prisma.user.findMany()

    return (
        <div className='p-3'>
            {/* settings
            {JSON.stringify(user)} */}
            {/* <RegisterNewPasskeyButton /> */}
            <h1 className='text-3xl font-semibold'>Ustawienia</h1>

            <div className='mt-5'>
                <h2 className='text-xl font-semibold'>Użytkownicy zarejestrowani do panelu</h2>
                <ul className='list-decimal list-inside'>
                    {users.map((user) => (
                        <li key={user.id}>{user.name} - {user.email}</li>
                    ))}
                </ul>
            </div>

            <div className='mt-5'>
                <h2 className='text-xl font-semibold'>Dodaj nowego użytkownika</h2>
                <AddUserForm />
            </div>

            <div className='mt-5'>
                <h2 className='text-xl font-semibold'>Usuń użytkownika</h2>
                <RemoveUserForm users={users} />
            </div>
        </div>
    )
}
