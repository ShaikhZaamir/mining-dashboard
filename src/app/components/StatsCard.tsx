import React from "react";

type StatsCardProps = {
    title: string;
    value: string | number;
    valueColor?: string; // Tailwind color class for value text
};

const StatsCard: React.FC<StatsCardProps> = ({ title, value, valueColor }) => {
    return (
        <div className="bg-white shadow rounded p-4">
            <h3 className="text-gray-500 text-sm">{title}</h3>
            <p className={`text-2xl font-bold ${valueColor ? valueColor : "text-black"}`}>{value}</p>
        </div>
    );
};

export default StatsCard;
