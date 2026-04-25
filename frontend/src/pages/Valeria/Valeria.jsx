import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import {
  sendChat,
  uploadPdf,
  saveSection,
  getSections,
} from "../../services/api";
import "../../css/Valeria/Valeria.css";
import remarkGfm from "remark-gfm";
import {
  FileText,
  Plus,
  ArrowLeft,
  UploadCloud,
  Save,
  Edit3,
  ChevronDown,
} from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function Valeria({ theme, toggleTheme, initialMode = "chat" }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [chatStarted, setChatStarted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const [isUploadMode, setIsUploadMode] = useState(
    searchParams.get("mode") === "upload",
  );
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({
    current: 0,
    total: 0,
  });

  const [reviewPage, setReviewPage] = useState(0);

  const [isReviewMode, setIsReviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [extractedData, setExtractedData] = useState([]);

  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const typingRef = useRef(null);
  const fileInputRef = useRef(null);

  const SECTIONS_PER_PAGE = 10;

  const start = reviewPage * SECTIONS_PER_PAGE;
  const visibleSections = extractedData.slice(start, start + SECTIONS_PER_PAGE);
  const totalPages = Math.ceil(extractedData.length / SECTIONS_PER_PAGE);

  const [availableSections, setAvailableSections] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const [activeAgent, setActiveAgent] = useState("valeria");
  const [showAgentMenu, setShowAgentMenu] = useState(false);

  useEffect(() => {
    if (isUploadMode) {
      const fetchSections = async () => {
        try {
          const res = await getSections();
          const uniqueSections = [
            ...new Set(res.data.map((s) => s.parentSection).filter(Boolean)),
          ];
          setAvailableSections(uniqueSections);
        } catch (error) {
          console.error("Error cargando secciones", error);
        }
      };
      fetchSections();
    }
  }, [isUploadMode]);

  const applySectionToAll = (sectionName) => {
    if (!sectionName) return;
    const updated = extractedData.map((sec) => ({
      ...sec,
      parentSection: sectionName,
    }));
    setExtractedData(updated);
  };

  useEffect(() => {
    if (chatStarted && inputRef.current && !isUploadMode && !isReviewMode) {
      inputRef.current.focus();
    }
  }, [chatStarted, isUploadMode, isReviewMode]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, displayedText]);

  const typeMessage = (text) => {
    const words = text.split(" ");
    let currentIndex = 0;
    setDisplayedText("");
    setIsTyping(true);

    const tick = () => {
      if (currentIndex < words.length) {
        const chunk = words.slice(0, currentIndex + 1).join(" ");
        setDisplayedText(chunk);
        currentIndex++;
        typingRef.current = setTimeout(tick, 40);
      } else {
        setIsTyping(false);
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            text,
            typing: false,
          };
          return updated;
        });
        setDisplayedText("");
      }
    };
    typingRef.current = setTimeout(tick, 40);
  };

  const handleSend = async () => {
    if (!query.trim() || isLoading || isTyping) return;
    const userMsg = query.trim();
    setQuery("");
    if (!chatStarted) setChatStarted(true);

    const historyToSend = messages
      .filter((m) => !m.loading && !m.typing)
      .map((m) => ({
        role: m.role === "ai" ? "assistant" : "user",
        content: m.text,
      }));

    setMessages((prev) => [
      ...prev,
      { role: "user", text: userMsg },
      { role: "ai", text: "", typing: true, loading: true, images: [] },
    ]);
    setIsLoading(true);

    try {
      const res = await sendChat(userMsg, activeAgent, historyToSend);
      const reply = res.data.reply;
      const images = res.data.images || [];
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          loading: false,
          typing: true,
          images,
        };
        return updated;
      });
      setIsLoading(false);
      typeMessage(reply);
    } catch {
      setIsLoading(false);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          text: "Hubo un error al conectar con el servidor. Intenta de nuevo.",
          loading: false,
          typing: false,
          images: [],
        };
        return updated;
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      alert("Por favor, selecciona un archivo PDF válido.");
    }
  };

  const handleUploadSubmit = async () => {
    if (!selectedFile) return;
    setIsUploading(true);
    setExtractedData([]);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const uploadRes = await fetch("http://localhost:4000/api/ingest/upload", {
        method: "POST",
        body: formData,
      });

      const reader = uploadRes.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n\n");
        buffer = lines.pop();

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const event = JSON.parse(line.replace("data: ", ""));

          if (event.type === "total") {
            setUploadProgress({ current: 0, total: event.total });
          }

          if (event.type === "section") {
            setExtractedData((prev) => [...prev, event.section]);
            setUploadProgress((prev) => ({
              ...prev,
              current: prev.current + 1,
            }));
          }

          if (event.type === "done") {
            setIsUploading(false);
            setReviewPage(0);
            setIsReviewMode(true);
          }

          if (event.type === "error") {
            throw new Error(event.message);
          }
        }
      }
    } catch (error) {
      console.error(error);
      setIsUploading(false);
      alert("Hubo un error al procesar el PDF.");
    }
  };

  const handleSaveSubmit = async () => {
    setIsSaving(true);
    try {
      const finalData = [...extractedData];

      for (let i = 0; i < finalData.length; i++) {
        const section = finalData[i];

        if (section.imageFiles && section.imageFiles.length > 0) {
          const formData = new FormData();
          section.imageFiles.forEach((file) => formData.append("images", file));

          const uploadRes = await fetch(
            "http://localhost:4000/api/ingest/upload-images",
            {
              method: "POST",
              body: formData,
            },
          );

          if (!uploadRes.ok) throw new Error("Error subiendo las imágenes");
          const uploadData = await uploadRes.json();

          section.imageUrls = [
            ...(section.imageUrls || []),
            ...uploadData.urls,
          ];
          delete section.imageFiles;
        }
      }

      await saveSection({ sections: finalData });

      alert(
        "¡Documento e imágenes guardados exitosamente! Valeria ya puede leerlo.",
      );
      setIsSaving(false);
      setIsReviewMode(false);
      setIsUploadMode(false);
      setSelectedFile(null);
      setExtractedData([]);
    } catch (error) {
      console.error(error);
      setIsSaving(false);
      alert(
        error.response?.data?.error ||
          error.message ||
          "Error al guardar en la base de datos.",
      );
    }
  };

  return (
    <div
      className={`valeria ${chatStarted || isUploadMode || isReviewMode ? "valeria--chat" : ""}`}
    >
      <header className="valeria__top-bar">
        <div className="valeria__logo-wrap">
          <h1 className="valeria__title">
            <span className="valeria__title-main">
              {isUploadMode || isReviewMode ? "ValerIA" : "ValerIA"}
            </span>
          </h1>
        </div>

        {(isUploadMode || isReviewMode) && (
          <button
            className="valeria__action-btn"
            onClick={() => navigate("/valeria-config")}
            title="Volver a la Configuración"
          >
            <ArrowLeft size={18} />
            <span style={{ marginLeft: "6px", fontFamily: "inherit" }}>
              Volver a Configuración
            </span>
          </button>
        )}
      </header>

      {isUploadMode || isReviewMode ? (
        <div className="valeria__upload-view">
          <div
            className="upload-box"
            style={{ maxWidth: isReviewMode ? "800px" : "500px" }}
          >
            {!isReviewMode ? (
              <>
                <div className="upload-box__header">
                  <h2>Alimentar a Valeria</h2>
                  <p>Sube un documento PDF para extraer su información.</p>
                </div>

                <div
                  className={`upload-box__dropzone ${selectedFile ? "upload-box__dropzone--active" : ""}`}
                  onClick={() => fileInputRef.current.click()}
                >
                  <input
                    type="file"
                    accept="application/pdf"
                    className="upload-box__input"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                  {selectedFile ? (
                    <>
                      <FileText
                        size={48}
                        className="upload-box__icon upload-box__icon--pdf"
                      />
                      <span className="upload-box__filename">
                        {selectedFile.name}
                      </span>
                      <span className="upload-box__filesize">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </>
                  ) : (
                    <>
                      <UploadCloud size={48} className="upload-box__icon" />
                      <span className="upload-box__prompt">
                        Haz clic para seleccionar un archivo PDF
                      </span>
                      <span className="upload-box__limit">
                        Tamaño máximo recomendado: 10MB
                      </span>
                    </>
                  )}
                </div>

                <button
                  className="upload-box__submit-btn"
                  disabled={!selectedFile || isUploading}
                  onClick={handleUploadSubmit}
                >
                  {isUploading ? (
                    <>
                      <span className="spinner spinner--btn" />
                      {uploadProgress.total > 0
                        ? `Procesando... ${uploadProgress.current}/${uploadProgress.total}`
                        : "Procesando..."}
                    </>
                  ) : (
                    "Extraer Texto del PDF"
                  )}
                </button>
              </>
            ) : (
              <div className="review-box">
                <div className="upload-box__header">
                  <h2>
                    <Edit3
                      size={24}
                      style={{ display: "inline", marginBottom: "-4px" }}
                    />{" "}
                    Revisión de Contenido
                  </h2>
                  <p>
                    Edita el título o el contenido de cada sección antes de
                    guardar.
                  </p>
                </div>

                {visibleSections.map((sec, index) => {
                  const realIndex = start + index;

                  const filteredOptions = availableSections.filter((s) =>
                    s
                      .toLowerCase()
                      .includes((sec.parentSection || "").toLowerCase()),
                  );

                  return (
                    <div key={realIndex} className="review-box__section">
                      <div className="review-box__section-header">
                        <span className="review-box__section-num">
                          Página {sec.pageNum}
                        </span>
                        <button
                          className="review-box__delete-btn"
                          onClick={() => {
                            const updated = extractedData.filter(
                              (_, i) => i !== realIndex,
                            );
                            setExtractedData(updated);
                            if (start >= updated.length && reviewPage > 0) {
                              setReviewPage((p) => p - 1);
                            }
                          }}
                          title="Eliminar esta sección"
                        >
                          Eliminar página
                        </button>
                      </div>
                      <div className="review-box__group">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-end",
                            marginBottom: "8px",
                          }}
                        >
                          <label
                            className="review-box__label"
                            style={{ marginBottom: 0 }}
                          >
                            Pertenece a la Sección:
                          </label>
                          <button
                            type="button"
                            style={{
                              fontSize: "11px",
                              cursor: "pointer",
                              background: "none",
                              border: "none",
                              color: "var(--text-muted)",
                              textDecoration: "underline",
                            }}
                            onClick={() => applySectionToAll(sec.parentSection)}
                          >
                            Aplicar a todas las páginas
                          </button>
                        </div>

                        <div className="custom-dropdown-container">
                          <input
                            type="text"
                            placeholder="Ej: Reglamento Interno..."
                            className="review-box__input custom-dropdown-input"
                            style={{
                              borderColor: !sec.parentSection ? "#e63b2e" : "",
                            }}
                            value={sec.parentSection || ""}
                            onFocus={() => setActiveDropdown(realIndex)}
                            onBlur={() => setActiveDropdown(null)}
                            onChange={(e) => {
                              const updated = [...extractedData];
                              updated[realIndex] = {
                                ...updated[realIndex],
                                parentSection: e.target.value,
                              };
                              setExtractedData(updated);
                            }}
                          />

                          <div className="custom-dropdown-icon">
                            <ChevronDown size={18} />
                          </div>

                          {activeDropdown === realIndex && (
                            <ul
                              className="custom-dropdown-list"
                              onMouseDown={(e) => e.preventDefault()}
                            >
                              {filteredOptions.length > 0 ? (
                                filteredOptions.map((opcion, i) => (
                                  <li
                                    key={i}
                                    className="custom-dropdown-item"
                                    onClick={() => {
                                      const updated = [...extractedData];
                                      updated[realIndex] = {
                                        ...updated[realIndex],
                                        parentSection: opcion,
                                      };
                                      setExtractedData(updated);
                                      setActiveDropdown(null);
                                    }}
                                  >
                                    {opcion}
                                  </li>
                                ))
                              ) : (
                                <li className="custom-dropdown-item custom-dropdown-item--empty">
                                  Crear nueva sección: "{sec.parentSection}"
                                </li>
                              )}
                            </ul>
                          )}
                        </div>
                      </div>

                      <div className="review-box__group">
                        <label className="review-box__label">
                          Título de la Página {sec.pageNum}
                        </label>
                        <input
                          type="text"
                          className="review-box__input"
                          value={sec.title}
                          onChange={(e) => {
                            const updated = [...extractedData];
                            updated[realIndex] = {
                              ...updated[realIndex],
                              title: e.target.value,
                            };
                            setExtractedData(updated);
                          }}
                        />
                      </div>

                      <div className="review-box__group">
                        <label className="review-box__label">
                          Contenido Extraído
                        </label>
                        <textarea
                          className="review-box__textarea"
                          value={sec.content}
                          onChange={(e) => {
                            const updated = [...extractedData];
                            updated[realIndex] = {
                              ...updated[realIndex],
                              content: e.target.value,
                            };
                            setExtractedData(updated);
                          }}
                        />
                      </div>
                      <div
                        className="review-box__group"
                        style={{ marginTop: "15px" }}
                      >
                        <label className="review-box__label">
                          Imágenes Adjuntas
                        </label>

                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "10px",
                            marginBottom: "10px",
                          }}
                        >
                          {(sec.imageFiles || []).map((file, idx) => (
                            <div
                              key={idx}
                              style={{
                                position: "relative",
                                width: "100px",
                                height: "100px",
                              }}
                            >
                              <img
                                src={URL.createObjectURL(file)}
                                alt={`preview-${idx}`}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                  borderRadius: "6px",
                                  border: "1px solid #ccc",
                                }}
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = [...extractedData];
                                  updated[realIndex].imageFiles.splice(idx, 1);
                                  setExtractedData(updated);
                                }}
                                style={{
                                  position: "absolute",
                                  top: "-6px",
                                  right: "-6px",
                                  background: "#e63b2e",
                                  color: "white",
                                  border: "none",
                                  borderRadius: "50%",
                                  width: "22px",
                                  height: "22px",
                                  cursor: "pointer",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: "14px",
                                }}
                                title="Eliminar imagen"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>

                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          style={{ display: "none" }}
                          id={`upload-img-${realIndex}`}
                          onChange={(e) => {
                            const files = Array.from(e.target.files);
                            const updated = [...extractedData];
                            updated[realIndex] = {
                              ...updated[realIndex],
                              imageFiles: [
                                ...(updated[realIndex].imageFiles || []),
                                ...files,
                              ],
                            };
                            setExtractedData(updated);
                            e.target.value = null;
                          }}
                        />
                        <button
                          type="button"
                          className="valeria__action-btn"
                          style={{
                            border: "1px dashed var(--border-color)",
                            width: "100%",
                            padding: "10px",
                            justifyContent: "center",
                          }}
                          onClick={() =>
                            document
                              .getElementById(`upload-img-${realIndex}`)
                              .click()
                          }
                        >
                          <Plus size={16} style={{ marginRight: "5px" }} />{" "}
                          Agregar Imágenes a la Página {sec.pageNum}
                        </button>
                      </div>
                    </div>
                  );
                })}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    margin: "20px 0",
                  }}
                >
                  <button
                    className="valeria__action-btn"
                    disabled={reviewPage === 0}
                    onClick={() => setReviewPage((p) => p - 1)}
                  >
                    Anterior
                  </button>
                  <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
                    {reviewPage + 1} / {totalPages} — {extractedData.length}{" "}
                    secciones
                  </span>
                  <button
                    className="valeria__action-btn"
                    disabled={reviewPage >= totalPages - 1}
                    onClick={() => setReviewPage((p) => p + 1)}
                  >
                    Siguiente
                  </button>
                </div>

                <button
                  className="upload-box__submit-btn"
                  disabled={isSaving}
                  onClick={handleSaveSubmit}
                >
                  {isSaving ? (
                    <>
                      <span className="spinner spinner--btn" /> Guardando...
                    </>
                  ) : (
                    <>
                      <Save size={18} /> Confirmar y Guardar
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="valeria__logo-wrap">
            <h1 className="valeria__title">
              <span className="valeria__title"></span>
            </h1>
          </div>

          {chatStarted && (
            <div className="valeria__messages">
              {messages.map((msg, i) => {
                const isLast = i === messages.length - 1;

                if (msg.role === "user") {
                  return (
                    <div key={i} className="message message--user">
                      <p>{msg.text}</p>
                    </div>
                  );
                }

                return (
                  <div key={i} className="message message--ai">
                    <div className="message__avatar">
                      {msg.loading ? (
                        <span className="spinner spinner--avatar" />
                      ) : (
                        <span className="message__avatar-icon">V</span>
                      )}
                    </div>
                    <div className="message__body">
                      {msg.loading ? (
                        <span className="message__preparing">
                          Preparando Respuesta
                        </span>
                      ) : isLast && isTyping ? (
                        <div className="message__text">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {displayedText}
                          </ReactMarkdown>
                          <span className="message__cursor" />
                        </div>
                      ) : (
                        <div className="message__text">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {msg.text}
                          </ReactMarkdown>
                          {msg.images && msg.images.length > 0 && (
                            <div className="message__images">
                              {msg.images.map((url, imgIndex) => {
                                const imageUrl = url.startsWith("http")
                                  ? url
                                  : `http://localhost:4000${url}`;

                                return (
                                  <img
                                    key={imgIndex}
                                    src={imageUrl}
                                    alt={`Imagen adjunta ${imgIndex + 1}`}
                                    className="message__image"
                                    style={{
                                      maxWidth: "100%",
                                      borderRadius: "8px",
                                      marginTop: "10px",
                                    }}
                                  />
                                );
                              })}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          )}

          <div className="valeria__input-area">
            {!chatStarted && (
              <p className="valeria__input-hint">¿Qué quieres saber?</p>
            )}

            <div
              className={`valeria__search-wrap valeria__search-wrap--${activeAgent}`}
            >
              <div className="agent-selector">
                <button
                  className={`agent-btn agent-btn--${activeAgent}`}
                  onClick={() => setShowAgentMenu(!showAgentMenu)}
                  title="Cambiar de Agente"
                >
                  {activeAgent === "valeria" ? "🟣 Valeria" : "🟢 Pacolli"}
                  <ChevronDown size={14} style={{ marginLeft: "4px" }} />
                </button>

                {showAgentMenu && (
                  <div className="agent-menu">
                    <div className="agent-menu__header">Tus Agentes</div>
                    <button
                      onClick={() => {
                        setActiveAgent("valeria");
                        setShowAgentMenu(false);
                      }}
                      className={activeAgent === "valeria" ? "active" : ""}
                    >
                      🟣 Valeria
                    </button>

                    <div
                      className="agent-menu__header"
                      style={{ marginTop: "8px" }}
                    >
                      Próximamente
                    </div>
                    <button disabled className="agent-menu__soon">
                      🟢 Pacolli
                    </button>
                    <button disabled className="agent-menu__soon">
                      + Más personalidades
                    </button>
                  </div>
                )}
              </div>

              <input
                ref={inputRef}
                className="valeria__search-input"
                type="text"
                placeholder={
                  activeAgent === "valeria"
                    ? "Pregúntale a Valeria..."
                    : "Escribe tu pregunta..."
                }
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading || isTyping}
                onFocus={() => setShowAgentMenu(false)}
              />
              <button
                className={`valeria__send-btn valeria__send-btn--${activeAgent}`}
                onClick={handleSend}
                disabled={isLoading || isTyping || !query.trim()}
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
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>

            {/* <button
              className="upload__pdf-button"
              onClick={() => setIsUploadMode(true)}
            >
              <Plus size={18} />
              <span className="upload__pdf-text">Alimentar a Valeria</span>
            </button> */}

            {chatStarted && (
              <p className="valeria__disclaimer">
                ValerIA puede cometer errores. Verifica la información
                importante.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
