// https://restcountries.com/v3.1/all?fields=name,cca2
import { NextRequest, NextResponse } from "next/server";
import Country from "@/models/Country";

export async function GET(req: NextRequest) {
  try {
    const data = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,cca2,region",
      {
        cache: "force-cache",
      }
    );
    const countries = await data.json();

    if (!countries) {
      return NextResponse.json(
        { error: "Couldn't find any data" },
        { status: 400 }
      );
    }
    return NextResponse.json(countries as Country[], { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
