'use client'
// ── Login del panel admin ──────────────────────────────────
// El password se verifica contra ADMIN_PASSWORD del .env / Vercel
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function StudioLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const router = useRouter()

  // Si ya hay sesión activa, ir al dashboard
  useEffect(() => {
    fetch('/api/studio-auth')
      .then(r => r.json())
      .then(d => { if (d.authenticated) router.push('/studio/dashboard') })
      .catch(() => {})
  }, [])

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

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0a0a0a',
      padding: '1rem',
    }}>
      <div style={{
        width: '100%', maxWidth: '360px',
        background: '#111',
        border: '1px solid #1e1e1e',
        borderRadius: '14px',
        padding: '2.4rem',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <strong style={{ display: 'block', fontSize: '1.4rem', fontWeight: 900, color: '#f0f0f0' }}>
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
