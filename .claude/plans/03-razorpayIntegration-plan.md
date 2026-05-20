# Implementation Plan: Razorpay Integration (Spec 03)

## Overview

Replace the mock Cashfree payment page (`PaymentPage.tsx`) with a real Razorpay Test Mode
integration. The Razorpay popup becomes the entire payment UI — no custom payment page needed.
After verified payment the user is routed to a gated `/course/video` page that embeds the YouTube
video; direct URL access is blocked via a backend purchase-token check.

**Full revised flow:**
```
Landing → /course → OrderDrawer "Proceed"
  → POST /api/payment/orders (backend creates Razorpay order)
  → window.Razorpay popup opens
  → User pays (test card or UPI)
  → Razorpay handler fires with { payment_id, order_id, signature }
  → POST /api/payment/verify (backend verifies HMAC + saves Purchase)
  → navigate /payment/success (animation)
  → navigate /course/video (gated YouTube embed)
```

---

## Credentials (Test Mode)

```
KEY_ID     : rzp_test_SrbKB6rCYrCCnI
KEY_SECRET : boJ9e6ttaV725ALsJiKbE34u
```

Test card for manual testing:
```
Number : 4111 1111 1111 1111
CVV    : 123
Expiry : any future date
OTP    : 1234
```

---

## Files to Modify

| File | Change |
|---|---|
| `frontend/index.html` | Add Razorpay checkout script tag |
| `frontend/src/pages/payment/OrderDrawer.tsx` | Proceed button → create order → open Razorpay popup → verify → navigate |
| `frontend/src/pages/PaymentSuccessPage.tsx` | Redirect to `/course/video` instead of YouTube URL directly |
| `frontend/src/app/App.tsx` | Remove `/payment` route; add `/course/video` route |
| `backend/pom.xml` | Add Razorpay Java SDK dependency |
| `backend/src/main/resources/application.yml` | Add `razorpay.key.id` and `razorpay.key.secret` |

## Files to Delete

| File | Reason |
|---|---|
| `frontend/src/pages/PaymentPage.tsx` | Replaced entirely by native Razorpay popup |

## Files to Create

### Frontend
```
frontend/src/
├── types/
│   └── razorpay.d.ts              ← window.Razorpay TypeScript declaration
├── api/
│   └── payment.ts                 ← axios helpers: createOrder, verifyPayment, checkAccess
└── pages/
    └── VideoPage.tsx              ← gated YouTube embed page
```

### Backend
```
backend/src/main/java/com/spendly/
└── payment/
    ├── config/
    │   └── RazorpayConfig.java        ← RazorpayClient bean
    ├── controller/
    │   └── PaymentController.java     ← 3 REST endpoints
    ├── service/
    │   ├── PaymentService.java        ← interface
    │   └── PaymentServiceImpl.java    ← implementation
    ├── repository/
    │   ├── OrderRepository.java       ← MongoRepository<Order, String>
    │   └── PurchaseRepository.java    ← MongoRepository<Purchase, String>
    ├── model/
    │   ├── Order.java                 ← MongoDB @Document
    │   └── Purchase.java             ← MongoDB @Document
    ├── dto/
    │   ├── CreateOrderRequest.java
    │   ├── CreateOrderResponse.java
    │   ├── VerifyPaymentRequest.java
    │   ├── VerifyPaymentResponse.java
    │   └── AccessCheckResponse.java
    └── util/
        └── SignatureVerifier.java     ← HMAC-SHA256 helper
```

---

## Step 1 — Backend: Razorpay Configuration

### `pom.xml` — new dependency
Add inside `<dependencies>`:
```xml
<dependency>
  <groupId>com.razorpay</groupId>
  <artifactId>razorpay-java</artifactId>
  <version>1.4.5</version>
</dependency>
```

### `application.yml` — new properties
```yaml
razorpay:
  key:
    id: rzp_test_SrbKB6rCYrCCnI
    secret: boJ9e6ttaV725ALsJiKbE34u
```
Keep the actual secret out of version control — document in a `.env.example` and load via
environment variable override in production.

### `RazorpayConfig.java`
- Reads `razorpay.key.id` and `razorpay.key.secret` with `@Value`
- Instantiates and exposes a `@Bean RazorpayClient`
- `RazorpayClient` constructor: `new RazorpayClient(keyId, keySecret)`

---

## Step 2 — Backend: MongoDB Models

### `Order.java`
Annotated `@Document(collection = "orders")`

| Field | Type | Notes |
|---|---|---|
| `id` | `String` | `@Id`, auto-generated |
| `razorpayOrderId` | `String` | returned by Razorpay `orders.create()` |
| `courseId` | `String` | e.g. `"advanced-rag"` |
| `userId` | `String` | JWT subject if logged in; `"guest"` otherwise |
| `amount` | `long` | in paise (₹1499 → `149900`) |
| `currency` | `String` | `"INR"` |
| `status` | `String` | `CREATED` → `PAID` or `FAILED` |
| `razorpayPaymentId` | `String` | filled during verification |
| `createdAt` | `Instant` | |
| `updatedAt` | `Instant` | |

### `Purchase.java`
Annotated `@Document(collection = "purchases")`

| Field | Type | Notes |
|---|---|---|
| `id` | `String` | `@Id`, auto-generated |
| `userId` | `String` | JWT subject or `"guest"` |
| `courseId` | `String` | |
| `orderId` | `String` | references `Order.id` |
| `razorpayPaymentId` | `String` | |
| `amount` | `long` | in paise |
| `accessToken` | `String` | UUID stored here; sent to frontend for gated access |
| `purchasedAt` | `Instant` | |

---

## Step 3 — Backend: Repositories

Both extend `MongoRepository<T, String>`.

### `OrderRepository`
- `Optional<Order> findByRazorpayOrderId(String razorpayOrderId)`

### `PurchaseRepository`
- `boolean existsByAccessToken(String accessToken)`
- `Optional<Purchase> findByAccessToken(String accessToken)`
- `boolean existsByUserIdAndCourseId(String userId, String courseId)`

---

## Step 4 — Backend: DTOs

### `CreateOrderRequest`
```
long   amount    // in paise — frontend sends 149900 or 199900
String courseId  // "advanced-rag"
```

### `CreateOrderResponse`
```
String razorpayOrderId
long   amount
String currency   // "INR"
String keyId      // sent so frontend doesn't hardcode it
```

### `VerifyPaymentRequest`
```
String razorpayOrderId
String razorpayPaymentId
String razorpaySignature
String courseId
```

### `VerifyPaymentResponse`
```
boolean success
String  accessToken   // UUID; frontend stores in localStorage
String  message
```

### `AccessCheckResponse`
```
boolean hasAccess
```

---

## Step 5 — Backend: Signature Verifier Utility

`SignatureVerifier.java` — one static method:
```
static boolean verify(String razorpayOrderId, String razorpayPaymentId, String secret)
```

Algorithm:
```
payload = razorpayOrderId + "|" + razorpayPaymentId
expectedSig = HMAC-SHA256(payload, secret)
return expectedSig.equals(receivedSignature)   // constant-time compare
```

Use `javax.crypto.Mac` with algorithm `HmacSHA256`. Output as lowercase hex string.

Also a second method for webhook signatures:
```
static boolean verifyWebhook(String rawBody, String receivedSig, String webhookSecret)
```
Algorithm: `HMAC-SHA256(rawBody, webhookSecret)`

---

## Step 6 — Backend: Service

### `PaymentService` interface
Three methods:
1. `CreateOrderResponse createOrder(CreateOrderRequest req, String userId)`
2. `VerifyPaymentResponse verifyPayment(VerifyPaymentRequest req, String userId)`
3. `AccessCheckResponse checkAccess(String accessToken)`

### `PaymentServiceImpl`

**`createOrder`:**
1. Build Razorpay order JSON: `{ amount, currency: "INR", receipt: UUID }`
2. Call `razorpayClient.orders.create(orderJson)` → returns `Order` SDK object
3. Persist `Order` document to MongoDB with status `CREATED`
4. Return `CreateOrderResponse` with `razorpayOrderId`, `amount`, `currency`, `keyId`

**`verifyPayment`:**
1. Look up `Order` by `razorpayOrderId` — throw `404` if not found
2. Assert `order.status == CREATED` — throw `400` if already processed
3. Call `SignatureVerifier.verify(razorpayOrderId, razorpayPaymentId, keySecret)`
4. If signature invalid → update order to `FAILED`, throw `400 "Invalid signature"`
5. If valid:
   - Update `Order`: `status = PAID`, `razorpayPaymentId`, `updatedAt`
   - Generate `accessToken = UUID.randomUUID().toString()`
   - Create and save `Purchase` document with all fields
6. Return `VerifyPaymentResponse(success: true, accessToken: token)`

**`checkAccess`:**
1. `purchaseRepository.existsByAccessToken(accessToken)`
2. Return `AccessCheckResponse(hasAccess: result)`

---

## Step 7 — Backend: Controller

`@RestController @RequestMapping("/api/payment")`

### `POST /api/payment/orders`
- `@RequestBody CreateOrderRequest`
- Auth: optional (extract userId from SecurityContext if present; use `"guest"` otherwise)
- Delegates to `paymentService.createOrder(req, userId)`
- Returns `200 CreateOrderResponse`

### `POST /api/payment/verify`
- `@RequestBody VerifyPaymentRequest`
- Auth: optional
- Delegates to `paymentService.verifyPayment(req, userId)`
- Returns `200 VerifyPaymentResponse`

### `POST /api/payment/webhook`
- `@RequestHeader("X-Razorpay-Signature") String sig`
- `@RequestBody String rawBody`
- Verify webhook signature using `SignatureVerifier.verifyWebhook(rawBody, sig, webhookSecret)`
- On `payment.captured` event: find order by `razorpayOrderId`, set status `PAID` if not already
- On `payment.failed`: set status `FAILED`
- Always return `200 OK` (Razorpay retries on non-200)
- Note: add `razorpay.webhook.secret` to `application.yml`; configure in Razorpay dashboard

### `GET /api/payment/access`
- `@RequestParam String accessToken`
- Delegates to `paymentService.checkAccess(accessToken)`
- Returns `200 AccessCheckResponse`

---

## Step 8 — Backend: Spring Security

The existing `JwtAuthFilter` whitelist (in `SecurityConfig`) must be updated to permit:
```
POST /api/payment/orders
POST /api/payment/verify
POST /api/payment/webhook
GET  /api/payment/access
```
All four can be public — the access token serves as the authorization credential for the video page.

---

## Step 9 — Frontend: TypeScript Declaration

### `src/types/razorpay.d.ts`
Declare the global `Razorpay` constructor so TypeScript doesn't error on `new window.Razorpay(...)`:
```ts
interface RazorpayOptions { /* key, amount, currency, order_id, name, handler, prefill, theme */ }
interface RazorpayInstance { open(): void; on(event: string, cb: Function): void }
declare global {
  interface Window { Razorpay: new (options: RazorpayOptions) => RazorpayInstance }
}
export {}
```

---

## Step 10 — Frontend: Razorpay Script

### `frontend/index.html`
Add before `</body>`:
```html
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
```
This loads the Razorpay JS SDK globally. It must be present before `window.Razorpay` is called.

---

## Step 11 — Frontend: API Helper

### `src/api/payment.ts`
Three axios functions (base URL `/api`):

**`createOrder(amountInPaise, courseId)`**
- `POST /payment/orders`
- Body: `{ amount: amountInPaise, courseId }`
- Returns: `{ razorpayOrderId, amount, currency, keyId }`

**`verifyPayment(razorpayOrderId, razorpayPaymentId, razorpaySignature, courseId)`**
- `POST /payment/verify`
- Body: `{ razorpayOrderId, razorpayPaymentId, razorpaySignature, courseId }`
- Returns: `{ success, accessToken }`

**`checkAccess(accessToken)`**
- `GET /payment/access?accessToken=<token>`
- Returns: `{ hasAccess }`

---

## Step 12 — Frontend: OrderDrawer Changes

The `Proceed` button becomes an async handler with three phases:

### State additions
```ts
const [loading, setLoading] = useState(false)
const [error, setError]     = useState<string | null>(null)
```

### Proceed handler logic
```
setLoading(true); setError(null)

1. Call createOrder(total * 100, 'advanced-rag')
   → { razorpayOrderId, amount, currency, keyId }

2. Build Razorpay options:
   {
     key: keyId,
     amount,
     currency,
     order_id: razorpayOrderId,
     name: 'CampusX',
     description: 'Advanced RAG Course',
     handler: async (response) => {
       const { success, accessToken } = await verifyPayment(
         response.razorpay_order_id,
         response.razorpay_payment_id,
         response.razorpay_signature,
         'advanced-rag'
       )
       if (success) {
         localStorage.setItem('courseAccess', accessToken)
         navigate('/payment/success')
       }
     },
     modal: {
       ondismiss: () => setLoading(false)
     },
     theme: { color: '#2563eb' }
   }

3. const rzp = new window.Razorpay(options)
   rzp.on('payment.failed', (res) => {
     setLoading(false)
     setError('Payment failed. Please try again.')
   })
   rzp.open()
```

### UI changes
- Proceed button shows spinner + "Processing…" while `loading === true`
- Render error message (red text) below button when `error` is set
- Button is disabled while `loading === true`

---

## Step 13 — Frontend: PaymentSuccessPage Changes

Currently redirects to YouTube directly at `T=2600ms`.

**Change:** redirect to `/course/video` instead:
```ts
// replace:  window.location.href = YOUTUBE_URL
// with:
navigate('/course/video')
```
The YouTube URL is now rendered inside the gated VideoPage, not navigated to directly.

---

## Step 14 — Frontend: VideoPage (New)

### Route: `/course/video`

### On mount
1. Read `accessToken = localStorage.getItem('courseAccess')`
2. If none → `navigate('/course')` immediately
3. Call `checkAccess(accessToken)` → `{ hasAccess }`
4. If `hasAccess: false` → clear localStorage, `navigate('/course')`
5. If `hasAccess: true` → set `authorized = true`

### State
```ts
const [authorized, setAuthorized] = useState(false)
const [checking,   setChecking]   = useState(true)
```

### Render
While `checking`: show full-screen spinner / "Verifying access…"

When `authorized`:
```
<div> centered, white bg
  <h2>Advanced RAG — Full Course</h2>
  <iframe
    src="https://www.youtube.com/embed/..."
    allow="autoplay; fullscreen"
    style={{ width: '100%', aspect-ratio: 16/9, border: none }}
  />
  <p>CampusX · Advanced RAG</p>
</div>
```
YouTube embed ID: `-Lt-ntUDj-g`
Full embed URL: `https://www.youtube.com/embed/-Lt-ntUDj-g?list=PLKnIA16_RmvaYH3poI0oJvbDF4zEvpq8W&autoplay=1`

---

## Step 15 — Frontend: App.tsx Route Changes

**Remove:** `<Route path="/payment" element={<PaymentPage />} />`  
**Add:** `<Route path="/course/video" element={<VideoPage />} />`

Import `VideoPage` at the top.

---

## Step 16 — CORS

The existing Spring Security/CORS config in `application.yml` (or `WebMvcConfigurer`) allows
`http://localhost:5173`. No additional CORS changes needed since all new endpoints are under
`/api/payment/**` which is already on port 8080.

---

## Implementation Order

Execute in this sequence to avoid broken states:

1. Backend scaffold: `pom.xml` Razorpay dep → Maven compile to verify
2. `application.yml` credentials
3. `RazorpayConfig.java` bean
4. `Order.java` + `Purchase.java` models
5. `OrderRepository.java` + `PurchaseRepository.java`
6. DTOs (all 5)
7. `SignatureVerifier.java` utility
8. `PaymentServiceImpl.java`
9. `PaymentController.java`
10. Security whitelist update
11. Backend compile + smoke test (Postman: create order, verify with test card)
12. `frontend/index.html` Razorpay script
13. `src/types/razorpay.d.ts`
14. `src/api/payment.ts`
15. `VideoPage.tsx`
16. `OrderDrawer.tsx` — replace Proceed handler
17. `PaymentSuccessPage.tsx` — change redirect target
18. `App.tsx` — swap routes
19. Delete `PaymentPage.tsx`
20. Full end-to-end test with test card

---

## End-to-End Test Checklist

- [ ] Click "See how it works" → lands on `/course`
- [ ] Click "BUY NOW" → order drawer slides in, shows ₹1,499 (coupon applied)
- [ ] Remove coupon → shows ₹1,999
- [ ] Click "Proceed" → spinner appears, Razorpay popup opens
- [ ] Complete payment with test card `4111 1111 1111 1111` / `123` / future date / OTP `1234`
- [ ] Razorpay popup closes, verify API called, `accessToken` saved to localStorage
- [ ] Navigates to `/payment/success` → checkmark animation plays
- [ ] Navigates to `/course/video` → access check passes → YouTube embed plays
- [ ] Manually navigate to `/course/video` without purchase → redirected to `/course`
- [ ] Check MongoDB `orders` collection — status `PAID`
- [ ] Check MongoDB `purchases` collection — record created with `accessToken`
- [ ] Payment failure (use blocked card) → error message shown in drawer
- [ ] Webhook endpoint responds 200 to Razorpay test webhook

---

## Security Checklist

- [ ] `KEY_SECRET` not committed — env-var override for production
- [ ] Signature verified server-side before marking `PAID`
- [ ] Webhook signature verified before processing
- [ ] Frontend `success` path gated by server-side verify call, not just popup callback
- [ ] `/course/video` never loads without valid `accessToken` in backend
- [ ] `accessToken` is UUID — not guessable
