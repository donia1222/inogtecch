'use client'
// ── Editor: FEM (Inhalt + Vorteile) ───────────────────────
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { API, checkAuth, apiGet, apiPost, apiPut, apiDelete } from '@/lib/api'

function Toast({ msg, type }) {
  if (!msg) return null
  return <div className={`s-toast ${type === 'ok' ? 's-toast-ok' : 's-toast-err'}`}>{msg}</div>
}
function useToast() {
  const [t, setT] = useState({ msg: '', type: '' })
  function show(msg, type = 'ok') { setT({ msg, type }); setTimeout(() => setT({ msg: '', type: '' }), 3000) }
  return [t, show]
}
function ImageInput({ label, value, onChange }) {
  const [uploading, setUploading] = useState(false)
  async function handleFile(e) {
    const file = e.target.files?.[0]; if (!file) return; setUploading(true)
    try {
      const fd = new FormData(); fd.append('image', file)
      const res = await fetch(`${API}/upload.php`, { method: 'POST', credentials: 'include', body: fd })
      const data = await res.json(); if (data.url) onChange(data.url)
    } catch { alert('Fehler') } finally { setUploading(false) }
  }
  return (
    <div className="s-form-group">
      <label className="s-label">{label}</label>
      {value ? <img src={value} alt="" className="s-img-preview" /> : <div className="s-img-empty">Kein Bild</div>}
      <input className="s-input" value={value || ''} onChange={e => onChange(e.target.value)} placeholder="/assets/bild.jpg" style={{ marginBottom: '.3rem' }} />
      <input type="file" accept="image/*" onChange={handleFile} className="s-file-input" />
      {uploading && <span style={{ fontSize: '.72rem', color: '#777' }}>Hochladen…</span>}
    </div>
  )
}

/* ════════════════════════════════════════════════════════════
   TAB: INHALT
════════════════════════════════════════════════════════════ */
function InhaltTab() {
  const [data, setData] = useState(null)
  const [toast, show]   = useToast()

  useEffect(() => { apiGet('fem.php').then(d => setData(d.content)).catch(() => {}) }, [])

  function set(field, val) { setData(d => ({ ...d, [field]: val })) }

  async function save() {
    try   { await apiPut('fem.php', data); show('Gespeichert') }
    catch { show('Fehler', 'err') }
  }

  if (!data) return <div className="s-loading">Wird geladen…</div>

  return (
    <>
      <Toast {...toast} />
      <div className="s-card">
        <div className="s-card-title">Bild & Badge</div>
        <ImageInput label="FEM Bild" value={data.img_url || ''} onChange={v => set('img_url', v)} />
        <div className="s-grid-2">
          <div className="s-form-group">
            <label className="s-label">Alt-Text Bild</label>
            <input className="s-input" value={data.img_alt || ''} onChange={e => set('img_alt', e.target.value)} />
          </div>
          <div className="s-form-group">
            <label className="s-label">Badge-Text (über dem Bild)</label>
            <input className="s-input" value={data.img_badge || ''} onChange={e => set('img_badge', e.target.value)} />
          </div>
        </div>
      </div>
      <div className="s-card">
        <div className="s-card-title">Texte</div>
        <div className="s-grid-2">
          <div className="s-form-group">
            <label className="s-label">Tag</label>
            <input className="s-input" value={data.tag || ''} onChange={e => set('tag', e.target.value)} />
          </div>
          <div className="s-form-group">
            <label className="s-label">Titel</label>
            <input className="s-input" value={data.title || ''} onChange={e => set('title', e.target.value)} />
          </div>
        </div>
        {['text1', 'text2', 'text3', 'text4'].map((f, i) => (
          <div className="s-form-group" key={f}>
            <label className="s-label">Absatz {i + 1}</label>
            <textarea className="s-textarea" rows={4} value={data[f] || ''} onChange={e => set(f, e.target.value)} />
          </div>
        ))}
      </div>
      <div className="s-btn-row">
        <button className="s-btn s-btn-primary" onClick={save}>Speichern</button>
      </div>
    </>
  )
}

/* ════════════════════════════════════════════════════════════
   TAB: VORTEILE
════════════════════════════════════════════════════════════ */
function VorteileTab() {
  const [items, setItems]   = useState([])
  const [editId, setEditId] = useState(null)
  const [editTxt, setEditTxt] = useState('')
  const [newTxt, setNewTxt]   = useState('')
  const [toast, show]         = useToast()

  useEffect(() => { apiGet('fem.php').then(d => setItems(d.benefits || [])).catch(() => {}) }, [])

  async function saveEdit(id) {
    try {
      await apiPut(`fem_benefits.php?id=${id}`, { text: editTxt, sort_order: items.find(i => i.id === id)?.sort_order ?? 0 })
      setItems(items.map(i => i.id === id ? { ...i, text: editTxt } : i))
      setEditId(null); show('Gespeichert')
    } catch { show('Fehler', 'err') }
  }

  async function del(id) {
    if (!confirm('Vorteil löschen?')) return
    try { await apiDelete(`fem_benefits.php?id=${id}`); setItems(items.filter(i => i.id !== id)); show('Gelöscht') }
    catch { show('Fehler', 'err') }
  }

  async function add() {
    if (!newTxt.trim()) return
    try {
      const res = await apiPost('fem_benefits.php', { text: newTxt })
      setItems([...items, { id: res.id, text: newTxt, sort_order: items.length + 1 }])
      setNewTxt(''); show('Hinzugefügt')
    } catch { show('Fehler', 'err') }
  }

  return (
    <>
      <Toast {...toast} />
      <div className="s-card">
        <div className="s-card-title">FEM-Vorteile ({items.length})</div>
        <div className="s-table-wrap">
          <table className="s-table">
            <thead><tr><th>#</th><th>Text</th><th>Aktionen</th></tr></thead>
            <tbody>
              {items.map((item, idx) => editId === item.id ? (
                <tr key={item.id}>
                  <td>{idx + 1}</td>
                  <td><input className="s-input" value={editTxt} onChange={e => setEditTxt(e.target.value)} onKeyDown={e => e.key === 'Enter' && saveEdit(item.id)} /></td>
                  <td className="s-table-actions">
                    <button className="s-btn s-btn-primary s-btn-sm" onClick={() => saveEdit(item.id)}>OK</button>
                    <button className="s-btn s-btn-secondary s-btn-sm" onClick={() => setEditId(null)}>✕</button>
                  </td>
                </tr>
              ) : (
                <tr key={item.id}>
                  <td style={{ color: '#444' }}>{idx + 1}</td>
                  <td>{item.text}</td>
                  <td className="s-table-actions">
                    <button className="s-btn s-btn-secondary s-btn-sm" onClick={() => { setEditId(item.id); setEditTxt(item.text) }}>Bearbeiten</button>
                    <button className="s-btn s-btn-danger s-btn-sm" onClick={() => del(item.id)}>Löschen</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <hr className="s-divider" />
        <div style={{ display: 'flex', gap: '.5rem' }}>
          <input className="s-input" value={newTxt} onChange={e => setNewTxt(e.target.value)} placeholder="Neuer Vorteil…" onKeyDown={e => e.key === 'Enter' && add()} />
          <button className="s-btn s-btn-primary" onClick={add}>Hinzufügen</button>
        </div>
      </div>
    </>
  )
}

export default function FEMEditorPage() {
  const [tab, setTab] = useState('inhalt')
  const router = useRouter()

  useEffect(() => { checkAuth().then(ok => { if (!ok) router.push('/studio') }) }, [])

  return (
    <>
      <h1 className="s-page-title">FEM</h1>
      <p className="s-page-sub">FEM-Seiteninhalt und Vorteilsliste bearbeiten</p>
      <div className="s-tabs">
        {[['inhalt', '📊 Inhalt'], ['vorteile', '✅ Vorteile']].map(([k, l]) => (
          <button key={k} className={`s-tab${tab === k ? ' s-active' : ''}`} onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>
      {tab === 'inhalt'   && <InhaltTab />}
      {tab === 'vorteile' && <VorteileTab />}
    </>
  )
}
