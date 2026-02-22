/* ─────────────────────────────────────────────────────────
   Footer — Pie de página
   Componente de servidor (sin hooks)
   ───────────────────────────────────────────────────────── */

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-inner">
          {/* Logo en texto */}
          <div className="footer-logo">
            <span className="i">iNO</span>TEC-Engineering
          </div>

          {/* Información de copyright */}
          <div className="footer-copy">
            © 2026 iNOTEC-Engineering · Bahnhofstrasse 2 · CH-9475 Sevelen
          </div>

          {/* Links rápidos */}
          <div className="footer-links">
            <a href="mailto:inotec-inotec@bluewin.ch">E-Mail</a>
            <a href="tel:+41817567455">Telefon</a>
            <a href="/#hero">↑ Top</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
