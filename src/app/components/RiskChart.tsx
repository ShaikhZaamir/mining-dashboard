"use client";

import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const data = [
    { time: "08:00", risk: 20 },
    { time: "09:00", risk: 35 },
    { time: "10:00", risk: 50 },
    { time: "11:00", risk: 40 },
    { time: "12:00", risk: 60 },
];

const RiskChart: React.FC = () => {
    return (
        <div className="bg-white shadow rounded p-6 mt-6 h-96">
            <h3 className="text-gray-700 font-semibold mb-4">Risk Trend</h3>
            <ResponsiveContainer width="100%" height="80%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="risk" stroke="#f87171" strokeWidth={3} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RiskChart;
