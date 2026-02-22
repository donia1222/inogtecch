/* ─────────────────────────────────────────────────────────
   Página de Inicio — Home  (conectada al API)
   ───────────────────────────────────────────────────────── */
import FadeInObserver from '@/components/FadeInObserver'
import ContactForm from '@/components/ContactForm'
import Link from 'next/link'
import { apiGet } from '@/lib/api'

export const revalidate = 60 // ISR: revalidar cada 60 s

async function getHomeData() {
  const [hero, ticker, erfahrungRaw, companies, specialties] = await Promise.all([
    apiGet('hero.php').catch(() => null),
    apiGet('ticker.php').catch(() => []),
    apiGet('erfahrung.php').catch(() => null),
    apiGet('erfahrung_companies.php').catch(() => []),
    apiGet('erfahrung_specialties.php').catch(() => []),
  ])
  // erfahrung.php devuelve { content:{...}, companies, specialties }
  const erfahrung = erfahrungRaw?.content ?? erfahrungRaw
  return { hero, ticker, erfahrung, companies, specialties }
}

export default async function HomePage() {
  const { hero, ticker, erfahrung, companies, specialties } = await getHomeData()

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
                {hero?.badge_text ?? 'Sevelen · CH-9475 · Schweiz'}
              </div>
              <p className="hero-eyebrow">iNOTEC-Engineering</p>
              <h1 className="hero-title">
                {hero?.title_line1 ?? 'Von der Idee'}<br />
                <span className="red">{hero?.title_line2_red ?? 'zum Produkt.'}</span>
              </h1>
              <p className="hero-desc">
                {hero?.description ?? 'Ganzheitliche Engineering-Prozesse von der ersten Konzeptidee bis hin zum fertigen Prototypen. Vakuumtechnik, Handlings-Systeme und innovative Gebrauchsgegenstände — realisiert mit 3D Autodesk Inventor und AutoCAD.'}
              </p>
              <div className="hero-btns">
                <a href="#contact" className="btn-primary">
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
                  <div className="stat-val">{hero?.stat1_val ?? '20+'}</div>
                  <div className="stat-lbl">{hero?.stat1_lbl ?? 'Jahre Erfahrung'}</div>
                </div>
                <div>
                  <div className="stat-val">{hero?.stat2_val ?? '25+'}</div>
                  <div className="stat-lbl">{hero?.stat2_lbl ?? 'Referenzkunden'}</div>
                </div>
                <div>
                  <div className="stat-val">{hero?.stat3_val ?? '136+'}</div>
                  <div className="stat-lbl">{hero?.stat3_lbl ?? 'Projekte realisiert'}</div>
                </div>
              </div>
            </div>

            {/* Columna derecha: imágenes */}
            <div className="hero-visual fade-in">
              <div className="hero-main-img">
                <img src={hero?.hero_main_img ?? '/assets/p1_img1.jpeg'} alt={hero?.hero_main_alt ?? 'iNOTEC Engineering'} />
                <div className="hero-img-overlay"></div>
                <div className="hero-img-label">
                  {hero?.hero_img_label ?? 'iNOTEC · Komplexe Anlagen & Systeme'}
                </div>
              </div>
              <div className="hero-mini-cards">
                <div className="mini-card">
                  <img src={hero?.mini1_img ?? '/assets/p4_img3.jpeg'} alt={hero?.mini1_alt ?? 'iTEC-Sp5'} />
                  <div className="mini-card-label">{hero?.mini1_label ?? 'iTEC-Sp5 Sputtersystem'}</div>
                </div>
                <div className="mini-card">
                  <img src={hero?.mini2_img ?? '/assets/p2_img1.jpeg'} alt={hero?.mini2_alt ?? 'FEM Analyse'} />
                  <div className="mini-card-label">{hero?.mini2_label ?? 'FEM-Belastungsanalyse'}</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="ticker">
        <div className="ticker-track">
          {ticker.length > 0
            ? [...ticker, ...ticker].map((item, i) => (
                <span key={i} className="ticker-item">{item.text}</span>
              ))
            : ['Autodesk Inventor','AutoCAD','FEM-Berechnungen','Vakuumtechnik',
               '3D-Visualisierung','Sputtering','Evaporation','Ion Beam Etching',
               'Prototypenbau','Stücklisten','Handling Systeme','Konzeptentwicklung',
               'Explosionszeichnungen','3D-Animation',
               'Autodesk Inventor','AutoCAD','FEM-Berechnungen','Vakuumtechnik',
               '3D-Visualisierung','Sputtering','Evaporation','Ion Beam Etching',
               'Prototypenbau','Stücklisten','Handling Systeme','Konzeptentwicklung',
               'Explosionszeichnungen','3D-Animation'].map((item, i) => (
                <span key={i} className="ticker-item">{item}</span>
              ))
          }
        </div>
      </div>

      {/* ── ABOUT / ERFAHRUNG ── */}
      <section id="erfahrung">
        <div className="container">
          <div className="erfahrung-grid">

            {/* Columna izquierda */}
            <div className="fade-in">
              <span className="tag">{erfahrung?.tag_left ?? 'Herzlich Willkommen'}</span>
              <div className="divider"></div>
              <h2 className="section-title">{erfahrung?.title ?? 'Ganzheitliche Engineering-Prozesse'}</h2>
              {erfahrung?.text1 && <p className="text-block">{erfahrung.text1}</p>}
              {erfahrung?.text2 && <p className="text-block" dangerouslySetInnerHTML={{ __html: erfahrung.text2 }} />}
              {erfahrung?.text3 && <p className="text-block" dangerouslySetInnerHTML={{ __html: erfahrung.text3 }} />}
              {erfahrung?.highlight_text && (
                <div className="highlight-box">
                  <p dangerouslySetInnerHTML={{ __html: erfahrung.highlight_text }} />
                </div>
              )}
            </div>

            {/* Columna derecha */}
            <div className="fade-in">
              <span className="tag">{erfahrung?.tag_right ?? 'Erfahrung aus führenden Firmen'}</span>
              <div className="divider"></div>
              {erfahrung?.intro_text_right && (
                <p className="text-block" style={{ marginBottom: '1.5rem' }}>{erfahrung.intro_text_right}</p>
              )}

              {/* Chips de empresas */}
              <div className="erfahrung-companies">
                {companies.length > 0
                  ? companies.map(co => (
                      <span key={co.id} className="co-chip">{co.name}</span>
                    ))
                  : ['OC Oerlikon','MRC USA','Leybold Deutschland','Inodisc Deutschland','Evatec AG','Provac AG'].map(co => (
                      <span key={co} className="co-chip">{co}</span>
                    ))
                }
              </div>

              {/* Grid de especialidades */}
              <div style={{ marginTop: '2.5rem' }}>
                <span className="tag">Vakuumtechnik — Spezialgebiete</span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.8rem', marginTop: '1rem' }}>
                  {specialties.length > 0
                    ? specialties.map(sp => (
                        <div key={sp.id} style={{ background: 'var(--glass)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1rem' }}>
                          <div style={{ fontSize: '.72rem', fontWeight: 700, color: 'var(--red2)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: '.4rem' }}>{sp.label}</div>
                          <div style={{ fontSize: '.83rem', color: 'var(--muted)' }}>{sp.desc_text}</div>
                        </div>
                      ))
                    : [
                        { label: 'Beschichtung', desc: 'Evaporation · Sputtering · Vacuum Solder Processes' },
                        { label: 'Bearbeitung',  desc: 'Ion Beam Polishing · Ion Beam Etching' },
                        { label: 'Systeme',      desc: 'Handling Systeme · Anlagenkonzepte' },
                        { label: 'Produkte',     desc: 'Innovative Gebrauchsgegenstände aller Art' },
                      ].map(({ label, desc }) => (
                        <div key={label} style={{ background: 'var(--glass)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1rem' }}>
                          <div style={{ fontSize: '.72rem', fontWeight: 700, color: 'var(--red2)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: '.4rem' }}>{label}</div>
                          <div style={{ fontSize: '.83rem', color: 'var(--muted)' }}>{desc}</div>
                        </div>
                      ))
                  }
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

              <ul className="contact-services">
                {[
                  'Erstellung von Konzepten und Studien',
                  'Konzept Realisierung bis hin zur Produktionszeichnung und Stückliste',
                  'Erstellung von 3D Daten ab 2D Zeichnung',
                  '3D Animationen und 3D Visualisierung',
                  '3D Explosionszeichnungen',
                  'FEM Berechnungen',
                  'Auf Wunsch inklusive Prototypenproduktion und Vertrieb',
                ].map(s => <li key={s}>{s}</li>)}
              </ul>
            </div>

            <ContactForm />

          </div>
        </div>
      </section>

      <FadeInObserver />
    </>
  )
}
