'use client'
// ── Editor Visual: Startseite (Hero + Ticker + Erfahrung) ──
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { checkAuth, apiGet, apiPost, apiPut, apiDelete } from '@/lib/api'
import { useToast, Toast, Modal, Field, Input, Textarea, Row, ImgUpload, EditBtn, DelBtn, AddBtn, VisualCard, SectionHeader, FieldStylesProvider } from '@/app/studio/ve'

/* ════════════════════════════════════════════════════════════
   TAB: HERO
════════════════════════════════════════════════════════════ */
function HeroTab() {
  const [data, setData]     = useState(null)
  const [saving, setSaving] = useState(false)
  const [toast, show]       = useToast()

  useEffect(() => { apiGet('hero.php').then(setData).catch(() => {}) }, [])
  function set(k, v) { setData(d => ({ ...d, [k]: v })) }

  async function save() {
    setSaving(true)
    try { await apiPut('hero.php', data); show('Hero gespeichert ✓') }
    catch { show('Fehler', 'err') }
    finally { setSaving(false) }
  }

  if (!data) return <div className="s-loading">Wird geladen…</div>

  return (
    <>
      <Toast {...toast} />

      {/* ── Visual preview of hero ── */}
      <div className="ve-preview" style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '16px', padding: '1.5rem', marginBottom: '2rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>

          {/* Left: text */}
          <div>
            <div className="ve-chip" style={{ display: 'inline-flex', alignItems: 'center', gap: '.4rem', background: 'rgba(255,255,255,.04)', border: '1px solid #222', borderRadius: '999px', padding: '.25rem .8rem', fontSize: '.72rem', color: '#888', marginBottom: '.8rem' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#e02020', flexShrink: 0 }}></span>
              {data.badge_text}
            </div>
            <h2 style={{ margin: '0 0 .5rem', fontSize: '1.6rem', fontWeight: 900, color: '#fff', lineHeight: 1.2 }}>
              {data.title_line1}<br /><span style={{ color: '#e02020' }}>{data.title_line2_red}</span>
            </h2>
            <p style={{ fontSize: '.78rem', color: '#555', lineHeight: 1.6, marginBottom: '1rem' }}>{data.desc_text}</p>
            <div style={{ display: 'flex', gap: '2rem' }}>
              {[1, 2, 3].map(n => (
                <div key={n} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#fff' }}>{data[`stat${n}_val`]}</div>
                  <div style={{ fontSize: '.65rem', color: '#444' }}>{data[`stat${n}_lbl`]}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: images */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
            <div style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', height: '130px' }}>
              {data.hero_main_img
                ? <img src={data.hero_main_img} alt={data.hero_main_alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <div className="ve-img-ph" style={{ width: '100%', height: '100%', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333', fontSize: '.75rem' }}>Hauptbild</div>
              }
              <div style={{ position: 'absolute', bottom: '6px', left: '6px', background: 'rgba(0,0,0,.7)', borderRadius: '5px', padding: '.2rem .5rem', fontSize: '.6rem', color: '#aaa' }}>{data.hero_img_label}</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.5rem' }}>
              {[1, 2].map(n => (
                <div key={n} className="ve-img-ph" style={{ borderRadius: '8px', overflow: 'hidden', height: '70px', background: '#111', position: 'relative' }}>
                  {data[`mini${n}_img`] && <img src={data[`mini${n}_img`]} alt={data[`mini${n}_alt`]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                  <div style={{ position: 'absolute', bottom: '3px', left: '3px', right: '3px', background: 'rgba(0,0,0,.7)', borderRadius: '4px', padding: '.15rem .4rem', fontSize: '.58rem', color: '#aaa' }}>{data[`mini${n}_label`]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Edit form ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div className="ve-card" style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: '12px', padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '.9rem' }}>
          <SectionHeader title="Badge & Titel" />
          <Field label="Badge-Text" styleKey="hero.badge"><Input value={data.badge_text} onChange={e => set('badge_text', e.target.value)} /></Field>
          <Row>
            <Field label="Titel Zeile 1" styleKey="hero.title1"><Input value={data.title_line1} onChange={e => set('title_line1', e.target.value)} /></Field>
            <Field label="Titel Zeile 2 (rot)" styleKey="hero.title2"><Input value={data.title_line2_red} onChange={e => set('title_line2_red', e.target.value)} /></Field>
          </Row>
          <Field label="Beschreibung" styleKey="hero.desc"><Textarea value={data.desc_text} onChange={e => set('desc_text', e.target.value)} rows={3} /></Field>
        </div>

        <div className="ve-card" style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: '12px', padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '.9rem' }}>
          <SectionHeader title="Statistiken" />
          {[1, 2, 3].map(n => (
            <Row key={n}>
              <Field label={`Wert ${n}`}><Input value={data[`stat${n}_val`]} onChange={e => set(`stat${n}_val`, e.target.value)} placeholder="20+" /></Field>
              <Field label={`Label ${n}`}><Input value={data[`stat${n}_lbl`]} onChange={e => set(`stat${n}_lbl`, e.target.value)} placeholder="Jahre Erfahrung" /></Field>
            </Row>
          ))}
        </div>
      </div>

      {/* Images */}
      <div className="ve-card" style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: '12px', padding: '1.2rem', marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '.9rem' }}>
        <SectionHeader title="Bilder" />
        <Field label="Hauptbild"><ImgUpload value={data.hero_main_img} onChange={v => set('hero_main_img', v)} /></Field>
        <Row>
          <Field label="Alt-Text Hauptbild"><Input value={data.hero_main_alt} onChange={e => set('hero_main_alt', e.target.value)} /></Field>
          <Field label="Bild-Beschriftung"><Input value={data.hero_img_label} onChange={e => set('hero_img_label', e.target.value)} /></Field>
        </Row>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
          {[1, 2].map(n => (
            <div key={n} style={{ display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
              <Field label={`Mini-Karte ${n}`}><ImgUpload value={data[`mini${n}_img`]} onChange={v => set(`mini${n}_img`, v)} /></Field>
              <Field label="Label"><Input value={data[`mini${n}_label`]} onChange={e => set(`mini${n}_label`, e.target.value)} /></Field>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <button onClick={save} disabled={saving} style={{
          padding: '.85rem 2.5rem', borderRadius: '10px', border: 'none',
          background: '#e02020', color: '#fff', fontWeight: 700, fontSize: '.95rem',
          cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? .6 : 1,
        }}>{saving ? 'Wird gespeichert…' : 'Hero speichern'}</button>
      </div>
    </>
  )
}

/* ════════════════════════════════════════════════════════════
   TAB: TICKER
════════════════════════════════════════════════════════════ */
function TickerTab() {
  const [items, setItems]   = useState([])
  const [modal, setModal]   = useState(null)
  const [saving, setSaving] = useState(false)
  const [newTxt, setNewTxt] = useState('')
  const [toast, show]       = useToast()

  useEffect(() => { apiGet('ticker.php').then(setItems).catch(() => {}) }, [])

  async function saveEdit() {
    setSaving(true)
    try {
      await apiPut(`ticker.php?id=${modal.id}`, { text: modal.text, sort_order: items.find(i => i.id === modal.id)?.sort_order ?? 0 })
      setItems(items.map(i => i.id === modal.id ? { ...i, text: modal.text } : i))
      setModal(null); show('Gespeichert ✓')
    } catch { show('Fehler', 'err') }
    finally { setSaving(false) }
  }

  async function del(id) {
    if (!confirm('Element löschen?')) return
    try { await apiDelete(`ticker.php?id=${id}`); setItems(items.filter(i => i.id !== id)); show('Gelöscht') }
    catch { show('Fehler', 'err') }
  }

  async function add() {
    if (!newTxt.trim()) return
    try {
      const res = await apiPost('ticker.php', { text: newTxt })
      setItems([...items, { id: res.id, text: newTxt }])
      setNewTxt(''); show('Hinzugefügt ✓')
    } catch { show('Fehler', 'err') }
  }

  return (
    <>
      <Toast {...toast} />
      <SectionHeader title={`Ticker (${items.length} Einträge)`} sub="Animierter Text-Banner unter dem Hero" />

      {/* Visual ticker preview */}
      <div className="ve-preview" style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '10px', padding: '1rem', marginBottom: '1.5rem', overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          {items.map(item => (
            <span key={item.id} style={{ fontSize: '.78rem', fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: '.08em' }}>· {item.text}</span>
          ))}
        </div>
      </div>

      {/* Items list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '.4rem' }}>
        {items.map(item => (
          <VisualCard key={item.id}
            actions={<><EditBtn onClick={() => setModal({ id: item.id, text: item.text })} /><DelBtn onClick={() => del(item.id)} /></>}
            style={{ display: 'flex', alignItems: 'center', gap: '.8rem', padding: '.65rem 1rem', background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: '8px' }}
          >
            <span style={{ color: '#e02020', fontSize: '.9rem' }}>·</span>
            <span style={{ fontSize: '.85rem', color: '#bbb', fontWeight: 600, flex: 1 }}>{item.text}</span>
          </VisualCard>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '.6rem', marginTop: '1rem' }}>
        <input value={newTxt} onChange={e => setNewTxt(e.target.value)} onKeyDown={e => e.key === 'Enter' && add()}
          placeholder="Neuer Ticker-Eintrag… (Enter zum Hinzufügen)"
          className="ve-input" style={{ flex: 1, background: '#0d0d0d', border: '1px solid #222', borderRadius: '9px', padding: '.7rem 1rem', color: '#fff', fontSize: '.88rem', outline: 'none' }} />
        <button onClick={add} style={{ padding: '.7rem 1.2rem', borderRadius: '9px', border: 'none', background: '#e02020', color: '#fff', fontWeight: 700, fontSize: '.95rem', cursor: 'pointer' }}>+ Hinzufügen</button>
      </div>

      <Modal open={!!modal} onClose={() => setModal(null)} title="Ticker-Element bearbeiten" onSave={saveEdit} saving={saving}>
        {modal && <Field label="Text"><Input value={modal.text} onChange={e => setModal(m => ({ ...m, text: e.target.value }))} /></Field>}
      </Modal>
    </>
  )
}

/* ════════════════════════════════════════════════════════════
   TAB: ERFAHRUNG
════════════════════════════════════════════════════════════ */
function ErfahrungTab() {
  const [content, setContent]       = useState(null)
  const [companies, setCompanies]   = useState([])
  const [specs, setSpecs]           = useState([])
  const [modal, setModal]           = useState(null)
  const [saving, setSaving]         = useState(false)
  const [newComp, setNewComp]       = useState('')
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
    setSaving(true)
    try { await apiPut('erfahrung.php', content); show('Texte gespeichert ✓') }
    catch { show('Fehler', 'err') }
    finally { setSaving(false) }
  }

  // Companies
  async function saveComp() {
    setSaving(true)
    try {
      await apiPut(`erfahrung_companies.php?id=${modal.id}`, { name: modal.name, sort_order: companies.find(c => c.id === modal.id)?.sort_order ?? 0 })
      setCompanies(companies.map(c => c.id === modal.id ? { ...c, name: modal.name } : c))
      setModal(null); show('Gespeichert ✓')
    } catch { show('Fehler', 'err') }
    finally { setSaving(false) }
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
      setCompanies([...companies, { id: res.id, name: newComp }])
      setNewComp(''); show('Hinzugefügt ✓')
    } catch { show('Fehler', 'err') }
  }

  // Specialties
  async function saveSpec() {
    setSaving(true)
    try {
      await apiPut(`erfahrung_specialties.php?id=${modal.id}`, { label: modal.label, desc_text: modal.desc_text, sort_order: specs.find(s => s.id === modal.id)?.sort_order ?? 0 })
      setSpecs(specs.map(s => s.id === modal.id ? { ...s, label: modal.label, desc_text: modal.desc_text } : s))
      setModal(null); show('Gespeichert ✓')
    } catch { show('Fehler', 'err') }
    finally { setSaving(false) }
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
      setSpecs([...specs, { id: res.id, ...newSpec }])
      setNewSpec({ label: '', desc_text: '' }); show('Hinzugefügt ✓')
    } catch { show('Fehler', 'err') }
  }

  if (!content) return <div className="s-loading">Wird geladen…</div>

  return (
    <>
      <Toast {...toast} />

      {/* Texts */}
      <div className="ve-card" style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: '12px', padding: '1.2rem', marginBottom: '1.5rem' }}>
        <SectionHeader title="Texte" />
        {['text1', 'text2', 'text3'].map((f, i) => (
          <div key={f} style={{ marginBottom: '.9rem' }}>
            <Field label={`Absatz ${i + 1}`} styleKey={`erfahrung.${f}`}>
              <Textarea value={content[f] || ''} onChange={e => setContent(c => ({ ...c, [f]: e.target.value }))} rows={3} />
            </Field>
          </div>
        ))}
        <Field label="Highlight-Box" styleKey="erfahrung.highlight">
          <Textarea value={content.highlight_text || ''} onChange={e => setContent(c => ({ ...c, highlight_text: e.target.value }))} rows={3} />
        </Field>
        <button onClick={saveContent} disabled={saving} style={{ marginTop: '1rem', padding: '.75rem 1.8rem', borderRadius: '8px', border: 'none', background: '#e02020', color: '#fff', fontWeight: 700, fontSize: '.95rem', cursor: 'pointer' }}>
          Texte speichern
        </button>
      </div>

      {/* Companies — visual chips */}
      <div className="ve-card" style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: '12px', padding: '1.2rem', marginBottom: '1.5rem' }}>
        <SectionHeader title={`Firmen-Chips (${companies.length})`} sub="Hover über einen Chip → Bearbeiten oder Löschen" />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem', marginBottom: '1rem' }}>
          {companies.map(c => (
            <VisualCard key={c.id}
              actions={<><EditBtn onClick={() => setModal({ type:'comp', id: c.id, name: c.name })} /><DelBtn onClick={() => delComp(c.id)} /></>}
              style={{ background: 'rgba(255,255,255,.05)', border: '1px solid #1e1e1e', borderRadius: '999px', padding: '.3rem .9rem', fontSize: '.8rem', color: '#999', fontWeight: 600 }}
            >
              {c.name}
            </VisualCard>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '.6rem' }}>
          <input value={newComp} onChange={e => setNewComp(e.target.value)} onKeyDown={e => e.key === 'Enter' && addComp()}
            placeholder="Neue Firma… (Enter)"
            className="ve-input" style={{ flex: 1, background: '#141414', border: '1px solid #222', borderRadius: '8px', padding: '.6rem .9rem', color: '#fff', fontSize: '.85rem', outline: 'none' }} />
          <button onClick={addComp} style={{ padding: '.65rem 1.1rem', borderRadius: '8px', border: 'none', background: '#e02020', color: '#fff', fontWeight: 700, fontSize: '.95rem', cursor: 'pointer' }}>+ Hinzufügen</button>
        </div>
      </div>

      {/* Specialties — visual cards */}
      <div className="ve-card" style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: '12px', padding: '1.2rem' }}>
        <SectionHeader title={`Spezialgebiete (${specs.length})`} sub="Hover → Bearbeiten oder Löschen" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '.8rem', marginBottom: '1.2rem' }}>
          {specs.map(s => (
            <VisualCard key={s.id}
              actions={<><EditBtn onClick={() => setModal({ type:'spec', id: s.id, label: s.label, desc_text: s.desc_text })} /><DelBtn onClick={() => delSpec(s.id)} /></>}
              style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: '10px', padding: '.9rem' }}
            >
              <div style={{ fontSize: '.68rem', fontWeight: 700, color: '#e02020', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: '.3rem' }}>{s.label}</div>
              <div style={{ fontSize: '.78rem', color: '#555' }}>{s.desc_text}</div>
            </VisualCard>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.6rem' }}>
          <input value={newSpec.label} onChange={e => setNewSpec(v => ({ ...v, label: e.target.value }))}
            placeholder="Label (z.B. Beschichtung)"
            className="ve-input" style={{ background: '#141414', border: '1px solid #222', borderRadius: '8px', padding: '.6rem .9rem', color: '#fff', fontSize: '.83rem', outline: 'none' }} />
          <input value={newSpec.desc_text} onChange={e => setNewSpec(v => ({ ...v, desc_text: e.target.value }))}
            placeholder="Beschreibung" onKeyDown={e => e.key === 'Enter' && addSpec()}
            className="ve-input" style={{ background: '#141414', border: '1px solid #222', borderRadius: '8px', padding: '.6rem .9rem', color: '#fff', fontSize: '.83rem', outline: 'none' }} />
        </div>
        <button onClick={addSpec} style={{ marginTop: '.6rem', padding: '.65rem 1.4rem', borderRadius: '8px', border: 'none', background: '#e02020', color: '#fff', fontWeight: 700, fontSize: '.95rem', cursor: 'pointer' }}>+ Spezialgebiet hinzufügen</button>
      </div>

      {/* Modals */}
      {modal?.type === 'comp' && (
        <Modal open onClose={() => setModal(null)} title="Firma bearbeiten" onSave={saveComp} saving={saving}>
          <Field label="Firmenname"><Input value={modal.name} onChange={e => setModal(m => ({ ...m, name: e.target.value }))} /></Field>
        </Modal>
      )}
      {modal?.type === 'spec' && (
        <Modal open onClose={() => setModal(null)} title="Spezialgebiet bearbeiten" onSave={saveSpec} saving={saving}>
          <Field label="Label"><Input value={modal.label} onChange={e => setModal(m => ({ ...m, label: e.target.value }))} /></Field>
          <Field label="Beschreibung"><Input value={modal.desc_text} onChange={e => setModal(m => ({ ...m, desc_text: e.target.value }))} /></Field>
        </Modal>
      )}
    </>
  )
}

/* ════════════════════════════════════════════════════════════
   TAB: FOOTER
════════════════════════════════════════════════════════════ */
function FooterTab() {
  const [data, setData]       = useState(null)
  const [saving, setSaving]   = useState(false)
  const [newSvc, setNewSvc]   = useState('')
  const [toast, show]         = useToast()

  useEffect(() => { apiGet('footer.php').then(setData).catch(() => {}) }, [])
  function set(k, v) { setData(d => ({ ...d, [k]: v })) }

  async function save() {
    setSaving(true)
    try { await apiPut('footer.php', data); show('Footer gespeichert ✓') }
    catch { show('Fehler', 'err') }
    finally { setSaving(false) }
  }

  function addService() {
    if (!newSvc.trim()) return
    set('services', [...(data.services || []), newSvc.trim()])
    setNewSvc('')
  }
  function removeService(i) {
    set('services', (data.services || []).filter((_, idx) => idx !== i))
  }
  function moveService(i, dir) {
    const arr = [...(data.services || [])]
    const j = i + dir
    if (j < 0 || j >= arr.length) return
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
    set('services', arr)
  }

  if (!data) return <div className="s-loading">Wird geladen…</div>

  return (
    <>
      <Toast {...toast} />

      {/* ── Visual preview ── */}
      <div className="ve-preview" style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '16px', padding: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div>
            <div style={{ fontSize: '.65rem', fontWeight: 700, color: '#e02020', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: '.4rem' }}>Kontakt</div>
            <h3 style={{ margin: '0 0 .6rem', fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>{data.contact_title}</h3>
            <p style={{ fontSize: '.75rem', color: '#555', lineHeight: 1.6 }}>{data.contact_text}</p>
          </div>
          <div style={{ fontSize: '.75rem', color: '#666', display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
            <div><span style={{ color: '#888', fontWeight: 600 }}>Adresse:</span> {data.address_line1}, {data.address_line2}</div>
            <div><span style={{ color: '#888', fontWeight: 600 }}>Mobile:</span> {data.mobile}</div>
            <div><span style={{ color: '#888', fontWeight: 600 }}>Website:</span> {data.website}</div>
            <div><span style={{ color: '#888', fontWeight: 600 }}>E-Mail:</span> {data.email}</div>
            {data.services?.length > 0 && (
              <div style={{ marginTop: '.5rem', borderTop: '1px solid #1a1a1a', paddingTop: '.5rem' }}>
                {data.services.map((s, i) => (
                  <div key={i} style={{ color: '#555', fontSize: '.7rem', padding: '.1rem 0' }}>· {s}</div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Edit form ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div className="ve-card" style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: '12px', padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '.9rem' }}>
          <SectionHeader title="Kontakt-Texte" />
          <Field label="Titel" styleKey="footer.title"><Input value={data.contact_title} onChange={e => set('contact_title', e.target.value)} /></Field>
          <Field label="Beschreibung" styleKey="footer.text"><Textarea value={data.contact_text} onChange={e => set('contact_text', e.target.value)} rows={4} /></Field>
        </div>

        <div className="ve-card" style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: '12px', padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '.9rem' }}>
          <SectionHeader title="Kontaktdaten" />
          <Row>
            <Field label="Adresse Zeile 1"><Input value={data.address_line1} onChange={e => set('address_line1', e.target.value)} /></Field>
            <Field label="Adresse Zeile 2"><Input value={data.address_line2} onChange={e => set('address_line2', e.target.value)} /></Field>
          </Row>
          <Field label="Mobile"><Input value={data.mobile} onChange={e => set('mobile', e.target.value)} /></Field>
          <Field label="Website"><Input value={data.website} onChange={e => set('website', e.target.value)} /></Field>
          <Field label="E-Mail"><Input value={data.email} onChange={e => set('email', e.target.value)} /></Field>
        </div>
      </div>

      {/* ── Services list ── */}
      <div className="ve-card" style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: '12px', padding: '1.2rem', marginTop: '1.5rem' }}>
        <SectionHeader title={`Dienstleistungen (${(data.services || []).length})`} sub="Liste der Dienstleistungen im Kontaktbereich" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '.4rem', marginBottom: '1rem' }}>
          {(data.services || []).map((svc, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '.5rem', padding: '.6rem .9rem', background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)', borderRadius: '8px' }}>
              <span style={{ color: '#e02020', fontSize: '.85rem' }}>·</span>
              <span style={{ flex: 1, fontSize: '.85rem', color: 'inherit', fontWeight: 500 }}>{svc}</span>
              <button onClick={() => moveService(i, -1)} style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: '.8rem', padding: '2px 4px' }} title="Nach oben">↑</button>
              <button onClick={() => moveService(i, 1)} style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: '.8rem', padding: '2px 4px' }} title="Nach unten">↓</button>
              <button onClick={() => removeService(i)} style={{ background: 'none', border: 'none', color: '#e02020', cursor: 'pointer', fontSize: '.9rem', padding: '2px 6px' }} title="Löschen">×</button>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '.6rem' }}>
          <input value={newSvc} onChange={e => setNewSvc(e.target.value)} onKeyDown={e => e.key === 'Enter' && addService()}
            placeholder="Neue Dienstleistung… (Enter)"
            className="ve-input" style={{ flex: 1, background: '#141414', border: '1px solid #222', borderRadius: '8px', padding: '.6rem .9rem', color: '#fff', fontSize: '.85rem', outline: 'none' }} />
          <button onClick={addService} style={{ padding: '.65rem 1.1rem', borderRadius: '8px', border: 'none', background: '#e02020', color: '#fff', fontWeight: 700, fontSize: '.95rem', cursor: 'pointer' }}>+ Hinzufügen</button>
        </div>
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <button onClick={save} disabled={saving} style={{
          padding: '.85rem 2.5rem', borderRadius: '10px', border: 'none',
          background: '#e02020', color: '#fff', fontWeight: 700, fontSize: '.95rem',
          cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? .6 : 1,
        }}>{saving ? 'Wird gespeichert…' : 'Footer speichern'}</button>
      </div>
    </>
  )
}

/* ════════════════════════════════════════════════════════════
   MAIN
════════════════════════════════════════════════════════════ */
export default function HomeEditorPage() {
  const [tab, setTab] = useState('hero')
  const router = useRouter()
  useEffect(() => { checkAuth().then(ok => { if (!ok) router.push('/studio') }) }, [])

  return (
    <FieldStylesProvider>
    <div style={{ maxWidth: '1000px' }}>
      <h1 className="s-page-title">Startseite</h1>
      <p className="s-page-sub">Hero, Ticker, Erfahrung & Footer — visuell bearbeiten</p>
      <div className="s-tabs" style={{ marginBottom: '2rem' }}>
        {[['hero', '🏠 Hero'], ['ticker', '⚡ Ticker'], ['erfahrung', '🏢 Erfahrung'], ['footer', '📋 Footer']].map(([k, l]) => (
          <button key={k} className={`s-tab${tab === k ? ' s-active' : ''}`} onClick={() => setTab(k)} style={{ position: 'relative' }}>
            {l}
            {k === 'footer' && <span style={{ position: 'absolute', top: '-6px', right: '-6px', background: '#e02020', color: '#fff', fontSize: '.55rem', fontWeight: 800, padding: '1px 5px', borderRadius: '999px', letterSpacing: '.04em', lineHeight: '1.4' }}>NEU</span>}
          </button>
        ))}
      </div>
      {tab === 'hero'      && <HeroTab />}
      {tab === 'ticker'    && <TickerTab />}
      {tab === 'erfahrung' && <ErfahrungTab />}
      {tab === 'footer'    && <FooterTab />}
    </div>
    </FieldStylesProvider>
  )
}
