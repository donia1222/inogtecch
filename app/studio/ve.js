'use client'
// ─────────────────────────────────────────────────────────
//  ve.js — Visual Editor shared utilities
//  Importar en cada página admin del studio
// ─────────────────────────────────────────────────────────
import { useState, useRef } from 'react'
import { API } from '@/lib/api'

/* ── Toast ───────────────────────────────────────────── */
export function useToast() {
  const [t, setT] = useState({ msg: '', type: '' })
  function show(msg, type = 'ok') {
    setT({ msg, type })
    setTimeout(() => setT({ msg: '', type: '' }), 3000)
  }
  return [t, show]
}
export function Toast({ msg, type }) {
  if (!msg) return null
  return (
    <div className={`ve-toast ${type === 'ok' ? 've-toast-ok' : 've-toast-err'}`} style={{
      position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999,
      padding: '.75rem 1.4rem', borderRadius: '10px', fontWeight: 600,
      fontSize: '.85rem', boxShadow: '0 4px 20px rgba(0,0,0,.4)',
    }}>{msg}</div>
  )
}

/* ── Modal ───────────────────────────────────────────── */
export function Modal({ open, onClose, title, onSave, saving, children }) {
  if (!open) return null
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,.7)', display: 'flex',
      alignItems: 'center', justifyContent: 'flex-end',
    }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="ve-modal-panel" style={{
        width: 'min(520px, 95vw)', height: '100vh', overflow: 'auto',
        padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.2rem',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="ve-modal-title" style={{ fontWeight: 800, fontSize: '1.1rem' }}>{title}</div>
          <button onClick={onClose} className="ve-modal-close" style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', lineHeight: 1 }}>✕</button>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {children}
        </div>
        <div className="ve-modal-footer" style={{ display: 'flex', gap: '.6rem', paddingTop: '1rem' }}>
          <button onClick={onSave} disabled={saving} style={{
            flex: 1, padding: '.7rem', borderRadius: '8px', border: 'none',
            background: '#e02020', color: '#fff', fontWeight: 700, fontSize: '.9rem',
            cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? .6 : 1,
          }}>{saving ? 'Wird gespeichert…' : 'Speichern'}</button>
          <button onClick={onClose} className="ve-modal-cancel" style={{
            padding: '.7rem 1.2rem', borderRadius: '8px',
            background: 'none', cursor: 'pointer', fontWeight: 600,
          }}>Abbrechen</button>
        </div>
      </div>
    </div>
  )
}

/* ── Field helpers inside Modal ──────────────────────── */
export function Field({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '.35rem' }}>
      <label className="ve-field-label" style={{ fontSize: '.73rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em' }}>{label}</label>
      {children}
    </div>
  )
}
export function Input({ value, onChange, placeholder }) {
  return (
    <input value={value || ''} onChange={onChange} placeholder={placeholder} className="ve-input"
      style={{ borderRadius: '7px', padding: '.55rem .8rem', fontSize: '.88rem', width: '100%', outline: 'none' }} />
  )
}
export function Textarea({ value, onChange, rows = 3, placeholder }) {
  return (
    <textarea value={value || ''} onChange={onChange} rows={rows} placeholder={placeholder} className="ve-textarea"
      style={{ borderRadius: '7px', padding: '.55rem .8rem', fontSize: '.88rem', width: '100%', outline: 'none', resize: 'vertical' }} />
  )
}
export function Row({ children }) {
  return <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.8rem' }}>{children}</div>
}

/* ── ImgUpload ───────────────────────────────────────── */
export function ImgUpload({ value, onChange }) {
  const [uploading, setUploading] = useState(false)
  const ref = useRef()

  async function handleFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('image', file)
      const res  = await fetch(`${API}/upload.php`, { method: 'POST', body: fd })
      const data = await res.json()
      if (data.url) onChange(data.url)
    } catch { alert('Upload fehlgeschlagen') }
    finally { setUploading(false) }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
      {value && (
        <img src={value} alt="" className="ve-img-preview" style={{ maxHeight: '140px', objectFit: 'cover', borderRadius: '8px' }} />
      )}
      <div style={{ display: 'flex', gap: '.5rem' }}>
        <input value={value || ''} onChange={e => onChange(e.target.value)} placeholder="/assets/bild.jpg"
          className="ve-url-input" style={{ flex: 1, borderRadius: '7px', padding: '.5rem .8rem', fontSize: '.82rem', outline: 'none' }} />
        <button onClick={() => ref.current?.click()} disabled={uploading} className="ve-upload-btn"
          style={{ padding: '.5rem .9rem', borderRadius: '7px', cursor: 'pointer', fontSize: '.8rem', whiteSpace: 'nowrap' }}>
          {uploading ? '…' : '📤 Upload'}
        </button>
      </div>
      <input ref={ref} type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
    </div>
  )
}

/* ── Action buttons (pencil / trash / add) ───────────── */
export function EditBtn({ onClick }) {
  return (
    <button onClick={onClick} title="Bearbeiten" className="ve-edit-btn" style={{
      background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.1)',
      color: '#ccc', borderRadius: '6px', width: '28px', height: '28px',
      cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>✏️</button>
  )
}
export function DelBtn({ onClick }) {
  return (
    <button onClick={onClick} title="Löschen" className="ve-del-btn" style={{
      background: 'rgba(224,32,32,.1)', border: '1px solid rgba(224,32,32,.2)',
      color: '#e05050', borderRadius: '6px', width: '28px', height: '28px',
      cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>🗑</button>
  )
}
export function AddBtn({ onClick, label = '+ Hinzufügen' }) {
  return (
    <button onClick={onClick} className="ve-add-btn" style={{
      width: '100%', padding: '.9rem', borderRadius: '10px',
      border: '2px dashed #252525', background: 'none',
      color: '#555', fontWeight: 700, fontSize: '.88rem',
      cursor: 'pointer', marginTop: '1rem',
      transition: 'all .2s',
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = '#e02020'; e.currentTarget.style.color = '#e02020' }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = '#252525'; e.currentTarget.style.color = '#555' }}
    >{label}</button>
  )
}

/* ── Card wrapper with hover action bar ──────────────── */
export function VisualCard({ children, actions, style, className }) {
  const [hover, setHover] = useState(false)
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`ve-vc${className ? ' ' + className : ''}`}
      style={{ position: 'relative', ...style }}
    >
      {children}
      <div style={{
        position: 'absolute', top: '8px', right: '8px',
        display: 'flex', gap: '4px',
        opacity: hover ? 1 : 0,
        transition: 'opacity .18s',
        zIndex: 5,
      }}>
        {actions}
      </div>
    </div>
  )
}

/* ── Section header ──────────────────────────────────── */
export function SectionHeader({ title, sub }) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem', marginBottom: '.3rem' }}>
        <div style={{ width: '3px', height: '20px', background: '#e02020', borderRadius: '2px' }}></div>
        <h2 className="ve-sh-title" style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>{title}</h2>
      </div>
      {sub && <p className="ve-sh-sub" style={{ margin: 0, fontSize: '.82rem', paddingLeft: '15px' }}>{sub}</p>}
    </div>
  )
}
