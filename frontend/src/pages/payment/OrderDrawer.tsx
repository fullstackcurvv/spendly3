import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createOrder, verifyPayment } from '../../api/payment'

interface OrderDrawerProps {
  isOpen: boolean
  onClose: () => void
}

const COURSE = {
  title:      'Advanced RAG',
  price:      1999,
  couponCode: 'RAGEARLY',
  couponDisc: 500,
  validity:   '1095 days',
  id:         'advanced-rag',
}

export function OrderDrawer({ isOpen, onClose }: OrderDrawerProps) {
  const navigate = useNavigate()
  const [couponApplied, setCouponApplied] = useState(true)
  const [loading, setLoading]             = useState(false)
  const [error, setError]                 = useState<string | null>(null)

  const total = couponApplied ? COURSE.price - COURSE.couponDisc : COURSE.price

  async function handleProceed() {
    setLoading(true)
    setError(null)

    try {
      const order = await createOrder(total * 100, COURSE.id)

      const options: RazorpayOptions = {
        key:      order.keyId,
        amount:   order.amount,
        currency: order.currency,
        order_id: order.razorpayOrderId,
        name:     'CampusX',
        description: 'Advanced RAG Course',
        handler: async (response) => {
          try {
            const result = await verifyPayment(
              response.razorpay_order_id,
              response.razorpay_payment_id,
              response.razorpay_signature,
              COURSE.id,
            )
            if (result.success) {
              localStorage.setItem('courseAccess', result.accessToken)
              navigate('/payment/success')
            } else {
              setError('Payment verification failed. Please contact support.')
              setLoading(false)
            }
          } catch {
            setError('Payment verification failed. Please contact support.')
            setLoading(false)
          }
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
        theme: { color: '#2563eb' },
      }

      const rzp = new window.Razorpay(options)
      rzp.on('payment.failed', () => {
        setError('Payment failed. Please try a different method.')
        setLoading(false)
      })
      rzp.open()

    } catch {
      setError('Could not initiate payment. Please try again.')
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <>
      <style>{`
        @keyframes drawerSlideIn {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
        @keyframes drawerSlideUp {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
        .order-drawer-panel {
          position: fixed;
          right: 0; top: 0; bottom: 0;
          width: 380px;
          background: #fff;
          z-index: 1001;
          display: flex;
          flex-direction: column;
          box-shadow: -8px 0 40px rgba(0,0,0,0.15);
          animation: drawerSlideIn 0.28s ease-out forwards;
        }
        @media (max-width: 768px) {
          .order-drawer-panel {
            right: 0; left: 0; top: auto; bottom: 0;
            width: 100%;
            max-height: 85vh;
            border-radius: 16px 16px 0 0;
            animation: drawerSlideUp 0.28s ease-out forwards;
          }
        }
      `}</style>

      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 1000 }}
      />

      {/* Drawer */}
      <div className="order-drawer-panel">
        {/* Header */}
        <div style={{
          padding: '20px 20px 16px',
          borderBottom: '1px solid #f3f4f6',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexShrink: 0,
        }}>
          <span style={{ fontSize: '18px', fontWeight: 700, color: '#111' }}>Order details</span>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#6b7280', lineHeight: 1, padding: '0 4px' }}
          >
            ×
          </button>
        </div>

        {/* Course preview */}
        <div style={{
          padding: '20px',
          display: 'flex',
          gap: '14px',
          borderBottom: '1px solid #f3f4f6',
          flexShrink: 0,
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: 8, flexShrink: 0,
            background: 'linear-gradient(135deg, #0d0d1a, #1a1a3e)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ color: '#4f9cf9', fontWeight: 900, fontSize: '12px' }}>RAG</span>
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: '15px', color: '#111' }}>{COURSE.title}</div>
            <div style={{ color: '#2563eb', fontWeight: 600, fontSize: '14px', marginTop: 4 }}>
              ₹{COURSE.price.toLocaleString('en-IN')}
            </div>
            <div style={{ color: '#9ca3af', fontSize: '13px', marginTop: 2 }}>
              Valid for {COURSE.validity}
            </div>
          </div>
        </div>

        {/* Price breakdown */}
        <div style={{ padding: '20px', flex: 1, overflowY: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
            <span style={{ fontSize: '15px', color: '#374151' }}>Course price</span>
            <span style={{ fontSize: '15px', color: '#111' }}>₹{COURSE.price.toLocaleString('en-IN')}</span>
          </div>

          {couponApplied && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: '#2563eb', fontWeight: 600, fontSize: '15px' }}>{COURSE.couponCode}</span>
                <button
                  onClick={() => setCouponApplied(false)}
                  title="Remove coupon"
                  style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', fontSize: '17px', lineHeight: 1, padding: 0 }}
                >
                  ⊗
                </button>
              </div>
              <span style={{ color: '#2563eb', fontSize: '15px' }}>
                − ₹{COURSE.couponDisc.toLocaleString('en-IN')}
              </span>
            </div>
          )}

          <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '4px 0 14px' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '15px', fontWeight: 700, color: '#111' }}>You pay</span>
            <span style={{ fontSize: '15px', fontWeight: 700, color: '#111' }}>
              ₹{total.toLocaleString('en-IN')}
            </span>
          </div>

          {error && (
            <p style={{ marginTop: 16, fontSize: '13px', color: '#d4183d', textAlign: 'center' }}>
              {error}
            </p>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid #f3f4f6', flexShrink: 0 }}>
          <button
            onClick={handleProceed}
            disabled={loading}
            style={{
              width: '100%',
              height: '52px',
              backgroundColor: loading ? '#93c5fd' : '#2563eb',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.15s',
            }}
          >
            {loading ? 'Processing…' : 'Proceed'}
          </button>
        </div>
      </div>
    </>
  )
}
