import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UploadCloud, Settings, ArrowLeft } from "lucide-react";
import Valeria from "./Valeria";
import ValeriaManager from "./ValeriaManager";
import "../../css/Valeria/ValeriaConfig.css";

export default function ValeriaConfig() {
  const [activeView, setActiveView] = useState(null);
  const navigate = useNavigate();

  if (activeView === "feed")
    return <Valeria onBack={() => setActiveView(null)} />;
  if (activeView === "manage")
    return <ValeriaManager onBack={() => setActiveView(null)} />;

  return (
    <div className="vconfig">
      <header className="vconfig__header">
        {/* <button className="vconfig__back" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
        </button> */}
        <h1 className="vconfig__title">Configuración de ValerIA</h1>
      </header>

      <div className="vconfig__grid">
        <button
          className="vconfig__card"
          onClick={() => navigate("/valeria?mode=upload")}
        >
          <div className="vconfig__card-icon">
            <UploadCloud size={32} />
          </div>
          <h2 className="vconfig__card-title">Alimentar a Valeria</h2>
          <p className="vconfig__card-desc">
            Sube un PDF y extrae su contenido para que Valeria pueda responder
            con esa información.
          </p>
        </button>

        <button
          className="vconfig__card"
          onClick={() => setActiveView("manage")}
        >
          <div className="vconfig__card-icon">
            <Settings size={32} />
          </div>
          <h2 className="vconfig__card-title">Gestionar Secciones</h2>
          <p className="vconfig__card-desc">
            Edita o elimina secciones y páginas ya guardadas en la base de datos
            de Valeria.
          </p>
        </button>
      </div>
    </div>
  );
}
