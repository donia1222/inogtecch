/* ─────────────────────────────────────────────────────────
   Página: FEM (Finite-Elemente-Methode / Belastungsanalyse)
   ───────────────────────────────────────────────────────── */
import FadeInObserver from '@/components/FadeInObserver'

export const metadata = {
  title: 'FEM — iNOTEC Engineering',
  description: 'FEM-Berechnungen und konstruktionsbegleitende Finite-Elemente-Analyse für kürzere Entwicklungszeiten und geringere Kosten.',
}

/* Ventajas de la FEM */
const femBenefits = [
  'Entwicklungszeiten signifikant verkürzen',
  'Prototypenaufwand und Fertigungskosten senken',
  'Materialoptimierung durch Variantenvergleich',
  'Innovationen früher als der Wettbewerb marktreif',
  'Qualitätsverbesserung durch digitale Voruntersuchung',
  'Kostenanalyse und Anpassungen in frühen Phasen',
]

export default function FEMPage() {
  return (
    <>
      {/* ── SECCIÓN FEM ── */}
      <section id="fem" style={{ paddingTop: '140px' }}>
        <div className="container">
          <div className="fem-grid">

            {/* Imagen FEM con badge técnico */}
            <div className="fem-img-wrap fade-in">
              <img src="/assets/p2_img1.jpeg" alt="FEM Belastungsanalyse" />
              <div className="fem-img-badge">
                FEM · Hauptspannung · Typ 1 · max. 98.1 MPa
              </div>
            </div>

            {/* Texto explicativo */}
            <div className="fem-text fade-in">
              <span className="tag">Belastungsanalyse</span>
              <div className="divider"></div>
              <h2 className="section-title">
                Digitale Produktentwicklung — heute Realität
              </h2>
              <p>
                Die digitale Produktentwicklung ist keine Zukunftsmusik, sondern eine reale und
                notwendige Methode, um die Entwicklungsprozesse effizienter zu gestalten und
                signifikant zu beschleunigen.
              </p>
              <p>
                Die konstruktionsbegleitende Berechnung ist ein wesentlicher Teil der digitalen
                Entwicklung und übernimmt eine wichtige Rolle. Sie hilft mit, Entwicklungszeiten zu
                verkürzen, den Aufwand beim Bau von Prototypen zu verringern, Fertigungskosten zu
                reduzieren, Innovationen zu ermöglichen und die Qualität zu verbessern.
              </p>
              <p>
                Durch die Verlagerung der Untersuchung von Varianten, der Materialoptimierung,
                der Kostenanalyse und notwendigen Anpassungen in frühen Phasen der Produktentwicklung
                lassen sich Kosten senken. Spätere Änderungen im Entwicklungsprozess sind kostspielig.
                Späte Ideen kommen oft nur deshalb nicht mehr zum Zug, weil eine Modifikation zu
                teuer wäre.
              </p>
              <p>
                Die Optimierung des virtuellen Prototyps dagegen kostet weniger Zeit und Geld als
                der Bau von physischen Prototypen und die Durchführung langwieriger Testreihen.
                Wer Innovationen früher und vor allem vor dem Wettbewerb auf den Markt bringt,
                kann bessere Preise erzielen und wirtschaftlicher arbeiten. Der Langsame muss sich
                mit niedrigen Preisen gegen den Schnellen behaupten und auf Rendite verzichten —
                das kann ein verlustreicher Kampf werden.
              </p>

              {/* Lista de ventajas */}
              <ul className="fem-list">
                {femBenefits.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Activa las animaciones fade-in al hacer scroll */}
      <FadeInObserver />
    </>
  )
}
