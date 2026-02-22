/* ─────────────────────────────────────────────────────────
   Página de Inicio — Home
   Contiene: Hero, Ticker, About (Erfahrung), Kontakt
   Las demás secciones tienen su propia página
   ───────────────────────────────────────────────────────── */
import FadeInObserver from '@/components/FadeInObserver'
import ContactForm from '@/components/ContactForm'
import Link from 'next/link'

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section id="hero">
        <div className="hero-bg"></div>
        <div className="container">
          <div className="hero-grid">

            {/* Columna izquierda: texto */}
            <div className="hero-content fade-in">
              <div className="hero-badge">
                <span className="dot"></span>
                Sevelen · CH-9475 · Schweiz
              </div>
              <p className="hero-eyebrow">iNOTEC-Engineering</p>
              <h1 className="hero-title">
                Von der Idee<br />
                <span className="red">zum Produkt.</span>
              </h1>
              <p className="hero-desc">
                Ganzheitliche Engineering-Prozesse von der ersten Konzeptidee bis hin zum
                fertigen Prototypen. Vakuumtechnik, Handlings-Systeme und innovative
                Gebrauchsgegenstände — realisiert mit 3D Autodesk Inventor und AutoCAD.
              </p>
              <div className="hero-btns">
                <a href="#contact" className="btn-primary">
                  {/* Ícono de teléfono */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44 2 2 0 0 1 3.59 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.73 16z"/>
                  </svg>
                  Kontakt aufnehmen
                </a>
                <Link href="/projekte" className="btn-outline">
                  Projekte ansehen →
                </Link>
              </div>

              {/* Estadísticas */}
              <div className="hero-stats">
                <div>
                  <div className="stat-val">20<span>+</span></div>
                  <div className="stat-lbl">Jahre Erfahrung</div>
                </div>
                <div>
                  <div className="stat-val">25<span>+</span></div>
                  <div className="stat-lbl">Referenzkunden</div>
                </div>
                <div>
                  <div className="stat-val">136<span>+</span></div>
                  <div className="stat-lbl">Projekte realisiert</div>
                </div>
              </div>
            </div>

            {/* Columna derecha: imágenes */}
            <div className="hero-visual fade-in">
              <div className="hero-main-img">
                <img src="/assets/p1_img1.jpeg" alt="iNOTEC Engineering" />
                <div className="hero-img-overlay"></div>
                <div className="hero-img-label">
                  <span>iNOTEC</span> · Komplexe Anlagen &amp; Systeme
                </div>
              </div>
              <div className="hero-mini-cards">
                <div className="mini-card">
                  <img src="/assets/p4_img3.jpeg" alt="iTEC-Sp5" />
                  <div className="mini-card-label">iTEC-Sp5 Sputtersystem</div>
                </div>
                <div className="mini-card">
                  <img src="/assets/p2_img1.jpeg" alt="FEM Analyse" />
                  <div className="mini-card-label">FEM-Belastungsanalyse</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── TICKER — cinta de tecnologías animada ── */}
      <div className="ticker">
        <div className="ticker-track">
          {/* Duplicado para que la animación sea continua */}
          {['Autodesk Inventor','AutoCAD','FEM-Berechnungen','Vakuumtechnik',
            '3D-Visualisierung','Sputtering','Evaporation','Ion Beam Etching',
            'Prototypenbau','Stücklisten','Handling Systeme','Konzeptentwicklung',
            'Explosionszeichnungen','3D-Animation',
            'Autodesk Inventor','AutoCAD','FEM-Berechnungen','Vakuumtechnik',
            '3D-Visualisierung','Sputtering','Evaporation','Ion Beam Etching',
            'Prototypenbau','Stücklisten','Handling Systeme','Konzeptentwicklung',
            'Explosionszeichnungen','3D-Animation'].map((item, i) => (
            <span key={i} className="ticker-item">{item}</span>
          ))}
        </div>
      </div>

      {/* ── ABOUT / ERFAHRUNG ── */}
      <section id="erfahrung">
        <div className="container">
          <div className="erfahrung-grid">

            {/* Columna izquierda: presentación */}
            <div className="fade-in">
              <span className="tag">Herzlich Willkommen</span>
              <div className="divider"></div>
              <h2 className="section-title">Ganzheitliche Engineering-Prozesse</h2>
              <p className="text-block">
                Wenn ganzheitliche Engineering Prozesse, bis hin zum Prototypen Ihre Themen sind,
                dann sind Sie bei uns sicher an der richtigen Adresse.
              </p>
              <p className="text-block">
                Unser Hauptbetätigungsfeld liegt in der Erstellung und Ausarbeitung von{' '}
                <strong>komplexen Anlagen sowie Anlagenkonzepten</strong>; im speziellen in der{' '}
                <strong>Vakuumtechnik</strong> (Evaporation, sputtering, ion beam polishing,
                ion beam etching, vacuum solder processes), <strong>Handlings Systemen</strong>{' '}
                und innovativen Gebrauchsgegenständen aller Art.
              </p>
              <p className="text-block">
                Hierzu verwenden wir modernste Hilfsmittel wie <strong>3D Autodesk Inventor</strong>{' '}
                oder <strong>AutoCAD</strong>, welche es uns ermöglichen, kundenspezifisch
                Dokumente und Daten zu erstellen:
              </p>
              <ul className="pdf-list">
                <li>Erstellung von Konzepten und Studien</li>
                <li>Konzept Realisierung bis hin zur Produktionszeichnung und Stückliste</li>
                <li>Erstellung von 3D Daten ab 2D Zeichnung</li>
                <li>3D Animationen und 3D Visualisierung</li>
                <li>3D Explosionszeichnungen</li>
                <li>FEM Berechnungen</li>
                <li>Auf Wunsch inklusive Prototypenproduktion und Vertrieb</li>
              </ul>
              <div className="highlight-box">
                <p>
                  Unsere Erfahrung und Kompetenz, welche wir in führenden Firmen sammeln durften,
                  könnten auch <strong>Ihrem Unternehmen wichtige Impulse geben</strong>.
                  Wenn Sie Fragen oder Anregungen haben, schreiben Sie uns oder rufen Sie uns an.
                  Ihre Kontaktaufnahme freut uns.
                </p>
              </div>
            </div>

            {/* Columna derecha: empresas y especialidades */}
            <div className="fade-in">
              <span className="tag">Erfahrung aus führenden Firmen</span>
              <div className="divider"></div>
              <p className="text-block" style={{ marginBottom: '1.5rem' }}>
                Unsere Kompetenz wurde in international führenden Unternehmen der Vakuumtechnik,
                Beschichtungstechnologie und des Maschinenbaus aufgebaut:
              </p>

              {/* Chips de empresas */}
              <div className="erfahrung-companies">
                {['OC Oerlikon','MRC USA','Leybold Deutschland','Inodisc Deutschland','Evatec AG','Provac AG'].map(co => (
                  <span key={co} className="co-chip">{co}</span>
                ))}
              </div>

              {/* Grid de especialidades */}
              <div style={{ marginTop: '2.5rem' }}>
                <span className="tag">Vakuumtechnik — Spezialgebiete</span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.8rem', marginTop: '1rem' }}>
                  {[
                    { label: 'Beschichtung', desc: 'Evaporation · Sputtering · Vacuum Solder Processes' },
                    { label: 'Bearbeitung',  desc: 'Ion Beam Polishing · Ion Beam Etching' },
                    { label: 'Systeme',      desc: 'Handling Systeme · Anlagenkonzepte' },
                    { label: 'Produkte',     desc: 'Innovative Gebrauchsgegenstände aller Art' },
                  ].map(({ label, desc }) => (
                    <div key={label} style={{ background: 'var(--glass)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1rem' }}>
                      <div style={{ fontSize: '.72rem', fontWeight: 700, color: 'var(--red2)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: '.4rem' }}>{label}</div>
                      <div style={{ fontSize: '.83rem', color: 'var(--muted)' }}>{desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── KONTAKT ── */}
      <section id="contact">
        <div className="container">
          <div className="contact-wrap">

            {/* Información de contacto */}
            <div className="contact-info fade-in">
              <span className="tag">Kontakt</span>
              <div className="divider"></div>
              <h2 className="section-title">Ihr Projekt beginnt hier.</h2>
              <p>
                Wenn Sie Fragen oder Anregungen haben, schreiben Sie uns oder rufen Sie uns an.
                Ihre Kontaktaufnahme freut uns. Wir begleiten Ihr Projekt von der Idee bis zum
                fertigen Produkt — individuell, kompetent und termingerecht.
              </p>
              {[
                { icon: '📍', label: 'Adresse',  val: 'Bahnhofstrasse 2<br/>CH-9475 Sevelen, Schweiz', html: true },
                { icon: '📞', label: 'Telefon',  val: '+41 / 81 756 74 55' },
                { icon: '📱', label: 'Mobile',   val: '+41 / 78 606 61 05' },
                { icon: '🌐', label: 'Website',  val: 'www.inotecengineering.ch' },
                { icon: '✉️', label: 'E-Mail',   val: 'inotec-inotec@bluewin.ch' },
              ].map(({ icon, label, val, html }) => (
                <div key={label} className="c-detail">
                  <div className="c-icon">{icon}</div>
                  <div>
                    <div className="c-lbl">{label}</div>
                    {html
                      ? <div className="c-val" dangerouslySetInnerHTML={{ __html: val }} />
                      : <div className="c-val">{val}</div>
                    }
                  </div>
                </div>
              ))}
            </div>

            {/* Formulario de contacto — necesita client para submit */}
            <ContactForm />

          </div>
        </div>
      </section>

      {/* Activa las animaciones fade-in */}
      <FadeInObserver />
    </>
  )
}
