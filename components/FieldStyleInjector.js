'use client'
import { useEffect, useState } from 'react'

const API = process.env.NEXT_PUBLIC_API_URL || 'https://web.lweb.ch/inotec/api'

export default function FieldStyleInjector() {
  const [css, setCss] = useState('')

  useEffect(() => {
    fetch(`${API}/field_styles.php`)
      .then(r => r.json())
      .then(styles => {
        if (!styles || typeof styles !== 'object' || Array.isArray(styles)) return
        const rules = []
        for (const [key, s] of Object.entries(styles)) {
          const props = []
          if (s.font_size) props.push(`font-size: ${s.font_size} !important`)
          if (s.font_family) props.push(`font-family: ${s.font_family} !important`)
          if (props.length) rules.push(`[data-sk="${key}"] { ${props.join('; ')} }`)
        }
        if (rules.length) setCss(rules.join('\n'))
      })
      .catch(() => {})
  }, [])

  if (!css) return null
  return <style dangerouslySetInnerHTML={{ __html: css }} />
}
