/** Escapa un valor para una celda CSV (RFC 4180, Excel-friendly). */
export function csvCell(value: unknown): string {
  if (value === null || value === undefined) {
    return "";
  }
  const s =
    typeof value === "object" ? JSON.stringify(value) : String(value);
  if (/[",\n\r]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export function rowsToCsv(headers: string[], rows: Record<string, unknown>[]) {
  const head = headers.map((h) => csvCell(h)).join(",");
  const body = rows.map((row) => headers.map((h) => csvCell(row[h])).join(","));
  return [head, ...body].join("\r\n");
}
