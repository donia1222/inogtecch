import { apiGet } from '@/lib/api'

export default async function FieldStyleInjector() {
  let styles = {}
  try {
    const res = await apiGet('field_styles.php')
    if (res && typeof res === 'object' && !Array.isArray(res)) {
      styles = res
    }
  } catch { return null }

  if (!Object.keys(styles).length) return null

  // Generar CSS con data-attributes
  // Cada elemento en el frontend tendra data-sk="hero.title" etc.
  const rules = []
  for (const [key, s] of Object.entries(styles)) {
    const props = []
    if (s.font_size)   props.push(`font-size: ${s.font_size} !important`)
    if (s.font_color)  props.push(`color: ${s.font_color} !important`)
    if (s.font_family) props.push(`font-family: ${s.font_family} !important`)
    if (props.length) {
      rules.push(`[data-sk="${key}"] { ${props.join('; ')} }`)
    }
  }

  if (!rules.length) return null

  return <style dangerouslySetInnerHTML={{ __html: rules.join('\n') }} />
}
