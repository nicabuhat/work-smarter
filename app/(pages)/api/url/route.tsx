import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const country_code = url.searchParams.get("country_code");
  const subcategory_id = parseInt(url.searchParams.get("subcategory_id")!);

  const urls = await prisma.uRL.findMany({
    where: {
      country_code: country_code,
      subcategory_id: subcategory_id,
    },
  });

  return NextResponse.json(urls);
}
