import { prisma } from "@/app/db"
import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function GET(req: Request) {
    return NextResponse.json({ message: "success" }, { status: 200 })
}