/* ─────────────────────────────────────────────────────────
   Navbar — Componente de navegación
   'use client' porque necesita: localStorage (tema) y scroll
   ───────────────────────────────────────────────────────── */
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const API = process.env.NEXT_PUBLIC_API_URL || 'https://web.lweb.ch/inotec/api'

export default function Navbar() {
  const pathname = usePathname()

  const [isDay, setIsDay] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [logoTitel, setLogoTitel] = useState('iNOTEC')
  const [logoSub, setLogoSub] = useState('ENGINEERING')
  const [navStyles, setNavStyles] = useState({})

  /* ── Aplicar tema guardado al montar ── */
  useEffect(() => {
    const saved = localStorage.getItem('theme') === 'day'  // noche por defecto
    setIsDay(saved)
    applyTheme(saved)
    fetch(`${API}/hero.php`)
      .then(r => r.json())
      .then(d => { if (d?.eyebrow) setLogoTitel(d.eyebrow); if (d?.eyebrow_sub) setLogoSub(d.eyebrow_sub) })
      .catch(() => {})
    fetch(`${API}/field_styles.php`)
      .then(r => r.json())
      .then(styles => {
        const ns = {}
        if (styles['nav.inotec']) ns.inotec = styles['nav.inotec']
        if (styles['nav.engineering']) ns.engineering = styles['nav.engineering']
        setNavStyles(ns)
      })
      .catch(() => {})
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
    { href: '/',           label: 'Home' },
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
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
            <img src="/assets/inotec.png" alt="iNOTEC" style={{ height: '38px', objectFit: 'contain' }} />
            <img src={isDay ? '/assets/eingenieringblack.png' : '/assets/eingenieringwhite.png'} alt="Engineering" style={{ height: '22px', objectFit: 'contain', marginLeft: '-10px', marginTop: '10px' }} />
          </Link>
        </div>

        {/* Links desktop */}
        <div className="nav-links">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} className={linkClass(href)}>{label}</Link>
          ))}
          <Link href="/#contact" className="nav-cta">Kontakt</Link>

          {/* Botón tema */}
          <button className="theme-toggle-desktop" onClick={toggleTheme} title="Modus wechseln" aria-label="Modus wechseln">
            {isDay
              ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            }
          </button>
        </div>

        {/* Controles móvil: tema + hamburger */}
        <div className="mobile-controls">
          {menuOpen && (
            <button
              className="theme-toggle-icon"
              onClick={toggleTheme}
              title="Modus wechseln"
              aria-label="Modus wechseln"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            </button>
          )}

          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Menü öffnen"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
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
        </div>
      </div>

      {/* Overlay oscuro detrás del panel */}
      {menuOpen && <div className="mobile-overlay" onClick={() => setMenuOpen(false)} />}
    </>
  )
}
