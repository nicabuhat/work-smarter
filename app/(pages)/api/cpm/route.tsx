import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getNewCountryCode, isCountryCodeValid } from "@/util/helpers";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const country_code = url.searchParams.get("country_code")!;
  const region = url.searchParams.get("region")!;

  const country = isCountryCodeValid(country_code)
    ? country_code
    : getNewCountryCode(region);

  const pricing = await prisma.pricing.findMany({
    where: {
      country_code: country,
    },
  });

  return NextResponse.json(pricing);
}
