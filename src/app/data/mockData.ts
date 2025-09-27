export interface Sector {
    id: number;
    name: string;
    position: [number, number];
    risk: "High" | "Medium";
    radius: number;
}

// Demo data simulating backend response
export const demoSectors: Sector[] = [
    { id: 1, name: "North Slope", position: [-24.2685, -69.0725], risk: "High", radius: 100 },
    { id: 2, name: "East Pit", position: [-24.2730, -69.0680], risk: "Medium", radius: 70 },
    { id: 3, name: "South Ridge", position: [-24.2750, -69.0715], risk: "High", radius: 100 },
    { id: 4, name: "Central Basin", position: [-24.2690, -69.0670], risk: "Medium", radius: 70 },
];
