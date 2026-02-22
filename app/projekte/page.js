/* ─────────────────────────────────────────────────────────
   Página: Projekte (conectada al API)
   ───────────────────────────────────────────────────────── */
import FadeInObserver from '@/components/FadeInObserver'
import { apiGet } from '@/lib/api'


export const metadata = {
  title: 'Projekte — iNOTEC Engineering',
  description: 'Ausgewählte Projekte von iNOTEC: Vakuumanlagen, Drohnentechnologie, Fahrzeuge, Laboranlagen und mehr.',
}

export default async function ProjektePage() {
  const [projects, galleryImages] = await Promise.all([
    apiGet('projekte.php').catch(() => []),
    apiGet('gallery.php').catch(() => []),
  ])

  return (
    <>
      {/* ── SECCIÓN PROJEKTE ── */}
      <section id="projects" style={{ paddingTop: '140px' }}>
        <div className="container">

          <div className="fade-in">
            <span className="tag">Projekte &amp; Referenzen</span>
            <div className="divider"></div>
            <h2 className="section-title">Ausgewählte Projekte</h2>
            <p className="section-sub">
              Vielfalt als Stärke — von Vakuumanlagen über Drohnentechnologie bis hin
              zu innovativen Fahrzeugen und Laboranlagen.
            </p>
          </div>

          <div className="projects-grid">
            {projects.map((p) => (
              <div key={p.id} className="proj-card fade-in">
                <div className="proj-img">
                  <img src={p.img_url} alt={p.alt_text} />
                  <div className="proj-img-overlay"></div>
                </div>
                <div className="proj-body">
                  <div className="proj-cat">{p.category}</div>
                  <div className="proj-title">{p.title}</div>
                  <div className="proj-client">{p.client}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── GALERÍA ── */}
      <section id="gallery">
        <div className="container">
          <div className="fade-in" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="tag">Galerie</span>
            <div className="divider" style={{ margin: '1rem auto' }}></div>
            <h2 className="section-title">Engineering in Bildern</h2>
          </div>

          <div className="gallery-grid fade-in">
            {galleryImages.map((g) => (
              <div key={g.id} className="gallery-item">
                <img src={g.img_url} alt={g.alt_text} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <FadeInObserver />
    </>
  )
}
