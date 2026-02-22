'use client'
// ── Dashboard — Übersicht ──────────────────────────────────
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { checkAuth } from '@/lib/api'

const sections = [
  { href: '/studio/dashboard/home',       icon: '🏠', title: 'Startseite',          desc: 'Hero, Ticker & Erfahrung bearbeiten' },
  { href: '/studio/dashboard/leistungen', icon: '📋', title: 'Leistungen',           desc: '6 Kernkompetenzen verwalten' },
  { href: '/studio/dashboard/projekte',   icon: '🏗️', title: 'Projekte & Galerie',   desc: '19 Projekte + Bildergalerie' },
  { href: '/studio/dashboard/prozess',    icon: '⚙️', title: 'Prozess',              desc: '8 Prozessschritte bearbeiten' },
  { href: '/studio/dashboard/referenzen', icon: '🏆', title: 'Referenzen',           desc: '24 Kunden-Logos & 6 Partner' },
  { href: '/studio/dashboard/3d',         icon: '🖥️', title: '3D & Visualisierung',  desc: 'Texte & Bilder der 3D-Seite' },
  { href: '/studio/dashboard/fem',        icon: '📊', title: 'FEM',                  desc: 'FEM-Inhalt & Vorteilsliste' },
]

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    checkAuth().then(ok => { if (!ok) router.push('/studio') })
  }, [])

  return (
    <>
      <h1 className="s-page-title">Willkommen im Studio</h1>
      <p className="s-page-sub">Wählen Sie einen Bereich aus, um Inhalte zu bearbeiten.</p>
      <div className="s-overview-grid">
        {sections.map(({ href, icon, title, desc }) => (
          <Link key={href} href={href} className="s-overview-card">
            <div className="s-overview-card-icon">{icon}</div>
            <div className="s-overview-card-title">{title}</div>
            <div className="s-overview-card-desc">{desc}</div>
          </Link>
        ))}

      </div>
    </>
  )
}
