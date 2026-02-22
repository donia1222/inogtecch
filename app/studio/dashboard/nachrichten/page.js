'use client'
// ── Nachrichten — Kontaktformular-Eingänge ─────────────────
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { checkAuth, apiGet, apiPut, apiDelete } from '@/lib/api'

function Toast({ msg, type }) {
  if (!msg) return null
  return <div className={`s-toast ${type === 'ok' ? 's-toast-ok' : 's-toast-err'}`}>{msg}</div>
}

export default function NachrichtenPage() {
  const [messages, setMessages]   = useState([])
  const [openId, setOpenId]       = useState(null)
  const [loading, setLoading]     = useState(true)
  const [toast, setToast]         = useState({ msg: '', type: '' })
  const router = useRouter()

  useEffect(() => {
    checkAuth().then(ok => {
      if (!ok) { router.push('/studio'); return }
      apiGet('contact_messages.php').then(data => {
        setMessages(Array.isArray(data) ? data : [])
        setLoading(false)
      }).catch(() => setLoading(false))
    })
  }, [])

  function show(msg, type = 'ok') {
    setToast({ msg, type })
    setTimeout(() => setToast({ msg: '', type: '' }), 3000)
  }

  async function markRead(id, is_read) {
    try {
      await apiPut(`contact_messages.php?id=${id}`, { is_read })
      setMessages(messages.map(m => m.id === id ? { ...m, is_read: is_read } : m))
    } catch { show('Fehler', 'err') }
  }

  async function del(id) {
    if (!confirm('Nachricht löschen?')) return
    try {
      await apiDelete(`contact_messages.php?id=${id}`)
      setMessages(messages.filter(m => m.id !== id))
      if (openId === id) setOpenId(null)
      show('Gelöscht')
    } catch { show('Fehler', 'err') }
  }

  function formatDate(dt) {
    if (!dt) return ''
    return new Date(dt).toLocaleString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

  const unread = messages.filter(m => !parseInt(m.is_read)).length

  if (loading) return <div className="s-loading">Wird geladen…</div>

  return (
    <>
      <Toast {...toast} />
      <h1 className="s-page-title">Nachrichten</h1>
      <p className="s-page-sub">
        {messages.length} Nachrichten insgesamt
        {unread > 0 && <span style={{ marginLeft: '.5rem', background: '#e02020', color: '#fff', fontSize: '.68rem', fontWeight: 800, padding: '.1rem .5rem', borderRadius: '999px' }}>{unread} ungelesen</span>}
      </p>

      {messages.length === 0 ? (
        <div className="s-card" style={{ textAlign: 'center', color: '#555', padding: '3rem' }}>
          Keine Nachrichten vorhanden.
        </div>
      ) : (
        <div className="s-card">
          <div className="s-table-wrap">
            <table className="s-table">
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Name</th>
                  <th>E-Mail</th>
                  <th>Datum</th>
                  <th>Aktionen</th>
                </tr>
              </thead>
              <tbody>
                {messages.map(msg => (
                  <>
                    <tr
                      key={msg.id}
                      onClick={() => {
                        setOpenId(openId === msg.id ? null : msg.id)
                        if (!parseInt(msg.is_read)) markRead(msg.id, 1)
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <td>
                        {!parseInt(msg.is_read)
                          ? <span className="s-unread" title="Ungelesen" />
                          : <span style={{ display: 'inline-block', width: '7px', height: '7px', borderRadius: '50%', background: '#2a2a2a', marginRight: '.4rem', verticalAlign: 'middle' }} />
                        }
                      </td>
                      <td style={{ fontWeight: !parseInt(msg.is_read) ? 700 : 400 }}>{msg.name}</td>
                      <td style={{ color: '#666', fontSize: '.82rem' }}>{msg.email}</td>
                      <td style={{ color: '#555', fontSize: '.8rem', whiteSpace: 'nowrap' }}>{formatDate(msg.created_at)}</td>
                      <td className="s-table-actions" onClick={e => e.stopPropagation()}>
                        <button
                          className="s-btn s-btn-secondary s-btn-sm"
                          onClick={() => markRead(msg.id, parseInt(msg.is_read) ? 0 : 1)}
                        >
                          {parseInt(msg.is_read) ? 'Ungelesen' : 'Gelesen'}
                        </button>
                        <button className="s-btn s-btn-danger s-btn-sm" onClick={() => del(msg.id)}>Löschen</button>
                      </td>
                    </tr>

                    {/* Mensaje expandido */}
                    {openId === msg.id && (
                      <tr key={`${msg.id}-detail`}>
                        <td colSpan={5}>
                          <div style={{ background: '#0d0d0d', border: '1px solid #1e1e1e', borderRadius: '8px', padding: '1.2rem', margin: '.3rem 0' }}>
                            <div style={{ display: 'flex', gap: '2rem', marginBottom: '1rem', fontSize: '.82rem', color: '#666' }}>
                              <span><strong style={{ color: '#888' }}>Name:</strong> {msg.name}</span>
                              <span><strong style={{ color: '#888' }}>E-Mail:</strong> <a href={`mailto:${msg.email}`} style={{ color: '#e02020' }}>{msg.email}</a></span>
                              {msg.phone && <span><strong style={{ color: '#888' }}>Tel:</strong> {msg.phone}</span>}
                              <span><strong style={{ color: '#888' }}>Datum:</strong> {formatDate(msg.created_at)}</span>
                            </div>
                            <div style={{ fontSize: '.88rem', color: '#ccc', lineHeight: 1.7, whiteSpace: 'pre-wrap', background: '#111', padding: '1rem', borderRadius: '6px', border: '1px solid #1e1e1e' }}>
                              {msg.message}
                            </div>
                            <div style={{ marginTop: '.8rem' }}>
                              <a href={`mailto:${msg.email}?subject=Re: Ihre Anfrage bei iNOTEC Engineering`} className="s-btn s-btn-primary s-btn-sm" style={{ textDecoration: 'none' }}>
                                ✉️ Antworten
                              </a>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  )
}
