/* ─────────────────────────────────────────────────────────
   Footer — Pie de página
   Componente de servidor (sin hooks)
   ───────────────────────────────────────────────────────── */
import FooterModals from '@/components/FooterModals'
import { apiGet } from '@/lib/api'

export default async function Footer() {
  let titel = 'iNOTEC'
  let sub = 'ENGINEERING'
  let footerData = null
  try {
    const [hero, ft] = await Promise.all([
      apiGet('hero.php').catch(() => null),
      apiGet('footer.php').catch(() => null),
    ])
    if (hero?.eyebrow) titel = hero.eyebrow
    if (hero?.eyebrow_sub) sub = hero.eyebrow_sub
    footerData = ft
  } catch {}

  const address1 = footerData?.address_line1 ?? 'Bahnhofstrasse 2'
  const address2 = footerData?.address_line2 ?? 'CH-9475 Sevelen'
  const email    = footerData?.email ?? 'inotec-inotec@bluewin.ch'
  const mobile   = footerData?.mobile ?? '+41 / 78 606 61 05'

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
            © 2026 {titel}-{sub} · {address1} · {address2}
          </div>

          {/* Links rápidos */}
          <div className="footer-links">
            <a href={`mailto:${email}`}>E-Mail</a>
            <a href={`tel:${mobile.replace(/[\s\/]/g, '')}`}>Telefon</a>
            <FooterModals />
            <a href="/studio">Admin</a>
            <a href="https://lweb.ch" target="_blank" rel="noopener noreferrer" style={{ opacity: .45, fontSize: '.72rem' }}>Design: lweb.ch</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
