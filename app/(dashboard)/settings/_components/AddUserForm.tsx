"use client"

import { register } from '@/actions/register'
import { Button, Input } from '@nextui-org/react'
import React from 'react'
import { toast } from 'sonner'

export default function AddUserForm() {
    const [isLoading, startTransition] = React.useTransition()
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [retypePassword, setRetypePassword] = React.useState('')

    const handleAddUser = () => {
        startTransition(async () => {
            await register({ name, email, password, repassword: retypePassword })
                .then((data) => {
                    if (data.success) {
                        setName('')
                        setEmail('')
                        setPassword('')
                        setRetypePassword('')
                        toast.success(data.message)
                    } else {
                        toast.error(data.message)
                    }
                })
        })
    }

    return (
        <div className='mt-2 flex flex-col gap-3 max-w-[400px]'>
            <Input type="name" label="Imię i nazwisko" placeholder="Wpisz imię i nazwisko nowego użytkownika" value={name} onValueChange={setName} />
            <Input type="email" label="Adres email" placeholder="Wpisz adres email nowego użytkownika" value={email} onValueChange={setEmail} />
            <Input type="password" label="Hasło" placeholder="Wpisz hasło nowego użytkownika" value={password} onValueChange={setPassword} />
            <Input type="retype-password" label="Powtórz hasło" placeholder="Powtórz hasło nowego użytkownika" value={retypePassword} onValueChange={setRetypePassword} />

            <Button isLoading={isLoading} onClick={handleAddUser} color='primary'>
                Dodaj użytkownika
            </Button>
        </div>
    )
}
