import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(req: NextRequest) {
  const pricing = await prisma.pricing.findMany();

  return NextResponse.json(pricing);
}
