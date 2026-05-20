export interface AuthUser {
  id: string
  name: string
  email: string
}

export function getToken(): string | null {
  return localStorage.getItem('token')
}

export function getUser(): AuthUser | null {
  const raw = localStorage.getItem('user')
  if (!raw) return null
  try {
    return JSON.parse(raw) as AuthUser
  } catch {
    return null
  }
}

export function setAuth(token: string, user: AuthUser): void {
  localStorage.setItem('token', token)
  localStorage.setItem('user', JSON.stringify(user))
}

export function clearAuth(): void {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}
