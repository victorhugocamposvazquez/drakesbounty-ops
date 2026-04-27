import type { ConversionListRow } from "@/lib/data/conversions";
import { SearchIcon } from "./search-icon";

function formatMoney(cents: number | null, currency: string | null) {
  if (cents == null) return "—";
  const v = cents / 100;
  return `${v.toFixed(2)} ${currency ?? ""}`.trim();
}

function shortId(uuid: string) {
  return uuid.replace(/-/g, "").slice(0, 8);
}

type Props = {
  rows: ConversionListRow[];
  error: string | null;
  emptyMessage?: string;
};

export function ConversionsMain({
  rows,
  error,
  emptyMessage = "No hay filas o RLS no permite leer `conversions`.",
}: Props) {
  return (
    <main className="main">
      <div className="topbar">
        <div className="topbar-title">
          <span className="page-label">Casa · Interno</span>
          <span className="page-title-topbar">Conversiones</span>
        </div>

        <div className="global-search">
          <SearchIcon />
          <input
            type="search"
            name="q"
            disabled
            readOnly
            placeholder="(búsqueda en siguientes iteraciones)"
            title="Búsqueda: pendiente de implementar"
            aria-label="Búsqueda: pendiente de implementar"
          />
          <span className="search-kbd">—</span>
        </div>

        <div className="topbar-actions">
          <span className="page-label" style={{ opacity: 0.6 }}>
            Postbacks · {rows.length} mostradas
          </span>
        </div>
      </div>

      <div className="conversions-body">
        {error ? (
          <p className="conversions-error" role="alert">
            No se pudo leer <code>conversions</code>: {error}
            <br />
            <span className="conversions-hint">
              Ajusta RLS o permisos en el proyecto Supabase (migraciones en
              drakes-affiliate).
            </span>
          </p>
        ) : null}

        {!error && rows.length === 0 ? (
          <p className="conversions-empty">{emptyMessage}</p>
        ) : null}

        {rows.length > 0 ? (
          <div className="table-wrap">
            <table className="platforms-table conversions-table">
              <thead>
                <tr>
                  <th>Cuándo</th>
                  <th>Evento</th>
                  <th>Comisión</th>
                  <th>Importe</th>
                  <th>Moneda</th>
                  <th>external_id</th>
                  <th>Operador</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id}>
                    <td className="conv-cell-nowrap">
                      {new Date(r.occurred_at).toLocaleString("es-ES", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </td>
                    <td>{r.event_type}</td>
                    <td>{formatMoney(r.commission_cents, r.currency)}</td>
                    <td>{formatMoney(r.amount_cents, r.currency)}</td>
                    <td>{r.currency ?? "—"}</td>
                    <td className="conv-cell-mono" title={r.external_id}>
                      {r.external_id.length > 24
                        ? `${r.external_id.slice(0, 24)}…`
                        : r.external_id}
                    </td>
                    <td
                      className="conv-cell-mono"
                      title={r.operator_id}
                    >{`…${shortId(r.operator_id)}`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </main>
  );
}
