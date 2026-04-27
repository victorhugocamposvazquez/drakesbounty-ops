import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Tabla `payout_requests` (migración 0003 en drakes-affiliate, si está aplicada).
 * `select *` para tolerar evolución del esquema.
 */
export async function listRecentPayoutRequests(
  supabase: SupabaseClient,
  limit: number
): Promise<{ rows: Record<string, unknown>[]; error: string | null }> {
  const { data, error } = await supabase
    .from("payout_requests")
    .select("*")
    .order("id", { ascending: false })
    .limit(Math.min(Math.max(limit, 1), 200));

  if (error) {
    return { rows: [], error: error.message };
  }
  return { rows: (data ?? []) as Record<string, unknown>[], error: null };
}
