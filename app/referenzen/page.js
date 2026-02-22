/* ─────────────────────────────────────────────────────────
   Página: Referenzen (Clientes + Socios / Partners)
   ───────────────────────────────────────────────────────── */
import FadeInObserver from '@/components/FadeInObserver'

export const metadata = {
  title: 'Referenzen — iNOTEC Engineering',
  description: 'Führende Unternehmen vertrauen iNOTEC Engineering. Referenzliste und Partnernetzwerk.',
}

/* Logos de clientes (24 empresas) */
const clients = [
  { img: 'p13_img1.jpeg',  alt: 'hcp' },
  { img: 'p13_img2.jpeg',  alt: 'MAS' },
  { img: 'p13_img3.jpeg',  alt: 'idonus' },
  { img: 'p13_img4.jpeg',  alt: 'thyssenkrupp' },
  { img: 'p13_img5.jpeg',  alt: 'Heinz Braukhoff' },
  { img: 'p13_img6.jpeg',  alt: 'elringklinger' },
  { img: 'p13_img7.jpeg',  alt: 'Aquarium Systems' },
  { img: 'p13_img8.jpeg',  alt: 'SwissDrones' },
  { img: 'p13_img9.jpeg',  alt: 'connova' },
  { img: 'p13_img10.jpeg', alt: 'ANAVIA' },
  { img: 'p13_img11.jpeg', alt: 'Leica Geosystems' },
  { img: 'p13_img12.jpeg', alt: 'straub' },
  { img: 'p13_img13.jpeg', alt: 'Oerlikon' },
  { img: 'p13_img14.jpeg', alt: 'ULTRALIGHT' },
  { img: 'p13_img15.jpeg', alt: 'Regal Raptor' },
  { img: 'p13_img16.jpeg', alt: 'spm' },
  { img: 'p13_img17.jpeg', alt: 'TEL Mechatronics' },
  { img: 'p13_img18.jpeg', alt: 'PPS' },
  { img: 'p13_img19.jpeg', alt: 'RMB' },
  { img: 'p13_img20.jpeg', alt: 'glas trösch' },
  { img: 'p13_img21.jpeg', alt: 'Rheintal Isolationen' },
  { img: 'p13_img22.jpeg', alt: 'Andreas Frick AG' },
  { img: 'p13_img23.jpeg', alt: 'INOXWELDING' },
  { img: 'p13_img24.jpeg', alt: 'theSign' },
]

/* Socios / Partners */
const partners = [
  { img: 'p1_img3.jpeg',  name: 'Kessler Consulting',       desc: 'Engineering-Partner · CH-Vilters · seit 2002' },
  { img: 'p1_img4.png',   name: 'Industrie Technik AG',     desc: 'Engineering · Projektierung · Automation · Service' },
  { img: 'p1_img6.png',   name: 'Hauswirth',                desc: 'Industrie-Elektrik · Elektrotechnik' },
  { img: 'p1_img8.jpeg',  name: 'INOXWELDING System GmbH',  desc: 'Spezialist für Edelstahlschweissen' },
  { img: 'p1_img9.jpeg',  name: 'RMB AG',                   desc: 'Maschinenbau & Automatisierung · CH-Sevelen' },
  { img: 'p1_img10.jpeg', name: 'MAS AG',                   desc: 'Spezialmaschinenbau · CH-Sevelen' },
]

export default function ReferenzenPage() {
  return (
    <>
      {/* ── SECCIÓN CLIENTES (Logos) ── */}
      <section id="clients" style={{ paddingTop: '140px' }}>
        <div className="container">

          {/* Encabezado centrado */}
          <div className="clients-head fade-in">
            <span className="tag">Referenzen</span>
            <div className="divider" style={{ margin: '1rem auto' }}></div>
            <h2 className="section-title">Vertrauen führender Unternehmen</h2>
            <p className="section-sub" style={{ margin: '0 auto 3rem' }}>
              Unsere Erfahrung stammt aus der Zusammenarbeit mit führenden Unternehmen weltweit.
            </p>
          </div>

          {/* Grid de logos de clientes */}
          <div className="logos-grid fade-in">
            {clients.map(({ img, alt }) => (
              <div key={img} className="logo-tile">
                <img src={`/assets/${img}`} alt={alt} />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── SECCIÓN PARTNERS (Socios) ── */}
      <section id="partners">
        <div className="container">

          {/* Encabezado centrado */}
          <div className="fade-in" style={{ textAlign: 'center' }}>
            <span className="tag">Partnernetzwerk</span>
            <div className="divider" style={{ margin: '1rem auto' }}></div>
            <h2 className="section-title">In enger Zusammenarbeit</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>
              Starke Partnerschaften für ganzheitliche Engineering-Lösungen.
            </p>
          </div>

          {/* Grid de tarjetas de socios */}
          <div className="partners-wrap fade-in">
            {partners.map(({ img, name, desc }) => (
              <div key={name} className="partner-card">
                <div className="partner-logo">
                  <img src={`/assets/${img}`} alt={name} />
                </div>
                <div className="partner-name">{name}</div>
                <div className="partner-desc">{desc}</div>
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
