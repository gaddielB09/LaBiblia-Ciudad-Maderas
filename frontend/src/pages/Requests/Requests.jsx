import { useState, useRef } from 'react'
import "../../css/Requests/Requests.css";


export default function Solicitudes() {
  const [expanded, setExpanded] = useState(false)
  const [sent, setSent] = useState(false)
  const [value, setValue] = useState('')
  const textareaRef = useRef(null)

  const handleFocus = () => {
    setExpanded(true)
    setTimeout(() => textareaRef.current?.focus(), 50)
  }

  const handleSubmit = () => {
    if (!value.trim()) return
    setSent(true)
    setValue('')
    setTimeout(() => {
      setSent(false)
      setExpanded(false)
    }, 4000)
  }

  const handleKey = (e) => {
    if (e.key === 'Escape') { setExpanded(false); e.target.blur() }
  }

  return (
    <div className="solicitudes">
      <div className="solicitudes__content">
        <h1 className="solicitudes__title">Solicitudes e ideas</h1>

        <div className={`solicitudes__card ${expanded ? 'solicitudes__card--expanded' : ''}`}>
          {!expanded && (
            <div className="solicitudes__fake-input" onClick={handleFocus}>
              <span className="solicitudes__placeholder">¿Qué necesitas?</span>
            </div>
          )}

          {expanded && !sent && (
            <div className="solicitudes__expanded">
              <textarea
                ref={textareaRef}
                className="solicitudes__textarea"
                placeholder="¿Qué necesitas?"
                value={value}
                onChange={e => setValue(e.target.value)}
                onKeyDown={handleKey}
              />
              <div className="solicitudes__actions">
                <button
                  className="solicitudes__submit"
                  onClick={handleSubmit}
                  disabled={!value.trim()}
                >
                  Enviar solicitud
                </button>
              </div>
            </div>
          )}

          {sent && (
            <div className="solicitudes__thanks">
              <div className="solicitudes__thanks-icon">✓</div>
              <p className="solicitudes__thanks-title">¡Muchas gracias!</p>
              <p className="solicitudes__thanks-sub">Tu solicitud fue enviada exitosamente. Pronto nos pondremos en contacto contigo.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}