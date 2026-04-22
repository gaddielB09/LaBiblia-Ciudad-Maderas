import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar/Sidebar";
import InfoModal from "./Components/Modals/InfoModal";
import Home from "./pages/Home/Home";
import Solicitudes from "./pages/Requests/Requests";
import Section from "./pages/Section/Section";
import "./App.css";
import PageBuilder from "./Components/PageBuilder/PageBuilder";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("app-theme") || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("app-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const handleResize = () => setSidebarOpen(window.innerWidth > 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <BrowserRouter>
      <div className="app-layout">
        <header className="mobile-header">
          <button
            className="mobile-header__toggle"
            onClick={() => setSidebarOpen(true)}
            aria-label="Abrir menú"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          <h1 className="mobile-header__title">Ciudad Maderas</h1>
        </header>

        <Sidebar
          open={sidebarOpen}
          onToggle={() => setSidebarOpen((o) => !o)}
          theme={theme}
          toggleTheme={toggleTheme}
        />

        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={<Home theme={theme} toggleTheme={toggleTheme} />}
            />
            <Route
              path="/solicitudes"
              element={<Solicitudes theme={theme} toggleTheme={toggleTheme} />}
            />
            <Route
              path="/s/:slug"
              element={<Section theme={theme} toggleTheme={toggleTheme} />}
            />
            <Route path="/studio" element={<PageBuilder />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
