import { ConversionsMain } from "@/components/ops/ConversionsMain";
import { ConfigMissing } from "@/components/ops/ConfigMissing";
import { OpsShell } from "@/components/ops/OpsShell";
import { listRecentConversions } from "@/lib/data/conversions";
import { getOpsSessionContext } from "@/lib/ops/session-context";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Conversiones — Drake's Bounty · Backoffice",
  description: "Listado de conversiones (postbacks)",
  robots: { index: false, follow: false, nocache: true },
};

export default async function ConversionesPage() {
  const ctx = await getOpsSessionContext();
  if (ctx.kind === "missing_env") {
    return <ConfigMissing />;
  }
  const { rows, error } = await listRecentConversions(ctx.supabase, 50);
  return (
    <OpsShell profile={ctx.profile} userEmail={ctx.userEmail}>
      <ConversionsMain error={error} rows={rows} />
    </OpsShell>
  );
}
