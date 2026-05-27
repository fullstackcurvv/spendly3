import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { LandingPage } from 'spendly-landing-sdk'

declare global {
  interface Window {
    Razorpay: new (options: object) => { open: () => void }
  }
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise(resolve => {
    if (document.getElementById('rzp-script')) { resolve(true); return }
    const s = document.createElement('script')
    s.id = 'rzp-script'
    s.src = 'https://checkout.razorpay.com/v1/checkout.js'
    s.onload = () => resolve(true)
    s.onerror = () => resolve(false)
    document.body.appendChild(s)
  })
}

async function handleSeeHowItWorks() {
  const loaded = await loadRazorpayScript()
  if (!loaded) { alert('Failed to load payment gateway.'); return }

  let order: { razorpayOrderId: string; amount: number; currency: string; keyId: string }
  try {
    const res = await fetch('/api/payment/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 199900, courseId: 'advanced-rag' }),
    })
    if (!res.ok) throw new Error(`Server error: ${res.status}`)
    order = await res.json()
  } catch (err) {
    alert(`Could not create order: ${(err as Error).message}`)
    return
  }

  new window.Razorpay({
    key: order.keyId,
    amount: order.amount,
    currency: order.currency,
    order_id: order.razorpayOrderId,
    name: 'Spendly',
    description: 'Advanced RAG Course',
    theme: { color: '#2ca85a' },
    handler: async (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
      const res = await fetch('/api/payment/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          razorpayOrderId: response.razorpay_order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpaySignature: response.razorpay_signature,
          courseId: 'advanced-rag',
        }),
      })
      const result = await res.json()
      if (result.success) alert('Payment successful! Access token: ' + result.accessToken)
    },
  }).open()
}

function App() {
  const [showLanding, setShowLanding] = useState(false)

  if (showLanding) {
    return (
      <BrowserRouter>
        <LandingPage onSeeHowItWorks={handleSeeHowItWorks} />
      </BrowserRouter>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8f6f4',
    }}>
      <button
        onClick={() => setShowLanding(true)}
        style={{
          padding: '14px 40px',
          fontSize: '16px',
          fontWeight: 600,
          backgroundColor: '#2ca85a',
          color: '#fff',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
        }}
      >
        Payment
      </button>
    </div>
  )
}

export default App
