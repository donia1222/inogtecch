'use client'
// Oculta la Navbar en las páginas del panel admin (/studio/*)
import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'

export default function ConditionalNav() {
  const pathname = usePathname()
  if (pathname?.startsWith('/studio')) return null
  return <Navbar />
}
