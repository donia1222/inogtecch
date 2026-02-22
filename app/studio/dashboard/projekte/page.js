'use client'
// ── Editor Visual: Projekte & Galerie ──────────────────
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { checkAuth, apiGet, apiPost, apiPut, apiDelete } from '@/lib/api'
import { useToast, Toast, Modal, Field, Input, Row, ImgUpload, EditBtn, DelBtn, AddBtn, VisualCard, SectionHeader } from '@/app/studio/ve'

const emptyProj = { img_url: '', alt_text: '', category: '', title: '', client: '' }
const emptyGal  = { img_url: '', alt_text: '' }

/* ── Projekte Tab ───────────────────────────────────── */
function ProjekteTab() {
  const [items, setItems]   = useState([])
  const [modal, setModal]   = useState(null)
  const [saving, setSaving] = useState(false)
  const [toast, show]       = useToast()

  useEffect(() => { apiGet('projekte.php').then(setItems).catch(() => {}) }, [])

  function set(k, v) { setModal(m => ({ ...m, data: { ...m.data, [k]: v } })) }

  async function save() {
    setSaving(true)
    try {
      const d = modal.data
      if (modal.mode === 'edit') {
        await apiPut(`projekte.php?id=${modal.id}`, { ...d, sort_order: items.find(i => i.id === modal.id)?.sort_order ?? 0 })
        setItems(items.map(i => i.id === modal.id ? { ...i, ...d } : i))
        show('Gespeichert ✓')
      } else {
        const res = await apiPost('projekte.php', { ...d, sort_order: items.length + 1 })
        setItems([...items, { id: res.id, ...d }])
        show('Hinzugefügt ✓')
      }
      setModal(null)
    } catch { show('Fehler', 'err') }
    finally { setSaving(false) }
  }

  async function del(id) {
    if (!confirm('Projekt löschen?')) return
    try { await apiDelete(`projekte.php?id=${id}`); setItems(items.filter(i => i.id !== id)); show('Gelöscht') }
    catch { show('Fehler', 'err') }
  }

  return (
    <>
      <Toast {...toast} />
      <SectionHeader title={`Projekte (${items.length})`} sub="Hover über eine Karte → Bearbeiten oder Löschen" />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
        {items.map(item => (
          <VisualCard key={item.id}
            actions={<><EditBtn onClick={() => setModal({ mode:'edit', id: item.id, data: { ...item } })} /><DelBtn onClick={() => del(item.id)} /></>}
            style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #1a1a1a', background: '#0d0d0d' }}
          >
            <div className="ve-img-ph" style={{ height: '160px', overflow: 'hidden', background: '#111' }}>
              {item.img_url
                ? <img src={item.img_url} alt={item.alt_text} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <div className="ve-img-ph" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333', fontSize: '.8rem' }}>Kein Bild</div>
              }
            </div>
            <div style={{ padding: '.9rem' }}>
              <div style={{ fontSize: '.65rem', color: '#e02020', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: '.4rem' }}>{item.category}</div>
              <div style={{ fontWeight: 700, fontSize: '.83rem', color: '#ddd', marginBottom: '.35rem', lineHeight: 1.4 }}>{item.title}</div>
              <div style={{ fontSize: '.74rem', color: '#444' }}>{item.client}</div>
            </div>
          </VisualCard>
        ))}
      </div>

      <AddBtn onClick={() => setModal({ mode: 'add', data: { ...emptyProj } })} label="+ Neues Projekt hinzufügen" />

      <Modal open={!!modal} onClose={() => setModal(null)}
        title={modal?.mode === 'edit' ? 'Projekt bearbeiten' : 'Neues Projekt'}
        onSave={save} saving={saving}
      >
        {modal && <>
          <Field label="Bild"><ImgUpload value={modal.data.img_url} onChange={v => set('img_url', v)} /></Field>
          <Field label="Alt-Text"><Input value={modal.data.alt_text} onChange={e => set('alt_text', e.target.value)} placeholder="Bildbeschreibung" /></Field>
          <Field label="Titel"><Input value={modal.data.title} onChange={e => set('title', e.target.value)} placeholder="Projektname" /></Field>
          <Row>
            <Field label="Kategorie"><Input value={modal.data.category} onChange={e => set('category', e.target.value)} placeholder="Vakuumtechnik · Sputtering" /></Field>
            <Field label="Kunde"><Input value={modal.data.client} onChange={e => set('client', e.target.value)} placeholder="Firma AG · CH-Ort" /></Field>
          </Row>
        </>}
      </Modal>
    </>
  )
}

/* ── Galerie Tab ────────────────────────────────────── */
function GalerieTab() {
  const [items, setItems]   = useState([])
  const [modal, setModal]   = useState(null)
  const [saving, setSaving] = useState(false)
  const [toast, show]       = useToast()

  useEffect(() => { apiGet('gallery.php').then(setItems).catch(() => {}) }, [])

  function set(k, v) { setModal(m => ({ ...m, data: { ...m.data, [k]: v } })) }

  async function save() {
    setSaving(true)
    try {
      const d = modal.data
      if (modal.mode === 'edit') {
        await apiPut(`gallery.php?id=${modal.id}`, { ...d, sort_order: items.find(i => i.id === modal.id)?.sort_order ?? 0 })
        setItems(items.map(i => i.id === modal.id ? { ...i, ...d } : i))
        show('Gespeichert ✓')
      } else {
        const res = await apiPost('gallery.php', { ...d, sort_order: items.length + 1 })
        setItems([...items, { id: res.id, ...d }])
        show('Hinzugefügt ✓')
      }
      setModal(null)
    } catch { show('Fehler', 'err') }
    finally { setSaving(false) }
  }

  async function del(id) {
    if (!confirm('Bild löschen?')) return
    try { await apiDelete(`gallery.php?id=${id}`); setItems(items.filter(i => i.id !== id)); show('Gelöscht') }
    catch { show('Fehler', 'err') }
  }

  return (
    <>
      <Toast {...toast} />
      <SectionHeader title={`Galerie (${items.length} Bilder)`} sub="Hover über ein Bild → Bearbeiten oder Löschen" />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '.8rem' }}>
        {items.map(item => (
          <VisualCard key={item.id}
            actions={<><EditBtn onClick={() => setModal({ mode:'edit', id: item.id, data: { ...item } })} /><DelBtn onClick={() => del(item.id)} /></>}
            style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid #1a1a1a' }}
          >
            <div className="ve-img-ph" style={{ height: '140px', background: '#111' }}>
              {item.img_url
                ? <img src={item.img_url} alt={item.alt_text} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <div className="ve-img-ph" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333', fontSize: '.8rem' }}>Kein Bild</div>
              }
            </div>
            {item.alt_text && (
              <div className="ve-card" style={{ padding: '.4rem .6rem', fontSize: '.72rem', color: '#444', background: '#0d0d0d' }}>{item.alt_text}</div>
            )}
          </VisualCard>
        ))}
      </div>

      <AddBtn onClick={() => setModal({ mode: 'add', data: { ...emptyGal } })} label="+ Bild zur Galerie hinzufügen" />

      <Modal open={!!modal} onClose={() => setModal(null)}
        title={modal?.mode === 'edit' ? 'Bild bearbeiten' : 'Neues Galeriebild'}
        onSave={save} saving={saving}
      >
        {modal && <>
          <Field label="Bild"><ImgUpload value={modal.data.img_url} onChange={v => set('img_url', v)} /></Field>
          <Field label="Alt-Text"><Input value={modal.data.alt_text} onChange={e => set('alt_text', e.target.value)} placeholder="Bildbeschreibung" /></Field>
        </>}
      </Modal>
    </>
  )
}

/* ── Main Page ─────────────────────────────────────── */
export default function ProjekteEditorPage() {
  const [tab, setTab] = useState('projekte')
  const router = useRouter()
  useEffect(() => { checkAuth().then(ok => { if (!ok) router.push('/studio') }) }, [])

  const tabs = [['projekte', '🏗️ Projekte'], ['galerie', '🖼️ Galerie']]

  return (
    <div style={{ maxWidth: '1100px' }}>
      <h1 className="s-page-title">Projekte & Galerie</h1>
      <p className="s-page-sub">Projektkarten und Bildergalerie — visuell verwalten</p>
      <div className="s-tabs" style={{ marginBottom: '2rem' }}>
        {tabs.map(([k, l]) => (
          <button key={k} className={`s-tab${tab === k ? ' s-active' : ''}`} onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>
      {tab === 'projekte' && <ProjekteTab />}
      {tab === 'galerie'  && <GalerieTab />}
    </div>
  )
}
