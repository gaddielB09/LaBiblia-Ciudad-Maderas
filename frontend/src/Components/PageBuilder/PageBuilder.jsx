import {
  Type,
  Image as ImageIcon,
  Square,
  Plus,
  Download,
  Eye,
  Edit3,
  Trash2,
  Settings2,
  LayoutTemplate,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Move,
  Maximize,
  Droplet,
  Radius,
  Bold,
  Italic,
  Type as FontIcon,
  Baseline,
  ChevronDown,
  Circle,
  Triangle,
  MousePointer2,
  Upload,
  Minus,
  Hexagon,
  RotateCw,
  Underline,
  Table as TableIcon,
  Grid3x3,
} from "lucide-react";
import RightPanelInput from "./RightPanelInput";
import usePageBuilder from "./usePageBuilder";

const SectionHeader = ({ title }) => (
  <h4 className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center justify-between">
    {title}
  </h4>
);

export default function PageBuilder() {
  const {
    addPage,
    deleteCurrentPage,
    addElement,
    updateSelectedElement,
    handleImageUpload,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    pages,
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
    selectedElement,
  } = usePageBuilder();

  const renderElement = (el) => {
    const isSelected = el.id === selectedElementId && viewMode === "edit";
    const shadowStyle = el.dropShadow?.enabled
      ? `${el.dropShadow.x}px ${el.dropShadow.y}px ${el.dropShadow.blur}px ${el.dropShadow.color}`
      : "none";

    const baseStyle = {
      position: "absolute",
      left: `${el.x}px`,
      top: `${el.y}px`,
      width: `${el.width}px`,
      height: `${el.height}px`,
      opacity: el.opacity,
      cursor: interaction.type === "drag" && isSelected ? "grabbing" : "grab",
      boxShadow: shadowStyle,
      zIndex: isSelected ? 10 : 1,
      userSelect: interaction.type !== "none" ? "none" : "auto",
      transform: `rotate(${el.rotation || 0}deg)`,
      transformOrigin: "center center",
    };

    let content = null;

    if (el.type === "text") {
      content = (
        <textarea
          value={el.content}
          onChange={(e) => {
            if (isSelected) updateSelectedElement({ content: e.target.value });
          }}
          style={{
            fontSize: `${el.fontSize}px`,
            fontFamily: el.fontFamily,
            color: el.color,
            fontWeight: el.fontWeight,
            fontStyle: el.fontStyle,
            textAlign: el.textAlign,
            lineHeight: el.lineHeight,
            width: "100%",
            height: "100%",
            background: "transparent",
            border: "none",
            outline: "none",
            resize: "none",
            overflow: "hidden",
          }}
          readOnly={viewMode === "preview"}
        />
      );
    } else if (el.type === "image") {
      content = (
        <img
          src={el.content}
          alt="Element"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: `${el.borderRadius}px`,
            pointerEvents: "none",
          }}
        />
      );
    }
    else if (el.type === "shape") {
      if (el.shapeType === "triangle") {
        content = (
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: el.color,
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            }}
          ></div>
        );
      } else if (el.shapeType === "polygon") {
        const polyPoints = el.points.map((p) => `${p.x}% ${p.y}%`).join(", ");
        content = (
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: el.color,
              clipPath: `polygon(${polyPoints})`,
            }}
          ></div>
        );
      } else {
        content = (
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: el.color,
              borderRadius: `${el.borderRadius}px`,
            }}
          ></div>
        );
      }
    } else if (el.type === "table") {
      content = (
        <table
          style={{
            width: "100%",
            height: "100%",
            borderCollapse: "collapse",
            tableLayout: "fixed",
            backgroundColor: "#ffffff",
          }}
        >
          <tbody>
            {el.tableData.map((row, rIndex) => (
              <tr key={rIndex}>
                {row.map((cell, cIndex) => (
                  <td
                    key={cIndex}
                    style={{
                      border: `${el.tableConfig.borderWidth}px solid ${el.tableConfig.borderColor}`,
                      backgroundColor:
                        rIndex === 0 ? el.tableConfig.headerBg : "transparent",
                      padding: 0,
                      position: "relative",
                    }}
                  >
                    <textarea
                      value={cell}
                      onPointerDown={(e) => {
                        if (isSelected) e.stopPropagation();
                      }}
                      onChange={(e) => {
                        if (isSelected) {
                          const newData = [...el.tableData];
                          newData[rIndex] = [...newData[rIndex]];
                          newData[rIndex][cIndex] = e.target.value;
                          updateSelectedElement({ tableData: newData });
                        }
                      }}
                      style={{
                        width: "100%",
                        height: "100%",
                        minHeight: "30px",
                        padding: `${el.tableConfig.cellPadding}px`,
                        background: "transparent",
                        border: "none",
                        outline: "none",
                        resize: "none",
                        color: el.color,
                        fontSize: `${el.fontSize}px`,
                        fontFamily: el.fontFamily,
                        textAlign: el.textAlign,
                        fontWeight: rIndex === 0 ? "bold" : el.fontWeight,
                        fontStyle: el.fontStyle,
                        lineHeight: el.lineHeight,
                      }}
                      readOnly={viewMode === "preview"}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    const ResizeHandle = ({ dir, cursor, posClasses }) => (
      <div
        onPointerDown={(e) => handlePointerDown(e, el, "resize", dir)}
        className={`absolute w-2.5 h-2.5 bg-white border border-blue-600 rounded-full shadow-sm ${posClasses}`}
        style={{ cursor }}
      />
    );

    return (
      <div
        key={el.id}
        ref={(node) => (elementRefs.current[el.id] = node)}
        style={baseStyle}
        onPointerDown={(e) => handlePointerDown(e, el, "drag")}
        className={
          isSelected
            ? "ring-1 ring-blue-500"
            : "hover:ring-1 hover:ring-blue-400/50"
        }
      >
        {content}

        {isSelected && viewMode === "edit" && (
          <>
            <div
              className="absolute -top-8 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border border-blue-600 rounded-full flex items-center justify-center cursor-crosshair shadow-sm z-20"
              onPointerDown={(e) => handlePointerDown(e, el, "rotate")}
            >
              <RotateCw size={10} className="text-blue-600" />
            </div>
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-px h-4 bg-blue-600"></div>

            <ResizeHandle
              dir="nw"
              cursor="nwse-resize"
              posClasses="-top-1.5 -left-1.5"
            />
            <ResizeHandle
              dir="n"
              cursor="ns-resize"
              posClasses="-top-1.5 left-1/2 -translate-x-1/2"
            />
            <ResizeHandle
              dir="ne"
              cursor="nesw-resize"
              posClasses="-top-1.5 -right-1.5"
            />
            <ResizeHandle
              dir="e"
              cursor="ew-resize"
              posClasses="top-1/2 -translate-y-1/2 -right-1.5"
            />
            <ResizeHandle
              dir="se"
              cursor="nwse-resize"
              posClasses="-bottom-1.5 -right-1.5"
            />
            <ResizeHandle
              dir="s"
              cursor="ns-resize"
              posClasses="-bottom-1.5 left-1/2 -translate-x-1/2"
            />
            <ResizeHandle
              dir="sw"
              cursor="nesw-resize"
              posClasses="-bottom-1.5 -left-1.5"
            />
            <ResizeHandle
              dir="w"
              cursor="ew-resize"
              posClasses="top-1/2 -translate-y-1/2 -left-1.5"
            />

            {el.shapeType === "polygon" &&
              el.points &&
              el.points.map((pt, idx) => (
                <div
                  key={idx}
                  onPointerDown={(e) =>
                    handlePointerDown(e, el, "edit_point", idx)
                  }
                  className="absolute w-3 h-3 bg-red-500 border-2 border-white rounded-full shadow cursor-move z-30"
                  style={{
                    left: `calc(${pt.x}% - 6px)`,
                    top: `calc(${pt.y}% - 6px)`,
                  }}
                />
              ))}
          </>
        )}
      </div>
    );
  };

  const renderRightPanel = () => {
    if (!selectedElement) {
      return (
        <div className="flex flex-col items-center justify-center h-full bg-neutral-900 text-slate-100 p-6 text-center space-y-4">
          <MousePointer2 size={32} strokeWidth={1.5} className="opacity-50" />
          <p className="text-xs">
            Selecciona un elemento para editar sus propiedades
          </p>
          <div className="mt-8 bg-zinc-900 p-4 rounded-lg border border-slate-600 text-left w-full space-y-2">
            <h5 className="text-[10px] font-bold text-slate-400 uppercase">
              Atajos Teclado
            </h5>
            <ul className="text-[11px] font-medium text-slate-400 space-y-1">
              <li>
                <kbd className="bg-white border text-slate-800 rounded px-1 shadow-sm">
                  T
                </kbd>{" "}
                Añadir Texto
              </li>
              <li>
                <kbd className="bg-white border text-slate-800 rounded px-1 shadow-sm">
                  R
                </kbd>{" "}
                Rectángulo
              </li>
              <li>
                <kbd className="bg-white border text-slate-800 rounded px-1 shadow-sm">
                  C
                </kbd>{" "}
                Círculo
              </li>
              <li>
                <kbd className="bg-white border text-slate-800 rounded px-1 shadow-sm">
                  Supr
                </kbd>{" "}
                Eliminar
              </li>
              <li>
                <kbd className="bg-white border text-slate-800 rounded px-1 shadow-sm">
                  Cmd+B
                </kbd>{" "}
                Negritas
              </li>
            </ul>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col h-full overflow-y-auto custom-scrollbar pb-10 bg-neutral-900">
        <div className="p-4 border-b border-slate-600">
          <SectionHeader title="Layout" />
          <div className="grid grid-cols-2 gap-2 mb-2">
            <RightPanelInput
              label="X"
              value={Math.round(selectedElement.x)}
              onChange={(e) =>
                updateSelectedElement({ x: Number(e.target.value) })
              }
              type="number"
            />
            <RightPanelInput
              label="Y"
              value={Math.round(selectedElement.y)}
              onChange={(e) =>
                updateSelectedElement({ y: Number(e.target.value) })
              }
              type="number"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <RightPanelInput
              label="W"
              value={Math.round(selectedElement.width)}
              onChange={(e) =>
                updateSelectedElement({ width: Number(e.target.value) })
              }
              type="number"
            />
            <RightPanelInput
              label="H"
              value={Math.round(selectedElement.height)}
              onChange={(e) =>
                updateSelectedElement({ height: Number(e.target.value) })
              }
              type="number"
            />
          </div>
          <div className="grid grid-cols-1 gap-2">
            <RightPanelInput
              icon={RotateCw}
              value={Math.round(selectedElement.rotation || 0)}
              onChange={(e) =>
                updateSelectedElement({ rotation: Number(e.target.value) })
              }
              type="number"
              title="Rotación"
            />
          </div>
        </div>

        {selectedElement.type === "table" && (
          <div className="p-4 border-b border-slate-600 space-y-4 bg-slate-50">
            <SectionHeader title="Estructura de Tabla" />

            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    const cols = selectedElement.tableData[0].length;
                    updateSelectedElement({
                      tableData: [
                        ...selectedElement.tableData,
                        Array(cols).fill(""),
                      ],
                    });
                  }}
                  className="flex items-center justify-center gap-1 bg-white border border-slate-200 py-1.5 rounded text-[11px] font-semibold text-slate-600 hover:text-blue-600 hover:border-blue-200 transition-colors"
                >
                  <Plus size={12} /> Fila
                </button>
                <button
                  onClick={() => {
                    if (selectedElement.tableData.length <= 1) return;
                    updateSelectedElement({
                      tableData: selectedElement.tableData.slice(0, -1),
                    });
                  }}
                  className="flex items-center justify-center gap-1 bg-white border border-slate-200 py-1.5 rounded text-[11px] font-semibold text-slate-600 hover:text-red-500 hover:border-red-200 transition-colors"
                >
                  <Minus size={12} /> Fila
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() =>
                    updateSelectedElement({
                      tableData: selectedElement.tableData.map((row) => [
                        ...row,
                        "",
                      ]),
                    })
                  }
                  className="flex items-center justify-center gap-1 bg-white border border-slate-200 py-1.5 rounded text-[11px] font-semibold text-slate-600 hover:text-blue-600 hover:border-blue-200 transition-colors"
                >
                  <Plus size={12} /> Columna
                </button>
                <button
                  onClick={() => {
                    if (selectedElement.tableData[0].length <= 1) return;
                    updateSelectedElement({
                      tableData: selectedElement.tableData.map((row) =>
                        row.slice(0, -1),
                      ),
                    });
                  }}
                  className="flex items-center justify-center gap-1 bg-white border border-slate-200 py-1.5 rounded text-[11px] font-semibold text-slate-600 hover:text-red-500 hover:border-red-200 transition-colors"
                >
                  <Minus size={12} /> Columna
                </button>
              </div>
            </div>

            <hr className="border-slate-200" />

            <SectionHeader title="Estilos de Tabla" />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-500 uppercase">
                  Fondo Encabezado
                </span>
                <div className="relative w-6 h-6 rounded border border-slate-200 overflow-hidden shadow-sm cursor-pointer">
                  <input
                    type="color"
                    value={selectedElement.tableConfig.headerBg}
                    onChange={(e) =>
                      updateSelectedElement({
                        tableConfig: {
                          ...selectedElement.tableConfig,
                          headerBg: e.target.value,
                        },
                      })
                    }
                    className="absolute -top-2 -left-2 w-10 h-10 cursor-pointer border-0 p-0"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-500 uppercase">
                  Color Borde
                </span>
                <div className="relative w-6 h-6 rounded border border-slate-200 overflow-hidden shadow-sm cursor-pointer">
                  <input
                    type="color"
                    value={selectedElement.tableConfig.borderColor}
                    onChange={(e) =>
                      updateSelectedElement({
                        tableConfig: {
                          ...selectedElement.tableConfig,
                          borderColor: e.target.value,
                        },
                      })
                    }
                    className="absolute -top-2 -left-2 w-10 h-10 cursor-pointer border-0 p-0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <RightPanelInput
                  icon={Grid3x3}
                  value={selectedElement.tableConfig.borderWidth}
                  onChange={(e) =>
                    updateSelectedElement({
                      tableConfig: {
                        ...selectedElement.tableConfig,
                        borderWidth: Number(e.target.value),
                      },
                    })
                  }
                  type="number"
                  title="Grosor Borde"
                />
                <RightPanelInput
                  icon={Maximize}
                  value={selectedElement.tableConfig.cellPadding}
                  onChange={(e) =>
                    updateSelectedElement({
                      tableConfig: {
                        ...selectedElement.tableConfig,
                        cellPadding: Number(e.target.value),
                      },
                    })
                  }
                  type="number"
                  title="Espaciado Celda"
                />
              </div>
            </div>
          </div>
        )}

        {(selectedElement.type === "text" ||
          selectedElement.type === "table") && (
          <div className="p-4 border-b border-slate-100 space-y-4">
            <SectionHeader title="Tipografía" />

            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-md p-1 focus-within:border-blue-500">
              <FontIcon size={14} className="ml-2 text-slate-400" />
              <select
                value={selectedElement.fontFamily}
                onChange={(e) =>
                  updateSelectedElement({ fontFamily: e.target.value })
                }
                className="w-full text-xs bg-transparent outline-none p-1 text-slate-700 cursor-pointer"
              >
                <option value="Inter, sans-serif">Inter</option>
                <option value="'Playfair Display', serif">
                  Playfair Display
                </option>
                <option value="Arial, sans-serif">Arial</option>
                <option value="'Courier New', monospace">Courier</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <RightPanelInput
                icon={Baseline}
                value={selectedElement.fontSize}
                onChange={(e) =>
                  updateSelectedElement({ fontSize: Number(e.target.value) })
                }
                type="number"
                title="Tamaño"
              />
              <RightPanelInput
                icon={Minus}
                value={selectedElement.lineHeight}
                onChange={(e) =>
                  updateSelectedElement({ lineHeight: Number(e.target.value) })
                }
                type="number"
                step="0.1"
                title="Interlineado"
              />
            </div>

            <div className="flex gap-1 bg-slate-50 border border-slate-200 rounded-md p-1">
              <button
                onClick={() =>
                  updateSelectedElement({
                    fontWeight:
                      selectedElement.fontWeight === "bold" ? "normal" : "bold",
                  })
                }
                className={`flex-1 py-1 rounded flex justify-center transition-all ${selectedElement.fontWeight === "bold" ? "bg-white shadow text-slate-900" : "text-slate-500"}`}
              >
                <Bold size={14} />
              </button>
              <button
                onClick={() =>
                  updateSelectedElement({
                    fontStyle:
                      selectedElement.fontStyle === "italic"
                        ? "normal"
                        : "italic",
                  })
                }
                className={`flex-1 py-1 rounded flex justify-center transition-all ${selectedElement.fontStyle === "italic" ? "bg-white shadow text-slate-900" : "text-slate-500"}`}
              >
                <Italic size={14} />
              </button>
              <div className="w-px bg-slate-200 mx-1"></div>
              <button
                onClick={() => updateSelectedElement({ textAlign: "left" })}
                className={`flex-1 py-1 rounded flex justify-center transition-all ${selectedElement.textAlign === "left" ? "bg-white shadow text-slate-900" : "text-slate-500"}`}
              >
                <AlignLeft size={14} />
              </button>
              <button
                onClick={() => updateSelectedElement({ textAlign: "center" })}
                className={`flex-1 py-1 rounded flex justify-center transition-all ${selectedElement.textAlign === "center" ? "bg-white shadow text-slate-900" : "text-slate-500"}`}
              >
                <AlignCenter size={14} />
              </button>
              <button
                onClick={() => updateSelectedElement({ textAlign: "right" })}
                className={`flex-1 py-1 rounded flex justify-center transition-all ${selectedElement.textAlign === "right" ? "bg-white shadow text-slate-900" : "text-slate-500"}`}
              >
                <AlignRight size={14} />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase w-10">
                Color
              </span>
              <div className="relative w-6 h-6 rounded border border-slate-200 overflow-hidden shadow-sm cursor-pointer">
                <input
                  type="color"
                  value={selectedElement.color}
                  onChange={(e) =>
                    updateSelectedElement({ color: e.target.value })
                  }
                  className="absolute -top-2 -left-2 w-10 h-10 cursor-pointer border-0 p-0"
                />
              </div>
            </div>
          </div>
        )}

        {selectedElement.type !== "text" &&
          selectedElement.type !== "table" && (
            <div className="p-4 border-b border-slate-600 space-y-4">
              <SectionHeader
                title={selectedElement.type === "image" ? "Imagen" : "Relleno"}
              />

              {selectedElement.type !== "image" && (
                <div className="flex items-center gap-3">
                  <div className="relative w-8 h-8 rounded border border-slate-600 overflow-hidden shadow-sm cursor-pointer">
                    <input
                      type="color"
                      value={selectedElement.color}
                      onChange={(e) =>
                        updateSelectedElement({ color: e.target.value })
                      }
                      className="absolute -top-2 -left-2 w-12 h-12 cursor-pointer border-0 p-0"
                    />
                  </div>
                  <span className="text-xs font-mono text-slate-200 uppercase border border-slate-600 px-2 py-1 rounded bg-zinc-800 flex-1 text-center">
                    {selectedElement.color}
                  </span>
                </div>
              )}

              {selectedElement.type === "image" && (
                <div className="space-y-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full flex items-center justify-center gap-2 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded transition-colors"
                  >
                    <Upload size={14} /> Cambiar Imagen
                  </button>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                <div className="grid items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-400 w-6">
                    Opacidad
                  </span>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={Math.round(selectedElement.opacity * 100)}
                    onChange={(e) =>
                      updateSelectedElement({
                        opacity: Number(e.target.value) / 100,
                      })
                    }
                    className="w-full text-xs text-slate-200 p-1.5 border border-slate-600 rounded"
                  />
                </div>
                {selectedElement.shapeType !== "triangle" &&
                  selectedElement.shapeType !== "polygon" && (
                    <div className="grid items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-400 w-6">
                    Radius
                  </span>
                      <input
                        type="number"
                        value={selectedElement.borderRadius || 0}
                        onChange={(e) =>
                          updateSelectedElement({
                            borderRadius: Number(e.target.value),
                          })
                        }
                        className="w-full text-xs text-slate-200 p-1.5 border border-slate-600 rounded"
                      />
                    </div>
                  )}
              </div>

              {selectedElement.shapeType === "polygon" && (
                <p className="text-[10px] text-blue-500 bg-blue-50 p-2 rounded border border-slate-600">
                  Arraste los nodos rojos sobre la forma para alterar su
                  estructura libremente.
                </p>
              )}
            </div>
          )}

        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <SectionHeader title="Efectos" />
            <button
              onClick={() =>
                updateSelectedElement({
                  dropShadow: {
                    ...selectedElement.dropShadow,
                    enabled: !selectedElement.dropShadow?.enabled,
                  },
                })
              }
              className={`text-xs px-2 py-0.5 rounded ${selectedElement.dropShadow?.enabled ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
            >
              {selectedElement.dropShadow?.enabled ? "Ocultar" : "Añadir"}
            </button>
          </div>

          {selectedElement.dropShadow?.enabled && (
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-3">
              <div className="flex items-center gap-3">
                <div className="relative w-6 h-6 rounded border border-slate-200 overflow-hidden cursor-pointer">
                  <input
                    type="color"
                    value={selectedElement.dropShadow.color.substring(0, 7)}
                    onChange={(e) =>
                      updateSelectedElement({
                        dropShadow: {
                          ...selectedElement.dropShadow,
                          color: e.target.value,
                        },
                      })
                    }
                    className="absolute -top-2 -left-2 w-10 h-10"
                  />
                </div>
                <span className="text-[10px] text-slate-500 font-medium">
                  Sombra Base
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <RightPanelInput
                  label="X"
                  value={selectedElement.dropShadow.x}
                  onChange={(e) =>
                    updateSelectedElement({
                      dropShadow: {
                        ...selectedElement.dropShadow,
                        x: Number(e.target.value),
                      },
                    })
                  }
                  type="number"
                />
                <RightPanelInput
                  label="Y"
                  value={selectedElement.dropShadow.y}
                  onChange={(e) =>
                    updateSelectedElement({
                      dropShadow: {
                        ...selectedElement.dropShadow,
                        y: Number(e.target.value),
                      },
                    })
                  }
                  type="number"
                />
                <RightPanelInput
                  label="Blur"
                  value={selectedElement.dropShadow.blur}
                  onChange={(e) =>
                    updateSelectedElement({
                      dropShadow: {
                        ...selectedElement.dropShadow,
                        blur: Number(e.target.value),
                      },
                    })
                  }
                  type="number"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`flex flex-col h-full w-full ${viewMode === 'edit' ? "bg-[#c8c7c7]" : "bg-[#f5f5f5]"} font-sans text-slate-800 overflow-hidden transition-colors`}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />

      <header className="h-[52px] bg-black border-b border-slate-600 flex items-center justify-between px-4 shrink-0 z-20 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-black rounded flex items-center justify-center text-white font-bold text-xs">
            CM
          </div>
          <h1 className="font-semibold text-[13px] text-slate-100 tracking-wide">
            Ciudad Maderas Studio
          </h1>
        </div>

        <div className="flex items-center bg-zinc-900 p-0.5 rounded-lg border border-slate-600">
          <button
            onClick={() => {
              setViewMode("edit");
              setSelectedElementId(null);
              setShowShapeMenu(false);
            }}
            className={`px-4 py-1.5 rounded-md text-[13px] font-medium transition-all ${viewMode === "edit" ? "bg-white shadow text-slate-800" : "text-slate-200 hover:text-slate-500"}`}
          >
            Diseño
          </button>
          <button
            onClick={() => {
              setViewMode("preview");
              setSelectedElementId(null);
              setShowShapeMenu(false);
            }}
            className={`px-4 py-1.5 rounded-md text-[13px] font-medium transition-all ${viewMode === "preview" ? "bg-white shadow text-slate-800" : "text-slate-200 hover:text-slate-500"}`}
          >
            Vista Previa
          </button>
        </div>

        <button
          onClick={() => console.log(pages)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-[13px] font-medium transition-colors"
        >
          <Download size={14} /> Exportar
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {viewMode === "edit" && (
          <aside className="absolute left-4 top-1/2 -translate-y-1/2 bg-slate-900 border border-slate-600 rounded-xl shadow-lg p-2 z-10 flex flex-col gap-2">
            <button
              onClick={() => addElement("text")}
              className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-600 hover:text-slate-200 transition-colors"
              title="Texto (T)"
            >
              <Type size={18} />
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-600 hover:text-slate-200 transition-colors"
              title="Imagen"
            >
              <ImageIcon size={18} />
            </button>

            <button
              onClick={() => addElement("table")}
              className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-600 hover:text-slate-200 transition-colors"
              title="Tabla"
            >
              <TableIcon size={18} />
            </button>

            <div className="relative">
              <button
                onClick={() => setShowShapeMenu(!showShapeMenu)}
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${showShapeMenu ? "bg-slate-600 text-slate-200" : "text-slate-500 hover:bg-slate-600 hover:text-slate-200"}`}
                title="Formas"
              >
                <Square size={18} />
              </button>

              {showShapeMenu && (
                <div className="absolute left-14 top-0 bg-slate-900 border border-slate-600 shadow-xl rounded-lg flex flex-col p-1 gap-1">
                  <button
                    onClick={() => {
                      addElement("shape", { shapeType: "rect" });
                      setShowShapeMenu(false);
                    }}
                    className="w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-slate-600 hover:text-slate-200 rounded"
                    title="Rectángulo (R)"
                  >
                    <Square size={16} />
                  </button>
                  <button
                    onClick={() => {
                      addElement("shape", { shapeType: "circle" });
                      setShowShapeMenu(false);
                    }}
                    className="w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-slate-600 hover:text-slate-200 rounded"
                    title="Círculo (C)"
                  >
                    <Circle size={16} />
                  </button>
                  <button
                    onClick={() => {
                      addElement("shape", { shapeType: "triangle" });
                      setShowShapeMenu(false);
                    }}
                    className="w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-slate-600 hover:text-slate-200 rounded"
                  >
                    <Triangle size={16} />
                  </button>
                  <button
                    onClick={() => {
                      addElement("shape", { shapeType: "polygon" });
                      setShowShapeMenu(false);
                    }}
                    className="w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-slate-600 hover:text-slate-200 rounded text-[10px] font-bold bg-slate-900 text-slate-200"
                    title="Forma Libre"
                  >
                    <Hexagon size={16} />
                  </button>
                </div>
              )}
            </div>
          </aside>
        )}

        <main
          className="flex-1 overflow-y-auto overflow-x-auto relative flex flex-col items-center py-12 px-6 custom-scrollbar"
          onPointerDown={() => {
            setSelectedElementId(null);
            setShowShapeMenu(false);
          }}
        >
          <div className="flex flex-col gap-10 transition-all items-center w-full">
            {pages.map((page, index) => (
              <div
                key={page.id}
                className="relative flex flex-col items-center gap-2 group"
              >
                {viewMode === "edit" && (
                  <div className="w-[800px] flex justify-between items-center text-[11px] font-bold text-slate-400 uppercase">
                    <span>Página {index + 1}</span>
                    <button
                      onClick={() => {
                        setCurrentPageId(page.id);
                        deleteCurrentPage();
                      }}
                      className="opacity-0 group-hover:opacity-100 hover:text-red-500 transition-all flex items-center gap-1"
                    >
                      <Trash2 size={12} /> Eliminar
                    </button>
                  </div>
                )}

                <div
                  className={`bg-white relative overflow-hidden transition-all ${
                    viewMode === "preview"
                      ? "rounded-xl shadow-lg border border-slate-200"
                      : "shadow-sm ring-1 ring-slate-200"
                  }`}
                  style={{ width: "800px", height: "1130px" }}
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    setCurrentPageId(page.id);
                    setSelectedElementId(null);
                    setShowShapeMenu(false);
                  }}
                >
                  {page.elements.map((el) => renderElement(el))}
                </div>
              </div>
            ))}

            {viewMode === "edit" && (
              <div className="w-[800px] flex justify-center mb-20">
                <button
                  onClick={addPage}
                  className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 text-slate-500 hover:text-blue-600 rounded-lg text-sm font-semibold transition-all shadow-sm"
                >
                  <Plus size={16} /> Añadir Hoja
                </button>
              </div>
            )}
          </div>
        </main>

        {viewMode === "edit" && (
          <aside className="w-[260px] bg-white border-l border-slate-200 shrink-0 z-10 flex flex-col relative shadow-[-4px_0_15px_-3px_rgba(0,0,0,0.02)]">
            {renderRightPanel()}
          </aside>
        )}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `,
        }}
      />
    </div>
  );
}
