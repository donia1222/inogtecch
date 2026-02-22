'use client'
// ── Editor Visual: Referenzen (Logos + Partner) ─────────
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { checkAuth, apiGet, apiPost, apiPut, apiDelete } from '@/lib/api'
import { useToast, Toast, Modal, Field, Input, ImgUpload, EditBtn, DelBtn, AddBtn, VisualCard, SectionHeader } from '@/app/studio/ve'

/* ── Logos Tab ──────────────────────────────────────── */
function LogosTab() {
  const [items, setItems]   = useState([])
  const [modal, setModal]   = useState(null)
  const [saving, setSaving] = useState(false)
  const [toast, show]       = useToast()

  useEffect(() => { apiGet('referenzen.php').then(setItems).catch(() => {}) }, [])
  function set(k, v) { setModal(m => ({ ...m, data: { ...m.data, [k]: v } })) }

  async function save() {
    setSaving(true)
    try {
      const d = modal.data
      if (modal.mode === 'edit') {
        await apiPut(`referenzen.php?id=${modal.id}`, { ...d, sort_order: items.find(i => i.id === modal.id)?.sort_order ?? 0 })
        setItems(items.map(i => i.id === modal.id ? { ...i, ...d } : i))
        show('Gespeichert ✓')
      } else {
        const res = await apiPost('referenzen.php', { ...d, sort_order: items.length + 1 })
        setItems([...items, { id: res.id, ...d }])
        show('Hinzugefügt ✓')
      }
      setModal(null)
    } catch { show('Fehler', 'err') }
    finally { setSaving(false) }
  }

  async function del(id) {
    if (!confirm('Logo löschen?')) return
    try { await apiDelete(`referenzen.php?id=${id}`); setItems(items.filter(i => i.id !== id)); show('Gelöscht') }
    catch { show('Fehler', 'err') }
  }

  return (
    <>
      <Toast {...toast} />
      <SectionHeader title={`Kunden-Logos (${items.length})`} sub="Hover über ein Logo → Bearbeiten oder Löschen" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '.8rem' }}>
        {items.map(item => (
          <VisualCard key={item.id}
            actions={<><EditBtn onClick={() => setModal({ mode:'edit', id: item.id, data: { ...item } })} /><DelBtn onClick={() => del(item.id)} /></>}
            style={{ background: 'rgba(255,255,255,.03)', border: '1px solid #1a1a1a', borderRadius: '10px', padding: '.8rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.5rem', minHeight: '90px', justifyContent: 'center' }}
          >
            {item.img_url
              ? <img src={item.img_url} alt={item.alt_text} style={{ maxHeight: '50px', maxWidth: '120px', objectFit: 'contain', filter: 'brightness(0.9)' }} />
              : <div style={{ color: '#333', fontSize: '.75rem' }}>Kein Bild</div>
            }
            {item.alt_text && <div style={{ fontSize: '.65rem', color: '#444', textAlign: 'center' }}>{item.alt_text}</div>}
          </VisualCard>
        ))}
      </div>
      <AddBtn onClick={() => setModal({ mode:'add', data: { img_url:'', alt_text:'' } })} label="+ Kunden-Logo hinzufügen" />
      <Modal open={!!modal} onClose={() => setModal(null)}
        title={modal?.mode === 'edit' ? 'Logo bearbeiten' : 'Neues Logo'}
        onSave={save} saving={saving}
      >
        {modal && <>
          <Field label="Logo-Bild"><ImgUpload value={modal.data.img_url} onChange={v => set('img_url', v)} /></Field>
          <Field label="Unternehmensname (Alt-Text)"><Input value={modal.data.alt_text} onChange={e => set('alt_text', e.target.value)} placeholder="z.B. Leica Geosystems" /></Field>
        </>}
      </Modal>
    </>
  )
}

/* ── Partner Tab ────────────────────────────────────── */
function PartnerTab() {
  const [items, setItems]   = useState([])
  const [modal, setModal]   = useState(null)
  const [saving, setSaving] = useState(false)
  const [toast, show]       = useToast()

  useEffect(() => { apiGet('partners.php').then(setItems).catch(() => {}) }, [])
  function set(k, v) { setModal(m => ({ ...m, data: { ...m.data, [k]: v } })) }

  async function save() {
    setSaving(true)
    try {
      const d = modal.data
      if (modal.mode === 'edit') {
        await apiPut(`partners.php?id=${modal.id}`, { ...d, sort_order: items.find(i => i.id === modal.id)?.sort_order ?? 0 })
        setItems(items.map(i => i.id === modal.id ? { ...i, ...d } : i))
        show('Gespeichert ✓')
      } else {
        const res = await apiPost('partners.php', { ...d, sort_order: items.length + 1 })
        setItems([...items, { id: res.id, ...d }])
        show('Hinzugefügt ✓')
      }
      setModal(null)
    } catch { show('Fehler', 'err') }
    finally { setSaving(false) }
  }

  async function del(id) {
    if (!confirm('Partner löschen?')) return
    try { await apiDelete(`partners.php?id=${id}`); setItems(items.filter(i => i.id !== id)); show('Gelöscht') }
    catch { show('Fehler', 'err') }
  }

  return (
    <>
      <Toast {...toast} />
      <SectionHeader title={`Partner (${items.length})`} sub="Hover über eine Karte → Bearbeiten oder Löschen" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
        {items.map(item => (
          <VisualCard key={item.id}
            actions={<><EditBtn onClick={() => setModal({ mode:'edit', id: item.id, data: { ...item } })} /><DelBtn onClick={() => del(item.id)} /></>}
            style={{ background: 'rgba(255,255,255,.03)', border: '1px solid #1a1a1a', borderRadius: '12px', padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '.6rem', alignItems: 'center', textAlign: 'center' }}
          >
            {item.img_url
              ? <img src={item.img_url} alt={item.name} style={{ maxHeight: '60px', maxWidth: '160px', objectFit: 'contain' }} />
              : <div className="ve-img-ph" style={{ width: '60px', height: '60px', background: '#111', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333', fontSize: '.75rem' }}>Kein Bild</div>
            }
            <div style={{ fontWeight: 700, fontSize: '.88rem', color: '#ddd' }}>{item.name}</div>
            <div style={{ fontSize: '.75rem', color: '#555' }}>{item.desc_text}</div>
          </VisualCard>
        ))}
      </div>
      <AddBtn onClick={() => setModal({ mode:'add', data: { img_url:'', name:'', desc_text:'' } })} label="+ Partner hinzufügen" />
      <Modal open={!!modal} onClose={() => setModal(null)}
        title={modal?.mode === 'edit' ? 'Partner bearbeiten' : 'Neuer Partner'}
        onSave={save} saving={saving}
      >
        {modal && <>
          <Field label="Logo"><ImgUpload value={modal.data.img_url} onChange={v => set('img_url', v)} /></Field>
          <Field label="Name"><Input value={modal.data.name} onChange={e => set('name', e.target.value)} placeholder="z.B. RMB AG" /></Field>
          <Field label="Beschreibung"><Input value={modal.data.desc_text} onChange={e => set('desc_text', e.target.value)} placeholder="z.B. Maschinenbau · CH-Sevelen" /></Field>
        </>}
      </Modal>
    </>
  )
}

export default function ReferenzenEditorPage() {
  const [tab, setTab] = useState('logos')
  const router = useRouter()
  useEffect(() => { checkAuth().then(ok => { if (!ok) router.push('/studio') }) }, [])

  return (
    <div style={{ maxWidth: '1100px' }}>
      <h1 className="s-page-title">Referenzen</h1>
      <p className="s-page-sub">Kunden-Logos und Partner — visuell verwalten</p>
      <div className="s-tabs" style={{ marginBottom: '2rem' }}>
        {[['logos', '🏆 Kunden-Logos'], ['partner', '🤝 Partner']].map(([k, l]) => (
          <button key={k} className={`s-tab${tab === k ? ' s-active' : ''}`} onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>
      {tab === 'logos'   && <LogosTab />}
      {tab === 'partner' && <PartnerTab />}
    </div>
  )
}
