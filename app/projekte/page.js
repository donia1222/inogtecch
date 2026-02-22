/* ─────────────────────────────────────────────────────────
   Página: Projekte (Ausgewählte Projekte + Galerie)
   ───────────────────────────────────────────────────────── */
import FadeInObserver from '@/components/FadeInObserver'

export const metadata = {
  title: 'Projekte — iNOTEC Engineering',
  description: 'Ausgewählte Projekte von iNOTEC: Vakuumanlagen, Drohnentechnologie, Fahrzeuge, Laboranlagen und mehr.',
}

/* Lista completa de proyectos realizados */
const projects = [
  { img: 'p7_img1.jpeg',  alt: 'Laboranlage Glas Trösch',       cat: 'Vakuumtechnik · Laboranlage',          title: 'Kundenspez. Laboranlage & Quellen-Modifikation',            client: 'Glas Trösch AG · CH-Bützberg' },
  { img: 'p7_img7.jpeg',  alt: 'Sputter-Anlage Kessler',         cat: 'Vakuumtechnik · Sputtering',           title: 'Aufdampf- und Sputter-Anlagen & Sonderbaugruppen',          client: 'Kessler Consulting · CH-Vilters' },
  { img: 'p7_img9.jpeg',  alt: 'Spezial Kupplungen',             cat: 'Maschinenbau · Sonderkonstruktion',    title: 'Spezial-Kupplungen für den Leitungsbau',                    client: 'Straub Werke AG · CH-Wangs' },
  { img: 'p7_img10.jpeg', alt: 'Substratträger CVD',             cat: 'Vakuumtechnik · CVD-Anlage',          title: 'Spezial-Substratträger für CVD-Anlage',                     client: 'Plasma Parylene Systems GmbH · D-Rosenheim' },
  { img: 'p8_img1.jpeg',  alt: 'Swiss Drones',                   cat: 'Aerospace · Drohnentechnologie',       title: 'Antriebseinheit & Special Tools für Hubschrauber-Drohnen',  client: 'Swiss Drones AG · CH-Buchs' },
  { img: 'p8_img10.jpeg', alt: 'Leica CFK-POD',                  cat: 'Luft- & Raumfahrt · CFK',             title: 'Komplett Lösung CFK-POD · Kamera-System RCD30',             client: 'Leica Geosystems · CH-Heerbrugg' },
  { img: 'p8_img12.jpeg', alt: 'Idonus Ion-Implantation',        cat: 'Laboranlage · Ion-Implantation',       title: 'Kundenspezifische Laboranlage Ion-Implantation',             client: 'Idonus Sarl · CH-Neuchâtel' },
  { img: 'p12_img3.jpeg', alt: 'ANAVIA HT-100',                  cat: 'Aerospace · Hubschrauber-Drohne',     title: 'Hubschrauber Drohne ANAVIA HT-100',                         client: 'Anavia AG · CH-Näfels' },
  { img: 'p11_img1.jpeg', alt: 'eTribike',                       cat: 'Mobilität · E-Fahrzeug',              title: 'eTribike — Elektrisches Dreirad-Konzept',                   client: 'hcp swiss GmbH · CH-Sevelen' },
  { img: 'p9_img3.jpeg',  alt: 'Reinigungsrechen LFV',           cat: 'Wasserbau · Automatisierung',         title: 'Automatischer Reinigungsrechen',                            client: 'LFV · LI-Ruggell' },
  { img: 'p10_img1.jpeg', alt: 'Salzwasser-Aquarium',            cat: 'Produktentwicklung · Design',         title: 'Salzwasser-Aquarium mit Filter und Möbel',                  client: 'AST Aquariumsystems · CH-Grabs' },
  { img: 'p10_img3.jpeg', alt: 'HF-Reinigungsanlage',            cat: 'Industrieanlage · Reinigung',         title: 'HF-Reinigungsanlage',                                       client: 'Ultralight AG · FL-Schaanwald' },
  { img: 'p7_img16.jpeg', alt: 'Motorrad Custom Parts',          cat: 'Motorrad · Custom Parts',             title: 'Motorrad Custom Parts',                                     client: 'Regal-Raptor Schweiz GmbH · CH-Buchs' },
  { img: 'p9_img1.jpeg',  alt: 'Heisswasser-Hochdruckleitungssystem', cat: 'Rohrsysteme · Hochdruck',       title: 'Studie Heisswasser-Hochdruckleitungssystem',                client: 'Heinz Braukhoff AG · CH-Buchs' },
  { img: 'p9_img4.jpeg',  alt: 'Architektonische Studien',       cat: 'Architektur · 3D-Studie',             title: 'Architektonische Studien',                                  client: 'SAH · CH-Sevelen' },
  { img: 'p10_img2.jpeg', alt: 'Magazinwagen Elring Klinger',    cat: 'Industrie · Logistik',                title: 'Diverse Magazinwagen für Dämmbleche',                       client: 'Elring Klinger · CH-Sevelen' },
  { img: 'p11_img3.jpeg', alt: 'Drohne Wasp FlyTec',             cat: 'Aerospace · Drohnentechnologie',      title: 'Studie Antriebseinheit & Special Tools Drohne Wasp',        client: 'FlyTec AG · CH-Sevelen' },
  { img: 'p12_img4.jpeg', alt: 'Trommel-Automat RMB',            cat: 'Maschinenbau · Automation',           title: 'Trommel-Automat',                                           client: 'RMB AG · CH-Sevelen' },
  { img: 'p12_img5.jpeg', alt: 'Trommelautomat MAS',             cat: 'Maschinenbau · Spezialwerkzeuge',     title: 'Trommelautomat & diverse Spezial-Werkzeuge',                client: 'MAS AG · CH-Sevelen' },
]

/* Imágenes de la galería */
const galleryImages = [
  { img: 'p7_img8.jpeg',  alt: 'Projekt' },
  { img: 'p8_img3.jpeg',  alt: 'Drohne' },
  { img: 'p9_img1.jpeg',  alt: 'Rohrsystem' },
  { img: 'p8_img4.jpeg',  alt: 'Helicopter' },
  { img: 'p9_img4.jpeg',  alt: 'Architektur' },
  { img: 'p7_img16.jpeg', alt: 'Motorrad' },
  { img: 'p10_img2.jpeg', alt: 'Magazinwagen' },
  { img: 'p11_img3.jpeg', alt: 'Drohne Wasp' },
  { img: 'p7_img17.jpeg', alt: 'FEM Motorrad' },
  { img: 'p8_img2.jpeg',  alt: 'Turbine' },
  { img: 'p8_img5.jpeg',  alt: 'Projekt' },
  { img: 'p11_img2.jpeg', alt: 'eTribike' },
]

export default function ProjektePage() {
  return (
    <>
      {/* ── SECCIÓN PROJEKTE ── */}
      <section id="projects" style={{ paddingTop: '140px' }}>
        <div className="container">

          {/* Encabezado */}
          <div className="fade-in">
            <span className="tag">Projekte &amp; Referenzen</span>
            <div className="divider"></div>
            <h2 className="section-title">Ausgewählte Projekte</h2>
            <p className="section-sub">
              Vielfalt als Stärke — von Vakuumanlagen über Drohnentechnologie bis hin
              zu innovativen Fahrzeugen und Laboranlagen.
            </p>
          </div>

          {/* Grid de tarjetas de proyectos */}
          <div className="projects-grid">
            {projects.map(({ img, alt, cat, title, client }) => (
              <div key={img} className="proj-card fade-in">
                <div className="proj-img">
                  <img src={`/assets/${img}`} alt={alt} />
                  <div className="proj-img-overlay"></div>
                </div>
                <div className="proj-body">
                  <div className="proj-cat">{cat}</div>
                  <div className="proj-title">{title}</div>
                  <div className="proj-client">{client}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── GALERÍA — Engineering in Bildern ── */}
      <section id="gallery">
        <div className="container">
          <div className="fade-in" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="tag">Galerie</span>
            <div className="divider" style={{ margin: '1rem auto' }}></div>
            <h2 className="section-title">Engineering in Bildern</h2>
          </div>

          {/* Galería en columnas (CSS columns) */}
          <div className="gallery-grid fade-in">
            {galleryImages.map(({ img, alt }) => (
              <div key={img} className="gallery-item">
                <img src={`/assets/${img}`} alt={alt} />
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
