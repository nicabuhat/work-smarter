import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const category = parseInt(url.searchParams.get("category")!);
  let subcategory;

  console.log(category);
  if (category === 3) {
    subcategory = await prisma.subcategory.findMany({
      where: {
        id: {
          lt: 16,
        },
      },
    });
  } else subcategory = await prisma.subcategory.findMany();

  return NextResponse.json(subcategory);
}
