import type { WeekStats } from "@/lib/data/stats";

type Props = { stats: WeekStats };

export function OracleStatsStrip({ stats }: Props) {
  const c = stats.conversions7d;
  const k = stats.clicks7d;
  return (
    <div className="home-stats-bar" aria-label="Pulso últimos 7 días (misma base Supabase)">
      <span className="home-stats-eyebrow">Últimos 7 días</span>
      <div className="oracle-stats home-stats-nums" style={{ borderLeft: "none", paddingLeft: 0 }}>
        <div className="stat-mini">
          <div className="stat-mini-val">{c != null ? c : "—"}</div>
          <div className="stat-mini-lbl">Conversiones</div>
        </div>
        <div className="stat-mini">
          <div className="stat-mini-val">{k != null ? k : "—"}</div>
          <div className="stat-mini-lbl">Clics (aprox.)</div>
        </div>
      </div>
      {stats.issues.length > 0 ? (
        <p className="home-stats-issues" role="status">
          {stats.issues.join(" · ")} — revisa RLS o nombres de columna.
        </p>
      ) : null}
    </div>
  );
}
