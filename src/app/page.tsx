import { ConfigMissing } from "@/components/ops/ConfigMissing";
import { OpsShell } from "@/components/ops/OpsShell";
import { OracleHomeMain } from "@/components/ops/OracleHomeMain";
import { getOpsSessionContext } from "@/lib/ops/session-context";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const ctx = await getOpsSessionContext();
  if (ctx.kind === "missing_env") {
    return <ConfigMissing />;
  }
  return (
    <OpsShell profile={ctx.profile} userEmail={ctx.userEmail}>
      <OracleHomeMain />
    </OpsShell>
  );
}
