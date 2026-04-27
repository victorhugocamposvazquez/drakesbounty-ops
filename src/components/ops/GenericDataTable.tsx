import { SearchIcon } from "./search-icon";

type Props = {
  error: string | null;
  rows: Record<string, unknown>[];
  tableNote?: string;
  emptyMessage?: string;
  /** claves a ocultar (UUIDs internos, etc.) */
  hideKeys?: string[];
};

function cellText(value: unknown): string {
  if (value === null || value === undefined) {
    return "—";
  }
  if (typeof value === "object") {
    return JSON.stringify(value);
  }
  return String(value);
}

function columnOrder(firstRow: Record<string, unknown>, hide: Set<string>) {
  const keys = Object.keys(firstRow).filter((k) => !hide.has(k));
  return keys.sort();
}

export function GenericDataTable({
  error,
  rows,
  tableNote = "Filas con la sesión actual. Si falla, revisa RLS en Supabase (migraciones en drakes-affiliate).",
  emptyMessage = "No hay filas o la tabla no es legible con esta sesión.",
  hideKeys = [],
}: Props) {
  const hide = new Set(hideKeys);
  const cols = rows[0] ? columnOrder(rows[0], hide) : [];

  return (
    <>
      {error ? (
        <p className="conversions-error" role="alert">
          No se pudo leer la tabla: {error}
          <br />
          <span className="conversions-hint">{tableNote}</span>
        </p>
      ) : null}

      {!error && rows.length === 0 ? (
        <p className="conversions-empty">{emptyMessage}</p>
      ) : null}

      {rows.length > 0 && cols.length > 0 ? (
        <div className="table-wrap">
          <table className="platforms-table conversions-table generic-data-table">
            <thead>
              <tr>
                {cols.map((c) => (
                  <th key={c}>
                    {c.replace(/_/g, " ")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={String((row as { id?: string }).id ?? i)}>
                  {cols.map((c) => (
                    <td
                      key={c}
                      className={
                        typeof row[c] === "string" && (row[c] as string).length > 32
                          ? "conv-cell-mono"
                          : undefined
                      }
                      title={cellText(row[c])}
                    >
                      {cellText(row[c]).length > 64
                        ? `${cellText(row[c]).slice(0, 64)}…`
                        : cellText(row[c])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </>
  );
}

type PageProps = {
  pageLabel: string;
  pageTitle: string;
  subtitle: string;
  rowCount: number;
  error: string | null;
  rows: Record<string, unknown>[];
  description?: string;
  hideKeys?: string[];
  emptyMessage?: string;
  searchDisabled?: boolean;
};

export function CasaListPage({
  pageLabel,
  pageTitle,
  subtitle,
  rowCount,
  error,
  rows,
  description,
  hideKeys,
  emptyMessage,
  searchDisabled = true,
}: PageProps) {
  return (
    <main className="main">
      <div className="topbar">
        <div className="topbar-title">
          <span className="page-label">{pageLabel}</span>
          <span className="page-title-topbar">{pageTitle}</span>
        </div>

        <div className="global-search">
          <SearchIcon />
          <input
            type="search"
            name="q"
            disabled={searchDisabled}
            readOnly
            placeholder="(búsqueda: siguiente iteración)"
            title="Búsqueda pendiente"
            aria-label="Búsqueda pendiente de implementar"
          />
          <span className="search-kbd">—</span>
        </div>

        <div className="topbar-actions">
          <span className="page-label" style={{ opacity: 0.7 }}>
            {subtitle} · {rowCount} mostradas
          </span>
        </div>
      </div>

      <div className="conversions-body">
        {description ? (
          <p className="casa-list-intro">{description}</p>
        ) : null}
        <GenericDataTable
          emptyMessage={emptyMessage}
          error={error}
          hideKeys={hideKeys}
          rows={rows}
        />
      </div>
    </main>
  );
}
