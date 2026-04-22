import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../css/Sidebar/Sidebar.css";

const NAV = [
  {
    label: "Contenido",
    key: "contenido",
    items: [
      { icon: "▬", label: "Presentaciones", slug: "s/presentaciones" },
      { icon: "▶", label: "Videos", slug: "s/videos" },
      { icon: "▬", label: "Flyers", slug: "s/flyers" },
      { icon: "⊞", label: "Fotos", slug: "s/fotos" },
      {
        icon: "★",
        label: "Solicitudes especiales",
        slug: "s/solicitudes-especiales",
        accent: true,
      },
    ],
  },
  {
    label: "¡CREA!: Laboratorio creativo",
    key: "crea",
    items: [
      { icon: "🖼", label: "Flyer", slug: "s/flyer-crea" },
      { icon: "🎉", label: "Evento", slug: "s/evento-crea" },
    ],
  },
  {
    label: "Universidad",
    key: "universidad",
    items: [
      {
        icon: "CM",
        label: "Ciudad Maderas",
        slug: "s/ciudad-maderas",
        small: true,
      },
      {
        icon: "✦",
        label: "Cursos",
        slug: null,
        children: [
          { icon: "ⓘ", label: "Facebook Ads", slug: "s/facebook-ads" },
          { icon: "✂", label: "CapCut", slug: "s/capcut" },
        ],
      },
    ],
  },
  { label: "La biblia", key: "labiblia", items: [] },
];

const BOTTOM = [
  { icon: "🎨", label: "Studio", slug: "s/studio" },
  { icon: "🔥", label: "Novedades", slug: "s/novedades" },
  { icon: "📋", label: "Solicitudes e ideas", slug: "solicitudes" },
  { icon: "👤", label: "Nombre de usuario", slug: "s/usuario" },
];

export default function Sidebar({ open, onToggle }) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState({});

  const toggle = (key) => setCollapsed((c) => ({ ...c, [key]: !c[key] }));

  return (
    <>
      <div
        className={`sidebar-overlay ${open ? "sidebar-overlay--visible" : ""}`}
        onClick={onToggle}
      />
      <aside
        className={`sidebar ${open ? "sidebar--open" : "sidebar--closed"}`}
      >
        <div className="sidebar__topbar">
          <Link
            to="/"
            className="sidebar__icon-btn sidebar__icon-btn--accent"
            title="Buscar"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="22" y2="22" />
            </svg>
          </Link>

          <button
            className="sidebar__icon-btn sidebar__toggle"
            onClick={onToggle}
            title={open ? "Cerrar menú" : "Abrir menú"}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {open ? (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>

        <nav className="sidebar__nav">
          {NAV.map((group) => (
            <div key={group.key} className="sidebar__group">
              <button
                className="sidebar__group-label"
                onClick={() => group.items.length && toggle(group.key)}
                title={!open ? group.label : ""}
              >
                <span className="sidebar__group-label-text">{group.label}</span>
                {group.items.length > 0 && (
                  <svg
                    className={`sidebar__chevron ${collapsed[group.key] ? "sidebar__chevron--down" : ""}`}
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                )}
              </button>

              <div
                className={`sidebar__items ${collapsed[group.key] ? "sidebar__items--hidden" : ""}`}
              >
                {group.items.map((item) => (
                  <div key={item.label}>
                    {item.children ? (
                      <>
                        <button
                          className="sidebar__item"
                          onClick={() => toggle(item.label)}
                          title={!open ? item.label : ""}
                        >
                          <span
                            className={`sidebar__item-icon ${item.small ? "sidebar__item-icon--small" : ""}`}
                          >
                            {item.icon}
                          </span>
                          <span className="sidebar__item-label">
                            {item.label}
                          </span>
                          <svg
                            className={`sidebar__chevron sidebar__chevron--sm ${collapsed[item.label] ? "sidebar__chevron--down" : ""}`}
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                          >
                            <polyline points="18 15 12 9 6 15" />
                          </svg>
                        </button>
                        <div
                          className={`sidebar__items sidebar__items--nested ${collapsed[item.label] ? "sidebar__items--hidden" : ""}`}
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              to={`/${child.slug}`}
                              className={`sidebar__item sidebar__item--nested ${location.pathname === "/" + child.slug ? "sidebar__item--active" : ""}`}
                              title={!open ? child.label : ""}
                            >
                              <span className="sidebar__item-icon">
                                {child.icon}
                              </span>
                              <span className="sidebar__item-label">
                                {child.label}
                              </span>
                              {!open && (
                                <span className="sidebar__tooltip">
                                  {child.label}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </>
                    ) : (
                      <Link
                        to={item.slug ? `/${item.slug}` : "#"}
                        className={`sidebar__item ${item.accent ? "sidebar__item--accent" : ""} ${location.pathname === "/" + item.slug ? "sidebar__item--active" : ""}`}
                        title={!open ? item.label : ""}
                      >
                        <span className="sidebar__item-icon">{item.icon}</span>
                        <span className="sidebar__item-label">
                          {item.label}
                        </span>
                        {!open && (
                          <span className="sidebar__tooltip">{item.label}</span>
                        )}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="sidebar__bottom">
          <Link
            to="/studio"
            className="sidebar__icon-btn sidebar__icon-btn--accent"
            title="Page Builder"
          >Ciudad Maderas Studio</Link>
          {BOTTOM.map((item) => (
            <Link
              key={item.label}
              to={`/${item.slug}`}
              className={`sidebar__item ${location.pathname === "/" + item.slug ? "sidebar__item--active" : ""}`}
              title={!open ? item.label : ""}
            >
              <span className="sidebar__item-icon">{item.icon}</span>
              <span className="sidebar__item-label">{item.label}</span>
              {!open && <span className="sidebar__tooltip">{item.label}</span>}
            </Link>
          ))}
        </div>
      </aside>
    </>
  );
}
