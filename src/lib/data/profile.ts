import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Fila en `profiles` (esquema en drakes-affiliate). RLS debe permitir al usuario
 * leer su propia fila `id = auth.uid()`; si no, `error` será true.
 */
export type ProfileSnapshot = {
  role: string | null;
  /** true si PostgREST devolvió error (RLS, tabla, red) */
  error: boolean;
};

export async function fetchProfileForUser(
  supabase: SupabaseClient,
  userId: string
): Promise<ProfileSnapshot> {
  const { data, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    console.warn("[drakes-ops] profiles:", error.message);
    return { role: null, error: true };
  }

  const role = data && "role" in data && typeof data.role === "string" ? data.role : null;
  return { role, error: false };
}
