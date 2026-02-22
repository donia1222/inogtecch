'use client'
// ── Editor: Projekte & Galerie ──────────────────────────────
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
      <input className="s-input" value={value || ''} onChange={e => onChange(e.target.value)} placeholder="/assets/bild.jpg" style={{ marginBottom: '.3rem' }} />
      <input type="file" accept="image/*" onChange={handleFile} className="s-file-input" />
      {uploading && <span style={{ fontSize: '.72rem', color: '#777' }}>Hochladen…</span>}
    </div>
  )
}

const emptyProj = { img_url: '', alt_text: '', category: '', title: '', client: '' }
const emptyGal  = { img_url: '', alt_text: '' }

/* ════════════════════════════════════════════════════════════
   TAB: PROJEKTE
════════════════════════════════════════════════════════════ */
function ProjekteTab() {
  const [items, setItems]       = useState([])
  const [editId, setEditId]     = useState(null)
  const [editData, setEditData] = useState({})
  const [newData, setNewData]   = useState(emptyProj)
  const [showAdd, setShowAdd]   = useState(false)
  const [toast, show]           = useToast()

  useEffect(() => { apiGet('projekte.php').then(setItems).catch(() => {}) }, [])

  function startEdit(p) { setEditId(p.id); setEditData({ ...p }) }

  async function saveEdit() {
    try {
      await apiPut(`projekte.php?id=${editId}`, { ...editData, sort_order: items.find(i => i.id === editId)?.sort_order ?? 0 })
      setItems(items.map(i => i.id === editId ? { ...i, ...editData } : i))
      setEditId(null); show('Gespeichert')
    } catch { show('Fehler', 'err') }
  }

  async function del(id) {
    if (!confirm('Projekt löschen?')) return
    try { await apiDelete(`projekte.php?id=${id}`); setItems(items.filter(i => i.id !== id)); show('Gelöscht') }
    catch { show('Fehler', 'err') }
  }

  async function add() {
    if (!newData.title.trim() || !newData.img_url.trim()) return
    try {
      const res = await apiPost('projekte.php', { ...newData, sort_order: items.length + 1 })
      setItems([...items, { id: res.id, ...newData, sort_order: items.length + 1 }])
      setNewData(emptyProj); setShowAdd(false); show('Hinzugefügt')
    } catch { show('Fehler', 'err') }
  }

  return (
    <>
      <Toast {...toast} />
      <div className="s-card">
        <div className="s-card-title">Projekte ({items.length})</div>
        <div className="s-table-wrap">
          <table className="s-table">
            <thead><tr><th>Bild</th><th>Titel</th><th>Kategorie</th><th>Kunde</th><th>Aktionen</th></tr></thead>
            <tbody>
              {items.map(item => editId === item.id ? (
                <tr key={item.id}>
                  <td>
                    <ImageInput label="" value={editData.img_url || ''} onChange={v => setEditData(d => ({ ...d, img_url: v }))} />
                  </td>
                  <td>
                    <input className="s-input" value={editData.title || ''} onChange={e => setEditData(d => ({ ...d, title: e.target.value }))} placeholder="Titel" style={{ marginBottom: '.3rem' }} />
                    <input className="s-input" value={editData.alt_text || ''} onChange={e => setEditData(d => ({ ...d, alt_text: e.target.value }))} placeholder="Alt-Text" />
                  </td>
                  <td><input className="s-input" value={editData.category || ''} onChange={e => setEditData(d => ({ ...d, category: e.target.value }))} placeholder="Kategorie" /></td>
                  <td><input className="s-input" value={editData.client || ''} onChange={e => setEditData(d => ({ ...d, client: e.target.value }))} placeholder="Kunde" /></td>
                  <td className="s-table-actions">
                    <button className="s-btn s-btn-primary s-btn-sm" onClick={saveEdit}>OK</button>
                    <button className="s-btn s-btn-secondary s-btn-sm" onClick={() => setEditId(null)}>✕</button>
                  </td>
                </tr>
              ) : (
                <tr key={item.id}>
                  <td><img src={item.img_url} alt={item.alt_text} /></td>
                  <td style={{ fontWeight: 600, maxWidth: '200px', fontSize: '.82rem' }}>{item.title}</td>
                  <td style={{ color: '#555', fontSize: '.78rem' }}>{item.category}</td>
                  <td style={{ color: '#555', fontSize: '.78rem' }}>{item.client}</td>
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
        <button className="s-btn s-btn-secondary" onClick={() => setShowAdd(!showAdd)}>
          {showAdd ? '✕ Abbrechen' : '+ Neues Projekt'}
        </button>
        {showAdd && (
          <div className="s-edit-row" style={{ marginTop: '1rem' }}>
            <div className="s-card-title">Neues Projekt</div>
            <ImageInput label="Bild" value={newData.img_url} onChange={v => setNewData(d => ({ ...d, img_url: v }))} />
            <div className="s-grid-2">
              <div className="s-form-group">
                <label className="s-label">Titel</label>
                <input className="s-input" value={newData.title} onChange={e => setNewData(d => ({ ...d, title: e.target.value }))} />
              </div>
              <div className="s-form-group">
                <label className="s-label">Alt-Text</label>
                <input className="s-input" value={newData.alt_text} onChange={e => setNewData(d => ({ ...d, alt_text: e.target.value }))} />
              </div>
            </div>
            <div className="s-grid-2">
              <div className="s-form-group">
                <label className="s-label">Kategorie</label>
                <input className="s-input" value={newData.category} onChange={e => setNewData(d => ({ ...d, category: e.target.value }))} placeholder="z.B. Vakuumtechnik · Sputtering" />
              </div>
              <div className="s-form-group">
                <label className="s-label">Kunde</label>
                <input className="s-input" value={newData.client} onChange={e => setNewData(d => ({ ...d, client: e.target.value }))} placeholder="z.B. Firma AG · CH-Ort" />
              </div>
            </div>
            <button className="s-btn s-btn-primary" onClick={add}>Projekt hinzufügen</button>
          </div>
        )}
      </div>
    </>
  )
}

/* ════════════════════════════════════════════════════════════
   TAB: GALERIE
════════════════════════════════════════════════════════════ */
function GalerieTab() {
  const [items, setItems]       = useState([])
  const [editId, setEditId]     = useState(null)
  const [editData, setEditData] = useState({})
  const [newData, setNewData]   = useState(emptyGal)
  const [showAdd, setShowAdd]   = useState(false)
  const [toast, show]           = useToast()

  useEffect(() => { apiGet('gallery.php').then(setItems).catch(() => {}) }, [])

  function startEdit(g) { setEditId(g.id); setEditData({ ...g }) }

  async function saveEdit() {
    try {
      await apiPut(`gallery.php?id=${editId}`, { ...editData, sort_order: items.find(i => i.id === editId)?.sort_order ?? 0 })
      setItems(items.map(i => i.id === editId ? { ...i, ...editData } : i))
      setEditId(null); show('Gespeichert')
    } catch { show('Fehler', 'err') }
  }

  async function del(id) {
    if (!confirm('Bild löschen?')) return
    try { await apiDelete(`gallery.php?id=${id}`); setItems(items.filter(i => i.id !== id)); show('Gelöscht') }
    catch { show('Fehler', 'err') }
  }

  async function add() {
    if (!newData.img_url.trim()) return
    try {
      const res = await apiPost('gallery.php', { ...newData, sort_order: items.length + 1 })
      setItems([...items, { id: res.id, ...newData, sort_order: items.length + 1 }])
      setNewData(emptyGal); setShowAdd(false); show('Hinzugefügt')
    } catch { show('Fehler', 'err') }
  }

  return (
    <>
      <Toast {...toast} />
      <div className="s-card">
        <div className="s-card-title">Galerie ({items.length} Bilder)</div>
        <div className="s-table-wrap">
          <table className="s-table">
            <thead><tr><th>Bild</th><th>URL</th><th>Alt-Text</th><th>Aktionen</th></tr></thead>
            <tbody>
              {items.map(item => editId === item.id ? (
                <tr key={item.id}>
                  <td>
                    <ImageInput label="" value={editData.img_url || ''} onChange={v => setEditData(d => ({ ...d, img_url: v }))} />
                  </td>
                  <td style={{ fontSize: '.75rem', color: '#555' }}>{editData.img_url}</td>
                  <td><input className="s-input" value={editData.alt_text || ''} onChange={e => setEditData(d => ({ ...d, alt_text: e.target.value }))} /></td>
                  <td className="s-table-actions">
                    <button className="s-btn s-btn-primary s-btn-sm" onClick={saveEdit}>OK</button>
                    <button className="s-btn s-btn-secondary s-btn-sm" onClick={() => setEditId(null)}>✕</button>
                  </td>
                </tr>
              ) : (
                <tr key={item.id}>
                  <td><img src={item.img_url} alt={item.alt_text} /></td>
                  <td style={{ fontSize: '.74rem', color: '#555', maxWidth: '200px', wordBreak: 'break-all' }}>{item.img_url}</td>
                  <td style={{ color: '#666', fontSize: '.8rem' }}>{item.alt_text}</td>
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
        <button className="s-btn s-btn-secondary" onClick={() => setShowAdd(!showAdd)}>
          {showAdd ? '✕ Abbrechen' : '+ Bild hinzufügen'}
        </button>
        {showAdd && (
          <div className="s-edit-row" style={{ marginTop: '1rem' }}>
            <div className="s-card-title">Neues Galeriebild</div>
            <ImageInput label="Bild" value={newData.img_url} onChange={v => setNewData(d => ({ ...d, img_url: v }))} />
            <div className="s-form-group">
              <label className="s-label">Alt-Text</label>
              <input className="s-input" value={newData.alt_text} onChange={e => setNewData(d => ({ ...d, alt_text: e.target.value }))} placeholder="Bildbeschreibung" />
            </div>
            <button className="s-btn s-btn-primary" onClick={add}>Bild hinzufügen</button>
          </div>
        )}
      </div>
    </>
  )
}

/* ════════════════════════════════════════════════════════════
   PÁGINA PRINCIPAL
════════════════════════════════════════════════════════════ */
export default function ProjekteEditorPage() {
  const [tab, setTab] = useState('projekte')
  const router = useRouter()

  useEffect(() => { checkAuth().then(ok => { if (!ok) router.push('/studio') }) }, [])

  return (
    <>
      <h1 className="s-page-title">Projekte & Galerie</h1>
      <p className="s-page-sub">Projektkarten und Bildergalerie verwalten</p>
      <div className="s-tabs">
        {[['projekte', '🏗️ Projekte'], ['galerie', '🖼️ Galerie']].map(([k, l]) => (
          <button key={k} className={`s-tab${tab === k ? ' s-active' : ''}`} onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>
      {tab === 'projekte' && <ProjekteTab />}
      {tab === 'galerie'  && <GalerieTab />}
    </>
  )
}
