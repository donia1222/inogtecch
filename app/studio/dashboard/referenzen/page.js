'use client'
// ── Editor: Referenzen (Kunden-Logos + Partner) ─────────────
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
    } catch { alert('Fehler beim Hochladen') } finally { setUploading(false) }
  }
  return (
    <div className="s-form-group">
      <label className="s-label">{label}</label>
      {value ? <img src={value} alt="" className="s-img-preview" /> : <div className="s-img-empty">Kein Bild</div>}
      <input className="s-input" value={value || ''} onChange={e => onChange(e.target.value)} placeholder="/assets/logo.jpg" style={{ marginBottom: '.3rem' }} />
      <input type="file" accept="image/*" onChange={handleFile} className="s-file-input" />
      {uploading && <span style={{ fontSize: '.72rem', color: '#777' }}>Hochladen…</span>}
    </div>
  )
}

/* ════════════════════════════════════════════════════════════
   TAB: REFERENZEN (Kunden-Logos)
════════════════════════════════════════════════════════════ */
function ReferenzenTab() {
  const [items, setItems]       = useState([])
  const [editId, setEditId]     = useState(null)
  const [editData, setEditData] = useState({})
  const [newData, setNewData]   = useState({ img_url: '', alt_text: '' })
  const [showAdd, setShowAdd]   = useState(false)
  const [toast, show]           = useToast()

  useEffect(() => { apiGet('referenzen.php').then(setItems).catch(() => {}) }, [])

  function startEdit(r) { setEditId(r.id); setEditData({ ...r }) }

  async function saveEdit() {
    try {
      await apiPut(`referenzen.php?id=${editId}`, { ...editData, sort_order: items.find(i => i.id === editId)?.sort_order ?? 0 })
      setItems(items.map(i => i.id === editId ? { ...i, ...editData } : i))
      setEditId(null); show('Gespeichert')
    } catch { show('Fehler', 'err') }
  }

  async function del(id) {
    if (!confirm('Referenz löschen?')) return
    try { await apiDelete(`referenzen.php?id=${id}`); setItems(items.filter(i => i.id !== id)); show('Gelöscht') }
    catch { show('Fehler', 'err') }
  }

  async function add() {
    if (!newData.img_url.trim()) return
    try {
      const res = await apiPost('referenzen.php', { ...newData, sort_order: items.length + 1 })
      setItems([...items, { id: res.id, ...newData, sort_order: items.length + 1 }])
      setNewData({ img_url: '', alt_text: '' }); setShowAdd(false); show('Hinzugefügt')
    } catch { show('Fehler', 'err') }
  }

  return (
    <>
      <Toast {...toast} />
      <div className="s-card">
        <div className="s-card-title">Kunden-Logos ({items.length})</div>
        <div className="s-table-wrap">
          <table className="s-table">
            <thead><tr><th>Logo</th><th>URL</th><th>Alt-Text</th><th>Aktionen</th></tr></thead>
            <tbody>
              {items.map(item => editId === item.id ? (
                <tr key={item.id}>
                  <td><ImageInput label="" value={editData.img_url || ''} onChange={v => setEditData(d => ({ ...d, img_url: v }))} /></td>
                  <td style={{ fontSize: '.74rem', color: '#555' }}>{editData.img_url}</td>
                  <td><input className="s-input" value={editData.alt_text || ''} onChange={e => setEditData(d => ({ ...d, alt_text: e.target.value }))} /></td>
                  <td className="s-table-actions">
                    <button className="s-btn s-btn-primary s-btn-sm" onClick={saveEdit}>OK</button>
                    <button className="s-btn s-btn-secondary s-btn-sm" onClick={() => setEditId(null)}>✕</button>
                  </td>
                </tr>
              ) : (
                <tr key={item.id}>
                  <td><img src={item.img_url} alt={item.alt_text} /></td>
                  <td style={{ fontSize: '.74rem', color: '#555', maxWidth: '180px', wordBreak: 'break-all' }}>{item.img_url}</td>
                  <td style={{ color: '#666' }}>{item.alt_text}</td>
                  <td className="s-table-actions">
                    <button className="s-btn s-btn-secondary s-btn-sm" onClick={() => startEdit(item)}>Bearbeiten</button>
                    <button className="s-btn s-btn-danger s-btn-sm" onClick={() => del(item.id)}>Löschen</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <hr className="s-divider" />
        <button className="s-btn s-btn-secondary" onClick={() => setShowAdd(!showAdd)}>{showAdd ? '✕ Abbrechen' : '+ Logo hinzufügen'}</button>
        {showAdd && (
          <div className="s-edit-row" style={{ marginTop: '1rem' }}>
            <div className="s-card-title">Neues Kunden-Logo</div>
            <ImageInput label="Logo" value={newData.img_url} onChange={v => setNewData(d => ({ ...d, img_url: v }))} />
            <div className="s-form-group">
              <label className="s-label">Unternehmensname (Alt-Text)</label>
              <input className="s-input" value={newData.alt_text} onChange={e => setNewData(d => ({ ...d, alt_text: e.target.value }))} placeholder="z.B. Leica Geosystems" />
            </div>
            <button className="s-btn s-btn-primary" onClick={add}>Logo hinzufügen</button>
          </div>
        )}
      </div>
    </>
  )
}

/* ════════════════════════════════════════════════════════════
   TAB: PARTNER
════════════════════════════════════════════════════════════ */
function PartnerTab() {
  const [items, setItems]       = useState([])
  const [editId, setEditId]     = useState(null)
  const [editData, setEditData] = useState({})
  const [newData, setNewData]   = useState({ img_url: '', name: '', desc_text: '' })
  const [showAdd, setShowAdd]   = useState(false)
  const [toast, show]           = useToast()

  useEffect(() => { apiGet('partners.php').then(setItems).catch(() => {}) }, [])

  function startEdit(p) { setEditId(p.id); setEditData({ ...p }) }

  async function saveEdit() {
    try {
      await apiPut(`partners.php?id=${editId}`, { ...editData, sort_order: items.find(i => i.id === editId)?.sort_order ?? 0 })
      setItems(items.map(i => i.id === editId ? { ...i, ...editData } : i))
      setEditId(null); show('Gespeichert')
    } catch { show('Fehler', 'err') }
  }

  async function del(id) {
    if (!confirm('Partner löschen?')) return
    try { await apiDelete(`partners.php?id=${id}`); setItems(items.filter(i => i.id !== id)); show('Gelöscht') }
    catch { show('Fehler', 'err') }
  }

  async function add() {
    if (!newData.name.trim() || !newData.img_url.trim()) return
    try {
      const res = await apiPost('partners.php', { ...newData, sort_order: items.length + 1 })
      setItems([...items, { id: res.id, ...newData, sort_order: items.length + 1 }])
      setNewData({ img_url: '', name: '', desc_text: '' }); setShowAdd(false); show('Hinzugefügt')
    } catch { show('Fehler', 'err') }
  }

  return (
    <>
      <Toast {...toast} />
      <div className="s-card">
        <div className="s-card-title">Partner ({items.length})</div>
        <div className="s-table-wrap">
          <table className="s-table">
            <thead><tr><th>Logo</th><th>Name</th><th>Beschreibung</th><th>Aktionen</th></tr></thead>
            <tbody>
              {items.map(item => editId === item.id ? (
                <tr key={item.id}>
                  <td><ImageInput label="" value={editData.img_url || ''} onChange={v => setEditData(d => ({ ...d, img_url: v }))} /></td>
                  <td><input className="s-input" value={editData.name || ''} onChange={e => setEditData(d => ({ ...d, name: e.target.value }))} /></td>
                  <td><input className="s-input" value={editData.desc_text || ''} onChange={e => setEditData(d => ({ ...d, desc_text: e.target.value }))} /></td>
                  <td className="s-table-actions">
                    <button className="s-btn s-btn-primary s-btn-sm" onClick={saveEdit}>OK</button>
                    <button className="s-btn s-btn-secondary s-btn-sm" onClick={() => setEditId(null)}>✕</button>
                  </td>
                </tr>
              ) : (
                <tr key={item.id}>
                  <td><img src={item.img_url} alt={item.name} /></td>
                  <td style={{ fontWeight: 600 }}>{item.name}</td>
                  <td style={{ color: '#555', fontSize: '.78rem' }}>{item.desc_text}</td>
                  <td className="s-table-actions">
                    <button className="s-btn s-btn-secondary s-btn-sm" onClick={() => startEdit(item)}>Bearbeiten</button>
                    <button className="s-btn s-btn-danger s-btn-sm" onClick={() => del(item.id)}>Löschen</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <hr className="s-divider" />
        <button className="s-btn s-btn-secondary" onClick={() => setShowAdd(!showAdd)}>{showAdd ? '✕ Abbrechen' : '+ Partner hinzufügen'}</button>
        {showAdd && (
          <div className="s-edit-row" style={{ marginTop: '1rem' }}>
            <div className="s-card-title">Neuer Partner</div>
            <ImageInput label="Logo" value={newData.img_url} onChange={v => setNewData(d => ({ ...d, img_url: v }))} />
            <div className="s-grid-2">
              <div className="s-form-group">
                <label className="s-label">Name</label>
                <input className="s-input" value={newData.name} onChange={e => setNewData(d => ({ ...d, name: e.target.value }))} placeholder="z.B. RMB AG" />
              </div>
              <div className="s-form-group">
                <label className="s-label">Beschreibung</label>
                <input className="s-input" value={newData.desc_text} onChange={e => setNewData(d => ({ ...d, desc_text: e.target.value }))} placeholder="z.B. Maschinenbau · CH-Sevelen" />
              </div>
            </div>
            <button className="s-btn s-btn-primary" onClick={add}>Partner hinzufügen</button>
          </div>
        )}
      </div>
    </>
  )
}

export default function ReferenzenEditorPage() {
  const [tab, setTab] = useState('referenzen')
  const router = useRouter()

  useEffect(() => { checkAuth().then(ok => { if (!ok) router.push('/studio') }) }, [])

  return (
    <>
      <h1 className="s-page-title">Referenzen</h1>
      <p className="s-page-sub">Kunden-Logos und Partnernetzwerk verwalten</p>
      <div className="s-tabs">
        {[['referenzen', '🏆 Kunden-Logos'], ['partner', '🤝 Partner']].map(([k, l]) => (
          <button key={k} className={`s-tab${tab === k ? ' s-active' : ''}`} onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>
      {tab === 'referenzen' && <ReferenzenTab />}
      {tab === 'partner'    && <PartnerTab />}
    </>
  )
}
