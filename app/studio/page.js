'use client'
// ── Login del panel admin ──────────────────────────────────
// El password se verifica contra ADMIN_PASSWORD del .env / Vercel
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function StudioLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const [light, setLight]       = useState(true)
  const router = useRouter()

  useEffect(() => {
    const saved = localStorage.getItem('studio_theme2')
    setLight(saved !== 'dark')
  }, [])

  // Si ya hay sesión activa, ir al dashboard
  useEffect(() => {
    fetch('/api/studio-auth')
      .then(r => r.json())
      .then(d => { if (d.authenticated) router.push('/studio/dashboard') })
      .catch(() => {})
  }, [])

  function toggleTheme() {
    const next = !light
    setLight(next)
    localStorage.setItem('studio_theme2', next ? 'light' : 'dark')
  }

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res  = await fetch('/api/studio-auth', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ password }),
      })
      const data = await res.json()
      if (data.authenticated) {
        if (data.token) window.sessionStorage.setItem('studio_token', data.token)
        router.push('/studio/dashboard')
      } else {
        setError(data.error || 'Falsches Passwort')
      }
    } catch {
      setError('Verbindungsfehler. Bitte erneut versuchen.')
    } finally {
      setLoading(false)
    }
  }

  const bg    = light ? '#f4f5f7' : '#0a0a0a'
  const card  = light ? '#ffffff' : '#111'
  const bord  = light ? '#e0e3e8' : '#1e1e1e'
  const title = light ? '#1a1a1a' : '#f0f0f0'

  return (
    <div data-lm={light ? 'light' : undefined} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: bg, padding: '1rem', position: 'relative' }}>

      {/* Toggle tema */}
      <button
        onClick={toggleTheme}
        style={{
          position: 'fixed', top: '1rem', right: '1rem',
          background: light ? '#e8eaf0' : '#1a1f2e',
          border: `1px solid ${light ? '#d0d5e0' : '#2a3147'}`,
          borderRadius: '8px', padding: '.4rem .7rem',
          cursor: 'pointer', fontSize: '1rem',
          color: light ? '#4a5568' : '#a0aec0',
          transition: 'all .15s',
        }}
      >
        {light ? '🌙' : '☀️'}
      </button>

      <div style={{ width: '100%', maxWidth: '360px', background: card, border: `1px solid ${bord}`, borderRadius: '14px', padding: '2.4rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <strong style={{ display: 'block', fontSize: '1.4rem', fontWeight: 900, color: title }}>
            iNOTEC
          </strong>
          <span style={{ fontSize: '.68rem', fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', color: '#e02020' }}>
            Studio — Admin Panel
          </span>
        </div>

        <form onSubmit={handleLogin}>
          <div className="s-form-group">
            <label className="s-label">Passwort</label>
            <input
              type="password"
              className="s-input"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Admin-Passwort eingeben"
              required
              autoFocus
              style={{ borderColor: error ? '#5a1a1a' : undefined }}
            />
          </div>

          {error && (
            <div style={{
              background: '#2b0d0d', border: '1px solid #5a1a1a',
              color: '#f87171', padding: '.6rem .85rem',
              borderRadius: '7px', fontSize: '.8rem', marginBottom: '.9rem',
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="s-btn s-btn-primary"
            disabled={loading}
            style={{ width: '100%', justifyContent: 'center', padding: '.65rem' }}
          >
            {loading ? 'Wird angemeldet…' : 'Anmelden'}
          </button>
        </form>
      </div>
    </div>
  )
}
