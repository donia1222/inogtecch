'use client'
// ── Editor Visual: FEM ──────────────────────────────────
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { checkAuth, apiGet, apiPost, apiPut, apiDelete } from '@/lib/api'
import { useToast, Toast, Modal, Field, Input, Textarea, Row, ImgUpload, EditBtn, DelBtn, AddBtn, VisualCard, SectionHeader } from '@/app/studio/ve'

/* ── Inhalt Tab ─────────────────────────────────────── */
function InhaltTab() {
  const [data, setData]     = useState(null)
  const [saving, setSaving] = useState(false)
  const [toast, show]       = useToast()

  useEffect(() => { apiGet('fem.php').then(d => setData(d.content)).catch(() => {}) }, [])
  function set(k, v) { setData(d => ({ ...d, [k]: v })) }

  async function save() {
    setSaving(true)
    try { await apiPut('fem.php', data); show('Gespeichert ✓') }
    catch { show('Fehler', 'err') }
    finally { setSaving(false) }
  }

  if (!data) return <div className="s-loading">Wird geladen…</div>

  return (
    <>
      <Toast {...toast} />

      {/* Visual preview: FEM section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>

        {/* Left: Image */}
        <div className="ve-card" style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: '14px', padding: '1.2rem' }}>
          <SectionHeader title="Bild & Badge" />
          <VisualCard
            actions={<></>}
            style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', marginBottom: '1rem' }}
          >
            {data.img_url
              ? <img src={data.img_url} alt={data.img_alt} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px' }} />
              : <div className="ve-img-ph" style={{ height: '200px', background: '#111', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333' }}>Kein Bild</div>
            }
            <div style={{ position: 'absolute', bottom: '8px', left: '8px', right: '8px', background: 'rgba(0,0,0,.7)', borderRadius: '6px', padding: '.4rem .7rem', fontSize: '.7rem', color: '#aaa' }}>{data.img_badge}</div>
          </VisualCard>
          <Field label="Bild"><ImgUpload value={data.img_url} onChange={v => set('img_url', v)} /></Field>
          <Field label="Alt-Text"><Input value={data.img_alt} onChange={e => set('img_alt', e.target.value)} /></Field>
          <Field label="Badge-Text"><Input value={data.img_badge} onChange={e => set('img_badge', e.target.value)} /></Field>
        </div>

        {/* Right: Tag + Title */}
        <div className="ve-card" style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: '14px', padding: '1.2rem' }}>
          <SectionHeader title="Titel & Tag" />
          <div className="ve-card-inner" style={{ marginBottom: '1.5rem', padding: '1rem', background: '#111', borderRadius: '10px' }}>
            <div style={{ fontSize: '.65rem', color: '#e02020', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '.5rem' }}>{data.tag}</div>
            <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#fff', lineHeight: 1.4 }}>{data.title}</div>
          </div>
          <Field label="Tag"><Input value={data.tag} onChange={e => set('tag', e.target.value)} /></Field>
          <Field label="Titel"><Input value={data.title} onChange={e => set('title', e.target.value)} /></Field>
        </div>
      </div>

      {/* Text blocks */}
      <div className="ve-card" style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: '14px', padding: '1.2rem', marginBottom: '1.5rem' }}>
        <SectionHeader title="Textabsätze" />
        {['text1', 'text2', 'text3', 'text4'].map((f, i) => (
          <div key={f} style={{ marginBottom: '1rem' }}>
            <Field label={`Absatz ${i + 1}`}>
              <Textarea value={data[f] || ''} onChange={e => set(f, e.target.value)} rows={4} />
            </Field>
          </div>
        ))}
      </div>

      <button onClick={save} disabled={saving} style={{
        padding: '.8rem 2rem', borderRadius: '9px', border: 'none',
        background: '#e02020', color: '#fff', fontWeight: 700, fontSize: '.9rem',
        cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? .6 : 1,
      }}>{saving ? 'Wird gespeichert…' : 'Alles speichern'}</button>
    </>
  )
}

/* ── Vorteile Tab ───────────────────────────────────── */
function VorteileTab() {
  const [items, setItems]   = useState([])
  const [modal, setModal]   = useState(null)
  const [saving, setSaving] = useState(false)
  const [newTxt, setNewTxt] = useState('')
  const [toast, show]       = useToast()

  useEffect(() => { apiGet('fem.php').then(d => setItems(d.benefits || [])).catch(() => {}) }, [])

  async function saveEdit() {
    setSaving(true)
    try {
      await apiPut(`fem_benefits.php?id=${modal.id}`, { text: modal.text, sort_order: items.find(i => i.id === modal.id)?.sort_order ?? 0 })
      setItems(items.map(i => i.id === modal.id ? { ...i, text: modal.text } : i))
      setModal(null); show('Gespeichert ✓')
    } catch { show('Fehler', 'err') }
    finally { setSaving(false) }
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
      setItems([...items, { id: res.id, text: newTxt }])
      setNewTxt(''); show('Hinzugefügt ✓')
    } catch { show('Fehler', 'err') }
  }

  return (
    <>
      <Toast {...toast} />
      <SectionHeader title={`FEM-Vorteile (${items.length})`} sub="Hover → Bearbeiten oder Löschen" />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
        {items.map((item, idx) => (
          <VisualCard key={item.id}
            actions={<><EditBtn onClick={() => setModal({ id: item.id, text: item.text })} /><DelBtn onClick={() => del(item.id)} /></>}
            style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '.8rem 1rem', background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: '9px' }}
          >
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(224,32,32,.1)', border: '1px solid rgba(224,32,32,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.7rem', color: '#e02020', fontWeight: 700, flexShrink: 0 }}>✓</div>
            <div style={{ fontSize: '.88rem', color: '#bbb', flex: 1 }}>{item.text}</div>
          </VisualCard>
        ))}
      </div>

      {/* Quick add inline */}
      <div style={{ display: 'flex', gap: '.6rem', marginTop: '1rem' }}>
        <input value={newTxt} onChange={e => setNewTxt(e.target.value)} onKeyDown={e => e.key === 'Enter' && add()}
          placeholder="Neuer Vorteil… (Enter zum Hinzufügen)"
          className="ve-input" style={{ flex: 1, background: '#0d0d0d', border: '1px solid #222', borderRadius: '9px', padding: '.7rem 1rem', color: '#fff', fontSize: '.88rem', outline: 'none' }} />
        <button onClick={add} style={{ padding: '.7rem 1.2rem', borderRadius: '9px', border: 'none', background: '#e02020', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>+ Hinzufügen</button>
      </div>

      {/* Edit modal */}
      <Modal open={!!modal} onClose={() => setModal(null)} title="Vorteil bearbeiten" onSave={saveEdit} saving={saving}>
        {modal && (
          <Field label="Text">
            <Textarea value={modal.text} onChange={e => setModal(m => ({ ...m, text: e.target.value }))} rows={2} />
          </Field>
        )}
      </Modal>
    </>
  )
}

export default function FEMEditorPage() {
  const [tab, setTab] = useState('inhalt')
  const router = useRouter()
  useEffect(() => { checkAuth().then(ok => { if (!ok) router.push('/studio') }) }, [])

  return (
    <div style={{ maxWidth: '950px' }}>
      <h1 className="s-page-title">FEM</h1>
      <p className="s-page-sub">FEM-Seiteninhalt und Vorteilsliste — visuell bearbeiten</p>
      <div className="s-tabs" style={{ marginBottom: '2rem' }}>
        {[['inhalt', '📊 Inhalt & Bild'], ['vorteile', '✅ Vorteile']].map(([k, l]) => (
          <button key={k} className={`s-tab${tab === k ? ' s-active' : ''}`} onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>
      {tab === 'inhalt'   && <InhaltTab />}
      {tab === 'vorteile' && <VorteileTab />}
    </div>
  )
}
