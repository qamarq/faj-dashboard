import bcrypt from "bcryptjs"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const hashPassword = async (password: string) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

export const isPasswordCorrect = async (plainPassword: string, hashedPassword: string) => {
    return await bcrypt.compare(plainPassword, hashedPassword)
}

export const formatPrice = (amount: number) => {
    const formattedAmount = (amount / 100).toFixed(2); // Przeniesienie dwóch miejsc po przecinku
    return `${formattedAmount}`;
};

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const formattedPrice = (price: number) => {
    const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR',
    }).format(price/100);
    return formatted
}