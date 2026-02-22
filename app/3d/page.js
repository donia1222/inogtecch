/* ─────────────────────────────────────────────────────────
   Página: 3D (Animation & Visualisierung & Explosionszeichnungen)
   ───────────────────────────────────────────────────────── */
import FadeInObserver from '@/components/FadeInObserver'

export const metadata = {
  title: '3D Animation & Visualisierung — iNOTEC Engineering',
  description: '3D-Animationen, fotorealistische Visualisierungen und Explosionszeichnungen für technische Präsentationen und Produktvermarktung.',
}


export default function ThreeDPage() {
  return (
    <>
      {/* ── SECCIÓN 3D ── */}
      <section id="threed" style={{ paddingTop: '140px' }}>
        <div className="container">

          {/* Encabezado */}
          <div className="fade-in">
            <span className="tag">3D-Dienstleistungen</span>
            <div className="divider"></div>
            <h2 className="section-title">3D-Animation &amp; Visualisierung</h2>
            <p className="section-sub">
              Besonders im Maschinenbau und der technischen Industrie werden Funktionen immer komplexer.
              Unsere 3D-Darstellungen schaffen klares Verständnis.
            </p>
          </div>

          {/* Fila superior: imagen grande + 3 imágenes pequeñas */}
          <div className="threed-hero fade-in">
            {/* Imagen principal: iNOTEC-EVO I */}
            <div className="threed-main">
              <img src="/assets/p4_img1.jpeg" alt="iNOTEC-EVO I" />
              <div className="threed-overlay"></div>
              <div className="threed-caption">
                <h3>iNOTEC-EVO I</h3>
                <p>3D-Visualisierung · Vakuumanlage</p>
              </div>
            </div>

            {/* Grid de 3 imágenes pequeñas */}
            <div className="threed-small-grid">
              <div className="threed-small">
                <img src="/assets/p4_img2.jpeg" alt="iNO-flex 650" />
                <div className="threed-small-overlay"></div>
                <div className="threed-small-caption">
                  <h4>iNO-flex 650</h4>
                  <p>Rotation &amp; Revolution System</p>
                </div>
              </div>
              <div className="threed-small">
                <img src="/assets/p3_img2.jpeg" alt="3D Explosion" />
                <div className="threed-small-overlay"></div>
                <div className="threed-small-caption">
                  <h4>3D-Explosion</h4>
                  <p>Baugruppenzerlegung</p>
                </div>
              </div>
              {/* Imagen que ocupa todo el ancho */}
              <div className="threed-small" style={{ gridColumn: '1/-1' }}>
                <img src="/assets/p5_img1.jpeg" alt="Maschineninneres" style={{ height: '150px' }} />
                <div className="threed-small-overlay"></div>
                <div className="threed-small-caption">
                  <h4>Maschinen-Visualisierung</h4>
                  <p>Fotorealistische 3D-Darstellung</p>
                </div>
              </div>
            </div>
          </div>

          {/* Fila inferior: 3 tarjetas con descripción */}
          <div className="threed-bottom fade-in">
            <div className="threed-bottom-card">
              <img src="/assets/p4_img3.jpeg" alt="iTEC-Sp5" />
              <div className="cap">
                <h4>3D-Animation</h4>
                <p>Komplexe Sachverhalte animiert für Präsentation &amp; Vermarktung neuer Produkte.</p>
              </div>
            </div>
            <div className="threed-bottom-card">
              <img src="/assets/p3_img1.jpeg" alt="3D Explosion Komponente" />
              <div className="cap">
                <h4>3D-Explosionszeichnung</h4>
                <p>Einzelteile räumlich getrennt dargestellt — für Montageanleitungen und Kataloge.</p>
              </div>
            </div>
            <div className="threed-bottom-card">
              <img src="/assets/p6_img1.jpeg" alt="Projektmanagement" />
              <div className="cap">
                <h4>3D-Visualisierung</h4>
                <p>Realistischer Eindruck des geplanten Projekts auf Basis von CAD-Daten und Skizzen.</p>
              </div>
            </div>
          </div>

          {/* ── TEXTO DETALLADO: Explosionszeichnung + Animation ── */}
          <div className="fade-in text-duo-grid">

            {/* Columna izquierda: qué es una Explosionszeichnung */}
            <div>
              <span className="tag">3D Explosion — Technische Erklärung</span>
              <div className="divider"></div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '1.2rem' }}>
                Was ist eine Explosionszeichnung?
              </h3>
              <p style={{ color: 'var(--muted)', fontSize: '.93rem', lineHeight: 1.8, marginBottom: '1rem' }}>
                Eine Explosionszeichnung (auch Explosionsgrafik, Explosivdarstellung) ist eine Art der Darstellung
                bei Zeichnungen und Grafiken, die einen komplexen Gegenstand perspektivisch und in seine
                Einzelteile zerlegt zeigt. Die dargestellten Einzelteile oder Bauteile sind räumlich voneinander
                getrennt — so, als flögen sie nach einer Explosion auseinander.
              </p>
              <p style={{ color: 'var(--muted)', fontSize: '.93rem', lineHeight: 1.8, marginBottom: '1rem' }}>
                Bei dieser Darstellungsweise wird das Wechselverhältnis des Ganzen zu seinen Teilen sowie
                deren Lage verdeutlicht. Explosivdarstellungen erlauben es, die Funktion und den Zusammenbau
                von Baugruppen darzustellen sowie einzelne Bauteile anhand angegebener Teilenummern zu
                bestimmen.
              </p>
              <p style={{ color: 'var(--muted)', fontSize: '.93rem', lineHeight: 1.8 }}>
                Diese Art der Darstellung findet in verschiedenen Bereichen Verwendung: als Informationsgrafik
                in Gebrauchsanweisungen und Ersatzteil-Katalogen (auch virtuellen, interaktiven Katalogen).
              </p>

              {/* Grid de usos de Explosionszeichnungen */}
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

            {/* Columna derecha: parámetros de la 3D Animation */}
            <div>
              <span className="tag">3D-Animation &amp; Visualisierung — Vollständig</span>
              <div className="divider"></div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '1.2rem' }}>
                Parameter &amp; Möglichkeiten
              </h3>
              <p style={{ color: 'var(--muted)', fontSize: '.93rem', lineHeight: 1.8, marginBottom: '1rem' }}>
                Besonders im Maschinenbau und der technischen Industrie werden Funktionen und Prozesse
                immer komplexer. Um diese Abläufe für den Laien, potenziellen Kunden oder den Facharbeiter
                verständlicher zu machen, benötigt es aussagekräftige Darstellungen oder Animationen,
                welche ein grundlegendes Verständnis schaffen.
              </p>
              <p style={{ color: 'var(--muted)', fontSize: '.93rem', lineHeight: 1.8, marginBottom: '1rem' }}>
                3D-Animationen können komplexe Sachverhalte oder technische Zusammenhänge veranschaulichen
                und verdeutlichen. Nach der Konstruktion des 3D-Modells erfolgt die Animation — dabei lassen
                sich fast <strong style={{ color: 'var(--text)' }}>alle Parameter eines Objekts animieren</strong>.
              </p>
              <p style={{ color: 'var(--muted)', fontSize: '.93rem', lineHeight: 1.8, marginBottom: '1rem' }}>
                Mit <strong style={{ color: 'var(--text)' }}>3D-Visualisierungen</strong> erhalten Sie im Voraus einen
                realistischen Eindruck des geplanten Projekts. Als Grundlage können neben CAD-Daten auch
                Pläne oder Skizzen übernommen und verarbeitet werden. Nach der Konstruktion werden die
                Oberflächen bzw. Materialien, die Beleuchtung und die Kameraansichten definiert.
                Korrekturen und Änderungen am Modell oder der Umgebung sind hier noch jederzeit möglich.
                Ausgegeben werden hochauflösende Bilddateien zur weiteren Verarbeitung.
              </p>

              {/* Cita destacada */}
              <div style={{ background: 'rgba(224,32,32,.07)', border: '1px solid rgba(224,32,32,.2)', borderRadius: '14px', padding: '1.3rem', marginTop: '1rem' }}>
                <p style={{ color: 'var(--text)', fontSize: '.9rem', lineHeight: 1.7, fontWeight: 600 }}>
                  "Diese beiden Anwendungen sind hervorragend für die Präsentation und Vermarktung neuer Produkte geeignet."
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Activa las animaciones fade-in al hacer scroll */}
      <FadeInObserver />
    </>
  )
}
