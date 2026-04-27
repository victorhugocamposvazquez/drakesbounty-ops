import { ContactsGlyph } from "./ContactsGlyph";

function SearchIcon() {
  return (
    <svg
      className="search-icon"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <circle
        cx="7"
        cy="7"
        r="5"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <line
        x1="11"
        y1="11"
        x2="14"
        y2="14"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function OracleIcon() {
  return (
    <svg viewBox="0 0 52 52" aria-hidden>
      <defs>
        <radialGradient id="oracleEye" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#E8DCC0" />
          <stop offset="40%" stopColor="#A67C2E" />
          <stop offset="100%" stopColor="#4F1818" />
        </radialGradient>
      </defs>
      <circle cx="26" cy="26" r="24" fill="none" stroke="#1A130C" strokeWidth="1" />
      <circle
        cx="26"
        cy="26"
        r="19"
        fill="none"
        stroke="#1A130C"
        strokeWidth="0.5"
        opacity="0.5"
      />
      <g stroke="#762525" strokeWidth="0.8" opacity="0.7">
        <line x1="26" y1="4" x2="26" y2="10" />
        <line x1="26" y1="42" x2="26" y2="48" />
        <line x1="4" y1="26" x2="10" y2="26" />
        <line x1="42" y1="26" x2="48" y2="26" />
        <line x1="11" y1="11" x2="15" y2="15" opacity="0.4" />
        <line x1="37" y1="37" x2="41" y2="41" opacity="0.4" />
        <line x1="41" y1="11" x2="37" y2="15" opacity="0.4" />
        <line x1="11" y1="41" x2="15" y2="37" opacity="0.4" />
      </g>
      <ellipse
        cx="26"
        cy="26"
        rx="15"
        ry="9"
        fill="#E8DCC0"
        stroke="#1A130C"
        strokeWidth="1"
      />
      <circle
        cx="26"
        cy="26"
        r="7"
        fill="url(#oracleEye)"
        stroke="#4F1818"
        strokeWidth="0.5"
      />
      <circle cx="26" cy="26" r="3" fill="#1A130C" />
      <circle cx="27.5" cy="24.5" r="1" fill="#E8DCC0" />
    </svg>
  );
}

export function OracleHomeMain() {
  return (
    <main className="main">
      <div className="topbar">
        <div className="topbar-title">
          <span className="page-label">Folio XII · Interno</span>
          <span className="page-title-topbar">El Oráculo</span>
        </div>

        <div className="global-search">
          <SearchIcon />
          <input
            type="search"
            name="q"
            autoComplete="off"
            placeholder="Busca plataformas, marcas, dominios, licencias, contactos..."
          />
          <span className="search-kbd">⌘ K</span>
        </div>

        <div className="topbar-actions">
          <button type="button" className="topbar-btn">
            + Nueva fuente
          </button>
          <button type="button" className="topbar-btn primary">
            + Registrar plataforma
          </button>
        </div>
      </div>

      <div className="oracle-scanning">
        <span className="scanning-dot" />
        <span>Oráculo rastreando · 14 fuentes activas</span>
        <span className="scanning-meta">
          Última cosecha · hace <strong>6 min</strong> · 4 nuevas detectadas
        </span>
      </div>

      <div className="oracle-hero">
        <div className="oracle-insignia">
          <div className="oracle-icon-wrap">
            <OracleIcon />
          </div>
          <div className="oracle-insignia-text">
            <div className="oracle-name">
              El <em>Oráculo</em>
            </div>
            <div className="oracle-sub">
              Radar de plataformas · <strong>1.247</strong> vigiladas ·{" "}
              <strong>47</strong> esta semana
            </div>
          </div>
        </div>

        <div className="attention-bar">
          <div className="attention-left">
            <div className="attention-icon">!</div>
            <div className="attention-text">
              <strong>12 plataformas</strong> necesitan tu ojo — regulación
              dudosa, posibles duplicados u oportunidades top sin asignar.
            </div>
          </div>
          <button type="button" className="attention-btn">
            Revisar →
          </button>
        </div>

        <div className="oracle-stats">
          <div className="stat-mini">
            <div className="stat-mini-val">
              1<em>.247</em>
            </div>
            <div className="stat-mini-lbl">Vigiladas</div>
          </div>
          <div className="stat-mini">
            <div className="stat-mini-val">
              47<span className="delta">▲ 18</span>
            </div>
            <div className="stat-mini-lbl">Esta semana</div>
          </div>
          <div className="stat-mini">
            <div className="stat-mini-val">84</div>
            <div className="stat-mini-lbl">En pipeline</div>
          </div>
          <div className="stat-mini">
            <div className="stat-mini-val">47</div>
            <div className="stat-mini-lbl">Activadas</div>
          </div>
        </div>
      </div>

      <div className="filter-bar">
        <div className="filter-left">
          <span className="count-badge">
            <strong>1.247</strong> plataformas
          </span>

          <span className="filter-separator" />

          <button type="button" className="filter-chip active">
            Vertical <span className="chip-val">Casino, Trading +2</span>{" "}
            <span className="caret">▾</span>
          </button>
          <button type="button" className="filter-chip">
            Regulación <span className="caret">▾</span>
          </button>
          <button type="button" className="filter-chip active">
            Mercado <span className="chip-val">EU, LATAM</span>{" "}
            <span className="caret">▾</span>
          </button>
          <button type="button" className="filter-chip">
            Estado <span className="caret">▾</span>
          </button>
          <button type="button" className="filter-chip">
            Owner <span className="caret">▾</span>
          </button>
          <button type="button" className="filter-chip">
            Score <span className="caret">▾</span>
          </button>
          <button type="button" className="filter-chip">
            Descubierta <span className="caret">▾</span>
          </button>
          <button type="button" className="filter-chip">
            + Más filtros <span className="caret">▾</span>
          </button>

          <button type="button" className="filter-clear">
            Limpiar
          </button>
        </div>

        <div className="filter-right">
          <button type="button" className="topbar-btn">
            ☆ Guardar vista
          </button>

          <div className="view-switcher">
            <button type="button" className="view-btn active">
              ☰ Tabla
            </button>
            <button type="button" className="view-btn">
              ▦ Kanban
            </button>
            <button type="button" className="view-btn">
              ⌖ Mapa
            </button>
            <button type="button" className="view-btn">
              ◷ Timeline
            </button>
          </div>
        </div>
      </div>

      <div className="table-wrap">
        <table className="platforms-table">
          <thead>
            <tr>
              <th>
                Plataforma <span className="sort-ico">↕</span>
              </th>
              <th>Vertical</th>
              <th>Regulación</th>
              <th>Mercados</th>
              <th>
                Score <span className="sort-ico">↓</span>
              </th>
              <th>Estado</th>
              <th>Contactos</th>
              <th>Owner</th>
              <th>Última señal</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr className="attention-row">
              <td>
                <div className="platform-cell">
                  <div className="platform-favicon favicon-novaspin">Ns</div>
                  <div className="platform-body">
                    <div className="platform-name">
                      NovaSpin Casino
                      <span
                        className="new-dot"
                        title="Descubierta esta semana"
                      />
                    </div>
                    <div className="platform-domain">novaspin.io</div>
                    <div className="platform-parent">
                      grupo · <em>NovaSpin Gaming Ltd</em>
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <span className="vertical-tag cryptocasino">Crypto Casino</span>
              </td>
              <td>
                <div className="reg-status doubtful">
                  <span className="reg-dot" />
                  Dudosa
                </div>
                <div className="reg-license">Curaçao · sin verificar</div>
              </td>
              <td>
                <div className="markets-cell">
                  <span className="market-flag">🇪🇸</span>
                  <span className="market-flag">🇲🇽</span>
                  <span className="market-flag">🇧🇷</span>
                  <span className="market-flag">🇦🇷</span>
                  <span className="markets-more">+3</span>
                </div>
              </td>
              <td>
                <div className="score-block">
                  <div className="score-ring high">
                    <svg viewBox="0 0 36 36">
                      <circle className="bg" cx="18" cy="18" r="15" />
                      <circle
                        className="fg"
                        cx="18"
                        cy="18"
                        r="15"
                        strokeDasharray="94.2 94.2"
                        strokeDashoffset="15"
                      />
                    </svg>
                    <div className="score-ring-val">84</div>
                  </div>
                  <div className="score-bars">
                    <div className="score-bar-row">
                      <span className="score-bar-lbl">O</span>
                      <div className="score-bar">
                        <div
                          className="score-bar-fill opp"
                          style={{ width: "92%" }}
                        />
                      </div>
                    </div>
                    <div className="score-bar-row">
                      <span className="score-bar-lbl">C</span>
                      <div className="score-bar">
                        <div
                          className="score-bar-fill conf"
                          style={{ width: "88%" }}
                        />
                      </div>
                    </div>
                    <div className="score-bar-row">
                      <span className="score-bar-lbl">R</span>
                      <div className="score-bar">
                        <div
                          className="score-bar-fill reg"
                          style={{ width: "48%" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <span className="status-chip pending-contact">Pdte contactar</span>
              </td>
              <td>
                <span className="contacts-indicator">
                  <ContactsGlyph />2
                </span>
              </td>
              <td>
                <div className="owner-cell">
                  <div className="owner-avatar no">?</div>
                  <span className="owner-name unassigned">sin asignar</span>
                </div>
              </td>
              <td>
                <div className="activity-cell fresh">hace 2h</div>
              </td>
              <td>
                <div className="row-actions">
                  <button type="button" className="icon-btn star" title="Watchlist">
                    ☆
                  </button>
                  <button type="button" className="icon-btn" title="Asignarme">
                    ↴
                  </button>
                  <button type="button" className="icon-btn" title="Abrir">
                    →
                  </button>
                </div>
              </td>
            </tr>

            <tr>
              <td>
                <div className="platform-cell">
                  <div className="platform-favicon favicon-stake">S</div>
                  <div className="platform-body">
                    <div className="platform-name">Stake</div>
                    <div className="platform-domain">stake.com</div>
                    <div className="platform-parent">
                      grupo · <em>Sesame Ltd</em> · 4 marcas
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <span className="vertical-tag cryptocasino">Crypto Casino</span>
              </td>
              <td>
                <div className="reg-status licensed">
                  <span className="reg-dot" />
                  Regulada
                </div>
                <div className="reg-license">Curaçao GCB · 8048/JAZ</div>
              </td>
              <td>
                <div className="markets-cell">
                  <span className="market-flag">🌐</span>
                  <span className="markets-more">Global · 89 países</span>
                </div>
              </td>
              <td>
                <div className="score-block">
                  <div className="score-ring high">
                    <svg viewBox="0 0 36 36">
                      <circle className="bg" cx="18" cy="18" r="15" />
                      <circle
                        className="fg"
                        cx="18"
                        cy="18"
                        r="15"
                        strokeDasharray="94.2 94.2"
                        strokeDashoffset="8"
                      />
                    </svg>
                    <div className="score-ring-val">91</div>
                  </div>
                  <div className="score-bars">
                    <div className="score-bar-row">
                      <span className="score-bar-lbl">O</span>
                      <div className="score-bar">
                        <div
                          className="score-bar-fill opp"
                          style={{ width: "95%" }}
                        />
                      </div>
                    </div>
                    <div className="score-bar-row">
                      <span className="score-bar-lbl">C</span>
                      <div className="score-bar">
                        <div
                          className="score-bar-fill conf"
                          style={{ width: "100%" }}
                        />
                      </div>
                    </div>
                    <div className="score-bar-row">
                      <span className="score-bar-lbl">R</span>
                      <div className="score-bar">
                        <div
                          className="score-bar-fill reg"
                          style={{ width: "78%" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <span className="status-chip no-response">No responde</span>
              </td>
              <td>
                <span className="contacts-indicator">
                  <ContactsGlyph />6
                </span>
              </td>
              <td>
                <div className="owner-cell">
                  <div className="owner-avatar mc">MC</div>
                  <span className="owner-name">Marta C.</span>
                </div>
              </td>
              <td>
                <div className="activity-cell stale">hace 11 días</div>
              </td>
              <td>
                <div className="row-actions">
                  <button type="button" className="icon-btn star active" title="Watchlist">
                    ★
                  </button>
                  <button type="button" className="icon-btn" title="Contactar">
                    ✉
                  </button>
                  <button type="button" className="icon-btn" title="Abrir">
                    →
                  </button>
                </div>
              </td>
            </tr>

            <tr>
              <td>
                <div className="platform-cell">
                  <div className="platform-favicon favicon-bybit">By</div>
                  <div className="platform-body">
                    <div className="platform-name">Bybit</div>
                    <div className="platform-domain">bybit.com</div>
                    <div className="platform-parent">
                      grupo · <em>Bybit Fintech Ltd</em>
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <span className="vertical-tag exchange">Exchange</span>
              </td>
              <td>
                <div className="reg-status licensed">
                  <span className="reg-dot" />
                  Regulada
                </div>
                <div className="reg-license">VARA · Dubai</div>
              </td>
              <td>
                <div className="markets-cell">
                  <span className="market-flag">🌐</span>
                  <span className="markets-more">Global · 180+ países</span>
                </div>
              </td>
              <td>
                <div className="score-block">
                  <div className="score-ring high">
                    <svg viewBox="0 0 36 36">
                      <circle className="bg" cx="18" cy="18" r="15" />
                      <circle
                        className="fg"
                        cx="18"
                        cy="18"
                        r="15"
                        strokeDasharray="94.2 94.2"
                        strokeDashoffset="11"
                      />
                    </svg>
                    <div className="score-ring-val">88</div>
                  </div>
                  <div className="score-bars">
                    <div className="score-bar-row">
                      <span className="score-bar-lbl">O</span>
                      <div className="score-bar">
                        <div
                          className="score-bar-fill opp"
                          style={{ width: "88%" }}
                        />
                      </div>
                    </div>
                    <div className="score-bar-row">
                      <span className="score-bar-lbl">C</span>
                      <div className="score-bar">
                        <div
                          className="score-bar-fill conf"
                          style={{ width: "100%" }}
                        />
                      </div>
                    </div>
                    <div className="score-bar-row">
                      <span className="score-bar-lbl">R</span>
                      <div className="score-bar">
                        <div
                          className="score-bar-fill reg"
                          style={{ width: "82%" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <span className="status-chip meeting">Reunión · jue</span>
              </td>
              <td>
                <span className="contacts-indicator">
                  <ContactsGlyph />4
                </span>
              </td>
              <td>
                <div className="owner-cell">
                  <div className="owner-avatar jp">JP</div>
                  <span className="owner-name">Javier P.</span>
                </div>
              </td>
              <td>
                <div className="activity-cell fresh">hace 1 día</div>
              </td>
              <td>
                <div className="row-actions">
                  <button type="button" className="icon-btn star active" title="Watchlist">
                    ★
                  </button>
                  <button type="button" className="icon-btn" title="Contactar">
                    ✉
                  </button>
                  <button type="button" className="icon-btn" title="Abrir">
                    →
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <div className="footer-left">
          <span>
            Mostrando{" "}
            <strong style={{ color: "var(--ink)" }}>1 – 12</strong> de{" "}
            <strong style={{ color: "var(--ink)" }}>1.247</strong>
          </span>
          <span>·</span>
          <span>
            Ordenado por{" "}
            <strong style={{ color: "var(--oxblood)" }}>Score ↓</strong>
          </span>
        </div>

        <div className="page-nav">
          <button type="button" className="page-btn" disabled>
            ‹
          </button>
          <button type="button" className="page-btn active">
            1
          </button>
          <button type="button" className="page-btn">
            2
          </button>
          <button type="button" className="page-btn">
            3
          </button>
          <button type="button" className="page-btn">
            4
          </button>
          <span style={{ color: "var(--ink-faint)" }}>…</span>
          <button type="button" className="page-btn">
            104
          </button>
          <button type="button" className="page-btn">
            ›
          </button>
        </div>
      </div>
    </main>
  );
}
