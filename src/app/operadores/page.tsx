import { CasaListPage } from "@/components/ops/GenericDataTable";
import { ConfigMissing } from "@/components/ops/ConfigMissing";
import { OpsShell } from "@/components/ops/OpsShell";
import { listRecentOperators } from "@/lib/data/operators-list";
import { getOpsSessionContext } from "@/lib/ops/session-context";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Operadores — Drake's Bounty · Backoffice",
  robots: { index: false, follow: false, nocache: true },
};

export default async function OperadoresPage() {
  const ctx = await getOpsSessionContext();
  if (ctx.kind === "missing_env") {
    return <ConfigMissing />;
  }
  const { rows, error } = await listRecentOperators(ctx.supabase, 50);
  return (
    <OpsShell profile={ctx.profile} userEmail={ctx.userEmail}>
      <CasaListPage
        description="Plataformas/operadores (`operators`). La lista depende de RLS: staff suele requerir una política explícita o lectura vía service role en jobs."
        error={error}
        pageLabel="Casa · Red"
        pageTitle="Operadores"
        rowCount={rows.length}
        rows={rows}
        subtitle="operators"
      />
    </OpsShell>
  );
}
