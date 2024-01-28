// app/components/ThemeSwitcher.tsx
"use client";

import { Button } from "@nextui-org/react";
import { SunIcon, MoonIcon } from "lucide-react";
import {useTheme} from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if(!mounted) return null

    return (
        <Button variant='flat' onClick={() => setTheme(theme === "light" ? "dark" : "light")} isIconOnly aria-label="Change theme">
            {theme === "light" ? <MoonIcon size={16} /> : <SunIcon size={16} /> }
        </Button>
    )
};