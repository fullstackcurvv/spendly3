import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type Phase = 'check' | 'text' | 'redirect'

export function PaymentSuccessPage() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState<Phase>('check')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('text'),     600)
    const t2 = setTimeout(() => setPhase('redirect'), 1600)
    const t3 = setTimeout(() => navigate('/course/video', { replace: true }), 2600)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [navigate])

  return (
    <>
      <style>{`
        @keyframes successScaleIn {
          from { transform: scale(0); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }
        @keyframes successDrawCheck {
          from { stroke-dashoffset: 60; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes successFadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes successDots {
          0%   { content: ''; }
          25%  { content: '.'; }
          50%  { content: '..'; }
          75%  { content: '...'; }
          100% { content: ''; }
        }
        .success-dots::after {
          content: '';
          animation: successDots 1.2s steps(1, end) infinite;
        }
      `}</style>

      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        gap: '20px',
      }}>
        {/* Animated green checkmark */}
        <div style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          backgroundColor: '#22c55e',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'successScaleIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards',
        }}>
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
            <path
              d="M9 19.5l7.5 7.5 12.5-13.5"
              stroke="#fff"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="60"
              style={{
                animation: 'successDrawCheck 0.35s ease-out 0.32s both',
              }}
            />
          </svg>
        </div>

        {/* "Payment successful!" */}
        {(phase === 'text' || phase === 'redirect') && (
          <h2 style={{
            fontSize: '26px',
            fontWeight: 700,
            color: '#111',
            margin: 0,
            animation: 'successFadeUp 0.35s ease-out forwards',
          }}>
            Payment successful!
          </h2>
        )}

        {/* "Opening course..." */}
        {phase === 'redirect' && (
          <p
            className="success-dots"
            style={{
              fontSize: '15px',
              color: '#6b7280',
              margin: 0,
              animation: 'successFadeUp 0.35s ease-out forwards',
            }}
          >
            Opening course
          </p>
        )}
      </div>
    </>
  )
}
