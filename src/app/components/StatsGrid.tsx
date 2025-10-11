"use client";

import React, { useEffect, useState } from "react";
import StatsCard from "./StatsCard";

type WeatherCondition = "Clear" | "Clouds" | "Rain" | "Snow";

type WeatherData = {
    current: {
        temp: number;
        condition: WeatherCondition;
    };
    prediction: {
        temp: number;
        condition: WeatherCondition;
    };
};

const StatsGrid: React.FC = () => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const res = await fetch("/api/weather");
                if (!res.ok) throw new Error("Failed to fetch weather data");
                const data: WeatherData = await res.json();
                setWeather(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, []);

    const getWeatherIcon = (condition: WeatherCondition) => {
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
                title="Current Condition"
                value={
                    loading
                        ? "Loading..."
                        : error
                            ? `Error: ${error}`
                            : `${weather?.current.temp.toFixed(1)}°C ${getWeatherIcon(weather!.current.condition)}`
                }
                valueColor="text-blue-400"
            />

            {/* Weather Prediction */}
            <StatsCard
                title="Upcoming Prediction"
                value={
                    loading
                        ? "Loading..."
                        : error
                            ? `Error: ${error}`
                            : `${weather?.prediction.temp.toFixed(1)}°C ${getWeatherIcon(weather!.prediction.condition)}`
                }
                valueColor="text-yellow-300"
            />

            {/* Blank Column */}
            <div></div>
        </div>
    );
};

export default StatsGrid;








// "use client";

// import React, { useEffect, useState } from "react";
// import StatsCard from "./StatsCard";

// type WeatherCondition = "Clear" | "Clouds" | "Rain" | "Snow";

// type Weather = {
//     temp: number;
//     condition: WeatherCondition;
// };

// const StatsGrid: React.FC = () => {
//     const [weather, setWeather] = useState<Weather | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchWeather = async () => {
//             try {
//                 const res = await fetch("/api/weather");
//                 if (!res.ok) throw new Error("Failed to fetch weather data");
//                 const data: Weather = await res.json();
//                 setWeather(data);
//             } catch (err) {
//                 setError((err as Error).message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchWeather();
//     }, []);

//     const getWeatherIcon = (condition: WeatherCondition) => {
//         switch (condition.toLowerCase()) {
//             case "clear":
//                 return "☀️";
//             case "clouds":
//                 return "☁️";
//             case "rain":
//                 return "🌧️";
//             case "snow":
//                 return "❄️";
//             default:
//                 return "🌡️";
//         }
//     };

//     return (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//             {/* Current Weather */}
//             <StatsCard
//                 title="Current Weather"
//                 value={
//                     loading
//                         ? "Loading..."
//                         : error
//                             ? `Error: ${error}`
//                             : `${weather?.temp.toFixed(1)}°C ${getWeatherIcon(weather!.condition)}`
//                 }
//                 valueColor="text-blue-400"
//             />

//             {/* Weather Prediction */}
//             <StatsCard
//                 title="Weather Prediction"
//                 value="Will be calculated"
//                 valueColor="text-yellow-300"
//             />

//             {/* Online Drones */}
//             <StatsCard
//                 title="Online Drones"
//                 value={3}
//                 valueColor="text-green-400"
//             />
//         </div>
//     );
// };

// export default StatsGrid;


