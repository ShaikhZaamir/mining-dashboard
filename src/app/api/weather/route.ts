// src/app/api/weather/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  // Return demo weather data
  const weather = {
    temp: 28,
    condition: "Clear",
  };

  return NextResponse.json(weather);
}
