'use client'
// ── Dashboard — Übersicht ──────────────────────────────────
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { checkAuth, apiGet, apiPut } from '@/lib/api'
import { FieldStylesProvider, useFieldStyles } from '@/app/studio/ve'

function LogoEditor() {
  const [titel, setTitel] = useState('')
  const [sub, setSub] = useState('')
  const [heroData, setHeroData] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    apiGet('hero.php').then(d => {
      setHeroData(d)
      setTitel(d.eyebrow || 'iNOTEC')
      setSub(d.eyebrow_sub || 'ENGINEERING')
      setLoaded(true)
    }).catch(() => {})
  }, [])

  async function save() {
    try {
      await apiPut('hero.php', { ...heroData, eyebrow: titel, eyebrow_sub: sub })
      setHeroData(prev => ({ ...prev, eyebrow: titel, eyebrow_sub: sub }))
      setMsg('Gespeichert')
      setTimeout(() => setMsg(''), 2000)
    } catch { setMsg('Fehler') }
  }

  if (!loaded) return null

  return null
}

const sections = [
  { href: '/studio/dashboard/home',       icon: '🏠', title: 'Startseite',          desc: 'Hero, Ticker & Erfahrung bearbeiten' },
  { href: '/studio/dashboard/leistungen', icon: '📋', title: 'Leistungen',           desc: '6 Kernkompetenzen verwalten' },
  { href: '/studio/dashboard/fem',        icon: '📊', title: 'FEM',                  desc: 'FEM-Inhalt & Vorteilsliste' },
  { href: '/studio/dashboard/3d',         icon: '🖥️', title: '3D ',  desc: 'Texte & Bilder der 3D-Seite' },
  { href: '/studio/dashboard/prozess',    icon: '⚙️', title: 'Prozess',              desc: '8 Prozessschritte bearbeiten' },
  { href: '/studio/dashboard/projekte',   icon: '🏗️', title: 'Projekte',   desc: '19 Projekte + Bildergalerie' },
  { href: '/studio/dashboard/referenzen', icon: '🏆', title: 'Referenzen',           desc: '24 Kunden-Logos & 6 Partner' },
]

function LogoStylePicker({ label = '', styleKey }) {
  const [open, setOpen] = useState(false)
  const { styles, set, save } = useFieldStyles()
  const s = styles[styleKey] || {}
  const hasStyle = s?.font_size || s?.font_family
  async function saveStyle() { try { await save(styleKey) } catch {} }

  return (
    <div style={{ marginBottom: '.6rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
        <span style={{ fontSize: '.8rem', fontWeight: 600, color: '#555', flex: 1 }}>{label}</span>
        <button onClick={() => setOpen(!open)} style={{
          background: hasStyle ? 'rgba(224,32,32,.15)' : '#f0f0f0',
          border: hasStyle ? '1px solid rgba(224,32,32,.3)' : '1px solid #ddd',
          borderRadius: '5px', width: '24px', height: '20px', cursor: 'pointer',
          fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: hasStyle ? '#e02020' : '#666',
        }}>🎨</button>
      </div>
      {open && (
        <div style={{ display: 'flex', gap: '.5rem', alignItems: 'center', padding: '.4rem .6rem', background: '#f5f5f5', border: '1px solid #ddd', borderRadius: '7px', flexWrap: 'wrap', marginTop: '.3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.3rem' }}>
            <span style={{ fontSize: '.62rem', color: '#888' }}>Gr.</span>
            <select value={s?.font_size || ''} onChange={e => { set(styleKey, 'font_size', e.target.value); setTimeout(saveStyle, 50) }}
              style={{ background: '#fff', border: '1px solid #ccc', borderRadius: '4px', color: '#333', fontSize: '.7rem', padding: '.15rem .3rem', cursor: 'pointer', outline: 'none' }}>
              <option value="">Auto</option><option value="0.7rem">XS</option><option value="0.8rem">S</option><option value="0.9rem">M</option><option value="1rem">L</option><option value="1.15rem">XL</option><option value="1.4rem">2XL</option><option value="1.8rem">3XL</option><option value="2.2rem">4XL</option>
            </select>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.3rem' }}>
            <span style={{ fontSize: '.62rem', color: '#888' }}>Font</span>
            <select value={s?.font_family || ''} onChange={e => { set(styleKey, 'font_family', e.target.value); setTimeout(saveStyle, 50) }}
              style={{ background: '#fff', border: '1px solid #ccc', borderRadius: '4px', color: '#333', fontSize: '.7rem', padding: '.15rem .3rem', cursor: 'pointer', outline: 'none' }}>
              <option value="">Standard</option><option value="Separat, sans-serif">Separat</option><option value="Georgia, serif">Georgia</option><option value="Arial Black, sans-serif">Arial Black</option><option value="Courier New, monospace">Courier New</option>
            </select>
          </div>
        </div>
      )}
    </div>
  )
}

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    checkAuth().then(ok => { if (!ok) router.push('/studio') })
  }, [])

  return (
    <FieldStylesProvider>
    <>
      <h1 className="s-page-title">Willkommen im Studio</h1>
      <p className="s-page-sub">Wählen Sie einen Bereich aus, um Inhalte zu bearbeiten.</p>

      <LogoEditor />

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
    </FieldStylesProvider>
  )
}
