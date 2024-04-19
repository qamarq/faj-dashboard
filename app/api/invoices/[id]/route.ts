import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";
import fs from "fs"

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const user = await currentUser()

    if (!user) {
        return new NextResponse(null, { status: 401 })
    }

    try {
        // Get file of invoice from /invoices folder
        const file = fs.readFileSync(`invoices/invoice-${params.id}.pdf`)

        if (!file) {
            console.log("File not found")
            return new NextResponse(null, { status: 404 })
        }
        // Return file as response
        return new NextResponse(file, { status: 200 })
    } catch (error) {
        console.error(error)
        return new NextResponse(null, { status: 404 })
    }
}