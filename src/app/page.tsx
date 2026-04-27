import { OracleHomeMain } from "@/components/ops/OracleHomeMain";
import { OracleSidebar } from "@/components/ops/OracleSidebar";

export default function HomePage() {
  return (
    <div className="app">
      <OracleSidebar />
      <OracleHomeMain />
    </div>
  );
}
