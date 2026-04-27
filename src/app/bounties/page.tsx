import { CasaListPage } from "@/components/ops/GenericDataTable";
import { ConfigMissing } from "@/components/ops/ConfigMissing";
import { OpsShell } from "@/components/ops/OpsShell";
import { listRecentBounties } from "@/lib/data/bounties-list";
import { getOpsSessionContext } from "@/lib/ops/session-context";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Bounties — Drake's Bounty · Backoffice",
  robots: { index: false, follow: false, nocache: true },
};

export default async function BountiesPage() {
  const ctx = await getOpsSessionContext();
  if (ctx.kind === "missing_env") {
    return <ConfigMissing />;
  }
  const { rows, error } = await listRecentBounties(ctx.supabase, 50);
  return (
    <OpsShell profile={ctx.profile} userEmail={ctx.userEmail}>
      <CasaListPage
        description="Ofertas (`bounties`); alineado con el esquema de drakes-affiliate."
        error={error}
        pageLabel="Casa · Ofertas"
        pageTitle="Bounties"
        rowCount={rows.length}
        rows={rows}
        subtitle="bounties"
      />
    </OpsShell>
  );
}
