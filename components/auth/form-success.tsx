import { CheckCircle2Icon } from "lucide-react"


interface FormSuccessProps {
    message?: string
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
    if (!message) return null

    return (
        <div className='bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500 w-full'>
            <CheckCircle2Icon className="h-4 w-4" />
            <p className="font-medium">{message}</p>
        </div>
    )
}