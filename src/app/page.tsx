import Layout from "./components/Layout";
import StatsGrid from "./components/StatsGrid";
import RiskMap from "./components/RiskMap";
import RiskChart from "./components/RiskChart";
import AlertTable from "./components/AlertTable";

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
