/* ─────────────────────────────────────────────────────────
   Página: Prozess (conectada al API)
   ───────────────────────────────────────────────────────── */
import FadeInObserver from '@/components/FadeInObserver'
import { apiGet } from '@/lib/api'


export const metadata = {
  title: 'Prozess — iNOTEC Engineering',
  description: 'Bewährter Projektprozess von iNOTEC: von Kundenspezifikationen bis Serienfertigung.',
}

export default async function ProzessPage() {
  const steps = await apiGet('prozess.php').catch(() => [])

  return (
    <>
      <section id="process" style={{ paddingTop: '140px' }}>
        <div className="container">
          <div className="process-wrap">

            {/* Columna izquierda */}
            <div className="fade-in">
              <span className="tag">Projektmanagement</span>
              <div className="divider"></div>
              <h2 className="section-title">Bewährter Projektprozess</h2>
              <p style={{ color: 'var(--muted)', lineHeight: 1.75, fontSize: '.95rem' }}>
                Unser strukturierter Ablauf stellt sicher, dass Sie als Kunde stets eingebunden
                sind und alle Entwicklungsschritte transparent mitverfolgen können.
              </p>
              <div className="process-note">
                <h4>Flexibel &amp; Individuell angepasst</h4>
                <p>
                  Hierbei handelt es sich um einen möglichen Projektablauf, welcher den Kundenwünschen
                  individuell angepasst werden kann. Selbstverständlich organisieren wir für Sie auch
                  den Prototypenbau bis hin zur Serienfertigung und Vertrieb.
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div className="timeline fade-in">
              {steps.map((step) => {
                const actors = Array.isArray(step.actors)
                  ? step.actors
                  : (typeof step.actors === 'string' ? JSON.parse(step.actors) : [])
                return (
                  <div key={step.id} className="tl-item">
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div className="tl-num">{step.step_num}</div>
                    </div>
                    <div className="tl-right">
                      <div className="tl-actor">
                        {actors.map(actor => (
                          <span key={actor} className={`chip ${actor === 'Kunde' ? 'chip-k' : 'chip-i'}`}>
                            {actor}
                          </span>
                        ))}
                      </div>
                      <div className="tl-title">{step.title}</div>
                      <div className="tl-desc">{step.desc_text}</div>
                    </div>
                  </div>
                )
              })}
            </div>

          </div>
        </div>
      </section>

      <FadeInObserver />
    </>
  )
}
