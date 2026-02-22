export const API = process.env.NEXT_PUBLIC_API_URL || 'https://web.lweb.ch/inotec/api'

export async function apiGet(endpoint) {
  const res = await fetch(`${API}/${endpoint}`, { cache: 'no-store' })
  if (!res.ok) throw new Error(`API ${res.status}`)
  return res.json()
}

export async function apiPost(endpoint, data) {
  const res = await fetch(`${API}/${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error(`API ${res.status}`)
  return res.json()
}

export async function apiPut(endpoint, data) {
  const res = await fetch(`${API}/${endpoint}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error(`API ${res.status}`)
  return res.json()
}

export async function apiDelete(endpoint) {
  const res = await fetch(`${API}/${endpoint}`, { method: 'DELETE' })
  if (!res.ok) throw new Error(`API ${res.status}`)
  return res.json()
}

export async function apiUpload(file) {
  const formData = new FormData()
  formData.append('image', file)
  const res = await fetch(`${API}/upload.php`, { method: 'POST', body: formData })
  if (!res.ok) throw new Error(`Upload ${res.status}`)
  return res.json()
}

export async function checkAuth() {
  try {
    const res  = await fetch('/api/studio-auth')
    const data = await res.json()
    return data.authenticated === true
  } catch {
    return false
  }
}
