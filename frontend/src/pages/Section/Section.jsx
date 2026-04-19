import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { getSection } from "../../services/api";
import "../../css/Section/Section.css";

export default function Section({ theme, toggleTheme }) {
  const { slug } = useParams();
  const [section, setSection] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getSection(slug)
      .then((r) => setSection(r.data))
      .catch(() => setSection(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="section-page section-page--loading">
        <div className="section-page__spinner"></div>
        <p>Cargando información...</p>
      </div>
    );
  }

  if (!section) {
    return (
      <div className="section-page section-page--empty">
        <div className="section-page__empty-icon">📄</div>
        <h2>Sección no encontrada</h2>
        <p>El documento que buscas no está disponible en este momento.</p>
      </div>
    );
  }

  return (
    <div className="section-page">
      <div className="section-page__content">
      <button
        className="section-page__theme-btn"
        onClick={toggleTheme}
        title={theme === "light" ? "Activar Modo Oscuro" : "Activar Modo Claro"}
      >
        {theme === "light" ? (
          <>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </>
        ) : (
          <>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          </>
        )}
      </button>
        <header className="section-page__header">
          <h1 className="section-page__title">{section.title}</h1>
        </header>

        <div className="section-page__body">
          <ReactMarkdown>{section.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
