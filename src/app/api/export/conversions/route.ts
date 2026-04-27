import { isStaffEmail } from "@/lib/auth/staff";
import { rowsToCsv } from "@/lib/csv";
import { createSupabaseServiceRoleClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

const COLUMNS = [
  "id",
  "operator_id",
  "bounty_id",
  "creator_id",
  "event_type",
  "amount_cents",
  "commission_cents",
  "currency",
  "external_id",
  "occurred_at",
  "click_id",
] as const;

const MAX_EXPORT = 20_000;

/**
 * Descarga CSV de `conversions` con service_role (bypass RLS).
 * Requiere sesión de usuario en allowlist + `SUPABASE_SERVICE_ROLE_KEY` en el servidor.
 */
export async function GET() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email || !isStaffEmail(user.email)) {
    return new NextResponse("No autorizado", { status: 401 });
  }

  let admin: ReturnType<typeof createSupabaseServiceRoleClient>;
  try {
    admin = createSupabaseServiceRoleClient();
  } catch {
    return new NextResponse(
      "Falta SUPABASE_SERVICE_ROLE_KEY en el entorno (Vercel / .env.local).",
      { status: 503, headers: { "content-type": "text/plain; charset=utf-8" } }
    );
  }

  const { data, error } = await admin
    .from("conversions")
    .select(COLUMNS.join(", "))
    .order("occurred_at", { ascending: false })
    .limit(MAX_EXPORT);

  if (error) {
    return new NextResponse(
      `Error al leer conversions: ${error.message}`,
      { status: 500, headers: { "content-type": "text/plain; charset=utf-8" } }
    );
  }

  const rows = (data ?? []) as unknown as Record<string, unknown>[];
  const header = COLUMNS as unknown as string[];
  const csv = rowsToCsv(header, rows);
  const d = new Date();
  const stamp = d.toISOString().slice(0, 10);
  return new NextResponse(`\uFEFF${csv}`, {
    status: 200,
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="conversions-${stamp}.csv"`,
      "cache-control": "no-store",
    },
  });
}
