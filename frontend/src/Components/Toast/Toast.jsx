import { useEffect, useState } from "react";
import "../../css/Components/Toast/Toast.css";

export function Toast({ id, message, type = "info", onClose }) {
  const [visible, setVisible] = useState(false);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => onClose(id), 300);
  };

  useEffect(() => {
    const showTimer = requestAnimationFrame(() => setVisible(true));
    const hideTimer = setTimeout(() => handleClose(), 4000);
    return () => {
      cancelAnimationFrame(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div className={`toast toast--${type} ${visible ? "toast--visible" : ""}`}>
      <span className="toast__icon">
        {type === "success" && "✓"}
        {type === "error" && "✕"}
        {type === "info" && "i"}
      </span>
      <span className="toast__message">{message}</span>
      <button className="toast__close" onClick={handleClose}>
        ×
      </button>
    </div>
  );
}

export function ToastContainer({ toasts, onClose }) {
  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <Toast key={t.id} {...t} onClose={onClose} />
      ))}
    </div>
  );
}

let _addToast = null;
export function useToast() {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return { toasts, addToast, removeToast };
}
