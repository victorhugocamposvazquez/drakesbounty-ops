/**
 * Allowlist sencilla en servidor (Vercel) hasta que haya rol en `profiles` + RLS.
 * Si `OPS_STAFF_EMAILS` está vacío o no definido, acepta a cualquier usuario
 * autenticado (útil en desarrollo; en producción conviene rellenar la lista).
 */
export function isStaffEmail(email: string | undefined | null): boolean {
  if (!email) return false;
  const raw = process.env.OPS_STAFF_EMAILS;
  if (!raw?.trim()) return true;
  const allowed = new Set(
    raw
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean)
  );
  return allowed.has(email.toLowerCase());
}
