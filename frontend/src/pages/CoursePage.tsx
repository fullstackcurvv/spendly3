import { useState } from 'react'
import { OrderDrawer } from './payment/OrderDrawer'

export function CoursePage() {
  const [orderOpen, setOrderOpen] = useState(false)

  return (
    <>
      <style>{`
        .course-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: start;
        }
        @media (max-width: 768px) {
          .course-layout {
            grid-template-columns: 1fr;
            gap: 28px;
          }
        }
        .buy-now-btn {
          align-self: flex-start;
          padding: 12px 40px;
          border: 2px solid #2563eb;
          color: #2563eb;
          background: transparent;
          border-radius: 4px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
        }
        .buy-now-btn:hover {
          background: #2563eb;
          color: #fff;
        }
      `}</style>

      <div style={{ minHeight: '100vh', backgroundColor: '#fff', padding: '56px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="course-layout">
            {/* ── Left: course card ─────────────────────────────── */}
            <div style={{
              borderRadius: '16px',
              border: '1px solid rgba(0,0,0,0.08)',
              overflow: 'hidden',
              boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
            }}>
              {/* Thumbnail */}
              <div style={{
                background: 'linear-gradient(135deg, #060614 0%, #0c1a4a 55%, #190836 100%)',
                height: '220px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
                position: 'relative',
                overflow: 'hidden',
              }}>
                {/* Decorative glows */}
                <div style={{
                  position: 'absolute',
                  width: 160, height: 160,
                  borderRadius: '50%',
                  background: 'rgba(79,156,249,0.12)',
                  filter: 'blur(36px)',
                  top: -40, left: -30,
                }} />
                <div style={{
                  position: 'absolute',
                  width: 100, height: 100,
                  borderRadius: '50%',
                  background: 'rgba(167,70,249,0.18)',
                  filter: 'blur(24px)',
                  bottom: 0, right: 10,
                }} />

                <div style={{ fontSize: '10px', color: '#64748b', letterSpacing: '0.1em', marginBottom: 8, position: 'relative', textTransform: 'uppercase' }}>
                  Master the next level of
                </div>

                <div style={{ textAlign: 'center', position: 'relative', lineHeight: 1 }}>
                  <div style={{ fontSize: '44px', fontWeight: 900, color: '#fff' }}>ADVANCED</div>
                  <div style={{ fontSize: '44px', fontWeight: 900, color: '#4f9cf9' }}>RAG</div>
                </div>

                <div style={{
                  fontSize: '9px',
                  color: '#64748b',
                  marginTop: 10,
                  textAlign: 'center',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  position: 'relative',
                }}>
                  Build smarter, more reliable AI applications
                </div>
              </div>

              {/* Card body */}
              <div style={{ padding: '20px' }}>
                <div style={{ fontSize: '18px', fontWeight: 600, color: '#111' }}>Advanced RAG</div>
                <div style={{ fontSize: '14px', color: '#6b7280', marginTop: 4 }}>CampusX</div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#111', marginTop: 10 }}>₹1,999</div>
              </div>
            </div>

            {/* ── Right: course detail ───────────────────────────── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#111', margin: 0 }}>
                Advanced RAG
              </h1>

              <p style={{ fontSize: '15px', color: '#4b5563', lineHeight: 1.65, margin: 0 }}>
                Build production-grade AI systems that retrieve, reason, and respond with precision.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ fontSize: '14px' }}>
                  <span style={{ color: '#6b7280' }}>Instructor: </span>
                  <span style={{ color: '#2563eb', cursor: 'pointer' }}>CampusX</span>
                </div>
                <div style={{ fontSize: '14px' }}>
                  <span style={{ color: '#6b7280' }}>Language: </span>
                  <span style={{ color: '#2563eb', cursor: 'pointer' }}>Hinglish</span>
                </div>
                <div style={{ fontSize: '14px', color: '#374151' }}>
                  <span style={{ color: '#6b7280' }}>Validity Period: </span>
                  1095 days
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontSize: '26px', fontWeight: 700, color: '#111' }}>₹1999</span>
                <span style={{ fontSize: '13px', color: '#6b7280' }}>including 18% GST</span>
              </div>

              <button className="buy-now-btn" onClick={() => setOrderOpen(true)}>
                BUY NOW
              </button>
            </div>
          </div>
        </div>
      </div>

      <OrderDrawer isOpen={orderOpen} onClose={() => setOrderOpen(false)} />
    </>
  )
}
