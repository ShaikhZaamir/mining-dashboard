// src/app/components/RiskMapWrapper.tsx
"use client";

import dynamic from "next/dynamic";

const RiskMap = dynamic(() => import("./RiskMap"), { ssr: false });

export default function RiskMapWrapper() {
    return <RiskMap />;
}
