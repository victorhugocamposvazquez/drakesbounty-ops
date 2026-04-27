import type { SupabaseClient } from "@supabase/supabase-js";

export type WeekStats = {
  /** Conversiones con `occurred_at` en los últimos 7 días */
  conversions7d: number | null;
  /** Clics; prueba `created_at` luego `occurred_at` */
  clicks7d: number | null;
  issues: string[];
};

function daysAgoIso(days: number) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString();
}

/**
 * Conteos aproximados (RLS aplicable). Útil como pulso en el home; si falla, devuelve null.
 */
export async function fetchLast7dStats(
  supabase: SupabaseClient
): Promise<WeekStats> {
  const since = daysAgoIso(7);
  const issues: string[] = [];

  const c = await supabase
    .from("conversions")
    .select("id", { count: "exact", head: true })
    .gte("occurred_at", since);

  if (c.error) {
    issues.push(`conversions: ${c.error.message}`);
  }

  let cl = await supabase
    .from("clicks")
    .select("id", { count: "exact", head: true })
    .gte("created_at", since);

  if (cl.error) {
    cl = await supabase
      .from("clicks")
      .select("id", { count: "exact", head: true })
      .gte("occurred_at", since);
  }
  if (cl.error) {
    issues.push(`clicks: ${cl.error.message}`);
  }

  return {
    conversions7d: c.error ? null : (c.count ?? 0),
    clicks7d: cl.error ? null : (cl.count ?? 0),
    issues,
  };
}
