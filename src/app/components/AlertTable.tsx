"use client";

import React from "react";
import { demoSectors, Sector } from "../data/mockData";

// Create alerts based on the demo sectors
const mockAlerts = demoSectors.map((sector, index) => ({
    id: index + 1,
    location: sector.name,
    riskLevel: sector.risk,
    timestamp: new Date(Date.now() - index * 15 * 60 * 1000).toLocaleString(), // 15 min intervals
}));

const AlertTable: React.FC = () => {
    return (
        <div className="bg-gray-900 shadow-lg rounded-lg p-6 mt-6">
            <h3 className="text-white font-semibold mb-4 text-lg">Active Alerts</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-800">
                        <tr>
                            <th className="text-left px-4 py-2 text-gray-300">ID</th>
                            <th className="text-left px-4 py-2 text-gray-300">Location</th>
                            <th className="text-left px-4 py-2 text-gray-300">Risk Level</th>
                            <th className="text-left px-4 py-2 text-gray-300">Timestamp</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {mockAlerts.map((alert) => (
                            <tr
                                key={alert.id}
                                className="hover:bg-gray-800 transition-colors duration-150 cursor-pointer"
                            >
                                <td className="px-4 py-2 text-gray-200">{alert.id}</td>
                                <td className="px-4 py-2 text-gray-200">{alert.location}</td>
                                <td
                                    className={`px-4 py-2 font-bold ${alert.riskLevel === "High"
                                            ? "text-red-500"
                                            : alert.riskLevel === "Medium"
                                                ? "text-yellow-400"
                                                : "text-green-400"
                                        }`}
                                >
                                    {alert.riskLevel}
                                </td>
                                <td className="px-4 py-2 text-gray-400">{alert.timestamp}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AlertTable;
