'use client'
// ── Editor: 3D & Visualisierung ────────────────────────────
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
   TAB: INHALT (Texte)
════════════════════════════════════════════════════════════ */
function InhaltTab() {
  const [data, setData] = useState(null)
  const [toast, show]   = useToast()

  useEffect(() => { apiGet('threed.php').then(d => setData(d.content)).catch(() => {}) }, [])

  function set(field, val) { setData(d => ({ ...d, [field]: val })) }

  async function save() {
    try   { await apiPut('threed.php', data); show('Gespeichert') }
    catch { show('Fehler', 'err') }
  }

  if (!data) return <div className="s-loading">Wird geladen…</div>

  return (
    <>
      <Toast {...toast} />
      <div className="s-card">
        <div className="s-card-title">Seitenkopf</div>
        <div className="s-grid-3">
          <div className="s-form-group">
            <label className="s-label">Tag</label>
            <input className="s-input" value={data.page_tag || ''} onChange={e => set('page_tag', e.target.value)} />
          </div>
          <div className="s-form-group" style={{ gridColumn: 'span 2' }}>
            <label className="s-label">Titel</label>
            <input className="s-input" value={data.page_title || ''} onChange={e => set('page_title', e.target.value)} />
          </div>
        </div>
        <div className="s-form-group">
          <label className="s-label">Untertitel</label>
          <textarea className="s-textarea" rows={2} value={data.page_sub || ''} onChange={e => set('page_sub', e.target.value)} />
        </div>
      </div>

      <div className="s-card">
        <div className="s-card-title">Explosionszeichnung — Texte (linke Spalte)</div>
        <div className="s-grid-2">
          <div className="s-form-group">
            <label className="s-label">Tag</label>
            <input className="s-input" value={data.expl_tag || ''} onChange={e => set('expl_tag', e.target.value)} />
          </div>
          <div className="s-form-group">
            <label className="s-label">Titel</label>
            <input className="s-input" value={data.expl_title || ''} onChange={e => set('expl_title', e.target.value)} />
          </div>
        </div>
        {['expl_text1', 'expl_text2', 'expl_text3'].map((f, i) => (
          <div className="s-form-group" key={f}>
            <label className="s-label">Absatz {i + 1}</label>
            <textarea className="s-textarea" rows={3} value={data[f] || ''} onChange={e => set(f, e.target.value)} />
          </div>
        ))}
      </div>

      <div className="s-card">
        <div className="s-card-title">Animation & Visualisierung — Texte (rechte Spalte)</div>
        <div className="s-grid-2">
          <div className="s-form-group">
            <label className="s-label">Tag</label>
            <input className="s-input" value={data.anim_tag || ''} onChange={e => set('anim_tag', e.target.value)} />
          </div>
          <div className="s-form-group">
            <label className="s-label">Titel</label>
            <input className="s-input" value={data.anim_title || ''} onChange={e => set('anim_title', e.target.value)} />
          </div>
        </div>
        {['anim_text1', 'anim_text2', 'anim_text3'].map((f, i) => (
          <div className="s-form-group" key={f}>
            <label className="s-label">Absatz {i + 1}</label>
            <textarea className="s-textarea" rows={3} value={data[f] || ''} onChange={e => set(f, e.target.value)} />
          </div>
        ))}
        <div className="s-form-group">
          <label className="s-label">Zitat (Highlight-Box)</label>
          <textarea className="s-textarea" rows={2} value={data.anim_quote || ''} onChange={e => set('anim_quote', e.target.value)} />
        </div>
      </div>

      <div className="s-btn-row">
        <button className="s-btn s-btn-primary" onClick={save}>Speichern</button>
      </div>
    </>
  )
}

/* ════════════════════════════════════════════════════════════
   TAB: BILDER
════════════════════════════════════════════════════════════ */
const emptyImg = { img_url: '', alt_text: '', caption_h: '', caption_p: '', type: 'bottom' }

function BilderTab() {
  const [items, setItems]       = useState([])
  const [editId, setEditId]     = useState(null)
  const [editData, setEditData] = useState({})
  const [newData, setNewData]   = useState(emptyImg)
  const [showAdd, setShowAdd]   = useState(false)
  const [toast, show]           = useToast()

  useEffect(() => { apiGet('threed_images.php').then(setItems).catch(() => {}) }, [])

  const typeLabel = { hero_main: 'Hero Haupt', hero_small: 'Hero Klein', bottom: 'Untere Karte' }

  function startEdit(img) { setEditId(img.id); setEditData({ ...img }) }

  async function saveEdit() {
    try {
      await apiPut(`threed_images.php?id=${editId}`, { ...editData, sort_order: items.find(i => i.id === editId)?.sort_order ?? 0 })
      setItems(items.map(i => i.id === editId ? { ...i, ...editData } : i))
      setEditId(null); show('Gespeichert')
    } catch { show('Fehler', 'err') }
  }

  async function del(id) {
    if (!confirm('Bild löschen?')) return
    try { await apiDelete(`threed_images.php?id=${id}`); setItems(items.filter(i => i.id !== id)); show('Gelöscht') }
    catch { show('Fehler', 'err') }
  }

  async function add() {
    if (!newData.img_url.trim()) return
    try {
      const res = await apiPost('threed_images.php', { ...newData, sort_order: items.length + 1 })
      setItems([...items, { id: res.id, ...newData, sort_order: items.length + 1 }])
      setNewData(emptyImg); setShowAdd(false); show('Hinzugefügt')
    } catch { show('Fehler', 'err') }
  }

  return (
    <>
      <Toast {...toast} />
      <div className="s-card">
        <div className="s-card-title">3D-Bilder ({items.length})</div>
        <div className="s-table-wrap">
          <table className="s-table">
            <thead><tr><th>Bild</th><th>Typ</th><th>Titel</th><th>Untertitel</th><th>Aktionen</th></tr></thead>
            <tbody>
              {items.map(item => editId === item.id ? (
                <tr key={item.id}>
                  <td><ImageInput label="" value={editData.img_url || ''} onChange={v => setEditData(d => ({ ...d, img_url: v }))} /></td>
                  <td>
                    <select className="s-select" value={editData.type || 'bottom'} onChange={e => setEditData(d => ({ ...d, type: e.target.value }))}>
                      <option value="hero_main">Hero Haupt</option>
                      <option value="hero_small">Hero Klein</option>
                      <option value="bottom">Untere Karte</option>
                    </select>
                  </td>
                  <td><input className="s-input" value={editData.caption_h || ''} onChange={e => setEditData(d => ({ ...d, caption_h: e.target.value }))} placeholder="Titel" /></td>
                  <td><input className="s-input" value={editData.caption_p || ''} onChange={e => setEditData(d => ({ ...d, caption_p: e.target.value }))} placeholder="Untertitel" /></td>
                  <td className="s-table-actions">
                    <button className="s-btn s-btn-primary s-btn-sm" onClick={saveEdit}>OK</button>
                    <button className="s-btn s-btn-secondary s-btn-sm" onClick={() => setEditId(null)}>✕</button>
                  </td>
                </tr>
              ) : (
                <tr key={item.id}>
                  <td><img src={item.img_url} alt={item.alt_text} /></td>
                  <td><span style={{ fontSize: '.72rem', padding: '.15rem .5rem', background: '#1a1a1a', borderRadius: '4px', color: '#888' }}>{typeLabel[item.type] || item.type}</span></td>
                  <td style={{ fontWeight: 600, fontSize: '.83rem' }}>{item.caption_h}</td>
                  <td style={{ color: '#555', fontSize: '.78rem', maxWidth: '180px' }}>{item.caption_p}</td>
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
        <button className="s-btn s-btn-secondary" onClick={() => setShowAdd(!showAdd)}>{showAdd ? '✕ Abbrechen' : '+ Bild hinzufügen'}</button>
        {showAdd && (
          <div className="s-edit-row" style={{ marginTop: '1rem' }}>
            <div className="s-card-title">Neues Bild</div>
            <ImageInput label="Bild" value={newData.img_url} onChange={v => setNewData(d => ({ ...d, img_url: v }))} />
            <div className="s-grid-2">
              <div className="s-form-group">
                <label className="s-label">Bildtyp</label>
                <select className="s-select" value={newData.type} onChange={e => setNewData(d => ({ ...d, type: e.target.value }))}>
                  <option value="hero_main">Hero Haupt</option>
                  <option value="hero_small">Hero Klein</option>
                  <option value="bottom">Untere Karte</option>
                </select>
              </div>
              <div className="s-form-group">
                <label className="s-label">Alt-Text</label>
                <input className="s-input" value={newData.alt_text} onChange={e => setNewData(d => ({ ...d, alt_text: e.target.value }))} />
              </div>
            </div>
            <div className="s-grid-2">
              <div className="s-form-group">
                <label className="s-label">Titel (Caption)</label>
                <input className="s-input" value={newData.caption_h} onChange={e => setNewData(d => ({ ...d, caption_h: e.target.value }))} />
              </div>
              <div className="s-form-group">
                <label className="s-label">Untertitel (Caption)</label>
                <input className="s-input" value={newData.caption_p} onChange={e => setNewData(d => ({ ...d, caption_p: e.target.value }))} />
              </div>
            </div>
            <button className="s-btn s-btn-primary" onClick={add}>Bild hinzufügen</button>
          </div>
        )}
      </div>
    </>
  )
}

export default function ThreeDEditorPage() {
  const [tab, setTab] = useState('inhalt')
  const router = useRouter()

  useEffect(() => { checkAuth().then(ok => { if (!ok) router.push('/studio') }) }, [])

  return (
    <>
      <h1 className="s-page-title">3D & Visualisierung</h1>
      <p className="s-page-sub">Texte und Bilder der 3D-Seite bearbeiten</p>
      <div className="s-tabs">
        {[['inhalt', '📝 Texte'], ['bilder', '🖼️ Bilder']].map(([k, l]) => (
          <button key={k} className={`s-tab${tab === k ? ' s-active' : ''}`} onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>
      {tab === 'inhalt' && <InhaltTab />}
      {tab === 'bilder' && <BilderTab />}
    </>
  )
}
