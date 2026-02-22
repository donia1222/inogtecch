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
  const [light, setLight]   = useState(true)   // por defecto: modo día

  useEffect(() => {
    const saved = localStorage.getItem('studio_theme2')
    setLight(saved !== 'dark')   // si no hay preferencia → día
  }, [])

  function toggleTheme() {
    const next = !light
    setLight(next)
    localStorage.setItem('studio_theme2', next ? 'light' : 'dark')
  }

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
    <div className="s-wrap" data-lm={light ? 'light' : undefined}>
      {/* Contenido principal */}
      <main className="s-main">
        <div className="s-view-tabs">
          <Link href="/studio/dashboard" className={`s-view-tab${pathname === '/studio/dashboard' ? ' s-view-tab-active' : ''}`}>
            𓃑  Übersicht
          </Link>
          <a href={previewMap[pathname] || '/'} target="_blank" rel="noopener noreferrer" className="s-view-tab">
            🌐 Website öffen
          </a>
          <div className="s-tabs-right">
            <button onClick={toggleTheme} className="s-view-tab">
              {light ? '🌙' : '☀️'}
            </button>
            <button onClick={handleLogout} className="s-view-tab s-view-tab-logout">
              ⏻
            </button>
          </div>
        </div>
        {children}
      </main>
    </div>
  )
}
