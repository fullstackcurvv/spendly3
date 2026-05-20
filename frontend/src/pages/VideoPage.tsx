import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { checkAccess } from '../api/payment'

const EMBED_URL =
  'https://www.youtube.com/embed/-Lt-ntUDj-g?list=PLKnIA16_RmvaYH3poI0oJvbDF4zEvpq8W&autoplay=1'

export function VideoPage() {
  const navigate = useNavigate()
  const [authorized, setAuthorized] = useState(false)
  const [checking, setChecking]     = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('courseAccess')

    if (!token) {
      navigate('/course', { replace: true })
      return
    }

    checkAccess(token)
      .then(({ hasAccess }) => {
        if (hasAccess) {
          setAuthorized(true)
        } else {
          localStorage.removeItem('courseAccess')
          navigate('/course', { replace: true })
        }
      })
      .catch(() => {
        localStorage.removeItem('courseAccess')
        navigate('/course', { replace: true })
      })
      .finally(() => setChecking(false))
  }, [navigate])

  if (checking) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      }}>
        <div style={{ fontSize: '15px', color: '#6b7280' }}>Verifying access…</div>
      </div>
    )
  }

  if (!authorized) return null

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0d0d0d',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
    }}>
      <div style={{ width: '100%', maxWidth: '900px' }}>
        <h2 style={{
          color: '#fff',
          fontSize: '20px',
          fontWeight: 600,
          marginBottom: '16px',
          textAlign: 'center',
        }}>
          Advanced RAG — Full Course
        </h2>

        <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%' }}>
          <iframe
            src={EMBED_URL}
            title="Advanced RAG Course"
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              border: 'none',
              borderRadius: '12px',
            }}
          />
        </div>

        <p style={{
          color: '#64748b',
          fontSize: '13px',
          textAlign: 'center',
          marginTop: '14px',
        }}>
          CampusX · Advanced RAG
        </p>
      </div>
    </div>
  )
}
