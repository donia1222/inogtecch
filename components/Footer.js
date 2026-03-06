/* ─────────────────────────────────────────────────────────
   Footer — Pie de página
   Componente de servidor (sin hooks)
   ───────────────────────────────────────────────────────── */
import FooterModals from '@/components/FooterModals'

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-inner">
          {/* Logo en texto */}
          <div className="footer-logo" style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
            <span style={{ color: 'var(--red)' }}>iNOTEC</span>
            <span style={{ display: 'inline-flex', alignItems: 'flex-start', gap: '0', fontSize: '11px', fontWeight: 600, color: 'var(--muted)', letterSpacing: '.25em', textTransform: 'uppercase', lineHeight: 1, fontFamily: "'Separat', sans-serif" }}>
              <span style={{ color: 'var(--red)', fontSize: '9px', lineHeight: '0.7', marginRight: '1px' }}>&#9660;</span>ENGINEERING
            </span>
          </div>

          {/* Información de copyright */}
          <div className="footer-copy">
            © 2026 iNOTEC-Engineering · Bahnhofstrasse 2 · CH-9475 Sevelen
          </div>

          {/* Links rápidos */}
          <div className="footer-links">
            <a href="mailto:inotec-inotec@bluewin.ch">E-Mail</a>
            <a href="tel:+41817567455">Telefon</a>
            <FooterModals />
            <a href="/studio">Admin</a>
            <a href="https://lweb.ch" target="_blank" rel="noopener noreferrer" style={{ opacity: .45, fontSize: '.72rem' }}>Design: lweb.ch</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
