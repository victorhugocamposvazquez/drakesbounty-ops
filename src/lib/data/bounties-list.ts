import type { SupabaseClient } from "@supabase/supabase-js";

export async function listRecentBounties(
  supabase: SupabaseClient,
  limit: number
): Promise<{ rows: Record<string, unknown>[]; error: string | null }> {
  const { data, error } = await supabase
    .from("bounties")
    .select("*")
    .order("id", { ascending: false })
    .limit(Math.min(Math.max(limit, 1), 200));

  if (error) {
    return { rows: [], error: error.message };
  }
  return { rows: (data ?? []) as Record<string, unknown>[], error: null };
}
