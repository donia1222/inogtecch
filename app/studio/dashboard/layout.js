'use client'
// ── Dashboard Layout — Sidebar + Contenido ─────────────────
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { apiGet } from '@/lib/api'

const navLinks = [
  { href: '/studio/dashboard',            icon: '⊞',  label: 'Übersicht' },
  { href: '/studio/dashboard/home',       icon: '🏠', label: 'Startseite' },
  { href: '/studio/dashboard/leistungen', icon: '📋', label: 'Leistungen' },
  { href: '/studio/dashboard/projekte',   icon: '🏗️', label: 'Projekte' },
  { href: '/studio/dashboard/prozess',    icon: '⚙️', label: 'Prozess' },
  { href: '/studio/dashboard/referenzen', icon: '🏆', label: 'Referenzen' },
  { href: '/studio/dashboard/3d',         icon: '🖥️', label: '3D & Visualisierung' },
  { href: '/studio/dashboard/fem',        icon: '📊', label: 'FEM' },
]

// Mapeo dashboard → página pública
const previewMap = {
  '/studio/dashboard/home':       '/',
  '/studio/dashboard/leistungen': '/leistungen',
  '/studio/dashboard/projekte':   '/projekte',
  '/studio/dashboard/prozess':    '/prozess',
  '/studio/dashboard/referenzen': '/referenzen',
  '/studio/dashboard/3d':         '/3d',
  '/studio/dashboard/fem':        '/fem',
}

export default function DashboardLayout({ children }) {
  const router   = useRouter()
  const pathname = usePathname()
  const [unread, setUnread] = useState(0)

  // Al cargar: obtener token desde Next.js → guardarlo → luego llamar PHP
  useEffect(() => {
    fetch('/api/studio-auth')
      .then(r => r.json())
      .then(data => {
        if (data.token) window.sessionStorage.setItem('studio_token', data.token)
        return apiGet('contact_messages.php')
      })
      .then(msgs => {
        if (Array.isArray(msgs)) setUnread(msgs.filter(m => !parseInt(m.is_read)).length)
      })
      .catch(() => {})
  }, [])

  async function handleLogout() {
    window.sessionStorage.removeItem('studio_token')
    await fetch('/api/studio-auth', { method: 'DELETE' }).catch(() => {})
    router.push('/studio')
  }

  function isActive(href) {
    if (href === '/studio/dashboard') return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <div className="s-wrap">
      {/* Sidebar */}
      <aside className="s-sidebar">
        <div className="s-logo">
          <strong>iNOTEC</strong>
          <span>Studio</span>
          <a
            href={previewMap[pathname] || '/'}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '.25rem', marginTop: '.5rem', fontSize: '.72rem', color: '#555', textDecoration: 'none', transition: 'color .15s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#e02020'}
            onMouseLeave={e => e.currentTarget.style.color = '#555'}
          >
            Website ↗
          </a>
        </div>

        <nav className="s-nav">
          <div className="s-nav-section">Webseite</div>
          {navLinks.map(({ href, icon, label }) => (
            <Link key={href} href={href} className={isActive(href) ? 's-active' : ''}>
              <span className="s-nav-icon">{icon}</span>
              {label}
            </Link>
          ))}

          <div className="s-nav-section">Verwaltung</div>
          <Link
            href="/studio/dashboard/nachrichten"
            className={isActive('/studio/dashboard/nachrichten') ? 's-active' : ''}
          >
            <span className="s-nav-icon">✉️</span>
            Nachrichten
            {unread > 0 && <span className="s-nav-badge">{unread}</span>}
          </Link>

          <div className="s-nav-section">Web</div>
          <a
            href={previewMap[pathname] || '/'}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: '.55rem', padding: '.55rem 1.4rem', color: '#777', textDecoration: 'none', fontSize: '.83rem', borderLeft: '2px solid transparent' }}
            onMouseEnter={e => e.currentTarget.style.color = '#e0e0e0'}
            onMouseLeave={e => e.currentTarget.style.color = '#777'}
          >
            <span className="s-nav-icon">↗</span>
            Website öffnen
          </a>
        </nav>

        <div className="s-sidebar-footer">
          <button onClick={handleLogout}>← Abmelden</button>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="s-main">
        {children}
      </main>
    </div>
  )
}
