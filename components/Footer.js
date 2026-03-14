/* ─────────────────────────────────────────────────────────
   Footer — Pie de página
   Componente de servidor (sin hooks)
   ───────────────────────────────────────────────────────── */
import FooterModals from '@/components/FooterModals'
import { apiGet } from '@/lib/api'

export default async function Footer() {
  let titel = 'iNOTEC'
  let sub = 'ENGINEERING'
  try {
    const hero = await apiGet('hero.php')
    if (hero?.eyebrow) titel = hero.eyebrow
    if (hero?.eyebrow_sub) sub = hero.eyebrow_sub
  } catch {}

  return (
    <footer>
      <div className="container">
        <div className="footer-inner">
          {/* Logo en texto */}
          <div className="footer-logo" style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
            <img src="/assets/inotec.png" alt="iNOTEC" style={{ height: '38px', objectFit: 'contain' }} />
            <img src="/assets/eingenieringwhite.png" alt="Engineering" className="footer-eng-dark" style={{ height: '22px', objectFit: 'contain', marginLeft: '-10px', marginTop: '10px' }} />
            <img src="/assets/eingenieringblack.png" alt="Engineering" className="footer-eng-light" style={{ height: '22px', objectFit: 'contain', marginLeft: '-10px', display: 'none' }} />
          </div>

          {/* Información de copyright */}
          <div className="footer-copy">
            © 2026 {titel}-{sub} · Bahnhofstrasse 2 · CH-9475 Sevelen
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
