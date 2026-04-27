"use client";

import Link from "next/link";

const nav = [
  {
    label: "· Inteligencia ·",
    items: [
      { href: "/", icon: "◉", title: "El Oráculo", count: "1.247", active: true },
      { href: "#", icon: "◬", title: "Watchlists", count: "8" },
      { href: "#", icon: "✦", title: "Señales en vivo", badge: "3", badgeAttention: true },
      { href: "#", icon: "⚑", title: "Fuentes", count: "22" },
    ],
  },
  {
    label: "· Comercial ·",
    items: [
      { href: "#", icon: "⚔", title: "Pipeline", count: "84" },
      { href: "#", icon: "✉", title: "Contactos", count: "312" },
      { href: "#", icon: "◈", title: "Negociaciones", count: "11" },
      { href: "#", icon: "⚖", title: "Contratos", count: "36" },
    ],
  },
  {
    label: "· Network ·",
    items: [
      { href: "#", icon: "★", title: "Operadores activos", count: "47" },
      { href: "#", icon: "§", title: "Creadores", count: "1.842" },
      { href: "#", icon: "⚖", title: "Disputas", badge: "2" },
    ],
  },
  {
    label: "· Interno ·",
    items: [
      { href: "#", icon: "⚙", title: "Ajustes del Oráculo" },
      { href: "#", icon: "◌", title: "Equipo" },
    ],
  },
] as const;

function initialsFromEmail(email: string) {
  const local = email.split("@")[0] ?? email;
  const parts = local.replace(/[^a-z0-9]/gi, " ").trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0]![0]! + parts[1]![0]!).toUpperCase();
  }
  return local.slice(0, 2).toUpperCase() || "?";
}

type Props = { userEmail: string };

export function OracleSidebar({ userEmail }: Props) {
  const displayName = userEmail.split("@")[0] ?? userEmail;
  return (
    <aside className="sidebar">
      <Link href="/" className="sidebar-brand">
        <svg className="seal" viewBox="0 0 46 46" aria-hidden>
          <circle
            cx="23"
            cy="23"
            r="18"
            fill="none"
            stroke="#1A130C"
            strokeWidth="1.2"
          />
          <path
            d="M13 22 Q13 18 15.5 17 L30.5 17 Q33 18 33 22 L33 22.5 L13 22.5 Z"
            fill="#1A130C"
          />
          <rect x="11" y="22.3" width="24" height="1.7" fill="#1A130C" />
          <rect x="13.5" y="19.8" width="19" height="0.8" fill="#A67C2E" />
          <path
            d="M19 29.5 Q21 30.5 23 30.5 Q25 30.5 27 29.5"
            stroke="#1A130C"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
        <div>
          <div className="wordmark">
            Drake<em>&apos;s</em>
          </div>
          <div className="tag">· Backoffice ·</div>
        </div>
      </Link>

      <div className="context-switch" role="group" aria-label="Vista">
        <button type="button" className="ctx-btn">
          Creador
        </button>
        <button type="button" className="ctx-btn active">
          Interno
        </button>
      </div>

      <nav className="sidebar-nav" aria-label="Secciones">
        {nav.map((group) => (
          <div className="nav-group" key={group.label}>
            <div className="nav-group-label">{group.label}</div>
            {group.items.map((item) => {
              const base = "nav-item";
              const isActive = "active" in item && item.active;
              const className = isActive ? `${base} active` : base;
              const inner = (
                <>
                  <span className="icon">{item.icon}</span>
                  {item.title}
                  {"count" in item && item.count ? (
                    <span className="count">{item.count}</span>
                  ) : null}
                  {"badge" in item && item.badge ? (
                    <span
                      className={
                        "badgeAttention" in item && item.badgeAttention
                          ? "nav-badge attention"
                          : "nav-badge"
                      }
                    >
                      {item.badge}
                    </span>
                  ) : null}
                </>
              );
              return item.href === "#" ? (
                <a
                  key={item.title}
                  href={item.href}
                  className={className}
                  onClick={(e) => e.preventDefault()}
                >
                  {inner}
                </a>
              ) : (
                <Link key={item.title} href={item.href} className={className}>
                  {inner}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="sidebar-user">
        <div className="user-avatar" aria-hidden>
          {initialsFromEmail(userEmail)}
        </div>
        <div className="user-info">
          <div className="user-name" title={userEmail}>
            {displayName}
          </div>
          <div className="user-role">Staff</div>
          <a className="sidebar-signout" href="/auth/signout">
            Cerrar sesión
          </a>
        </div>
      </div>
    </aside>
  );
}
