declare global {
  interface RazorpayPaymentResponse {
    razorpay_payment_id: string
    razorpay_order_id: string
    razorpay_signature: string
  }

  interface RazorpayOptions {
    key: string
    amount: number
    currency: string
    order_id: string
    name?: string
    description?: string
    handler: (response: RazorpayPaymentResponse) => void
    prefill?: { email?: string; contact?: string }
    theme?: { color?: string }
    modal?: { ondismiss?: () => void }
  }

  interface RazorpayInstance {
    open(): void
    on(event: string, handler: (response: unknown) => void): void
  }

  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance
  }
}

export {}
