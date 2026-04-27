import { createClient } from "@supabase/supabase-js";

/**
 * Cliente con **service_role** — solo en Route Handlers / Server Actions / scripts
 * (imports CSV, tareas de staff). Nunca importes este módulo desde componentes cliente.
 */
export function createSupabaseServiceRoleClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY");
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
