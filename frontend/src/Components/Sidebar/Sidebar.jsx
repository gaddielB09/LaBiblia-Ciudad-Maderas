import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  MonitorPlay,
  Video,
  Image as ImageIcon,
  Camera,
  Star,
  PenTool,
  Calendar,
  Building,
  Megaphone,
  Scissors,
  Palette,
  Flame,
  ClipboardList,
  Bot,
  Search,
  Menu,
  X,
  Home,
  Settings,
} from "lucide-react";
import "../../css/Sidebar/Sidebar.css";
import sidebarBackground from "../../assets/sidebar-background.png";
import logo from "../../assets/logo_ciudad_maderas.png";

const NAV = [
  {
    label: "Inicio",
    key: "inicio",
    items: [{ icon: <Home size={18} />, label: "Inicio", slug: "/" }],
  },
  {
    label: "Contenido",
    key: "contenido",
    items: [
      {
        icon: <MonitorPlay size={18} />,
        label: "Presentaciones",
        slug: "s/presentaciones",
      },
      { icon: <Video size={18} />, label: "Videos", slug: "s/videos" },
      { icon: <ImageIcon size={18} />, label: "Flyers", slug: "s/flyers" },
      { icon: <Camera size={18} />, label: "Fotos", slug: "s/fotos" },
      {
        icon: <Star size={18} />,
        label: "Solicitudes especiales",
        slug: "s/solicitudes-especiales",
        accent: true,
      },
    ],
  },
  {
    label: "¡CREA! Laboratorio creativo",
    key: "crea",
    items: [
      { icon: <PenTool size={18} />, label: "Flyer", slug: "s/flyer-crea" },
      { icon: <Calendar size={18} />, label: "Evento", slug: "s/evento-crea" },
    ],
  },
  {
    label: "Universidad",
    key: "universidad",
    items: [
      {
        icon: <Building size={18} />,
        label: "Ciudad Maderas",
        slug: "s/ciudad-maderas",
        small: true,
      },
      {
        icon: <Star size={18} />,
        label: "Cursos",
        slug: null,
        children: [
          {
            icon: <Megaphone size={16} />,
            label: "Facebook Ads",
            slug: "s/facebook-ads",
          },
          { icon: <Scissors size={16} />, label: "CapCut", slug: "s/capcut" },
        ],
      },
    ],
  },
];

const BOTTOM = [
  { icon: <Palette size={18} />, label: "Studio", slug: "studio" },
  { icon: <Flame size={18} />, label: "Novedades", slug: "s/novedades" },
  {
    icon: <ClipboardList size={18} />,
    label: "Solicitudes e ideas",
    slug: "solicitudes",
  },
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
        style={{
          background: `linear-gradient(rgba(14, 14, 14, 0.85), rgba(14, 14, 14, 0.3)), url(${sidebarBackground}) center/cover no-repeat`,
        }}
      >
        <div className="sidebar__topbar">
          {/* <Link
            to="/"
            className="sidebar__icon-btn sidebar__icon-btn--accent"
            title="Buscar"
          >
            <Search size={20} />
          </Link> */}

          <img src={logo} alt="Ciudad Maderas" className="sidebar__logo" />

          <button
            className="sidebar__icon-btn sidebar__toggle"
            onClick={onToggle}
            title={open ? "Cerrar menú" : "Abrir menú"}
          >
            <Menu size={20} />
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
                        to={item.slug ? `${item.slug}` : "#"}
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
          <div className="sidebar__valeria-group">
            <span className="sidebar__valeria-group-label">Valeria</span>

            <Link
              to="/valeria"
              className="sidebar__valeria-btn"
              title={!open ? "Pregúntale a ValerIA" : ""}
            >
              <span className="sidebar__valeria-icon">
                <Bot size={20} />
              </span>
              <span className="sidebar__item-label sidebar__valeria-label">
                Pregúntale a ValerIA
              </span>
              {!open && <span className="sidebar__tooltip">ValerIA</span>}
            </Link>

            <Link
              to="/valeria-config"
              className="sidebar__item"
              title={!open ? "Configuración de ValerIA" : ""}
            >
              <span className="sidebar__item-icon">
                <Settings size={18} />
              </span>
              <span className="sidebar__item-label">
                Configuración de ValerIA
              </span>
              {!open && <span className="sidebar__tooltip">Configuración</span>}
            </Link>
          </div>

          {BOTTOM.map((item) => (
            <Link
              key={item.label}
              to={`/${item.slug}`}
              className={`sidebar__item ${location.pathname === "/" + item.slug ? "sidebar__item--active" : ""}`}
            >
              <span className="sidebar__item-icon">{item.icon}</span>
              <span className="sidebar__item-label">{item.label}</span>
              {!open && <span className="sidebar__tooltip">{item.label}</span>}
            </Link>
          ))}

          <Link
            to="/s/usuario"
            className="sidebar__user-profile"
            title={!open ? "Perfil" : ""}
          >
            <div className="sidebar__user-avatar">US</div>
            <div className="sidebar__user-info">
              <span className="sidebar__user-name">Usuario Maderas</span>
              <span className="sidebar__user-role">Creador</span>
            </div>
            {!open && <span className="sidebar__tooltip">Mi Perfil</span>}
          </Link>
        </div>
      </aside>
    </>
  );
}
