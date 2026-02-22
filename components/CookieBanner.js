'use client'
import { useState, useEffect } from 'react'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('cookie_ok')) {
      // pequeño delay para que no sea lo primero que ve el usuario
      const t = setTimeout(() => setVisible(true), 800)
      return () => clearTimeout(t)
    }
  }, [])

  function accept() {
    localStorage.setItem('cookie_ok', '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="cookie-bar" role="alert" aria-live="polite">
      <p className="cookie-text">
        Diese Website verwendet ausschliesslich technisch notwendige Cookies.
        Keine Tracking- oder Werbe-Cookies.{' '}
        <button className="cookie-link" onClick={() => {
          // dispara el modal de Datenschutz si está disponible
          document.dispatchEvent(new CustomEvent('open-datenschutz'))
        }}>
          Mehr erfahren
        </button>
      </p>
      <button className="cookie-btn" onClick={accept}>OK, verstanden</button>
    </div>
  )
}
