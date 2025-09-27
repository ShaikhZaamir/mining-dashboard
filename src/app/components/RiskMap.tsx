"use client";

import React, { useState } from "react";
import {
    MapContainer,
    TileLayer,
    Circle,
    Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { LatLngExpression } from "leaflet";
import { demoSectors, Sector } from "../data/mockData";

const riskColors: Record<Sector["risk"], string> = {
    High: "red",
    Medium: "yellow",
};

const RiskMap: React.FC = () => {
    const [activeSector, setActiveSector] = useState<Sector | null>(null);

    const mapCenter: LatLngExpression = [-24.2708, -69.0706];

    return (
        <div className="bg-gray-900 shadow-lg rounded-lg p-6 mt-6 text-gray-100">
            <h3 className="text-xl font-semibold mb-4">Mine Risk Map</h3>

            <div className="h-[500px] w-full rounded-lg overflow-hidden">
                <MapContainer
                    center={mapCenter}
                    zoom={15}
                    className="h-full w-full"
                    maxBounds={[
                        [-24.28, -69.08],
                        [-24.26, -69.06],
                    ]}
                    scrollWheelZoom={true}
                >
                    <TileLayer
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        attribution="Tiles &copy; Esri"
                    />

                    {demoSectors.map((sector) => (
                        <Circle
                            key={sector.id}
                            center={sector.position as LatLngExpression}
                            radius={sector.radius}
                            pathOptions={{ color: riskColors[sector.risk], fillOpacity: 0.5 }}
                            eventHandlers={{
                                click: () => setActiveSector(sector),
                            }}
                        />
                    ))}

                    {activeSector && (
                        <Popup
                            position={activeSector.position as LatLngExpression}
                            closeButton={true}
                            className="custom-dark-popup"
                            eventHandlers={{
                                remove: () => setActiveSector(null),
                            }}
                        >
                            <div className="flex flex-col gap-0.5 p-1.5 text-gray-100">
                                <h4 className="text-sm font-semibold border-b border-gray-700 pb-0.5 mb-1">
                                    {activeSector.name}
                                </h4>

                                <p className="text-[10px] text-gray-300">
                                    <strong>Position:</strong>{" "}
                                    {activeSector.position[0].toFixed(5)}, {activeSector.position[1].toFixed(5)}
                                </p>

                                <p className="text-[10px]">
                                    <strong>Risk:</strong>{" "}
                                    <span
                                        className={`px-1 py-0.5 rounded-full font-semibold text-[9px] ${activeSector.risk === "High"
                                                ? "bg-red-600 text-white"
                                                : "bg-yellow-500 text-gray-900"
                                            }`}
                                    >
                                        {activeSector.risk}
                                    </span>
                                </p>

                                <p className="text-[10px] text-gray-300">
                                    <strong>Radius:</strong> {activeSector.radius} m
                                </p>
                            </div>
                        </Popup>
                    )}
                </MapContainer>
            </div>
        </div>
    );
};

export default RiskMap;
