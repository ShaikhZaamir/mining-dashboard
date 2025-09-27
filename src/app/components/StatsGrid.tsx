"use client";

import React, { useState } from "react";
import StatsCard from "./StatsCard";

// Demo weather data
const demoWeather = {
    temp: 28,
    condition: "Clear" as const, 
};

const StatsGrid: React.FC = () => {
    const [weather] = useState(demoWeather);

    const getWeatherIcon = (condition: typeof demoWeather.condition) => {
        switch (condition.toLowerCase()) {
            case "clear":
                return "☀️";
            case "clouds":
                return "☁️";
            case "rain":
                return "🌧️";
            case "snow":
                return "❄️";
            default:
                return "🌡️";
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Current Weather */}
            <StatsCard
                title="Current Weather"
                value={`${weather.temp.toFixed(1)}°C ${getWeatherIcon(weather.condition)}`}
                valueColor="text-blue-400"
            />

            {/* Weather Prediction */}
            <StatsCard
                title="Weather Prediction"
                value="Will be calculated"
                valueColor="text-yellow-300"
            />

            {/* Online Drones */}
            <StatsCard
                title="Online Drones"
                value={3}
                valueColor="text-green-400"
            />
        </div>
    );
};

export default StatsGrid;
