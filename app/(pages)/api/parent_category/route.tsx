import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(req: NextRequest) {
  const parentCategory = await prisma.parent_Category.findMany();

  return NextResponse.json(parentCategory);
}
