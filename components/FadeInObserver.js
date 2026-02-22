/* ─────────────────────────────────────────────────────────
   FadeInObserver — Activa las animaciones fade-in al hacer scroll
   'use client' porque usa IntersectionObserver (API del browser)
   Se incluye al final de cada página — no renderiza nada visible
   ───────────────────────────────────────────────────────── */
'use client'

import { useEffect } from 'react'

export default function FadeInObserver() {
  useEffect(() => {
    /* Observa todos los elementos con clase .fade-in
       y les añade .visible cuando entran en el viewport */
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) e.target.classList.add('visible')
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )

    /* Aplica un pequeño delay escalonado (como en el HTML original) */
    document.querySelectorAll('.fade-in').forEach((el, i) => {
      el.style.transitionDelay = `${(i % 6) * 0.07}s`
      obs.observe(el)
    })

    return () => obs.disconnect()
  }, [])

  /* No renderiza nada en el DOM */
  return null
}
