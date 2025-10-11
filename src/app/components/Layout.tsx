"use client";

import React, { ReactNode, useState } from "react";
import {
    FiHome,
    FiMap,
    FiTrendingUp,
    FiBell,
    FiCpu,
    FiSettings,
    FiBox
} from "react-icons/fi";

import StatsGrid from "./StatsGrid";
import AlertTable from "./AlertTable";
import RiskMapWrapper from "./RiskMapWrapper";
import DetectionModels from "./DetectionModels";

type LayoutProps = {
    children?: ReactNode;
};

const menuItems = [
    { name: "Dashboard", icon: <FiHome /> },
    { name: "Risk Maps", icon: <FiMap /> },
    { name: "Forecasts", icon: <FiTrendingUp /> },
    { name: "Alerts", icon: <FiBell /> },
    { name: "Sensors", icon: <FiCpu /> },
    { name: "Detection Models", icon: <FiBox /> },
    { name: "Settings", icon: <FiSettings /> },
];

const Layout: React.FC<LayoutProps> = () => {
    const [activeMenu, setActiveMenu] = useState("Dashboard");

    // 🔹 Page switcher
    const renderContent = () => {
        switch (activeMenu) {
            case "Dashboard":
                return (
                    <>
                        <StatsGrid />
                        <AlertTable />
                        <RiskMapWrapper />
                    </>
                );
            case "Detection Models":
                return <DetectionModels />;

            default:
                return (
                    <div className="flex items-center justify-center h-full text-gray-400">
                        <p>{activeMenu} page is under construction 🚧</p>
                    </div>
                );
        }
    };

    return (
        <div className="flex h-screen bg-gray-950 text-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 flex flex-col p-6 shadow-lg">
                <h1 className="text-3xl font-bold mb-10 text-white tracking-wide">
                    Risk System
                </h1>
                <nav className="flex flex-col gap-3">
                    {menuItems.map((item) => {
                        const isActive = activeMenu === item.name;
                        return (
                            <a
                                href="#"
                                key={item.name}
                                onClick={() => setActiveMenu(item.name)}
                                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 cursor-pointer
                                    ${isActive
                                        ? "bg-gradient-to-r from-green-500 to-green-600 shadow-lg text-white"
                                        : "hover:bg-gray-800 text-gray-200"
                                    }`}
                            >
                                <span className="text-xl">{item.icon}</span>
                                <span className="font-medium">{item.name}</span>
                            </a>
                        );
                    })}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col">
                {/* Top Navbar */}
                <header className="bg-gray-900 shadow-md p-4 flex justify-between items-center border-b border-gray-800">
                    <h2 className="text-2xl font-semibold text-white tracking-wide">
                        {activeMenu}
                    </h2>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                            <span className="text-green-400 font-medium">System Working</span>
                        </div>
                    </div>
                </header>

                {/* Dynamic content area */}
                <div className="flex-1 p-6 bg-gray-950 overflow-auto">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

export default Layout;
