import { CasaListPage } from "@/components/ops/GenericDataTable";
import { ConfigMissing } from "@/components/ops/ConfigMissing";
import { OpsShell } from "@/components/ops/OpsShell";
import { listRecentCreators } from "@/lib/data/creators-list";
import { getOpsSessionContext } from "@/lib/ops/session-context";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Creadores — Drake's Bounty · Backoffice",
  robots: { index: false, follow: false, nocache: true },
};

export default async function CreadoresPage() {
  const ctx = await getOpsSessionContext();
  if (ctx.kind === "missing_env") {
    return <ConfigMissing />;
  }
  const { rows, error } = await listRecentCreators(ctx.supabase, 50);
  return (
    <OpsShell profile={ctx.profile} userEmail={ctx.userEmail}>
      <CasaListPage
        description="Creadores (`creators`); alineado con el esquema de drakes-affiliate."
        error={error}
        pageLabel="Casa · Red"
        pageTitle="Creadores"
        rowCount={rows.length}
        rows={rows}
        subtitle="creators"
      />
    </OpsShell>
  );
}
