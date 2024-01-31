'use client';

import { Card, CardBody, Button, Input, Link, CardHeader, Divider, CardFooter } from '@nextui-org/react';
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterSchema } from '@/schemas'
import { useState, useTransition } from 'react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { register } from '@/actions/register';
import { FormError } from './form-error';
import { FormSuccess } from './form-success';

export default function RegisterForm() {
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("")
        setSuccess("")

        startTransition(() => {
            register(values)
                .then((data) => {
                    if (data?.error) {
                        form.reset()
                        setError(data.error)
                    }

                    if (data?.success) {
                        form.reset()
                        setSuccess(data.success)
                    }
                }) 
        })
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex flex-col">
                    <p className="text-lg">Register</p>
                    <p className="text-small text-default-500">nextui.org</p>
                </div>
            </CardHeader>
            <CardBody>
                <Form {...form}>
                    <form 
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-6'
                    >
                        <div className='space-y-4'>
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Imię i nazwisko</FormLabel>
                                        <FormControl>
                                            <Input {...field} autoComplete='name' disabled={isPending} placeholder='John Doe' type='name' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} autoComplete='email' disabled={isPending} placeholder='john.doe@example.com' type='email' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='password'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input {...field} autoComplete='current-password' disabled={isPending} placeholder='******' type='password' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button disabled={isPending} isLoading={isPending} type='submit' className='w-full mt-2' color="primary">
                            Register
                        </Button>

                        <Divider className='my-2' />

                        <Link href="/auth/login" className='w-full'>
                            <Button variant='ghost' className='w-full'>
                                Wróć do logowania
                            </Button>
                        </Link>
                    </form>
                </Form>
            </CardBody>
            <CardFooter>
                {error && <FormError message={error} />}
                {success && <FormSuccess message={success} />}
            </CardFooter>
        </Card>
    );
}
