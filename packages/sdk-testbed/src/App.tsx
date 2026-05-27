import { BrowserRouter } from 'react-router-dom'
import { LandingPage } from 'spendly-landing-sdk'

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance
  }
}

interface RazorpayOptions {
  key: string
  amount: number
  currency: string
  order_id: string
  name: string
  description: string
  handler: (response: RazorpayPaymentResponse) => void
  prefill?: { name?: string; email?: string; contact?: string }
  theme?: { color?: string }
}

interface RazorpayInstance {
  open: () => void
}

interface RazorpayPaymentResponse {
  razorpay_order_id: string
  razorpay_payment_id: string
  razorpay_signature: string
}

const COURSE_AMOUNT_PAISE = 199900  // ₹1,999
const COURSE_ID = 'advanced-rag'

function loadRazorpayScript(): Promise<boolean> {
  return new Promise(resolve => {
    if (document.getElementById('razorpay-script')) {
      resolve(true)
      return
    }
    const script = document.createElement('script')
    script.id = 'razorpay-script'
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

async function handleSeeHowItWorks() {
  const loaded = await loadRazorpayScript()
  if (!loaded) {
    alert('Failed to load payment gateway. Please check your internet connection.')
    return
  }

  let orderData: { razorpayOrderId: string; amount: number; currency: string; keyId: string }
  try {
    const res = await fetch('/api/payment/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: COURSE_AMOUNT_PAISE, courseId: COURSE_ID }),
    })
    if (!res.ok) throw new Error(`Server error: ${res.status}`)
    orderData = await res.json()
  } catch (err) {
    alert(`Could not create order: ${(err as Error).message}`)
    return
  }

  const rzp = new window.Razorpay({
    key: orderData.keyId,
    amount: orderData.amount,
    currency: orderData.currency,
    order_id: orderData.razorpayOrderId,
    name: 'Spendly',
    description: 'Advanced RAG Course',
    handler: async (response: RazorpayPaymentResponse) => {
      try {
        const verifyRes = await fetch('/api/payment/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
            courseId: COURSE_ID,
          }),
        })
        const result = await verifyRes.json()
        if (result.success) {
          alert('Payment successful! Your access token: ' + result.accessToken)
        } else {
          alert('Payment verification failed.')
        }
      } catch {
        alert('Payment verified on gateway but server verification failed.')
      }
    },
    prefill: { name: '', email: '', contact: '' },
    theme: { color: '#2ca85a' },
  })

  rzp.open()
}

function App() {
  return (
    <BrowserRouter>
      <LandingPage onSeeHowItWorks={handleSeeHowItWorks} />
    </BrowserRouter>
  )
}

export default App
