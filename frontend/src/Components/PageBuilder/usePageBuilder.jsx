import { useState, useCallback, useEffect, useRef } from "react";

export default function usePageBuilder() {
  const [pages, setPages] = useState([{ id: "page-1", elements: [] }]);
  const [currentPageId, setCurrentPageId] = useState("page-1");
  const [selectedElementId, setSelectedElementId] = useState(null);

  const [viewMode, setViewMode] = useState("edit");
  const fileInputRef = useRef(null);

  const elementRefs = useRef({});

  const [interaction, setInteraction] = useState({
    type: "none",
    elementId: null,
    handle: null,
    startX: 0,
    startY: 0,
    initialX: 0,
    initialY: 0,
    initialW: 0,
    initialH: 0,
    initialRotation: 0,
    initialPoints: [],
  });

  const [showShapeMenu, setShowShapeMenu] = useState(false);

  const currentPage = pages.find((p) => p.id === currentPageId);
  const selectedElement = currentPage?.elements.find(
    (el) => el.id === selectedElementId,
  );

  const addPage = useCallback(() => {
    const newPageId = `page-${Date.now()}`;
    setPages((prev) => [...prev, { id: newPageId, elements: [] }]);
    setCurrentPageId(newPageId);
    setSelectedElementId(null);
  }, []);

  const deleteCurrentPage = useCallback(() => {
    setPages((prev) => {
      if (prev.length <= 1) {
        alert("Debe haber al menos una página.");
        return prev;
      }
      const newPages = prev.filter((p) => p.id !== currentPageId);
      setCurrentPageId(newPages[0].id);
      setSelectedElementId(null);
      return newPages;
    });
  }, [currentPageId]);

  const addElement = useCallback(
    (type, extraProps = {}) => {
      const newElement = {
        id: `el-${Date.now()}`,
        type,
        x: 100,
        y: 100,
        width: type === "image" ? 300 : type === "shape" ? 100 : 250,
        height: type === "image" ? 200 : type === "shape" ? 100 : 50,
        tableData:
          type === "table"
            ? [
                ["Encabezado 1", "Encabezado 2", "Encabezado 3"],
                ["Dato 1", "Dato 2", "Dato 3"],
                ["Dato 4", "Dato 5", "Dato 6"],
              ]
            : undefined,
        tableConfig:
          type === "table"
            ? {
                headerBg: "#f1f5f9",
                borderColor: "#cbd5e1",
                borderWidth: 1,
                cellPadding: 8,
              }
            : undefined,
        rotation: 0,
        content: type === "text" ? "Texto" : "",
        shapeType: type === "shape" ? extraProps.shapeType || "rect" : null,
        color: type === "text" ? "#1e293b" : "#e2e8f0",
        opacity: 1,
        points:
          extraProps.shapeType === "polygon"
            ? [
                { x: 50, y: 0 },
                { x: 100, y: 100 },
                { x: 0, y: 100 },
              ]
            : undefined,
        fontSize: type === "text" ? 16 : undefined,
        fontFamily: "Inter, sans-serif",
        fontWeight: "normal",
        fontStyle: "normal",
        textDecoration: "none",
        textAlign: "left",
        lineHeight: 1.5,
        borderRadius:
          type === "shape" && extraProps.shapeType === "circle" ? 9999 : 0,
        dropShadow: {
          enabled: false,
          x: 0,
          y: 4,
          blur: 10,
          color: "rgba(0,0,0,0.15)",
        },
        ...extraProps,
      };

      setPages((prev) =>
        prev.map((p) =>
          p.id === currentPageId
            ? { ...p, elements: [...p.elements, newElement] }
            : p,
        ),
      );
      setSelectedElementId(newElement.id);
    },
    [currentPageId],
  );

  const updateSelectedElement = useCallback(
    (updates) => {
      setPages((prev) =>
        prev.map((p) =>
          p.id === currentPageId
            ? {
                ...p,
                elements: p.elements.map((el) =>
                  el.id === selectedElementId ? { ...el, ...updates } : el,
                ),
              }
            : p,
        ),
      );
    },
    [currentPageId, selectedElementId],
  );

  const deleteSelectedElement = useCallback(() => {
    setPages((prev) =>
      prev.map((p) =>
        p.id === currentPageId
          ? {
              ...p,
              elements: p.elements.filter((el) => el.id !== selectedElementId),
            }
          : p,
      ),
    );
    setSelectedElementId(null);
  }, [currentPageId, selectedElementId]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (["INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName)) return;

      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

      if (e.key === "Backspace" || e.key === "Delete") {
        e.preventDefault();
        deleteSelectedElement();
      } else if (e.key === "Escape") {
        setSelectedElementId(null);
        setShowShapeMenu(false);
      } else if (!cmdOrCtrl && e.key.toLowerCase() === "t") {
        e.preventDefault();
        addElement("text");
      } else if (!cmdOrCtrl && e.key.toLowerCase() === "r") {
        e.preventDefault();
        addElement("shape", { shapeType: "rect" });
      } else if (!cmdOrCtrl && e.key.toLowerCase() === "c") {
        e.preventDefault();
        addElement("shape", { shapeType: "circle" });
      } else if (
        cmdOrCtrl &&
        e.key.toLowerCase() === "b" &&
        selectedElement?.type === "text"
      ) {
        e.preventDefault();
        updateSelectedElement({
          fontWeight: selectedElement.fontWeight === "bold" ? "normal" : "bold",
        });
      } else if (
        cmdOrCtrl &&
        e.key.toLowerCase() === "i" &&
        selectedElement?.type === "text"
      ) {
        e.preventDefault();
        updateSelectedElement({
          fontStyle:
            selectedElement.fontStyle === "italic" ? "normal" : "italic",
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    deleteSelectedElement,
    addElement,
    selectedElement,
    updateSelectedElement,
  ]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const maxWidth = 400;
          const ratio = img.width / img.height;
          const width = img.width > maxWidth ? maxWidth : img.width;
          const height = width / ratio;
          addElement("image", { content: event.target.result, width, height });
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePointerDown = (e, element, type = "drag", handle = null) => {
    if (viewMode === "preview") return;

    // Si estamos editando el interior de una tabla y ya estaba seleccionada, dejamos propagar para el foco
    if (
      element.type === "table" &&
      selectedElementId === element.id &&
      type === "drag"
    ) {
      // No frenamos la propagación aquí, para que el textarea pueda ser clickeado
    } else {
      e.stopPropagation();
    }

    setSelectedElementId(element.id);

    const elNode = elementRefs.current[element.id];
    const rect = elNode
      ? elNode.getBoundingClientRect()
      : { left: 0, top: 0, width: 0, height: 0 };
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    setInteraction({
      type,
      elementId: element.id,
      handle,
      startX: e.clientX,
      startY: e.clientY,
      initialX: element.x,
      initialY: element.y,
      initialW: element.width,
      initialH: element.height,
      initialRotation: element.rotation || 0,
      initialPoints: element.points
        ? JSON.parse(JSON.stringify(element.points))
        : [],
      centerX,
      centerY,
    });
  };

  const handlePointerMove = (e) => {
    if (interaction.type === "none" || !interaction.elementId) return;

    // No prevenir default si se está interactuando con un textarea interno de tabla
    if (e.target.tagName !== "TEXTAREA") {
      e.preventDefault();
    }

    const dx = e.clientX - interaction.startX;
    const dy = e.clientY - interaction.startY;

    setPages(
      pages.map((p) => {
        if (p.id !== currentPageId) return p;
        return {
          ...p,
          elements: p.elements.map((el) => {
            if (el.id !== interaction.elementId) return el;

            let newProps = { ...el };

            if (interaction.type === "drag") {
              newProps.x = interaction.initialX + dx;
              newProps.y = interaction.initialY + dy;
            } else if (interaction.type === "rotate") {
              const startAngle = Math.atan2(
                interaction.startY - interaction.centerY,
                interaction.startX - interaction.centerX,
              );
              const currentAngle = Math.atan2(
                e.clientY - interaction.centerY,
                e.clientX - interaction.centerX,
              );
              const diffAngle = (currentAngle - startAngle) * (180 / Math.PI);
              newProps.rotation =
                (interaction.initialRotation + diffAngle) % 360;
            } else if (interaction.type === "resize") {
              const rad = (interaction.initialRotation * Math.PI) / 180;
              const rotatedDx = dx * Math.cos(-rad) - dy * Math.sin(-rad);
              const rotatedDy = dx * Math.sin(-rad) + dy * Math.cos(-rad);

              const h = interaction.handle;
              if (h.includes("e"))
                newProps.width = Math.max(20, interaction.initialW + rotatedDx);
              if (h.includes("s"))
                newProps.height = Math.max(
                  20,
                  interaction.initialH + rotatedDy,
                );

              if (h.includes("w")) {
                const newW = Math.max(20, interaction.initialW - rotatedDx);
                if (newW > 20) {
                  newProps.width = newW;
                  newProps.x =
                    interaction.initialX +
                    (dx - (rotatedDx * Math.cos(rad) - 0 * Math.sin(rad)));
                }
              }
              if (h.includes("n")) {
                const newH = Math.max(20, interaction.initialH - rotatedDy);
                if (newH > 20) {
                  newProps.height = newH;
                  newProps.y =
                    interaction.initialY +
                    (dy - (0 * Math.cos(rad) - rotatedDy * Math.sin(rad)));
                }
              }
            } else if (interaction.type === "edit_point") {
              const i = interaction.handle;
              const rad = (interaction.initialRotation * Math.PI) / 180;
              const rotatedDx = dx * Math.cos(-rad) - dy * Math.sin(-rad);
              const rotatedDy = dx * Math.sin(-rad) + dy * Math.cos(-rad);

              const newX =
                interaction.initialPoints[i].x +
                (rotatedDx / interaction.initialW) * 100;
              const newY =
                interaction.initialPoints[i].y +
                (rotatedDy / interaction.initialH) * 100;

              newProps.points[i] = {
                x: Math.max(0, Math.min(100, newX)),
                y: Math.max(0, Math.min(100, newY)),
              };
            }

            return newProps;
          }),
        };
      }),
    );
  };

  const handlePointerUp = () => {
    if (interaction.type !== "none") {
      setInteraction({
        ...interaction,
        type: "none",
        elementId: null,
        handle: null,
      });
    }
  };

  return {
    addPage,
    deleteCurrentPage,
    addElement,
    deleteSelectedElement,
    updateSelectedElement,
    handleImageUpload,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    pages,
    currentPageId,
    setCurrentPageId,
    selectedElementId,
    setSelectedElementId,
    viewMode,
    setViewMode,
    fileInputRef,
    elementRefs,
    showShapeMenu,
    setShowShapeMenu,
    interaction,
    setInteraction,
    currentPage,
    selectedElement,
  };
}
