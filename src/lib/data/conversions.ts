import type { SupabaseClient } from "@supabase/supabase-js";

export type ConversionListRow = {
  id: string;
  operator_id: string;
  bounty_id: string | null;
  creator_id: string | null;
  event_type: string;
  amount_cents: number | null;
  commission_cents: number | null;
  currency: string | null;
  external_id: string;
  occurred_at: string;
};

export async function listRecentConversions(
  supabase: SupabaseClient,
  limit: number
): Promise<{ rows: ConversionListRow[]; error: string | null }> {
  const { data, error } = await supabase
    .from("conversions")
    .select(
      "id, operator_id, bounty_id, creator_id, event_type, amount_cents, commission_cents, currency, external_id, occurred_at"
    )
    .order("occurred_at", { ascending: false })
    .limit(Math.min(Math.max(limit, 1), 200));

  if (error) {
    return { rows: [], error: error.message };
  }
  if (!data?.length) {
    return { rows: [], error: null };
  }
  return { rows: data as ConversionListRow[], error: null };
}
