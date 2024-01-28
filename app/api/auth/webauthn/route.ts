import { prisma } from "@/app/db"
import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
	const body = await req.json();
    
    console.log(body)

    return NextResponse.json({ message: "success" }, { status: 200 })
}