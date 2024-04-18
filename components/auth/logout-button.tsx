"use client"

import { logout } from "@/actions/logout"
import { Link } from "@nextui-org/react"

interface LogoutButtonProps {
    children?: React.ReactNode
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
    const onClick = () => {
        logout()
        console.log("logout")
    }

    return (
        <Link onClick={onClick} className="cursor-pointer">
            {children}
        </Link>
    )
}