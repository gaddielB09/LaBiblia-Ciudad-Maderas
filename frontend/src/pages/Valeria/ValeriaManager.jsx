import { useState, useEffect } from "react";
import { ArrowLeft, ChevronRight, Trash2, Edit3, X, Save, Plus } from "lucide-react";
import { getSections } from "../../services/api";
import axios from "axios";
import "../../css/Valeria/ValeriaManager.css";

const api = axios.create({ baseURL: "http://localhost:4000/api" });

export default function ValeriaManager({ onBack }) {
  const [parents, setParents] = useState([]);
  const [selectedParent, setSelectedParent] = useState(null);
  const [pages, setPages] = useState([]);
  const [loadingPages, setLoadingPages] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [editingPage, setEditingPage] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    getSections().then((res) => setParents(res.data));
  }, []);

  const loadPages = async (parent) => {
    setSelectedParent(parent);
    setLoadingPages(true);
    const res = await api.get(`/sections/content/${parent.id}`);
    setPages(res.data);
    setLoadingPages(false);
  };

  const handleDeletePage = async (pageId) => {
    await api.delete(`/sections/page/${pageId}`);
    setPages((prev) => prev.filter((p) => p._id !== pageId));
    setConfirmDelete(null);
  };

  const handleDeleteParent = async (parentId) => {
    await api.delete(`/sections/parent/${parentId}`);
    setParents((prev) => prev.filter((p) => p.id !== parentId));
    setSelectedParent(null);
    setConfirmDelete(null);
  };

  const handleSavePage = async () => {
    setIsSaving(true);
    
    try {
      let finalImageUrls = [...(editingPage.imageUrls || [])];

      if (editingPage.imageFiles && editingPage.imageFiles.length > 0) {
        const formData = new FormData();
        editingPage.imageFiles.forEach((file) => formData.append("images", file));

        const uploadRes = await fetch(
          "http://localhost:4000/api/ingest/upload-images",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!uploadRes.ok) throw new Error("Error subiendo las nuevas imágenes");
        const uploadData = await uploadRes.json();

        finalImageUrls = [...finalImageUrls, ...uploadData.urls];
      }

      await api.put(`/sections/page/${editingPage._id}`, {
        title: editingPage.title,
        content: editingPage.content,
        imageUrls: finalImageUrls,
      });

      const updatedPage = { ...editingPage, imageUrls: finalImageUrls };
      delete updatedPage.imageFiles;

      setPages((prev) =>
        prev.map((p) => (p._id === editingPage._id ? updatedPage : p))
      );
      
      setIsSaving(false);
      setEditingPage(null);
    } catch (error) {
      console.error("Error al guardar:", error);
      setIsSaving(false);
      alert("Hubo un error al guardar los cambios.");
    }
  };

  if (editingPage) {
    return (
      <div className="vmanager">
        <header className="vmanager__header">
          <button
            className="vmanager__back"
            onClick={() => setEditingPage(null)}
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="vmanager__title">
            Editando — Página {editingPage.pageNum}
          </h1>
        </header>
        <div className="vmanager__editor">
          <div className="review-box__group">
            <label className="review-box__label">Título</label>
            <input
              type="text"
              className="review-box__input"
              value={editingPage.title}
              onChange={(e) =>
                setEditingPage({ ...editingPage, title: e.target.value })
              }
            />
          </div>
          <div className="review-box__group">
            <label className="review-box__label">Contenido</label>
            <textarea
              className="review-box__textarea"
              value={editingPage.content}
              onChange={(e) =>
                setEditingPage({ ...editingPage, content: e.target.value })
              }
            />
          </div>

          <div className="review-box__group" style={{ marginTop: "15px" }}>
            <label className="review-box__label">Imágenes de la Página</label>
            
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                marginBottom: "15px",
              }}
            >
              {(editingPage.imageUrls || []).map((url, i) => {
                const imageUrl = url.startsWith("http")
                  ? url
                  : `http://localhost:4000${url}`;

                return (
                  <div
                    key={`url-${i}`}
                    style={{ position: "relative", width: "100px", height: "100px" }}
                  >
                    <img
                      src={imageUrl}
                      alt={`img-guardada-${i}`}
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
                        const updatedUrls = [...editingPage.imageUrls];
                        updatedUrls.splice(i, 1);
                        setEditingPage({ ...editingPage, imageUrls: updatedUrls });
                      }}
                      style={{
                        position: "absolute", top: "-6px", right: "-6px", background: "#e63b2e", color: "white", border: "none", borderRadius: "50%", width: "22px", height: "22px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px",
                      }}
                      title="Eliminar imagen guardada"
                    >
                      ×
                    </button>
                  </div>
                );
              })}

              {(editingPage.imageFiles || []).map((file, i) => (
                <div
                  key={`file-${i}`}
                  style={{ position: "relative", width: "100px", height: "100px" }}
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`img-nueva-${i}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "6px",
                      border: "1px dashed #007bff",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const updatedFiles = [...editingPage.imageFiles];
                      updatedFiles.splice(i, 1);
                      setEditingPage({ ...editingPage, imageFiles: updatedFiles });
                    }}
                    style={{
                      position: "absolute", top: "-6px", right: "-6px", background: "#e63b2e", color: "white", border: "none", borderRadius: "50%", width: "22px", height: "22px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px",
                    }}
                    title="Eliminar imagen nueva"
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
              id="upload-img-manager"
              onChange={(e) => {
                const files = Array.from(e.target.files);
                setEditingPage({
                  ...editingPage,
                  imageFiles: [...(editingPage.imageFiles || []), ...files],
                });
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
                marginBottom: "20px",
                display: "flex",
                alignItems: "center"
              }}
              onClick={() => document.getElementById("upload-img-manager").click()}
            >
              <Plus size={16} style={{ marginRight: "5px" }} />{" "}
              Agregar Nuevas Imágenes
            </button>
          </div>

          <button
            className="upload-box__submit-btn"
            disabled={isSaving}
            onClick={handleSavePage}
          >
            {isSaving ? (
              <>
                <span className="spinner spinner--btn" /> Guardando...
              </>
            ) : (
              <>
                <Save size={18} /> Guardar cambios
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="vmanager">
      <header className="vmanager__header">
        <button
          className="vmanager__back"
          onClick={selectedParent ? () => setSelectedParent(null) : onBack}
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="vmanager__title">
          {selectedParent
            ? selectedParent.parentSection
            : "Gestionar Secciones"}
        </h1>
        {selectedParent && (
          <button
            className="vmanager__delete-parent"
            onClick={() =>
              setConfirmDelete({ type: "parent", id: selectedParent.id })
            }
          >
            <Trash2 size={16} /> Eliminar sección completa
          </button>
        )}
      </header>

      {!selectedParent ? (
        <div className="vmanager__list">
          {parents.map((p) => (
            <button
              key={p.id}
              className="vmanager__item"
              onClick={() => loadPages(p)}
            >
              <span>{p.parentSection}</span>
              <ChevronRight size={16} />
            </button>
          ))}
        </div>
      ) : loadingPages ? (
        <div className="vmanager__loading">Cargando páginas...</div>
      ) : (
        <div className="vmanager__list">
          {pages.map((page) => (
            <div key={page._id} className="vmanager__item vmanager__item--page">
              <span className="vmanager__page-title">
                <span className="vmanager__page-num">p.{page.pageNum}</span>
                {page.title}
              </span>
              <div className="vmanager__actions">
                <button
                  className="vmanager__btn vmanager__btn--edit"
                  onClick={() => setEditingPage(page)}
                >
                  <Edit3 size={15} />
                </button>
                <button
                  className="vmanager__btn vmanager__btn--delete"
                  onClick={() =>
                    setConfirmDelete({ type: "page", id: page._id })
                  }
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {confirmDelete && (
        <div className="vmanager__overlay">
          <div className="vmanager__confirm">
            <h3>¿Confirmar eliminación?</h3>
            <p>
              {confirmDelete.type === "parent"
                ? "Se eliminarán todas las páginas de esta sección."
                : "Se eliminará esta página permanentemente."}
            </p>
            <div className="vmanager__confirm-btns">
              <button
                className="vmanager__confirm-cancel"
                onClick={() => setConfirmDelete(null)}
              >
                Cancelar
              </button>
              <button
                className="vmanager__confirm-delete"
                onClick={() =>
                  confirmDelete.type === "parent"
                    ? handleDeleteParent(confirmDelete.id)
                    : handleDeletePage(confirmDelete.id)
                }
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}