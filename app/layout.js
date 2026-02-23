/* ─────────────────────────────────────────────────────────
   Layout raíz — Envuelve todas las páginas
   Incluye: metadata, estilos globales, Navbar y Footer
   ───────────────────────────────────────────────────────── */
import './globals.css'
import ConditionalNav    from '@/components/ConditionalNav'
import ConditionalFooter from '@/components/ConditionalFooter'
import CookieBanner      from '@/components/CookieBanner'

/* Metadatos de la página (SEO) */
export const metadata = {
  title: {
    default: 'iNOTEC-Engineering — Von der Idee zum Produkt',
    template: '%s · iNOTEC-Engineering',
  },
  description: 'iNOTEC-Engineering, Bahnhofstrasse 2, CH-9475 Sevelen — Ganzheitliche Engineering-Prozesse von der ersten Konzeptidee bis zum fertigen Prototypen. Vakuumtechnik, Handling Systeme, 3D-Visualisierung, FEM-Berechnungen.',
  keywords: [
    'iNOTEC-Engineering', 'Engineering Schweiz', 'Vakuumtechnik', 'Sputtering', 'Evaporation',
    'Ion Beam Etching', 'FEM Berechnungen', '3D-Visualisierung', 'Autodesk Inventor', 'AutoCAD',
    'Handling Systeme', 'Prototypenbau', 'Konzeptentwicklung', 'Explosionszeichnungen', '3D-Animation',
    'Sevelen', 'CH-9475',
  ],
  authors: [{ name: 'iNOTEC-Engineering', url: 'https://www.inotecengineering.ch' }],
  creator: 'iNOTEC-Engineering',
  metadataBase: new URL('https://www.inotecengineering.ch'),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'de_CH',
    url: 'https://www.inotecengineering.ch',
    siteName: 'iNOTEC-Engineering',
    title: 'iNOTEC-Engineering — Von der Idee zum Produkt',
    description: 'Ganzheitliche Engineering-Prozesse · Vakuumtechnik · 3D · FEM · Sevelen, Schweiz',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  category: 'engineering',
  icons: {
    icon: '/assets/p1_img4.png',
    shortcut: '/assets/p1_img4.png',
    apple: '/assets/p1_img4.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>
        {/* Navbar — se oculta automáticamente en /studio/* */}
        <ConditionalNav />

        {/* Contenido de cada página */}
        <main>
          {children}
        </main>

        {/* Footer — se oculta automáticamente en /studio/* */}
        <ConditionalFooter />

        {/* Aviso de cookies */}
        <CookieBanner />
      </body>
    </html>
  )
}
