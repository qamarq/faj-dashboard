interface User { 
    id: string; 
    email: string;
    username: string; 
    password: string; 
    createdAt: Date; 
    updatedAt: Date; 
}

declare module 'auth';

interface Ticket {
    id: string;
    description: string;
    active: boolean;
    name: string;
    images: string[];
    default_price: string;
}

interface Price {
    id: string;
    active: boolean;
    currency: string;
    unit_amount: number;
}

interface TicketsResult {
    prices: {
        has_more: boolean;
        object: string;
        data: Price[];
        url: string;
    },
    products: {
        has_more: boolean;
        object: string;
        data: Ticket[];
        url: string;
    }
}

type TicketType = Record<string, {
    title: string;
    id: string;
    ticketId: string;
    name: string;
    surname: string;
    email: string;
    participation: string;
    status: string;
    affiliation?: string;
    street?: string;
    city?: string;
    postcode?: string;
    country?: string;
    diet: string;
}>

type TicketData = {
    title: string;
    id: string;
    ticketId: string;
    name: string;
    surname: string;
    email: string;
    participation: string;
    status: string;
    affiliation?: string;
    street?: string;
    city?: string;
    postcode?: string;
    country?: string;
    diet: string;
    vat: string;
}

type PaymentStatus = "requires_confirmation" | "requires_action" | "processing" | "succeeded" | "requires_payment_method" | "canceled" | "incomplete";