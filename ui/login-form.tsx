'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/lib/actions';
import { AlertCircleIcon, LogInIcon } from 'lucide-react';
import { Card, CardBody, Button, Input } from '@nextui-org/react';

export default function LoginForm() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);

    return (
        <form action={dispatch} className="space-y-3">
            <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                {errorMessage && (
                    <Card>
                        <CardBody>
                            <p className='flex items-center'><AlertCircleIcon className="h-5 w-5 text-red-500 mr-2" /> {errorMessage}</p>
                        </CardBody>
                    </Card>
                )}
                <h1 className={`mb-3 text-2xl mt-2 text-center`}>Please log in to continue.</h1>
                <div className="w-full">
                    <div>
                        <Input
                            isRequired
                            type="email"
                            label="Email"
                            name="email"
                            className="max-w-xs"
                        />
                    </div>
                    <div className="mt-2">
                        <Input
                            isRequired
                            type="password"
                            label="Password"
                            name="password"
                            minLength={6}
                            className="max-w-xs"
                        />
                    </div>
                </div>
                <LoginButton />
            </div>
        </form>
    );
}

function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <Button isLoading={pending} type='submit' disabled={pending} className='mt-2 max-w-xs' color="primary" variant="solid">
            Log in to dashboard
        </Button>
    );
}
