'use client'
// ── Editor Visual: Prozess ──────────────────────────────
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { checkAuth, apiGet, apiPost, apiPut, apiDelete } from '@/lib/api'
import { useToast, Toast, Modal, Field, Input, Textarea, Row, EditBtn, DelBtn, AddBtn, VisualCard, SectionHeader } from '@/app/studio/ve'

const ACTORS   = ['Kunde', 'iNOTEC']
const emptyStep = { step_num: '', actors: [], title: '', desc_text: '' }

function ActorToggle({ selected, onChange }) {
  function toggle(a) { onChange(selected.includes(a) ? selected.filter(x => x !== a) : [...selected, a]) }
  return (
    <div style={{ display: 'flex', gap: '.4rem', flexWrap: 'wrap' }}>
      {ACTORS.map(a => (
        <button key={a} type="button" onClick={() => toggle(a)} style={{
          padding: '.3rem .8rem', borderRadius: '999px', fontSize: '.75rem', fontWeight: 700,
          cursor: 'pointer', border: 'none',
          background: selected.includes(a) ? (a === 'iNOTEC' ? 'rgba(224,32,32,.2)' : 'rgba(255,255,255,.1)') : 'transparent',
          color: selected.includes(a) ? (a === 'iNOTEC' ? '#e02020' : '#ccc') : 'inherit',
        }}>{a}</button>
      ))}
    </div>
  )
}

export default function ProzessEditorPage() {
  const [steps, setSteps]   = useState([])
  const [modal, setModal]   = useState(null)
  const [saving, setSaving] = useState(false)
  const [toast, show]       = useToast()
  const router              = useRouter()

  useEffect(() => {
    checkAuth().then(ok => { if (!ok) router.push('/studio') })
    apiGet('prozess.php').then(setSteps).catch(() => {})
  }, [])

  function set(k, v) { setModal(m => ({ ...m, data: { ...m.data, [k]: v } })) }

  async function save() {
    setSaving(true)
    try {
      const d = modal.data
      if (modal.mode === 'edit') {
        await apiPut(`prozess.php?id=${modal.id}`, { ...d, sort_order: steps.find(s => s.id === modal.id)?.sort_order ?? 0 })
        setSteps(steps.map(s => s.id === modal.id ? { ...s, ...d } : s))
        show('Gespeichert ✓')
      } else {
        const res = await apiPost('prozess.php', { ...d, sort_order: steps.length + 1 })
        setSteps([...steps, { id: res.id, ...d }])
        show('Hinzugefügt ✓')
      }
      setModal(null)
    } catch { show('Fehler', 'err') }
    finally { setSaving(false) }
  }

  async function del(id) {
    if (!confirm('Schritt löschen?')) return
    try { await apiDelete(`prozess.php?id=${id}`); setSteps(steps.filter(s => s.id !== id)); show('Gelöscht') }
    catch { show('Fehler', 'err') }
  }

  return (
    <div style={{ maxWidth: '800px' }}>
      <Toast {...toast} />
      <h1 className="s-page-title">Prozess</h1>
      <p className="s-page-sub">Projektablauf-Timeline — wie auf der Website</p>

      <SectionHeader title={`Prozessschritte (${steps.length})`} sub="Hover über einen Schritt → Bearbeiten oder Löschen" />

      {/* Visual timeline */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {steps.map((step, idx) => {
          const actors = Array.isArray(step.actors) ? step.actors : []
          return (
            <VisualCard key={step.id}
              actions={<><EditBtn onClick={() => setModal({ mode:'edit', id: step.id, data: { ...step, actors: [...actors] } })} /><DelBtn onClick={() => del(step.id)} /></>}
              style={{ display: 'flex', gap: '1.2rem', alignItems: 'flex-start', padding: '1.1rem 1rem', borderBottom: '1px solid #111', background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,.01)', borderRadius: idx === 0 ? '10px 10px 0 0' : idx === steps.length - 1 ? '0 0 10px 10px' : 0, border: '1px solid #1a1a1a', marginBottom: '-1px' }}
            >
              <div style={{ minWidth: '40px', height: '40px', borderRadius: '50%', background: 'rgba(224,32,32,.1)', border: '1.5px solid rgba(224,32,32,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '.8rem', color: '#e02020', flexShrink: 0 }}>
                {step.step_num}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: '.35rem', marginBottom: '.4rem', flexWrap: 'wrap' }}>
                  {actors.map(a => (
                    <span key={a} style={{ fontSize: '.65rem', fontWeight: 700, padding: '.15rem .55rem', borderRadius: '999px', background: a === 'iNOTEC' ? 'rgba(224,32,32,.12)' : 'rgba(255,255,255,.05)', color: a === 'iNOTEC' ? '#e02020' : '#777' }}>{a}</span>
                  ))}
                </div>
                <div style={{ fontWeight: 700, fontSize: '.9rem', color: '#ddd' }}>{step.title}</div>
                <div style={{ fontSize: '.78rem', color: '#555', marginTop: '.25rem' }}>{step.desc_text}</div>
              </div>
            </VisualCard>
          )
        })}
      </div>

      <AddBtn onClick={() => setModal({ mode: 'add', data: { ...emptyStep } })} label="+ Neuen Schritt hinzufügen" />

      <Modal open={!!modal} onClose={() => setModal(null)}
        title={modal?.mode === 'edit' ? 'Schritt bearbeiten' : 'Neuer Schritt'}
        onSave={save} saving={saving}
      >
        {modal && <>
          <Row>
            <Field label="Schritt-Nr."><Input value={modal.data.step_num} onChange={e => set('step_num', e.target.value)} placeholder="01" /></Field>
            <Field label="Akteure"><ActorToggle selected={modal.data.actors || []} onChange={v => set('actors', v)} /></Field>
          </Row>
          <Field label="Titel"><Input value={modal.data.title} onChange={e => set('title', e.target.value)} placeholder="Schritt-Titel" /></Field>
          <Field label="Beschreibung"><Textarea value={modal.data.desc_text} onChange={e => set('desc_text', e.target.value)} rows={2} /></Field>
        </>}
      </Modal>
    </div>
  )
}
