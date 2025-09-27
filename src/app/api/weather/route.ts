// src/app/api/weather/route.ts
import { NextResponse } from "next/server";

const API_KEY = "f3a1af375ec306c4dff6e3430a42c8a8";
const MINE_COORDS = { lat: -24.2708, lon: -69.0706 };

export async function GET() {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${MINE_COORDS.lat}&lon=${MINE_COORDS.lon}&units=metric&appid=${API_KEY}`
        );

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json({ error: "Failed to fetch weather", data }, { status: response.status });
        }

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
