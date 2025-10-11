"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiUpload, FiLoader } from "react-icons/fi";

export default function RockDetection() {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [processing, setProcessing] = useState(false);
    const [resultImage, setResultImage] = useState<string | null>(null);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage(e.target.files[0]);
            setProcessing(true);
            setResultImage(null);

            setTimeout(() => {
                setProcessing(false);
                setResultImage(null); // Placeholder since model not ready
            }, 2000);
        }
    };

    return (
        <div className="bg-gray-800 p-4 rounded-2xl shadow-md text-white space-y-6">
            <h2 className="text-2xl font-semibold">Rock Detection Model</h2>
            <p className="text-gray-400">
                Upload an image to detect loose rocks or rock formations that may pose a risk.
            </p>

            {/* Upload Panel */}
            <div className="relative border-2 border-dashed border-gray-700 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 bg-gray-850 hover:bg-gray-800 transition-all duration-300 cursor-pointer group">
                <div className="flex items-center justify-center w-16 h-16 bg-gray-900 rounded-full shadow-inner group-hover:scale-105 transition-transform duration-300">
                    <FiUpload className="text-4xl text-red-400" />
                </div>
                <p className="text-gray-400 text-center text-sm sm:text-base">
                    Drag & Drop your image here <br /> or click to select a file
                </p>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {selectedImage && (
                    <p className="text-red-400 text-sm font-medium truncate max-w-full">
                        {selectedImage.name}
                    </p>
                )}
            </div>

            {/* Result Panel */}
            <div className="bg-gray-900 p-4 rounded-xl border border-gray-700 min-h-[200px] flex items-center justify-center">
                {processing ? (
                    <div className="flex flex-col items-center gap-2">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            className="text-red-400 text-3xl"
                        >
                            <FiLoader />
                        </motion.div>
                        <p className="text-gray-400">Processing image...</p>
                    </div>
                ) : resultImage ? (
                    <img src={resultImage} alt="Detected Result" className="max-h-64 rounded-md" />
                ) : (
                    <p className="text-gray-500">No results to display</p>
                )}
            </div>
        </div>
    );
}
