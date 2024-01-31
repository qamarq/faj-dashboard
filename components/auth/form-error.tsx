import { AlertTriangleIcon } from "lucide-react";

interface FormErrorProps {
    message?: string
}

export const FormError = ({ message }: FormErrorProps) => {
    if (!message) return null

    return (
        <div className='bg-rose-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-rose-500 w-full'>
            <AlertTriangleIcon className="h-4 w-4" />
            <p className="font-medium">{message}</p>
        </div>
    )
}