import { useNavigate } from 'react-router-dom'

const PAYMENT_METHODS = [
  { icon: '💳', label: 'Card',          badges: ['VISA', 'MC', 'AMEX'] },
  { icon: '⚡', label: 'Pay by UPI ID', badges: [] },
  { icon: '👜', label: 'Wallets',       badges: [] },
  { icon: '🏦', label: 'Net Banking',   badges: [] },
  { icon: '⏰', label: 'Paylater',      badges: [] },
]

/* Fixed QR-like dot pattern — 5×5 grid */
const QR_DOTS = [1,0,1,1,0, 1,1,0,1,1, 0,1,1,0,1, 1,1,0,0,1, 0,1,0,1,1]

/* Coloured bars that mimic the CampusX logo mark */
const LOGO_BARS = [
  { color: '#e74c3c', h: 28 },
  { color: '#f39c12', h: 34 },
  { color: '#2ecc71', h: 40 },
  { color: '#3498db', h: 46 },
  { color: '#9b59b6', h: 52 },
]

export function PaymentPage() {
  const navigate = useNavigate()

  return (
    <>
      <style>{`
        .pmt-grid {
          display: grid;
          grid-template-columns: 340px 1fr;
          border-radius: 16px;
          overflow: hidden;
        }
        @media (max-width: 768px) {
          .pmt-grid {
            grid-template-columns: 1fr;
          }
          .pmt-left-inner {
            flex-direction: row !important;
            justify-content: space-around !important;
            padding: 16px 20px !important;
          }
          .pmt-price-btn {
            font-size: 18px !important;
            padding: 10px 20px !important;
          }
        }
        .pmt-method:hover { background: #f9fafb; }
      `}</style>

      <div style={{
        minHeight: '100vh',
        backgroundColor: '#e8ecf3',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}>
        <div
          className="pmt-grid"
          style={{
            width: '100%',
            maxWidth: '860px',
            boxShadow: '0 8px 48px rgba(0,0,0,0.13)',
            backgroundColor: '#fff',
          }}
        >
          {/* ── Left panel ─────────────────────────────────────── */}
          <div style={{
            backgroundColor: '#0d1b3e',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '520px',
          }}>
            {/* Social proof strip */}
            <div style={{
              backgroundColor: '#112050',
              padding: '10px 16px',
              textAlign: 'center',
              fontSize: '12px',
              color: '#cbd5e1',
            }}>
              🛍 3710+ orders fulfilled in last 24hrs
            </div>

            {/* Back arrow */}
            <button
              onClick={() => navigate('/course')}
              style={{
                background: 'none',
                border: 'none',
                color: '#fff',
                fontSize: '22px',
                cursor: 'pointer',
                padding: '14px 18px',
                alignSelf: 'flex-start',
                lineHeight: 1,
              }}
            >
              ‹
            </button>

            {/* Brand + price — flex: 1 so it fills remaining height */}
            <div
              className="pmt-left-inner"
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '14px',
                padding: '0 24px 24px',
              }}
            >
              {/* Logo bars */}
              <div style={{ display: 'flex', gap: '5px', alignItems: 'flex-end', height: '56px' }}>
                {LOGO_BARS.map((bar, i) => (
                  <div
                    key={i}
                    style={{
                      width: 9,
                      height: bar.h,
                      backgroundColor: bar.color,
                      borderRadius: '3px 3px 0 0',
                    }}
                  />
                ))}
              </div>

              <div style={{ color: '#fff', fontSize: '22px', fontWeight: 700 }}>CampusX</div>

              <div
                className="pmt-price-btn"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  padding: '14px 32px',
                  color: '#fff',
                  fontSize: '22px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                ₹1,499 <span style={{ fontSize: '16px', opacity: 0.8 }}>›</span>
              </div>
            </div>

            {/* Secured footer */}
            <div style={{
              padding: '14px',
              textAlign: 'center',
              fontSize: '11px',
              color: '#475569',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '5px',
            }}>
              Secured by
              <span style={{ color: '#60a5fa', fontWeight: 700, fontSize: '12px' }}>Cashfree</span>
              <span>Payments</span>
            </div>
          </div>

          {/* ── Right panel ────────────────────────────────────── */}
          <div style={{ padding: '28px', overflowY: 'auto' }}>
            {/* Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
            }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#111' }}>
                Payment Options for +91 9916110441
              </span>
              <button style={{
                background: 'none',
                border: 'none',
                color: '#2563eb',
                fontSize: '14px',
                cursor: 'pointer',
                fontWeight: 500,
              }}>
                Change
              </button>
            </div>

            {/* QR section */}
            <div style={{
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              padding: '18px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              marginBottom: '24px',
            }}>
              {/* QR placeholder */}
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <div style={{
                  width: 96,
                  height: 96,
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '8px',
                  backgroundColor: '#fff',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(5, 1fr)',
                  gap: '2px',
                }}>
                  {QR_DOTS.map((filled, i) => (
                    <div
                      key={i}
                      style={{
                        backgroundColor: filled ? '#111' : 'transparent',
                        borderRadius: '1px',
                      }}
                    />
                  ))}
                </div>
                {/* Overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(13,27,62,0.84)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}>
                  <span style={{
                    color: '#fff',
                    fontSize: '11px',
                    fontWeight: 600,
                    textAlign: 'center',
                    padding: '0 6px',
                    lineHeight: 1.3,
                  }}>
                    Click to<br />see QR
                  </span>
                </div>
              </div>

              {/* UPI app icons */}
              <div>
                <div style={{ fontSize: '13px', color: '#374151', marginBottom: '10px' }}>
                  Scan and pay with
                </div>
                <div style={{ display: 'flex', gap: '7px', marginBottom: '8px' }}>
                  {/* Google Pay */}
                  <div style={{
                    width: 30, height: 30, borderRadius: '6px',
                    backgroundColor: '#fff', border: '1px solid #e5e7eb',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '10px', fontWeight: 800, color: '#4285f4',
                  }}>G</div>
                  {/* PhonePe */}
                  <div style={{
                    width: 30, height: 30, borderRadius: '6px',
                    backgroundColor: '#5f259f',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '10px', fontWeight: 800, color: '#fff',
                  }}>P</div>
                  {/* Paytm */}
                  <div style={{
                    width: 30, height: 30, borderRadius: '6px',
                    backgroundColor: '#002970',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '9px', fontWeight: 800, color: '#00baf2',
                  }}>PT</div>
                </div>
                <div style={{ fontSize: '12px', color: '#9ca3af' }}>or other UPI apps</div>
              </div>
            </div>

            {/* Other payment methods */}
            <div style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#374151',
              marginBottom: '8px',
            }}>
              Other Payment Options
            </div>

            <div>
              {PAYMENT_METHODS.map((method) => (
                <div
                  key={method.label}
                  className="pmt-method"
                  onClick={() => navigate('/payment/success')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '15px 4px',
                    borderBottom: '1px solid #f3f4f6',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    transition: 'background 0.1s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '18px', lineHeight: 1 }}>{method.icon}</span>
                    <span style={{ fontSize: '15px', color: '#111' }}>{method.label}</span>
                    {method.badges.map(b => (
                      <span key={b} style={{
                        fontSize: '9px',
                        fontWeight: 700,
                        color: '#6b7280',
                        border: '1px solid #d1d5db',
                        borderRadius: '3px',
                        padding: '1px 4px',
                      }}>
                        {b}
                      </span>
                    ))}
                  </div>
                  <span style={{ color: '#9ca3af', fontSize: '20px', lineHeight: 1 }}>›</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
