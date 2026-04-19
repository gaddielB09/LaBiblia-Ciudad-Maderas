import { useState } from "react";
import "../../css/Components/Modals/InfoModal.css";

export default function InfoModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`modal-overlay ${isClosing ? "modal-overlay--fade-out" : "modal-overlay--fade-in"}`}
    >
      <div
        className={`modal-content ${isClosing ? "modal-content--scale-down" : "modal-content--scale-up"}`}
      >
        <div className="modal-header">
          <div className="modal-icon">
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
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <h2>Aviso Importante</h2>
        </div>
        <div className="modal-body">
          <p>
            El contenido y las rutas a las que se accede a través del menú
            lateral contienen información de prueba. Estos datos fueron
            estructurados de forma manual para ilustrar la navegación y
            funcionalidad de la aplicación, ya que no se encontraban disponibles
            en el documento PDF original.
          </p>
        </div>
        <div className="modal-footer">
          <button className="modal-btn" onClick={handleClose}>
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
