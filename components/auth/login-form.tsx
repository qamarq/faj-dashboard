'use client';

import { Card, CardBody, Button, Input, Link, CardHeader, Divider, CardFooter } from '@nextui-org/react';
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema } from '@/schemas'
import { useState, useTransition } from 'react';
import { login } from '@/actions/login';
import { useSearchParams } from 'next/navigation';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { FormError } from './form-error';
import { FormSuccess } from './form-success';
import SignInWithPasskey from './login-passkey-button';

export default function LoginForm() {
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get("callbackUrl")
    
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("")
        setSuccess("")

        startTransition(() => {
            login(values, callbackUrl)
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
                    <p className="text-lg mt-3">Login</p>
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
                                name='email'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} autoComplete='username webauthn' disabled={isPending} placeholder='john.doe@example.com' type='email' />
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
                                        <Link href="/auth/forgot-password">
                                            Forgot password?
                                        </Link>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button disabled={isPending} isLoading={isPending} type='submit' className='w-full mt-2' color="primary">
                            Login
                        </Button>

                        <Divider className='my-2' />

                        <SignInWithPasskey />
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
