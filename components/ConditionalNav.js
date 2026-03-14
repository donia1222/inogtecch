'use client'
// Oculta la Navbar en las páginas del panel admin (/studio/*)
import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'

export default function ConditionalNav({ logoSub }) {
  const pathname = usePathname()
  if (pathname?.startsWith('/studio')) return null
  return <Navbar logoSub={logoSub} />
}
