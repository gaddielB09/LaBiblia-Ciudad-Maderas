import { useState, useRef } from "react";
import { sendRequest } from "../../services/api";
import "../../css/Requests/Requests.css";

export default function Solicitudes({ theme, toggleTheme }) {
  const [expanded, setExpanded] = useState(false);
  const [sent, setSent] = useState(false);
  const [value, setValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textareaRef = useRef(null);

  const handleFocus = () => {
    setExpanded(true);
    setTimeout(() => textareaRef.current?.focus(), 50);
  };

  const handleSubmit = async () => {
    if (!value.trim()) return;

    setIsSubmitting(true);

    try {
      await sendRequest(value);

      setSent(true);
      setValue("");
      setTimeout(() => {
        setSent(false);
        setExpanded(false);
      }, 4000);
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      alert("Hubo un error al enviar tu solicitud. Inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Escape") {
      setExpanded(false);
      e.target.blur();
    }
  };

  return (
    <div className="solicitudes">
      <header className="solicitudes__top-bar">
        <button
          className="home__action-btn"
          onClick={toggleTheme}
          title={
            theme === "light" ? "Activar Modo Oscuro" : "Activar Modo Claro"
          }
        >
          {theme === "light" ? (
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
          ) : (
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
          )}
        </button>
      </header>

      <div
        className={`solicitudes__content ${expanded ? "solicitudes__content--expanded" : ""}`}
      >
        <h1 className="solicitudes__title">Solicitudes e ideas</h1>

        <div
          className={`solicitudes__card ${expanded ? "solicitudes__card--expanded" : ""}`}
        >
          {!expanded && (
            <div className="solicitudes-input" onClick={handleFocus}>
              <span className="solicitudes__placeholder">¿Qué necesitas?</span>
            </div>
          )}

          {expanded && !sent && (
            <div className="solicitudes__expanded">
              <textarea
                ref={textareaRef}
                className="solicitudes__textarea"
                placeholder="¿Qué necesitas?"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKey}
                disabled={isSubmitting}
              />
              <div className="solicitudes__actions">
                <button
                  className="solicitudes__submit"
                  onClick={handleSubmit}
                  disabled={!value.trim() || isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Enviar solicitud"}
                </button>
              </div>
            </div>
          )}

          {sent && (
            <div className="solicitudes__thanks">
              <div className="solicitudes__thanks-icon">✓</div>
              <p className="solicitudes__thanks-title">¡Muchas gracias!</p>
              <p className="solicitudes__thanks-sub">
                Tu solicitud fue enviada exitosamente. Pronto nos pondremos en
                contacto contigo.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
