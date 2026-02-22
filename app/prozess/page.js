/* ─────────────────────────────────────────────────────────
   Página: Prozess (Bewährter Projektprozess)
   ───────────────────────────────────────────────────────── */
import FadeInObserver from '@/components/FadeInObserver'

export const metadata = {
  title: 'Prozess — iNOTEC Engineering',
  description: 'Bewährter Projektprozess von iNOTEC: von Kundenspezifikationen bis Serienfertigung.',
}

/* Pasos del proceso de proyecto — 8 etapas */
const timelineSteps = [
  {
    num: '01',
    actors: ['Kunde'],
    title: 'Kundenspezifikationen & Pflichtenheft',
    desc: 'Anforderungen werden definiert und vollständig dokumentiert.',
  },
  {
    num: '02',
    actors: ['Kunde', 'iNOTEC'],
    title: 'Kick-off Meeting',
    desc: 'Gemeinsamer Projektstart, Zieldefinition und Meilensteinplanung.',
  },
  {
    num: '03',
    actors: ['iNOTEC'],
    title: 'Konzepte & Studien',
    desc: 'Erarbeitung möglicher Lösungsansätze und technischer Studien.',
  },
  {
    num: '04',
    actors: ['Kunde', 'iNOTEC'],
    title: 'Konzept-Präsentation V01 & Diskussion',
    desc: 'Vorstellung erster Konzepte und strukturierte Feedback-Runde.',
  },
  {
    num: '05',
    actors: ['iNOTEC'],
    title: 'Anpassungen & Detailausarbeitung',
    desc: 'Umsetzung des Feedbacks, FEM-Berechnungen und Animation auf Wunsch.',
  },
  {
    num: '06',
    actors: ['iNOTEC'],
    title: 'Fertigungszeichnungen & Stücklisten',
    desc: 'Vollständige Fertigungsdokumentation für die Produktion.',
  },
  {
    num: '07',
    actors: ['Kunde', 'iNOTEC'],
    title: 'Prototypenbau & Langzeittest',
    desc: 'Bau, Funktions- und Langzeittests am physischen Prototypen.',
  },
  {
    num: '08',
    actors: ['Kunde'],
    title: 'Design Review · Serienfertigung · Vertrieb',
    desc: 'Abschlussprüfung, Serienstart und Markteinführung.',
  },
]

export default function ProzessPage() {
  return (
    <>
      {/* ── SECCIÓN PROZESS ── */}
      <section id="process" style={{ paddingTop: '140px' }}>
        <div className="container">
          <div className="process-wrap">

            {/* Columna izquierda: explicación */}
            <div className="fade-in">
              <span className="tag">Projektmanagement</span>
              <div className="divider"></div>
              <h2 className="section-title">Bewährter Projektprozess</h2>
              <p style={{ color: 'var(--muted)', lineHeight: 1.75, fontSize: '.95rem' }}>
                Unser strukturierter Ablauf stellt sicher, dass Sie als Kunde stets eingebunden
                sind und alle Entwicklungsschritte transparent mitverfolgen können.
              </p>

              {/* Nota sobre flexibilidad */}
              <div className="process-note">
                <h4>Flexibel &amp; Individuell angepasst</h4>
                <p>
                  Hierbei handelt es sich um einen möglichen Projektablauf, welcher den Kundenwünschen
                  individuell angepasst werden kann. Selbstverständlich organisieren wir für Sie auch
                  den Prototypenbau bis hin zur Serienfertigung und Vertrieb.
                </p>
              </div>
            </div>

            {/* Columna derecha: timeline de 8 pasos */}
            <div className="timeline fade-in">
              {timelineSteps.map(({ num, actors, title, desc }) => (
                <div key={num} className="tl-item">
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="tl-num">{num}</div>
                  </div>
                  <div className="tl-right">
                    {/* Chips que indican quién hace esta etapa */}
                    <div className="tl-actor">
                      {actors.map(actor => (
                        <span key={actor} className={`chip ${actor === 'Kunde' ? 'chip-k' : 'chip-i'}`}>
                          {actor}
                        </span>
                      ))}
                    </div>
                    <div className="tl-title">{title}</div>
                    <div className="tl-desc">{desc}</div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Activa las animaciones fade-in al hacer scroll */}
      <FadeInObserver />
    </>
  )
}
