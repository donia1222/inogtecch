/* ─────────────────────────────────────────────────────────
   Página: Leistungen (Servicios / Kernkompetenzen)
   ───────────────────────────────────────────────────────── */
import FadeInObserver from '@/components/FadeInObserver'

export const metadata = {
  title: 'Leistungen — iNOTEC Engineering',
  description: 'Kernkompetenzen von iNOTEC: Konzepte, Konstruktion, 3D-Daten, Animationen, FEM-Berechnungen.',
}

/* Lista de servicios con ícono, título y descripción */
const services = [
  {
    icon: '💡',
    title: 'Konzepte & Studien',
    desc: 'Erstellung von Konzepten und technischen Studien auf Basis Ihrer Spezifikationen — systematisch, dokumentiert und diskutiert.',
  },
  {
    icon: '📐',
    title: 'Konstruktion & Stücklisten',
    desc: 'Konzeptrealisierung bis zur vollständigen Produktionszeichnung mit Stücklisten — fertigungsgerecht und normkonform.',
  },
  {
    icon: '🖥️',
    title: '3D-Daten aus 2D-Zeichnungen',
    desc: 'Überführung bestehender 2D-Dokumente in vollständige 3D-Modelle mit Autodesk Inventor für moderne Entwicklungsprozesse.',
  },
  {
    icon: '🎬',
    title: '3D-Animation & Visualisierung',
    desc: 'Hochwertige 3D-Animationen und fotorealistische Visualisierungen — optimal für Präsentationen und Produktvermarktung.',
  },
  {
    icon: '💥',
    title: '3D-Explosionszeichnungen',
    desc: 'Perspektivische Zerlegungsdarstellungen komplexer Baugruppen mit Teilenummern — für Montageanleitungen und Ersatzteilkataloge.',
  },
  {
    icon: '🧮',
    title: 'FEM-Berechnungen & Prototypen',
    desc: 'Finite-Elemente-Analysen zur konstruktionsbegleitenden Optimierung. Auf Wunsch inklusive Prototypenproduktion und Vertrieb.',
  },
]

export default function LeistungenPage() {
  return (
    <>
      {/* ── SECCIÓN LEISTUNGEN ── */}
      <section id="services" style={{ paddingTop: '140px' }}>
        <div className="container">

          {/* Encabezado de sección */}
          <div className="fade-in">
            <span className="tag">Leistungen</span>
            <div className="divider"></div>
            <h2 className="section-title">Kernkompetenzen</h2>
            <p className="section-sub">
              Von der ersten Skizze bis zur Serienfertigung — wir decken den gesamten
              Engineering-Prozess mit modernsten Werkzeugen ab.
            </p>
          </div>

          {/* Grid de tarjetas de servicio */}
          <div className="services-grid">
            {services.map(({ icon, title, desc }) => (
              <div key={title} className="service-card fade-in">
                <div className="svc-icon">{icon}</div>
                <h3 className="svc-title">{title}</h3>
                <p className="svc-desc">{desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Activa las animaciones fade-in al hacer scroll */}
      <FadeInObserver />
    </>
  )
}
