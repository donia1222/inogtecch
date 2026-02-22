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
  title: 'iNOTEC Engineering — Von der Idee zum Produkt',
  description: 'Ganzheitliche Engineering-Prozesse von der ersten Konzeptidee bis hin zum fertigen Prototypen. Vakuumtechnik, Handlings-Systeme und innovative Gebrauchsgegenstände.',
  keywords: 'Engineering, FEM, 3D, Vakuumtechnik, Autodesk Inventor, AutoCAD, Schweiz',
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
