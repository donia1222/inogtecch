/* ─────────────────────────────────────────────────────────
   Página: Leistungen (conectada al API)
   ───────────────────────────────────────────────────────── */
import FadeInObserver from '@/components/FadeInObserver'
import { apiGet } from '@/lib/api'


export const metadata = {
  title: 'Leistungen — iNOTEC Engineering',
  description: 'Kernkompetenzen von iNOTEC: Konzepte, Konstruktion, 3D-Daten, Animationen, FEM-Berechnungen.',
}

export default async function LeistungenPage() {
  const services = await apiGet('leistungen.php').catch(() => [])

  return (
    <>
      <section id="services" style={{ paddingTop: '140px' }}>
        <div className="container">

          <div className="fade-in">
            <span className="tag">Leistungen</span>
            <div className="divider"></div>
            <h2 className="section-title">Kernkompetenzen</h2>
            <p className="section-sub">
              Von der ersten Skizze bis zur Serienfertigung — wir decken den gesamten
              Engineering-Prozess mit modernsten Werkzeugen ab.
            </p>
          </div>

          <div className="services-grid">
            {services.map((s) => (
              <div key={s.id} className="service-card fade-in">
                <div className="svc-icon">{s.icon}</div>
                <h3 className="svc-title">{s.title}</h3>
                <p className="svc-desc">{s.desc_text}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      <FadeInObserver />
    </>
  )
}
