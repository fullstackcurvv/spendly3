import axios from '../lib/axios'

export interface CreateOrderResponse {
  razorpayOrderId: string
  amount: number
  currency: string
  keyId: string
}

export interface VerifyPaymentResponse {
  success: boolean
  accessToken: string
  message: string
}

export interface AccessCheckResponse {
  hasAccess: boolean
}

export async function createOrder(
  amountInPaise: number,
  courseId: string,
): Promise<CreateOrderResponse> {
  const { data } = await axios.post<CreateOrderResponse>('/payment/orders', {
    amount: amountInPaise,
    courseId,
  })
  return data
}

export async function verifyPayment(
  razorpayOrderId: string,
  razorpayPaymentId: string,
  razorpaySignature: string,
  courseId: string,
): Promise<VerifyPaymentResponse> {
  const { data } = await axios.post<VerifyPaymentResponse>('/payment/verify', {
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
    courseId,
  })
  return data
}

export async function checkAccess(accessToken: string): Promise<AccessCheckResponse> {
  const { data } = await axios.get<AccessCheckResponse>('/payment/access', {
    params: { accessToken },
  })
  return data
}
