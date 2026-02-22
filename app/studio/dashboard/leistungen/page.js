'use client'
// ── Editor: Leistungen (Kernkompetenzen) ───────────────────
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { checkAuth, apiGet, apiPost, apiPut, apiDelete } from '@/lib/api'

function Toast({ msg, type }) {
  if (!msg) return null
  return <div className={`s-toast ${type === 'ok' ? 's-toast-ok' : 's-toast-err'}`}>{msg}</div>
}

const empty = { icon: '', title: '', desc_text: '', sort_order: 0 }

export default function LeistungenEditorPage() {
  const [items, setItems]   = useState([])
  const [editId, setEditId] = useState(null)
  const [editData, setEditData] = useState({})
  const [newData, setNewData]   = useState(empty)
  const [showAdd, setShowAdd]   = useState(false)
  const [toast, setToast]       = useState({ msg: '', type: '' })
  const router = useRouter()

  useEffect(() => {
    checkAuth().then(ok => { if (!ok) router.push('/studio') })
    apiGet('leistungen.php').then(setItems).catch(() => {})
  }, [])

  function show(msg, type = 'ok') {
    setToast({ msg, type })
    setTimeout(() => setToast({ msg: '', type: '' }), 3000)
  }

  function startEdit(item) { setEditId(item.id); setEditData({ ...item }) }

  async function saveEdit() {
    try {
      await apiPut(`leistungen.php?id=${editId}`, editData)
      setItems(items.map(i => i.id === editId ? { ...i, ...editData } : i))
      setEditId(null); show('Gespeichert')
    } catch { show('Fehler', 'err') }
  }

  async function del(id) {
    if (!confirm('Leistung löschen?')) return
    try {
      await apiDelete(`leistungen.php?id=${id}`)
      setItems(items.filter(i => i.id !== id)); show('Gelöscht')
    } catch { show('Fehler', 'err') }
  }

  async function add() {
    if (!newData.title.trim()) return
    try {
      const res = await apiPost('leistungen.php', { ...newData, sort_order: items.length + 1 })
      setItems([...items, { id: res.id, ...newData, sort_order: items.length + 1 }])
      setNewData(empty); setShowAdd(false); show('Hinzugefügt')
    } catch { show('Fehler', 'err') }
  }

  return (
    <>
      <Toast {...toast} />
      <h1 className="s-page-title">Leistungen</h1>
      <p className="s-page-sub">Kernkompetenzen bearbeiten, hinzufügen oder löschen</p>

      <div className="s-card">
        <div className="s-card-title">Leistungen ({items.length})</div>
        <div className="s-table-wrap">
          <table className="s-table">
            <thead><tr><th>Icon</th><th>Titel</th><th>Beschreibung</th><th>Aktionen</th></tr></thead>
            <tbody>
              {items.map(item => editId === item.id ? (
                <tr key={item.id}>
                  <td><input className="s-input" value={editData.icon || ''} onChange={e => setEditData(d => ({ ...d, icon: e.target.value }))} style={{ width: '70px' }} /></td>
                  <td><input className="s-input" value={editData.title || ''} onChange={e => setEditData(d => ({ ...d, title: e.target.value }))} /></td>
                  <td><textarea className="s-textarea" rows={2} value={editData.desc_text || ''} onChange={e => setEditData(d => ({ ...d, desc_text: e.target.value }))} style={{ minHeight: '50px' }} /></td>
                  <td className="s-table-actions">
                    <button className="s-btn s-btn-primary s-btn-sm" onClick={saveEdit}>OK</button>
                    <button className="s-btn s-btn-secondary s-btn-sm" onClick={() => setEditId(null)}>✕</button>
                  </td>
                </tr>
              ) : (
                <tr key={item.id}>
                  <td style={{ fontSize: '1.3rem' }}>{item.icon}</td>
                  <td style={{ fontWeight: 600 }}>{item.title}</td>
                  <td style={{ color: '#666', fontSize: '.8rem', maxWidth: '300px' }}>{item.desc_text}</td>
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
          {showAdd ? '✕ Abbrechen' : '+ Neue Leistung'}
        </button>

        {showAdd && (
          <div className="s-edit-row" style={{ marginTop: '1rem' }}>
            <div className="s-card-title">Neue Leistung</div>
            <div className="s-grid-2">
              <div className="s-form-group">
                <label className="s-label">Icon (Emoji)</label>
                <input className="s-input" value={newData.icon} onChange={e => setNewData(d => ({ ...d, icon: e.target.value }))} placeholder="💡" />
              </div>
              <div className="s-form-group">
                <label className="s-label">Titel</label>
                <input className="s-input" value={newData.title} onChange={e => setNewData(d => ({ ...d, title: e.target.value }))} placeholder="z.B. Konzepte & Studien" />
              </div>
            </div>
            <div className="s-form-group">
              <label className="s-label">Beschreibung</label>
              <textarea className="s-textarea" rows={3} value={newData.desc_text} onChange={e => setNewData(d => ({ ...d, desc_text: e.target.value }))} placeholder="Kurze Beschreibung der Leistung…" />
            </div>
            <button className="s-btn s-btn-primary" onClick={add}>Leistung hinzufügen</button>
          </div>
        )}
      </div>
    </>
  )
}
