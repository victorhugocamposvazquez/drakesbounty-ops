import { CasaListPage } from "@/components/ops/GenericDataTable";
import { ConfigMissing } from "@/components/ops/ConfigMissing";
import { OpsShell } from "@/components/ops/OpsShell";
import { listRecentPayoutRequests } from "@/lib/data/payout-requests";
import { getOpsSessionContext } from "@/lib/ops/session-context";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Payouts — Drake's Bounty · Backoffice",
  robots: { index: false, follow: false, nocache: true },
};

export default async function PayoutsPage() {
  const ctx = await getOpsSessionContext();
  if (ctx.kind === "missing_env") {
    return <ConfigMissing />;
  }
  const { rows, error } = await listRecentPayoutRequests(ctx.supabase, 50);
  return (
    <OpsShell profile={ctx.profile} userEmail={ctx.userEmail}>
      <CasaListPage
        description="Solicitudes de cobro (tabla `payout_requests` si existe en tu proyecto; migración 0003 en el repo afiliado)."
        error={error}
        pageLabel="Casa · Finanzas"
        pageTitle="Payouts"
        rowCount={rows.length}
        rows={rows}
        subtitle="payout_requests"
      />
    </OpsShell>
  );
}
