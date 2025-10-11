// src/app/components/DetectionModels.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiActivity, FiAlertTriangle, FiAperture, FiLayers, FiChevronLeft } from "react-icons/fi";

// Import individual model screens
import CrackDetection from "./models/CrackDetection";
import LandslideDetection from "./models/LandslideDetection";
import RockDetection from "./models/RockDetection";
import CombinedDetection from "./models/CombinedDetection";

const models = [
    {
        id: "crack",
        title: "Crack Detection",
        icon: <FiActivity className="text-blue-400 text-4xl" />,
        description: "Analyze surface imagery to detect cracks in mine walls and structures.",
        color: "from-blue-600/20 to-blue-900/20",
    },
    {
        id: "landslide",
        title: "Landslide Detection",
        icon: <FiAlertTriangle className="text-yellow-400 text-4xl" />,
        description: "Monitor slope stability and detect potential landslides in real time.",
        color: "from-yellow-600/20 to-yellow-900/20",
    },
    {
        id: "rock",
        title: "Rock Detection",
        icon: <FiAperture className="text-red-400 text-4xl" />,
        description: "Identify loose rock formations that may pose a risk to operations.",
        color: "from-red-600/20 to-red-900/20",
    },
    {
        id: "combined",
        title: "Combined Detection",
        icon: <FiLayers className="text-green-400 text-4xl" />,
        description: "Integrate all detection models for complete environmental awareness.",
        color: "from-green-600/20 to-green-900/20",
    },
];

export default function DetectionModels() {
    const [activeModel, setActiveModel] = useState<string | null>(null);

    const renderModelScreen = () => {
        switch (activeModel) {
            case "crack":
                return <CrackDetection />;
            case "landslide":
                return <LandslideDetection />;
            case "rock":
                return <RockDetection />;
            case "combined":
                return <CombinedDetection />;
            default:
                return null;
        }
    };

    if (activeModel) {
        return (
            <div className="p-2 pt-0">
                <button
                    onClick={() => setActiveModel(null)}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition mb-2"
                >
                    <FiChevronLeft className="text-lg" />
                    Back to Models
                </button>
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    {renderModelScreen()}
                </motion.div>
            </div>
        );
    }

    return (
        <div className="p-8 bg-gray-950 text-gray-100 min-h-screen">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {models.map((model) => (
                    <motion.div
                        key={model.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setActiveModel(model.id)}
                        className={`bg-gradient-to-br ${model.color} p-6 rounded-2xl border border-gray-800 shadow-lg hover:shadow-green-500/10 transition-all duration-300 cursor-pointer`}
                    >
                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="p-4 bg-gray-800 rounded-full shadow-inner">{model.icon}</div>
                            <h3 className="text-xl font-semibold text-white">{model.title}</h3>
                            <p className="text-gray-400 text-sm">{model.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
