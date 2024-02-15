import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(req: NextRequest) {
  const subcategory = await prisma.subcategory.findMany();

  return NextResponse.json(subcategory);
}
