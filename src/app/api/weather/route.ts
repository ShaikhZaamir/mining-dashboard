// src/app/api/weather/route.ts
import { NextResponse } from "next/server";

const API_KEY = "f3a1af375ec306c4dff6e3430a42c8a8";
const CITY = "Mumbai";
const UNITS = "metric";

export async function GET() {
  try {
    // Current weather
    const currentRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=${UNITS}&appid=${API_KEY}`
    );
    if (!currentRes.ok) throw new Error("Failed to fetch current weather");
    const currentData = await currentRes.json();

    // Forecast (next day)
    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&units=${UNITS}&appid=${API_KEY}`
    );
    if (!forecastRes.ok) throw new Error("Failed to fetch forecast");
    const forecastData = await forecastRes.json();

    // Take first forecast for tomorrow (~24h from now)
    const tomorrowForecast = forecastData.list[8]; // 8 * 3h = 24h ahead

    const weather = {
      current: {
        temp: currentData.main.temp,
        condition: currentData.weather[0].main,
      },
      prediction: {
        temp: tomorrowForecast.main.temp,
        condition: tomorrowForecast.weather[0].main,
      },
    };

    return NextResponse.json(weather);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
