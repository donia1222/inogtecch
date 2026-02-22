/* ─────────────────────────────────────────────────────────
   Navbar — Componente de navegación
   'use client' porque necesita: localStorage (tema) y scroll
   ───────────────────────────────────────────────────────── */
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  const [isDay, setIsDay] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  /* ── Aplicar tema guardado al montar ── */
  useEffect(() => {
    const saved = localStorage.getItem('theme') === 'day'
    setIsDay(saved)
    applyTheme(saved)
  }, [])

  /* ── Cerrar menú al cambiar de ruta ── */
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  /* ── Bloquear scroll del body cuando el menú está abierto ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  /* ── Oscurecer nav al hacer scroll ── */
  useEffect(() => {
    function updateNavBg() {
      const nav = document.querySelector('nav')
      const day = document.documentElement.classList.contains('day')
      if (!nav) return
      nav.style.background = window.scrollY > 50
        ? (day ? 'rgba(244,246,251,.99)' : 'rgba(10,12,16,.98)')
        : ''
    }
    window.addEventListener('scroll', updateNavBg)
    return () => window.removeEventListener('scroll', updateNavBg)
  }, [])

  function applyTheme(day) {
    if (day) document.documentElement.classList.add('day')
    else document.documentElement.classList.remove('day')
  }

  function toggleTheme() {
    const next = !isDay
    setIsDay(next)
    localStorage.setItem('theme', next ? 'day' : 'night')
    applyTheme(next)
  }

  function linkClass(href) {
    return pathname === href ? 'active' : ''
  }

  const navLinks = [
    { href: '/leistungen', label: 'Leistungen' },
    { href: '/fem',        label: 'FEM' },
    { href: '/3d',         label: '3D' },
    { href: '/prozess',    label: 'Prozess' },
    { href: '/projekte',   label: 'Projekte' },
    { href: '/referenzen', label: 'Referenzen' },
  ]

  return (
    <>
      <nav>
        {/* Logo */}
        <div className="nav-logo">
          <Link href="/" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1px' }}>
            <img src="/assets/p1_img4.png" alt="iNOTEC" style={{ height: '30px', objectFit: 'contain' }} />
            <span style={{ fontSize: '.62rem', fontWeight: 500, color: 'var(--muted)', letterSpacing: '.18em', textTransform: 'uppercase', fontStyle: 'italic', paddingLeft: '.1rem', lineHeight: 1 }}>
              Engineering
            </span>
          </Link>
        </div>

        {/* Links desktop */}
        <div className="nav-links">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} className={linkClass(href)}>{label}</Link>
          ))}
          <Link href="/#contact" className="nav-cta">Kontakt</Link>

          {/* Botón tema */}
          <button className="theme-toggle" onClick={toggleTheme} title="Modus wechseln">
            <span id="toggleLabel">{isDay ? 'Nachtmodus' : 'Tagmodus'}</span>
            <div className="toggle-track">
              <div className="toggle-thumb">
                <span className="toggle-icon">{isDay ? '☀️' : '🌙'}</span>
              </div>
            </div>
          </button>
        </div>

        {/* Botón hamburger — solo visible en móvil */}
        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Menü öffnen"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* Panel móvil */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <div className="mobile-menu-inner">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} className={`mobile-link${pathname === href ? ' active' : ''}`} onClick={() => setMenuOpen(false)}>
              {label}
            </Link>
          ))}
          <Link href="/#contact" className="mobile-link mobile-cta" onClick={() => setMenuOpen(false)}>
            Kontakt
          </Link>
          {/* Tema en móvil */}
          <button className="theme-toggle mobile-theme" onClick={toggleTheme}>
            <span>{isDay ? 'Nachtmodus' : 'Tagmodus'}</span>
            <div className="toggle-track">
              <div className="toggle-thumb">
                <span className="toggle-icon">{isDay ? '☀️' : '🌙'}</span>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Overlay oscuro detrás del panel */}
      {menuOpen && <div className="mobile-overlay" onClick={() => setMenuOpen(false)} />}
    </>
  )
}
