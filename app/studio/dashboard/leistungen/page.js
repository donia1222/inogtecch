'use client'
// ── Editor Visual: Leistungen ───────────────────────────
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { checkAuth, apiGet, apiPost, apiPut, apiDelete } from '@/lib/api'
import { useToast, Toast, Modal, Field, Input, Textarea, Row, EditBtn, DelBtn, AddBtn, VisualCard, SectionHeader } from '@/app/studio/ve'

const empty = { icon: '', title: '', desc_text: '' }

export default function LeistungenEditorPage() {
  const [items, setItems]     = useState([])
  const [modal, setModal]     = useState(null)   // { mode:'edit'|'add', data:{} }
  const [saving, setSaving]   = useState(false)
  const [toast, show]         = useToast()
  const router                = useRouter()

  useEffect(() => {
    checkAuth().then(ok => { if (!ok) router.push('/studio') })
    apiGet('leistungen.php').then(setItems).catch(() => {})
  }, [])

  function openEdit(item) { setModal({ mode: 'edit', id: item.id, data: { ...item } }) }
  function openAdd()      { setModal({ mode: 'add',  data: { ...empty } }) }
  function set(k, v)      { setModal(m => ({ ...m, data: { ...m.data, [k]: v } })) }

  async function save() {
    setSaving(true)
    try {
      const d = modal.data
      if (modal.mode === 'edit') {
        await apiPut(`leistungen.php?id=${modal.id}`, d)
        setItems(items.map(i => i.id === modal.id ? { ...i, ...d } : i))
        show('Gespeichert ✓')
      } else {
        const res = await apiPost('leistungen.php', { ...d, sort_order: items.length + 1 })
        setItems([...items, { id: res.id, ...d }])
        show('Hinzugefügt ✓')
      }
      setModal(null)
    } catch { show('Fehler beim Speichern', 'err') }
    finally { setSaving(false) }
  }

  async function del(id) {
    if (!confirm('Leistung wirklich löschen?')) return
    try {
      await apiDelete(`leistungen.php?id=${id}`)
      setItems(items.filter(i => i.id !== id))
      show('Gelöscht')
    } catch { show('Fehler', 'err') }
  }

  return (
    <div style={{ maxWidth: '900px' }}>
      <Toast {...toast} />
      <h1 className="s-page-title">Leistungen</h1>
      <p className="s-page-sub">Kernkompetenzen — wie sie auf der Website erscheinen</p>

      <SectionHeader title={`Leistungen (${items.length})`} sub="Hover über eine Karte → Bearbeiten oder Löschen" />

      {/* Visual grid — same layout as website */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.2rem' }}>
        {items.map(item => (
          <VisualCard key={item.id}
            actions={<><EditBtn onClick={() => openEdit(item)} /><DelBtn onClick={() => del(item.id)} /></>}
            style={{ background: 'rgba(255,255,255,.03)', border: '1px solid #1a1a1a', borderRadius: '14px', padding: '1.5rem' }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '.7rem' }}>{item.icon}</div>
            <div style={{ fontWeight: 800, fontSize: '.97rem', color: '#fff', marginBottom: '.5rem' }}>{item.title}</div>
            <div style={{ fontSize: '.82rem', color: '#555', lineHeight: 1.6 }}>{item.desc_text}</div>
          </VisualCard>
        ))}
      </div>

      <AddBtn onClick={openAdd} label="+ Neue Leistung hinzufügen" />

      {/* Edit / Add Modal */}
      <Modal
        open={!!modal}
        onClose={() => setModal(null)}
        title={modal?.mode === 'edit' ? 'Leistung bearbeiten' : 'Neue Leistung'}
        onSave={save}
        saving={saving}
      >
        {modal && <>
          <Row>
            <Field label="Icon (Emoji)">
              <Input value={modal.data.icon} onChange={e => set('icon', e.target.value)} placeholder="💡" />
            </Field>
            <Field label="Titel">
              <Input value={modal.data.title} onChange={e => set('title', e.target.value)} placeholder="Konzepte & Studien" />
            </Field>
          </Row>
          <Field label="Beschreibung">
            <Textarea value={modal.data.desc_text} onChange={e => set('desc_text', e.target.value)} rows={4} placeholder="Kurze Beschreibung der Leistung…" />
          </Field>
        </>}
      </Modal>
    </div>
  )
}
