// ─────────────────────────────────────────────────────────
//  app/api/studio-auth/route.js
// ─────────────────────────────────────────────────────────
import { cookies } from 'next/headers'

const PASSWORD   = process.env.ADMIN_PASSWORD || ''
const API_SECRET = process.env.API_SECRET     || ''


// ── GET — verificar sesión activa ─────────────────────────
export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get('studio_token')?.value
  const valid = Boolean(token && token === API_SECRET)
  return Response.json({ authenticated: valid, token: valid ? API_SECRET : undefined })
}

// ── POST — login ──────────────────────────────────────────
export async function POST(request) {
  const { password } = await request.json().catch(() => ({}))

  if (!password || !PASSWORD) {
    return Response.json({ error: 'Passwort fehlt' }, { status: 400 })
  }
  if (password !== PASSWORD) {
    await new Promise(r => setTimeout(r, 1000))
    return Response.json({ error: 'Falsches Passwort' }, { status: 401 })
  }

  const response = Response.json({ authenticated: true, token: API_SECRET, message: 'Login erfolgreich' })
  response.headers.set(
    'Set-Cookie',
    `studio_token=${API_SECRET}; SameSite=Strict; Path=/; Max-Age=3600`
  )
  return response
}

// ── DELETE — logout ───────────────────────────────────────
export async function DELETE() {
  const response = Response.json({ message: 'Abgemeldet' })
  response.headers.set('Set-Cookie', 'studio_token=; Path=/; Max-Age=0')
  return response
}
