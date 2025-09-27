"use client";

import Layout from "./components/Layout";
import StatsGrid from "./components/StatsGrid";
import AlertTable from "./components/AlertTable";
import RiskMap from "./components/RiskMap";

export default function Home() {
  return (
    <Layout>
      <StatsGrid />
      <AlertTable />
      <RiskMap />
      {/* <RiskChart /> */}
    </Layout>
  );
}
