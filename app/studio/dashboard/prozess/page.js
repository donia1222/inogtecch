'use client'
// ── Editor: Prozess (Timeline 8 Schritte) ──────────────────
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { checkAuth, apiGet, apiPost, apiPut, apiDelete } from '@/lib/api'

function Toast({ msg, type }) {
  if (!msg) return null
  return <div className={`s-toast ${type === 'ok' ? 's-toast-ok' : 's-toast-err'}`}>{msg}</div>
}

const ACTORS = ['Kunde', 'iNOTEC']
const emptyStep = { step_num: '', actors: [], title: '', desc_text: '' }

function ActorToggle({ selected, onChange }) {
  function toggle(actor) {
    onChange(selected.includes(actor) ? selected.filter(a => a !== actor) : [...selected, actor])
  }
  return (
    <div className="s-actor-wrap">
      {ACTORS.map(a => (
        <button key={a} className={`s-actor-btn${selected.includes(a) ? ' s-on' : ''}`} onClick={() => toggle(a)} type="button">
          {a}
        </button>
      ))}
    </div>
  )
}

export default function ProzessEditorPage() {
  const [steps, setSteps]       = useState([])
  const [editId, setEditId]     = useState(null)
  const [editData, setEditData] = useState({})
  const [newStep, setNewStep]   = useState(emptyStep)
  const [showAdd, setShowAdd]   = useState(false)
  const [toast, setToast]       = useState({ msg: '', type: '' })
  const router = useRouter()

  useEffect(() => {
    checkAuth().then(ok => { if (!ok) router.push('/studio') })
    apiGet('prozess.php').then(setSteps).catch(() => {})
  }, [])

  function show(msg, type = 'ok') {
    setToast({ msg, type })
    setTimeout(() => setToast({ msg: '', type: '' }), 3000)
  }

  function startEdit(s) { setEditId(s.id); setEditData({ ...s, actors: Array.isArray(s.actors) ? [...s.actors] : [] }) }

  async function saveEdit() {
    try {
      await apiPut(`prozess.php?id=${editId}`, { ...editData, sort_order: steps.find(s => s.id === editId)?.sort_order ?? 0 })
      setSteps(steps.map(s => s.id === editId ? { ...s, ...editData } : s))
      setEditId(null); show('Gespeichert')
    } catch { show('Fehler', 'err') }
  }

  async function del(id) {
    if (!confirm('Schritt löschen?')) return
    try {
      await apiDelete(`prozess.php?id=${id}`)
      setSteps(steps.filter(s => s.id !== id)); show('Gelöscht')
    } catch { show('Fehler', 'err') }
  }

  async function add() {
    if (!newStep.title.trim()) return
    try {
      const res = await apiPost('prozess.php', { ...newStep, sort_order: steps.length + 1 })
      setSteps([...steps, { id: res.id, ...newStep, sort_order: steps.length + 1 }])
      setNewStep(emptyStep); setShowAdd(false); show('Hinzugefügt')
    } catch { show('Fehler', 'err') }
  }

  return (
    <>
      <Toast {...toast} />
      <h1 className="s-page-title">Prozess</h1>
      <p className="s-page-sub">Projektablauf-Schritte bearbeiten, hinzufügen oder löschen</p>

      <div className="s-card">
        <div className="s-card-title">Prozessschritte ({steps.length})</div>

        {steps.map(step => editId === step.id ? (
          <div key={step.id} className="s-edit-row">
            <div className="s-grid-2" style={{ marginBottom: '.8rem' }}>
              <div className="s-form-group">
                <label className="s-label">Schritt-Nr.</label>
                <input className="s-input" value={editData.step_num || ''} onChange={e => setEditData(d => ({ ...d, step_num: e.target.value }))} placeholder="01" style={{ width: '80px' }} />
              </div>
              <div className="s-form-group">
                <label className="s-label">Akteure</label>
                <ActorToggle selected={editData.actors || []} onChange={v => setEditData(d => ({ ...d, actors: v }))} />
              </div>
            </div>
            <div className="s-form-group">
              <label className="s-label">Titel</label>
              <input className="s-input" value={editData.title || ''} onChange={e => setEditData(d => ({ ...d, title: e.target.value }))} />
            </div>
            <div className="s-form-group">
              <label className="s-label">Beschreibung</label>
              <textarea className="s-textarea" rows={2} value={editData.desc_text || ''} onChange={e => setEditData(d => ({ ...d, desc_text: e.target.value }))} />
            </div>
            <div className="s-btn-row">
              <button className="s-btn s-btn-primary s-btn-sm" onClick={saveEdit}>Speichern</button>
              <button className="s-btn s-btn-secondary s-btn-sm" onClick={() => setEditId(null)}>Abbrechen</button>
            </div>
          </div>
        ) : (
          <div key={step.id} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '.9rem 0', borderBottom: '1px solid #151515' }}>
            <span className="s-step-num">{step.step_num}</span>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: '.4rem', marginBottom: '.3rem', flexWrap: 'wrap' }}>
                {(Array.isArray(step.actors) ? step.actors : []).map(a => (
                  <span key={a} style={{ fontSize: '.68rem', fontWeight: 700, padding: '.1rem .5rem', borderRadius: '999px', background: a === 'iNOTEC' ? 'rgba(224,32,32,.1)' : 'rgba(255,255,255,.05)', color: a === 'iNOTEC' ? '#e02020' : '#888' }}>{a}</span>
                ))}
              </div>
              <div style={{ fontWeight: 600, fontSize: '.88rem' }}>{step.title}</div>
              <div style={{ fontSize: '.78rem', color: '#555', marginTop: '.2rem' }}>{step.desc_text}</div>
            </div>
            <div className="s-table-actions">
              <button className="s-btn s-btn-secondary s-btn-sm" onClick={() => startEdit(step)}>Bearbeiten</button>
              <button className="s-btn s-btn-danger s-btn-sm" onClick={() => del(step.id)}>Löschen</button>
            </div>
          </div>
        ))}

        <hr className="s-divider" />
        <button className="s-btn s-btn-secondary" onClick={() => setShowAdd(!showAdd)}>
          {showAdd ? '✕ Abbrechen' : '+ Neuer Schritt'}
        </button>

        {showAdd && (
          <div className="s-edit-row" style={{ marginTop: '1rem' }}>
            <div className="s-card-title">Neuer Schritt</div>
            <div className="s-grid-2">
              <div className="s-form-group">
                <label className="s-label">Schritt-Nr.</label>
                <input className="s-input" value={newStep.step_num} onChange={e => setNewStep(d => ({ ...d, step_num: e.target.value }))} placeholder="09" />
              </div>
              <div className="s-form-group">
                <label className="s-label">Akteure</label>
                <ActorToggle selected={newStep.actors} onChange={v => setNewStep(d => ({ ...d, actors: v }))} />
              </div>
            </div>
            <div className="s-form-group">
              <label className="s-label">Titel</label>
              <input className="s-input" value={newStep.title} onChange={e => setNewStep(d => ({ ...d, title: e.target.value }))} placeholder="Schritt-Titel" />
            </div>
            <div className="s-form-group">
              <label className="s-label">Beschreibung</label>
              <textarea className="s-textarea" rows={2} value={newStep.desc_text} onChange={e => setNewStep(d => ({ ...d, desc_text: e.target.value }))} />
            </div>
            <button className="s-btn s-btn-primary" onClick={add}>Schritt hinzufügen</button>
          </div>
        )}
      </div>
    </>
  )
}
