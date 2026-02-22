/* ─────────────────────────────────────────────────────────
   Página: FEM (conectada al API)
   ───────────────────────────────────────────────────────── */
import FadeInObserver from '@/components/FadeInObserver'
import { apiGet } from '@/lib/api'


export const metadata = {
  title: 'FEM — iNOTEC Engineering',
  description: 'FEM-Berechnungen und konstruktionsbegleitende Finite-Elemente-Analyse für kürzere Entwicklungszeiten und geringere Kosten.',
}

export default async function FEMPage() {
  const data = await apiGet('fem.php').catch(() => null)
  const content  = data?.content  ?? null
  const benefits = data?.benefits ?? []

  return (
    <>
      <section id="fem" style={{ paddingTop: '140px' }}>
        <div className="container">
          <div className="fem-grid">

            {/* Imagen FEM */}
            <div className="fem-img-wrap fade-in">
              <img
                src={content?.img_url ?? '/assets/p2_img1.jpeg'}
                alt={content?.img_alt ?? 'FEM Belastungsanalyse'}
              />
              <div className="fem-img-badge">
                {content?.img_badge ?? 'FEM · Hauptspannung · Typ 1 · max. 98.1 MPa'}
              </div>
            </div>

            {/* Texto */}
            <div className="fem-text fade-in">
              <span className="tag">{content?.tag ?? 'Belastungsanalyse'}</span>
              <div className="divider"></div>
              <h2 className="section-title">
                {content?.title ?? 'Digitale Produktentwicklung — heute Realität'}
              </h2>
              {content?.text1 && <p>{content.text1}</p>}
              {content?.text2 && <p>{content.text2}</p>}
              {content?.text3 && <p>{content.text3}</p>}
              {content?.text4 && <p>{content.text4}</p>}

              {benefits.length > 0 && (
                <ul className="fem-list">
                  {benefits.map((b) => (
                    <li key={b.id}>{b.text}</li>
                  ))}
                </ul>
              )}
            </div>

          </div>
        </div>
      </section>

      <FadeInObserver />
    </>
  )
}
