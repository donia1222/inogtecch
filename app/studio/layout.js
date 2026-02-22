// Layout del Studio — no incluye Navbar ni Footer (controlado por ConditionalNav/Footer)
import './studio.css'

export const metadata = {
  title: 'iNOTEC Studio',
  robots: { index: false, follow: false },
}

export default function StudioLayout({ children }) {
  return <>{children}</>
}
