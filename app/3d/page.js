/* ─────────────────────────────────────────────────────────
   Página: 3D (conectada al API)
   ───────────────────────────────────────────────────────── */
import FadeInObserver from '@/components/FadeInObserver'
import { apiGet } from '@/lib/api'


export const metadata = {
  title: '3D Animation & Visualisierung — iNOTEC Engineering',
  description: '3D-Animationen, fotorealistische Visualisierungen und Explosionszeichnungen für technische Präsentationen und Produktvermarktung.',
}

export default async function ThreeDPage() {
  const data = await apiGet('threed.php').catch(() => null)
  const c = data?.content ?? {}
  const images = data?.images ?? []

  const heroMain   = images.find(i => i.type === 'hero_main')
  const heroSmall  = images.filter(i => i.type === 'hero_small')
  const bottomImgs = images.filter(i => i.type === 'bottom')

  return (
    <>
      <section id="threed" style={{ paddingTop: '140px' }}>
        <div className="container">

          {/* Encabezado */}
          <div className="fade-in">
            <span className="tag">{c.page_tag ?? '3D-Dienstleistungen'}</span>
            <div className="divider"></div>
            <h2 className="section-title">{c.page_title ?? '3D-Animation & Visualisierung'}</h2>
            {c.page_sub && <p className="section-sub">{c.page_sub}</p>}
          </div>

          {/* Fila superior: imagen grande + pequeñas */}
          <div className="threed-hero fade-in">
            {heroMain && (
              <div className="threed-main">
                <img src={heroMain.img_url} alt={heroMain.alt_text} />
                <div className="threed-overlay"></div>
                <div className="threed-caption">
                  <h3>{heroMain.caption_h}</h3>
                  <p>{heroMain.caption_p}</p>
                </div>
              </div>
            )}

            <div className="threed-small-grid">
              {heroSmall.map((img, idx) => (
                <div
                  key={img.id}
                  className="threed-small"
                  style={idx === heroSmall.length - 1 ? { gridColumn: '1/-1' } : {}}
                >
                  <img
                    src={img.img_url}
                    alt={img.alt_text}
                    style={idx === heroSmall.length - 1 ? { height: '150px' } : {}}
                  />
                  <div className="threed-small-overlay"></div>
                  <div className="threed-small-caption">
                    <h4>{img.caption_h}</h4>
                    <p>{img.caption_p}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fila inferior: tarjetas */}
          <div className="threed-bottom fade-in">
            {bottomImgs.map((img) => (
              <div key={img.id} className="threed-bottom-card">
                <img src={img.img_url} alt={img.alt_text} />
                <div className="cap">
                  <h4>{img.caption_h}</h4>
                  <p>{img.caption_p}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Texto detallado: Explosionszeichnung + Animation */}
          <div className="fade-in text-duo-grid">

            {/* Columna izquierda */}
            <div>
              <span className="tag">{c.expl_tag ?? '3D Explosion — Technische Erklärung'}</span>
              <div className="divider"></div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '1.2rem' }}>
                {c.expl_title ?? 'Was ist eine Explosionszeichnung?'}
              </h3>
              {c.expl_text1 && <p style={{ color: 'var(--muted)', fontSize: '.93rem', lineHeight: 1.8, marginBottom: '1rem' }}>{c.expl_text1}</p>}
              {c.expl_text2 && <p style={{ color: 'var(--muted)', fontSize: '.93rem', lineHeight: 1.8, marginBottom: '1rem' }}>{c.expl_text2}</p>}
              {c.expl_text3 && <p style={{ color: 'var(--muted)', fontSize: '.93rem', lineHeight: 1.8 }}>{c.expl_text3}</p>}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.7rem', marginTop: '1.5rem' }}>
                {[
                  { label: 'Gebrauchsanweisungen', desc: 'Komplexe Produkte verständlich dokumentiert' },
                  { label: 'Ersatzteil-Kataloge',  desc: 'Auch virtuell und interaktiv realisierbar' },
                  { label: 'Montageanleitungen',   desc: 'Montage- und Demontageschritte visuell erklärt' },
                  { label: 'Technische Zeichnungen', desc: 'Komplexe Maschinen übersichtlich dargestellt' },
                ].map(({ label, desc }) => (
                  <div key={label} style={{ background: 'var(--glass)', border: '1px solid var(--border)', borderRadius: '10px', padding: '.9rem' }}>
                    <div style={{ fontSize: '.7rem', fontWeight: 700, color: 'var(--red2)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: '.3rem' }}>{label}</div>
                    <div style={{ fontSize: '.8rem', color: 'var(--muted)' }}>{desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Columna derecha */}
            <div>
              <span className="tag">{c.anim_tag ?? '3D-Animation & Visualisierung — Vollständig'}</span>
              <div className="divider"></div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '1.2rem' }}>
                {c.anim_title ?? 'Parameter & Möglichkeiten'}
              </h3>
              {c.anim_text1 && <p style={{ color: 'var(--muted)', fontSize: '.93rem', lineHeight: 1.8, marginBottom: '1rem' }}>{c.anim_text1}</p>}
              {c.anim_text2 && <p style={{ color: 'var(--muted)', fontSize: '.93rem', lineHeight: 1.8, marginBottom: '1rem' }} dangerouslySetInnerHTML={{ __html: c.anim_text2 }} />}
              {c.anim_text3 && <p style={{ color: 'var(--muted)', fontSize: '.93rem', lineHeight: 1.8, marginBottom: '1rem' }} dangerouslySetInnerHTML={{ __html: c.anim_text3 }} />}
              {c.anim_quote && (
                <div style={{ background: 'rgba(224,32,32,.07)', border: '1px solid rgba(224,32,32,.2)', borderRadius: '14px', padding: '1.3rem', marginTop: '1rem' }}>
                  <p style={{ color: 'var(--text)', fontSize: '.9rem', lineHeight: 1.7, fontWeight: 600 }}>
                    "{c.anim_quote}"
                  </p>
                </div>
              )}
            </div>

          </div>

        </div>
      </section>

      <FadeInObserver />
    </>
  )
}
