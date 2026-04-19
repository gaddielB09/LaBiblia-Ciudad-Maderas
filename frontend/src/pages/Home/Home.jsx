import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { sendChat } from "../../services/api";
import "../../css/Home/Home.css";

export default function Home({ theme, toggleTheme }) {
  const [query, setQuery] = useState("");
  const [aiResponse, setAiResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    if (e.key === "Enter" && query.trim() !== "") {
      setIsLoading(true);
      setAiResponse(null);

      try {
        const res = await sendChat(query);
        setAiResponse(res.data.reply);
      } catch (error) {
        console.error("Error consultando a Gemini:", error);
        setAiResponse(
          "Hubo un error al intentar comunicar con la IA. Por favor, intenta de nuevo.",
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="home">
      <header className="home__top-bar">
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

      <div className="home__center">
        <h1 className="home__title">
          <span className="home__title-la">La</span>
          <span className="home__title-biblia">Biblia</span>
        </h1>

        <div className="home__search-wrap">
          <span className="home__search-label">¿Qué quieres saber?</span>
          <input
            className="home__search-input"
            type="text"
            placeholder="Ej. ¿Donde se encuentran las oficinas?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearch}
            disabled={isLoading}
          />
        </div>
        {(isLoading || aiResponse) && (
          <div className="home__ai-container">
            {isLoading ? (
              <div className="home__ai-loading">
                <span className="spinner"></span>
                <p>Consultando a La Biblia...</p>
              </div>
            ) : (
              <div className="home__ai-reply">
                <ReactMarkdown>{aiResponse}</ReactMarkdown>
              </div>
            )}
          </div>
        )}
      </div>

      <footer className="home__footer">
        <span>¿No encuentras lo que buscas?</span>
        <a href="/solicitudes" className="home__footer-link">
          Solicítalo aquí
        </a>
      </footer>
    </div>
  );
}
