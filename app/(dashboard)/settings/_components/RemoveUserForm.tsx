"use client"

import { deleteUserFromDB } from '@/actions/users';
import { Button, Select, SelectItem } from '@nextui-org/react'
import { User } from '@prisma/client'
import React from 'react'
import { toast } from 'sonner';

export default function RemoveUserForm({ users }: { users: User[] }) {
    const [selectedUser, setValue] = React.useState<string>("");
    const [isLoading, startTransition] = React.useTransition()

    const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setValue(e.target.value);
    };
    
    const handleDeleteUser = () => {
        startTransition(async () => {
            await deleteUserFromDB(selectedUser)
                .then((data) => {
                    if (data.success) {
                        setValue("")
                        toast.success(data.message)
                    } else {
                        toast.error(data.message)
                    }
                })
        })
    }

    return (
        <div className='mt-2 flex flex-col gap-3 max-w-[400px]'>
            <Select
                label="Wybrany użytkownik"
                variant="bordered"
                placeholder="Wybierz użytkownika do usunięcia"
                selectedKeys={selectedUser ? [selectedUser] : undefined}
                className="max-w-xs"
                onChange={handleSelectionChange}
            >
                {users.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                        {user.name}
                    </SelectItem>
                ))}
            </Select>

            <Button color='primary' isLoading={isLoading} isDisabled={selectedUser === ""} onClick={handleDeleteUser}>
                Usuń użytkownika
            </Button>
        </div>
    )
}
