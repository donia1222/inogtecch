/* ─────────────────────────────────────────────────────────
   ContactForm — Formulario de contacto
   'use client' para manejar el evento de envío
   ───────────────────────────────────────────────────────── */
'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <div className="contact-form fade-in">
      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem' }}>
        Anfrage senden
      </h3>

      {/* Nombre: dos columnas */}
      <div className="form-row">
        <div className="fg">
          <label>Vorname</label>
          <input type="text" placeholder="Max" />
        </div>
        <div className="fg">
          <label>Nachname</label>
          <input type="text" placeholder="Mustermann" />
        </div>
      </div>

      <div className="fg">
        <label>E-Mail</label>
        <input type="email" placeholder="max@unternehmen.ch" />
      </div>

      <div className="fg">
        <label>Unternehmen</label>
        <input type="text" placeholder="Ihr Unternehmen AG" />
      </div>

      {/* Selector de área de servicio */}
      <div className="fg">
        <label>Leistungsbereich</label>
        <select>
          <option value="">Bitte wählen...</option>
          <option>Konzepte &amp; Studien</option>
          <option>3D-Konstruktion &amp; CAD</option>
          <option>FEM-Berechnungen</option>
          <option>3D-Animation &amp; Visualisierung</option>
          <option>3D-Explosionszeichnungen</option>
          <option>Vakuumtechnik</option>
          <option>Prototypenbau</option>
          <option>Projektmanagement (Gesamtpaket)</option>
        </select>
      </div>

      <div className="fg">
        <label>Ihre Nachricht</label>
        <textarea placeholder="Beschreiben Sie Ihr Projekt..." />
      </div>

      {/* Botón — cambia texto al enviar */}
      <button
        className="form-btn"
        onClick={handleSubmit}
        style={sent ? { background: '#16a34a' } : {}}
      >
        {sent ? 'Nachricht gesendet ✓' : 'Anfrage absenden →'}
      </button>
    </div>
  )
}
