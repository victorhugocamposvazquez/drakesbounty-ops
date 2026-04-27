import { ConfigMissing } from "@/components/ops/ConfigMissing";
import { OpsShell } from "@/components/ops/OpsShell";
import { OracleHomeMain } from "@/components/ops/OracleHomeMain";
import { fetchLast7dStats } from "@/lib/data/stats";
import { getOpsSessionContext } from "@/lib/ops/session-context";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const ctx = await getOpsSessionContext();
  if (ctx.kind === "missing_env") {
    return <ConfigMissing />;
  }
  const weekStats = await fetchLast7dStats(ctx.supabase);
  return (
    <OpsShell profile={ctx.profile} userEmail={ctx.userEmail}>
      <OracleHomeMain weekStats={weekStats} />
    </OpsShell>
  );
}
