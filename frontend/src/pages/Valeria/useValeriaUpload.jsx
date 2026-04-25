import { useState, useRef, useEffect } from "react";
import { getSections, saveSection } from "../../services/api";

const API_BASE =
  import.meta.env.VITE_API_URL?.replace("/api", "") || "http://localhost:4000";
const SECTIONS_PER_PAGE = 10;

export function useValeriaUpload({ addToast }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({
    current: 0,
    total: 0,
  });
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [extractedData, setExtractedData] = useState([]);
  const [reviewPage, setReviewPage] = useState(0);
  const [availableSections, setAvailableSections] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const fileInputRef = useRef(null);

  const start = reviewPage * SECTIONS_PER_PAGE;
  const visibleSections = extractedData.slice(start, start + SECTIONS_PER_PAGE);
  const totalPages = Math.ceil(extractedData.length / SECTIONS_PER_PAGE);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const res = await getSections();
        const uniqueSections = [
          ...new Set(res.data.map((s) => s.parentSection).filter(Boolean)),
        ];
        setAvailableSections(uniqueSections);
      } catch {
        // empty
      }
    };
    fetchSections();
  }, []);

  const applySectionToAll = (sectionName) => {
    if (!sectionName) return;
    setExtractedData((prev) =>
      prev.map((sec) => ({ ...sec, parentSection: sectionName })),
    );
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      addToast("Por favor, selecciona un archivo PDF válido.", "error");
    }
  };

  const handleUploadSubmit = async () => {
    if (!selectedFile) return;
    setIsUploading(true);
    setExtractedData([]);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const uploadRes = await fetch(`${API_BASE}/api/ingest/upload`, {
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
      addToast("Hubo un error al procesar el PDF.", "error");
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
            `${API_BASE}/api/ingest/upload-images`,
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

      addToast(
        "¡Documento guardado exitosamente! Valeria ya puede leerlo.",
        "success",
      );
      setIsSaving(false);
      setIsReviewMode(false);
      setSelectedFile(null);
      setExtractedData([]);
    } catch (error) {
      console.error(error);
      setIsSaving(false);
      addToast(
        error.response?.data?.error ||
          error.message ||
          "Error al guardar en la base de datos.",
        "error",
      );
    }
  };

  const updateSection = (realIndex, patch) => {
    setExtractedData((prev) => {
      const updated = [...prev];
      updated[realIndex] = { ...updated[realIndex], ...patch };
      return updated;
    });
  };

  const deleteSection = (realIndex) => {
    const updated = extractedData.filter((_, i) => i !== realIndex);
    setExtractedData(updated);
    if (start >= updated.length && reviewPage > 0) {
      setReviewPage((p) => p - 1);
    }
  };

  return {
    selectedFile,
    setSelectedFile,
    isUploading,
    uploadProgress,
    isReviewMode,
    setIsReviewMode,
    isSaving,
    extractedData,
    setExtractedData,
    reviewPage,
    setReviewPage,
    availableSections,
    activeDropdown,
    setActiveDropdown,
    fileInputRef,
    visibleSections,
    totalPages,
    start,
    applySectionToAll,
    handleFileChange,
    handleUploadSubmit,
    handleSaveSubmit,
    updateSection,
    deleteSection,
  };
}
