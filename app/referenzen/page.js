/* ─────────────────────────────────────────────────────────
   Página: Referenzen (conectada al API)
   ───────────────────────────────────────────────────────── */
import FadeInObserver from '@/components/FadeInObserver'
import { apiGet } from '@/lib/api'


export const metadata = {
  title: 'Referenzen — iNOTEC Engineering',
  description: 'Führende Unternehmen vertrauen iNOTEC Engineering. Referenzliste und Partnernetzwerk.',
}

export default async function ReferenzenPage() {
  const [clients, partners] = await Promise.all([
    apiGet('referenzen.php').catch(() => []),
    apiGet('partners.php').catch(() => []),
  ])

  return (
    <>
      {/* ── CLIENTES (Logos) ── */}
      <section id="clients" style={{ paddingTop: '140px' }}>
        <div className="container">

          <div className="clients-head fade-in">
            <span className="tag">Referenzen</span>
            <div className="divider" style={{ margin: '1rem auto' }}></div>
            <h2 className="section-title">Vertrauen führender Unternehmen</h2>
            <p className="section-sub" style={{ margin: '0 auto 3rem' }}>
              Unsere Erfahrung stammt aus der Zusammenarbeit mit führenden Unternehmen weltweit.
            </p>
          </div>

          <div className="logos-grid fade-in">
            {clients.map((c) => (
              <div key={c.id} className="logo-tile">
                <img src={c.img_url} alt={c.alt_text} />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── PARTNERS ── */}
      <section id="partners">
        <div className="container">

          <div className="fade-in" style={{ textAlign: 'center' }}>
            <span className="tag">Partnernetzwerk</span>
            <div className="divider" style={{ margin: '1rem auto' }}></div>
            <h2 className="section-title">In enger Zusammenarbeit</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>
              Starke Partnerschaften für ganzheitliche Engineering-Lösungen.
            </p>
          </div>

          <div className="partners-wrap fade-in">
            {partners.map((p) => (
              <div key={p.id} className="partner-card">
                <div className="partner-logo">
                  <img src={p.img_url} alt={p.name} />
                </div>
                <div className="partner-name">{p.name}</div>
                <div className="partner-desc">{p.desc_text}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <FadeInObserver />
    </>
  )
}
