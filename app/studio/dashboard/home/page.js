'use client'
// ── Editor: Startseite (Hero + Ticker + Erfahrung) ─────────
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { API, checkAuth, apiGet, apiPut, apiPost, apiDelete } from '@/lib/api'

/* ── Toast ──────────────────────────────────────────────── */
function Toast({ msg, type }) {
  if (!msg) return null
  return <div className={`s-toast ${type === 'ok' ? 's-toast-ok' : 's-toast-err'}`}>{msg}</div>
}

function useToast() {
  const [toast, setToast] = useState({ msg: '', type: '' })
  function show(msg, type = 'ok') {
    setToast({ msg, type })
    setTimeout(() => setToast({ msg: '', type: '' }), 3000)
  }
  return [toast, show]
}

/* ── ImageInput ─────────────────────────────────────────── */
function ImageInput({ label, value, onChange }) {
  const [uploading, setUploading] = useState(false)
  async function handleFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('image', file)
      const res  = await fetch(`${API}/upload.php`, { method: 'POST', credentials: 'include', body: fd })
      const data = await res.json()
      if (data.url) onChange(data.url)
    } catch { alert('Fehler beim Hochladen') }
    finally  { setUploading(false) }
  }
  return (
    <div className="s-form-group">
      <label className="s-label">{label}</label>
      {value
        ? <img src={value} alt="" className="s-img-preview" />
        : <div className="s-img-empty">Kein Bild</div>}
      <input className="s-input" value={value || ''} onChange={e => onChange(e.target.value)} placeholder="/assets/bild.jpg" style={{ marginBottom: '.3rem' }} />
      <input type="file" accept="image/*" onChange={handleFile} className="s-file-input" />
      {uploading && <span style={{ fontSize: '.72rem', color: '#777' }}>Wird hochgeladen…</span>}
    </div>
  )
}

/* ════════════════════════════════════════════════════════════
   TAB 1: HERO
════════════════════════════════════════════════════════════ */
function HeroTab() {
  const [data, setData] = useState(null)
  const [toast, show]   = useToast()

  useEffect(() => { apiGet('hero.php').then(setData).catch(() => {}) }, [])

  function set(field, value) { setData(d => ({ ...d, [field]: value })) }

  async function handleSave() {
    try   { await apiPut('hero.php', data); show('Hero gespeichert') }
    catch { show('Fehler beim Speichern', 'err') }
  }

  if (!data) return <div className="s-loading">Wird geladen…</div>

  return (
    <>
      <Toast {...toast} />

      <div className="s-card">
        <div className="s-card-title">Badge & Titel</div>
        <div className="s-grid-2">
          <div className="s-form-group">
            <label className="s-label">Badge-Text</label>
            <input className="s-input" value={data.badge_text || ''} onChange={e => set('badge_text', e.target.value)} />
          </div>
          <div className="s-form-group">
            <label className="s-label">Eyebrow (Firmenname)</label>
            <input className="s-input" value={data.eyebrow || ''} onChange={e => set('eyebrow', e.target.value)} />
          </div>
        </div>
        <div className="s-grid-2">
          <div className="s-form-group">
            <label className="s-label">Titel Zeile 1</label>
            <input className="s-input" value={data.title_line1 || ''} onChange={e => set('title_line1', e.target.value)} />
          </div>
          <div className="s-form-group">
            <label className="s-label">Titel Zeile 2 (rot)</label>
            <input className="s-input" value={data.title_line2_red || ''} onChange={e => set('title_line2_red', e.target.value)} />
          </div>
        </div>
        <div className="s-form-group">
          <label className="s-label">Beschreibungstext</label>
          <textarea className="s-textarea" rows={3} value={data.desc_text || ''} onChange={e => set('desc_text', e.target.value)} />
        </div>
      </div>

      <div className="s-card">
        <div className="s-card-title">Buttons</div>
        <div className="s-grid-3">
          <div className="s-form-group">
            <label className="s-label">Primär-Button</label>
            <input className="s-input" value={data.btn_primary_text || ''} onChange={e => set('btn_primary_text', e.target.value)} />
          </div>
          <div className="s-form-group">
            <label className="s-label">Outline-Button Text</label>
            <input className="s-input" value={data.btn_outline_text || ''} onChange={e => set('btn_outline_text', e.target.value)} />
          </div>
          <div className="s-form-group">
            <label className="s-label">Outline-Button Link</label>
            <input className="s-input" value={data.btn_outline_href || ''} onChange={e => set('btn_outline_href', e.target.value)} />
          </div>
        </div>
      </div>

      <div className="s-card">
        <div className="s-card-title">Statistiken</div>
        <div className="s-grid-3">
          {[1, 2, 3].map(n => (
            <div key={n}>
              <div className="s-form-group">
                <label className="s-label">Wert {n}</label>
                <input className="s-input" value={data[`stat${n}_val`] || ''} onChange={e => set(`stat${n}_val`, e.target.value)} />
              </div>
              <div className="s-form-group">
                <label className="s-label">Label {n}</label>
                <input className="s-input" value={data[`stat${n}_lbl`] || ''} onChange={e => set(`stat${n}_lbl`, e.target.value)} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="s-card">
        <div className="s-card-title">Bilder</div>
        <ImageInput label="Hauptbild" value={data.hero_main_img || ''} onChange={v => set('hero_main_img', v)} />
        <div className="s-grid-2">
          <div className="s-form-group">
            <label className="s-label">Alt-Text Hauptbild</label>
            <input className="s-input" value={data.hero_main_alt || ''} onChange={e => set('hero_main_alt', e.target.value)} />
          </div>
          <div className="s-form-group">
            <label className="s-label">Bild-Label (Overlay)</label>
            <input className="s-input" value={data.hero_img_label || ''} onChange={e => set('hero_img_label', e.target.value)} />
          </div>
        </div>
        <hr className="s-divider" />
        <div className="s-grid-2">
          <div>
            <ImageInput label="Mini-Karte 1" value={data.mini1_img || ''} onChange={v => set('mini1_img', v)} />
            <div className="s-form-group">
              <label className="s-label">Mini 1 Label</label>
              <input className="s-input" value={data.mini1_label || ''} onChange={e => set('mini1_label', e.target.value)} />
            </div>
          </div>
          <div>
            <ImageInput label="Mini-Karte 2" value={data.mini2_img || ''} onChange={v => set('mini2_img', v)} />
            <div className="s-form-group">
              <label className="s-label">Mini 2 Label</label>
              <input className="s-input" value={data.mini2_label || ''} onChange={e => set('mini2_label', e.target.value)} />
            </div>
          </div>
        </div>
      </div>

      <div className="s-btn-row">
        <button className="s-btn s-btn-primary" onClick={handleSave}>Speichern</button>
      </div>
    </>
  )
}

/* ════════════════════════════════════════════════════════════
   TAB 2: TICKER
════════════════════════════════════════════════════════════ */
function TickerTab() {
  const [items, setItems]   = useState([])
  const [editId, setEditId] = useState(null)
  const [editTxt, setEditTxt] = useState('')
  const [newTxt, setNewTxt]   = useState('')
  const [toast, show]         = useToast()

  useEffect(() => { apiGet('ticker.php').then(setItems).catch(() => {}) }, [])

  async function saveEdit(id) {
    try {
      await apiPut(`ticker.php?id=${id}`, { text: editTxt, sort_order: items.find(i => i.id === id)?.sort_order ?? 0 })
      setItems(items.map(i => i.id === id ? { ...i, text: editTxt } : i))
      setEditId(null); show('Gespeichert')
    } catch { show('Fehler', 'err') }
  }

  async function del(id) {
    if (!confirm('Element löschen?')) return
    try {
      await apiDelete(`ticker.php?id=${id}`)
      setItems(items.filter(i => i.id !== id)); show('Gelöscht')
    } catch { show('Fehler', 'err') }
  }

  async function add() {
    if (!newTxt.trim()) return
    try {
      const res = await apiPost('ticker.php', { text: newTxt })
      setItems([...items, { id: res.id, text: newTxt, sort_order: items.length + 1 }])
      setNewTxt(''); show('Hinzugefügt')
    } catch { show('Fehler', 'err') }
  }

  return (
    <>
      <Toast {...toast} />
      <div className="s-card">
        <div className="s-card-title">Ticker-Elemente ({items.length})</div>
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
        <div className="s-card-title">Neues Element hinzufügen</div>
        <div style={{ display: 'flex', gap: '.5rem' }}>
          <input className="s-input" value={newTxt} onChange={e => setNewTxt(e.target.value)} placeholder="z.B. AutoCAD" onKeyDown={e => e.key === 'Enter' && add()} />
          <button className="s-btn s-btn-primary" onClick={add}>Hinzufügen</button>
        </div>
      </div>
    </>
  )
}

/* ════════════════════════════════════════════════════════════
   TAB 3: ERFAHRUNG
════════════════════════════════════════════════════════════ */
function ErfahrungTab() {
  const [content, setContent]       = useState(null)
  const [companies, setCompanies]   = useState([])
  const [specs, setSpecs]           = useState([])
  const [editCompId, setEditCompId] = useState(null)
  const [editCompName, setEditCompName] = useState('')
  const [newComp, setNewComp]       = useState('')
  const [editSpecId, setEditSpecId] = useState(null)
  const [editSpec, setEditSpec]     = useState({})
  const [newSpec, setNewSpec]       = useState({ label: '', desc_text: '' })
  const [toast, show]               = useToast()

  useEffect(() => {
    apiGet('erfahrung.php').then(d => {
      setContent(d.content)
      setCompanies(d.companies)
      setSpecs(d.specialties)
    }).catch(() => {})
  }, [])

  async function saveContent() {
    try   { await apiPut('erfahrung.php', content); show('Texte gespeichert') }
    catch { show('Fehler', 'err') }
  }

  // Companies
  async function saveComp(id) {
    try {
      await apiPut(`erfahrung_companies.php?id=${id}`, { name: editCompName, sort_order: companies.find(c => c.id === id)?.sort_order ?? 0 })
      setCompanies(companies.map(c => c.id === id ? { ...c, name: editCompName } : c))
      setEditCompId(null); show('Aktualisiert')
    } catch { show('Fehler', 'err') }
  }
  async function delComp(id) {
    if (!confirm('Firma löschen?')) return
    try { await apiDelete(`erfahrung_companies.php?id=${id}`); setCompanies(companies.filter(c => c.id !== id)); show('Gelöscht') }
    catch { show('Fehler', 'err') }
  }
  async function addComp() {
    if (!newComp.trim()) return
    try {
      const res = await apiPost('erfahrung_companies.php', { name: newComp })
      setCompanies([...companies, { id: res.id, name: newComp, sort_order: companies.length + 1 }])
      setNewComp(''); show('Hinzugefügt')
    } catch { show('Fehler', 'err') }
  }

  // Specialties
  async function saveSpec(id) {
    try {
      await apiPut(`erfahrung_specialties.php?id=${id}`, { ...editSpec, sort_order: specs.find(s => s.id === id)?.sort_order ?? 0 })
      setSpecs(specs.map(s => s.id === id ? { ...s, ...editSpec } : s))
      setEditSpecId(null); show('Aktualisiert')
    } catch { show('Fehler', 'err') }
  }
  async function delSpec(id) {
    if (!confirm('Spezialgebiet löschen?')) return
    try { await apiDelete(`erfahrung_specialties.php?id=${id}`); setSpecs(specs.filter(s => s.id !== id)); show('Gelöscht') }
    catch { show('Fehler', 'err') }
  }
  async function addSpec() {
    if (!newSpec.label.trim()) return
    try {
      const res = await apiPost('erfahrung_specialties.php', newSpec)
      setSpecs([...specs, { id: res.id, ...newSpec, sort_order: specs.length + 1 }])
      setNewSpec({ label: '', desc_text: '' }); show('Hinzugefügt')
    } catch { show('Fehler', 'err') }
  }

  if (!content) return <div className="s-loading">Wird geladen…</div>

  return (
    <>
      <Toast {...toast} />

      {/* Texte */}
      <div className="s-card">
        <div className="s-card-title">Texte</div>
        {['text1', 'text2', 'text3'].map((f, i) => (
          <div className="s-form-group" key={f}>
            <label className="s-label">Absatz {i + 1}</label>
            <textarea className="s-textarea" rows={3} value={content[f] || ''} onChange={e => setContent(c => ({ ...c, [f]: e.target.value }))} />
          </div>
        ))}
        <div className="s-form-group">
          <label className="s-label">Highlight-Box</label>
          <textarea className="s-textarea" rows={3} value={content.highlight_text || ''} onChange={e => setContent(c => ({ ...c, highlight_text: e.target.value }))} />
        </div>
        <div className="s-btn-row">
          <button className="s-btn s-btn-primary" onClick={saveContent}>Texte speichern</button>
        </div>
      </div>

      {/* Firmen */}
      <div className="s-card">
        <div className="s-card-title">Firmen-Chips ({companies.length})</div>
        <div className="s-table-wrap">
          <table className="s-table">
            <thead><tr><th>Firma</th><th>Aktionen</th></tr></thead>
            <tbody>
              {companies.map(c => editCompId === c.id ? (
                <tr key={c.id}>
                  <td><input className="s-input" value={editCompName} onChange={e => setEditCompName(e.target.value)} onKeyDown={e => e.key === 'Enter' && saveComp(c.id)} /></td>
                  <td className="s-table-actions">
                    <button className="s-btn s-btn-primary s-btn-sm" onClick={() => saveComp(c.id)}>OK</button>
                    <button className="s-btn s-btn-secondary s-btn-sm" onClick={() => setEditCompId(null)}>✕</button>
                  </td>
                </tr>
              ) : (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td className="s-table-actions">
                    <button className="s-btn s-btn-secondary s-btn-sm" onClick={() => { setEditCompId(c.id); setEditCompName(c.name) }}>Bearbeiten</button>
                    <button className="s-btn s-btn-danger s-btn-sm" onClick={() => delComp(c.id)}>Löschen</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <hr className="s-divider" />
        <div style={{ display: 'flex', gap: '.5rem' }}>
          <input className="s-input" value={newComp} onChange={e => setNewComp(e.target.value)} placeholder="z.B. Evatec AG" onKeyDown={e => e.key === 'Enter' && addComp()} />
          <button className="s-btn s-btn-primary" onClick={addComp}>+</button>
        </div>
      </div>

      {/* Spezialgebiete */}
      <div className="s-card">
        <div className="s-card-title">Vakuumtechnik-Spezialgebiete ({specs.length})</div>
        <div className="s-table-wrap">
          <table className="s-table">
            <thead><tr><th>Label</th><th>Beschreibung</th><th>Aktionen</th></tr></thead>
            <tbody>
              {specs.map(s => editSpecId === s.id ? (
                <tr key={s.id}>
                  <td><input className="s-input" value={editSpec.label || ''} onChange={e => setEditSpec(v => ({ ...v, label: e.target.value }))} /></td>
                  <td><input className="s-input" value={editSpec.desc_text || ''} onChange={e => setEditSpec(v => ({ ...v, desc_text: e.target.value }))} /></td>
                  <td className="s-table-actions">
                    <button className="s-btn s-btn-primary s-btn-sm" onClick={() => saveSpec(s.id)}>OK</button>
                    <button className="s-btn s-btn-secondary s-btn-sm" onClick={() => setEditSpecId(null)}>✕</button>
                  </td>
                </tr>
              ) : (
                <tr key={s.id}>
                  <td>{s.label}</td>
                  <td style={{ color: '#666', fontSize: '.8rem' }}>{s.desc_text}</td>
                  <td className="s-table-actions">
                    <button className="s-btn s-btn-secondary s-btn-sm" onClick={() => { setEditSpecId(s.id); setEditSpec({ label: s.label, desc_text: s.desc_text }) }}>Bearbeiten</button>
                    <button className="s-btn s-btn-danger s-btn-sm" onClick={() => delSpec(s.id)}>Löschen</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <hr className="s-divider" />
        <div className="s-grid-2">
          <div className="s-form-group">
            <label className="s-label">Label</label>
            <input className="s-input" value={newSpec.label} onChange={e => setNewSpec(v => ({ ...v, label: e.target.value }))} placeholder="z.B. Beschichtung" />
          </div>
          <div className="s-form-group">
            <label className="s-label">Beschreibung</label>
            <input className="s-input" value={newSpec.desc_text} onChange={e => setNewSpec(v => ({ ...v, desc_text: e.target.value }))} placeholder="z.B. Evaporation · Sputtering" />
          </div>
        </div>
        <button className="s-btn s-btn-primary" onClick={addSpec}>Hinzufügen</button>
      </div>
    </>
  )
}

/* ════════════════════════════════════════════════════════════
   PÁGINA PRINCIPAL — Tabs
════════════════════════════════════════════════════════════ */
export default function HomeEditorPage() {
  const [tab, setTab] = useState('hero')
  const router = useRouter()

  useEffect(() => {
    checkAuth().then(ok => { if (!ok) router.push('/studio') })
  }, [])

  return (
    <>
      <h1 className="s-page-title">Startseite</h1>
      <p className="s-page-sub">Hero, Ticker & Erfahrung — alle Inhalte der Startseite bearbeiten</p>
      <div className="s-tabs">
        {[['hero', '🏠 Hero'], ['ticker', '⚡ Ticker'], ['erfahrung', '🏢 Erfahrung']].map(([k, l]) => (
          <button key={k} className={`s-tab${tab === k ? ' s-active' : ''}`} onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>
      {tab === 'hero'      && <HeroTab />}
      {tab === 'ticker'    && <TickerTab />}
      {tab === 'erfahrung' && <ErfahrungTab />}
    </>
  )
}
