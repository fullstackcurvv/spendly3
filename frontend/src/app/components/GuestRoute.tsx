import { Navigate, Outlet } from 'react-router-dom'
import { getToken } from '../../lib/auth'

export function GuestRoute() {
  if (getToken()) {
    return <Navigate to="/dashboard" replace />
  }
  return <Outlet />
}
