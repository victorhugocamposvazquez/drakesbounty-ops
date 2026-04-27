import { CasaListPage } from "@/components/ops/GenericDataTable";
import { ConfigMissing } from "@/components/ops/ConfigMissing";
import { OpsShell } from "@/components/ops/OpsShell";
import { listRecentClicks } from "@/lib/data/clicks-list";
import { getOpsSessionContext } from "@/lib/ops/session-context";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Clics — Drake's Bounty · Backoffice",
  robots: { index: false, follow: false, nocache: true },
};

export default async function ClicksPage() {
  const ctx = await getOpsSessionContext();
  if (ctx.kind === "missing_env") {
    return <ConfigMissing />;
  }
  const { rows, error } = await listRecentClicks(ctx.supabase, 50);
  return (
    <OpsShell profile={ctx.profile} userEmail={ctx.userEmail}>
      <CasaListPage
        description="Eventos de tracking (tabla `clicks`); se escriben desde enlaces y campañas en drakes-affiliate."
        error={error}
        pageLabel="Casa · Tráfico"
        pageTitle="Clics"
        rowCount={rows.length}
        rows={rows}
        subtitle="clicks"
      />
    </OpsShell>
  );
}
