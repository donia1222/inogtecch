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
  const [showNews, setShowNews] = useState(false)
  const light = true

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

    if (!localStorage.getItem('studio_news_seen')) {
      setShowNews(true)
      localStorage.setItem('studio_news_seen', '1')
    }
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
      <main className="s-main">
        <div className="s-view-tabs">
          <Link href="/studio/dashboard" className={`s-view-tab${pathname === '/studio/dashboard' ? ' s-view-tab-active' : ''}`}>
            𓃑  Übersicht
          </Link>
          <a href={previewMap[pathname] || '/'} target="_blank" rel="noopener noreferrer" className="s-view-tab">
            🌐 Website öffen
          </a>
          <div className="s-tabs-right">
            <button onClick={handleLogout} className="s-view-tab s-view-tab-logout" style={{ fontSize: '1.3rem', padding: '.3rem .7rem' }}>
              ⏻
            </button>
          </div>
        </div>
        {children}
      </main>

      {showNews && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9000, background: 'rgba(0,0,0,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={e => e.target === e.currentTarget && setShowNews(false)}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '2rem 2.2rem', maxWidth: '480px', width: '92vw', boxShadow: '0 20px 60px rgba(0,0,0,.25)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
              <h2 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#1a1a1a' }}>✦ Neuigkeiten</h2>
              <button onClick={() => setShowNews(false)} style={{ background: 'none', border: 'none', fontSize: '1.3rem', cursor: 'pointer', color: '#999', lineHeight: 1 }}>✕</button>
            </div>

            <div style={{ background: 'rgba(224,32,32,.06)', border: '1px solid rgba(224,32,32,.15)', borderRadius: '10px', padding: '1rem 1.2rem', marginBottom: '1rem' }}>
              <div style={{ fontSize: '.95rem', fontWeight: 700, color: '#e02020', marginBottom: '.4rem' }}>🎨 Stil-Anpassung pro Textfeld</div>
              <p style={{ margin: 0, fontSize: '.85rem', color: '#555', lineHeight: 1.65 }}>
                Ab sofort können Sie <strong>Farbe, Schriftgröße und Schriftart</strong> für jedes einzelne Textfeld individuell anpassen.
              </p>
            </div>

            <div style={{ fontSize: '.85rem', color: '#555', lineHeight: 1.7, marginBottom: '1.2rem' }}>
              <p style={{ margin: '0 0 .6rem' }}><strong>So funktioniert es:</strong></p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
                <div style={{ display: 'flex', gap: '.6rem', alignItems: 'flex-start' }}>
                  <span style={{ background: '#f5f5f5', border: '1px solid #ddd', borderRadius: '5px', width: '26px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', flexShrink: 0 }}>🎨</span>
                  <span>Neben jedem Textfeld erscheint ein kleines <strong>Palette-Symbol</strong>. Klicken Sie darauf.</span>
                </div>
                <div style={{ display: 'flex', gap: '.6rem', alignItems: 'flex-start' }}>
                  <span style={{ background: '#f5f5f5', border: '1px solid #ddd', borderRadius: '5px', width: '26px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', flexShrink: 0 }}>🎯</span>
                  <span>Wählen Sie <strong>Farbe</strong>, <strong>Größe</strong> (XS–6XL) oder <strong>Schriftart</strong> — die Änderung wird sofort gespeichert.</span>
                </div>
                <div style={{ display: 'flex', gap: '.6rem', alignItems: 'flex-start' }}>
                  <span style={{ background: '#f5f5f5', border: '1px solid #ddd', borderRadius: '5px', width: '26px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', flexShrink: 0 }}>🌐</span>
                  <span>Die Änderungen werden automatisch auf der <strong>öffentlichen Website</strong> angezeigt.</span>
                </div>
              </div>
            </div>

            <p style={{ margin: '0 0 1.2rem', fontSize: '.8rem', color: '#999' }}>
              Verfügbar in allen Sektionen: Startseite, Leistungen, Projekte, Prozess, Referenzen, 3D und FEM.
            </p>

            <button onClick={() => setShowNews(false)} style={{
              width: '100%', padding: '.75rem', borderRadius: '10px', border: 'none',
              background: '#e02020', color: '#fff', fontWeight: 700, fontSize: '.95rem', cursor: 'pointer',
            }}>Verstanden</button>
          </div>
        </div>
      )}
    </div>
  )
}
