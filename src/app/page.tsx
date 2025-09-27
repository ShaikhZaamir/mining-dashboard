// src/app/page.tsx
import Layout from "./components/Layout";
import StatsGrid from "./components/StatsGrid";
import AlertTable from "./components/AlertTable";
import RiskMapWrapper from "./components/RiskMapWrapper";

export default function Home() {
  return (
    <Layout>
      <StatsGrid />
      <AlertTable />
      <RiskMapWrapper />
      {/* <RiskChart /> */}
    </Layout>
  );
}
