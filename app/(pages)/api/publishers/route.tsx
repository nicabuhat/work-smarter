import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const category_id = parseInt(url.searchParams.get("category_id")!);

  const publishers = await prisma.publisher_Deal.findMany({
    where: {
      category_id: category_id,
    },
  });

  return NextResponse.json(publishers);
}
