# Implementation Plan: Payment Flow (Spec 02)

## Overview

Replace the "See how it works" video modal with a 4-step purchase/payment flow:
`Landing → CoursePage → OrderDrawer → PaymentPage → SuccessPage → YouTube`

**Strict scope:** Only the hero button, App.tsx routes, and 4 new pages/components.  
Nothing else on the landing page is touched.

---

## Reference Image Analysis

| Image | What it shows |
|---|---|
| `Landing Page.png` | Hero already matches. Red box highlights "See how it works" — this is the only CTA that changes. |
| `1)BuyNow.png` | Two-column course detail page: left = course card thumbnail, right = title/meta/price/BUY NOW |
| `2)RAGCourse.png` | Standalone course card: dark thumbnail, title "Advanced RAG", "CampusX", "₹1,999" |
| `3)Order.png` | Slide-in drawer: "Order details", course preview, price breakdown with applied coupon, "Proceed" CTA |
| `4)Payment.png` | Cashfree-style two-panel checkout: dark navy left (brand + price), white right (QR + payment options list) |

---

## Files to Modify

| File | Change |
|---|---|
| `frontend/src/app/App.tsx` | Remove video modal (state + effect + JSX). Add 3 new public routes. |
| `frontend/src/pages/landing/HeroSection.tsx` | Replace `<button onClick={dispatchEvent}>` with `<Link to="/course">`. Remove CustomEvent dispatch. |

## Files to Create

```
frontend/src/pages/
├── CoursePage.tsx          ← Step 1: course detail + buy-now
├── PaymentPage.tsx         ← Step 3: Cashfree-style checkout
├── PaymentSuccessPage.tsx  ← Step 4: success animation + YouTube redirect
└── payment/
    └── OrderDrawer.tsx     ← Step 2: order summary drawer (used by CoursePage)
```

---

## Step 1 — Remove Modal, Update Hero Button

### `App.tsx`
- Delete `videoOpen` useState
- Delete the `useEffect` that listens for `'open-video-modal'`
- Delete the `VIDEO_EMBED` constant
- Delete the entire `{videoOpen && <div>…</div>}` modal JSX block
- Add three new `<Route>` entries inside `<Routes>` (public, no auth wrapper):
  ```
  <Route path="/course"            element={<CoursePage />} />
  <Route path="/payment"           element={<PaymentPage />} />
  <Route path="/payment/success"   element={<PaymentSuccessPage />} />
  ```
- Add the three new page imports at the top

### `HeroSection.tsx`
- Change the "See how it works" `<button>` to `<Link to="/course">` with identical visual styles
- Remove the `onClick` handler entirely
- Keep all other hero JSX untouched (badge, headline, subtitle, dashboard mockup, "Create free account" button)

---

## Step 2 — CoursePage (`CoursePage.tsx`)

### Layout
Two-column grid on desktop (`grid-template-columns: 1fr 1fr`), single column stacked on mobile.  
Page background: white (`#ffffff`). Max-width `900px`, centered, padding `48px 24px`.

### Left Column — Course Card (matches `2)RAGCourse.png`)
A rounded card (`border-radius: 16px`, `border: 1px solid rgba(0,0,0,0.08)`, subtle shadow) containing:
1. **Thumbnail area** — dark navy/black rectangle (`height: ~200px`) with:
   - Gradient background: `linear-gradient(135deg, #0d0d1a, #1a1a3e)`
   - White bold text: "ADVANCED RAG" (large, stacked on two lines, with a blue "RAG" accent color `#4f9cf9`)
   - Subtext: "BUILD SMARTER, MORE RELIABLE AI APPLICATIONS" (small, gray)
   - Decorative abstract glowing blobs/shapes in blue/purple (CSS `box-shadow` blur or `border-radius` shapes — no images)
2. **Card body** (`padding: 20px`):
   - Title: "Advanced RAG" (`font-size: 18px`, `font-weight: 600`)
   - Instructor: "CampusX" (`font-size: 14px`, `color: #6b7280`)
   - Price: "₹1,999" (`font-size: 16px`, `font-weight: 700`, `color: #111`)

### Right Column — Course Details (matches `1)BuyNow.png`)
Vertical stack, `gap: 16px`:
1. **Title:** "Advanced RAG" — `font-size: 28px`, `font-weight: 700`
2. **Description:** "Build production-grade AI systems that retrieve, reason, and respond with precision." — `font-size: 15px`, `color: #4b5563`, `line-height: 1.6`
3. **Meta rows** (each `font-size: 14px`):
   - `Instructor:` plain text + `CampusX` blue link (`color: #2563eb`)
   - `Language:` plain text + `Hinglish` blue link
   - `Validity Period:` plain text + `1095 days`
4. **Price block:**
   - `₹1999` — `font-size: 26px`, `font-weight: 700`
   - `including 18% GST` — small gray text inline
5. **BUY NOW button:**
   - Border: `2px solid #2563eb`, color `#2563eb`, background transparent
   - `padding: 12px 32px`, `font-weight: 700`, `font-size: 16px`, `border-radius: 4px`
   - On hover: `background: #2563eb`, `color: #fff`
   - `onClick`: sets `orderDrawerOpen = true`

### State
```ts
const [orderDrawerOpen, setOrderDrawerOpen] = useState(false)
```

Render `<OrderDrawer isOpen={orderDrawerOpen} onClose={() => setOrderDrawerOpen(false)} />`  
at the bottom of the page JSX.

---

## Step 3 — OrderDrawer (`payment/OrderDrawer.tsx`)

### Behaviour
- Slides in from the right on desktop, from the bottom on mobile
- Backdrop overlay (`position: fixed`, `inset: 0`, `background: rgba(0,0,0,0.4)`) — clicking it calls `onClose`
- Drawer panel: `position: fixed`, `right: 0`, `top: 0`, `bottom: 0` (desktop) / `bottom: 0`, `left: 0`, `right: 0` (mobile)
- Entrance animation: CSS `transform: translateX(100%)` → `translateX(0)` over `300ms ease-out` (desktop)

### Props
```ts
interface OrderDrawerProps {
  isOpen: boolean
  onClose: () => void
}
```
`onProceed` is handled internally via `useNavigate('/payment')`.

### Layout (matches `3)Order.png`)
Width: `380px` desktop, `100%` mobile. Background `#fff`.

**Header** (`padding: 20px 20px 0`):
- "Order details" — `font-size: 18px`, `font-weight: 700`
- `×` close button — `position: absolute`, top-right, `font-size: 20px`, icon button style

**Course preview row** (`padding: 20px`):
- Left: course thumbnail (dark navy block, `64×64px`, `border-radius: 8px`, same gradient as card)
- Right stack:
  - "Advanced RAG" — `font-weight: 600`, `font-size: 15px`
  - "₹1,999" — `color: #2563eb`, `font-weight: 600`
  - "Valid for 1095 days" — `font-size: 13px`, `color: #9ca3af`

**Price breakdown** (`padding: 0 20px`):
Row 1: "Course price" left, "₹1,999" right — `font-size: 15px`
Row 2: 
- Left: coupon tag `RAGEARLY` in blue (`#2563eb`) + `⊗` remove icon (when clicked: `couponApplied = false`, recalculate total)
- Right: `- ₹500` in blue
- This row is hidden when `couponApplied === false`

Horizontal rule `<hr>` with light gray color

Row 3: "You pay" left (bold), final amount right (bold) — amount is `₹1,499` when coupon applied, `₹1,999` when removed

### State (local)
```ts
const [couponApplied, setCouponApplied] = useState(true)
const total = couponApplied ? 1499 : 1999
```

**Footer** (sticky bottom, `padding: 16px 20px`):
- "Proceed" button: full width, `background: #2563eb`, `color: #fff`, `border-radius: 8px`, `height: 52px`, `font-size: 16px`, `font-weight: 600`
- `onClick`: `navigate('/payment')`

---

## Step 4 — PaymentPage (`PaymentPage.tsx`)

### Layout
Simulates Cashfree checkout (`4)Payment.png`). Page background: `#e8ecf3` (light blue-gray).  
Centered card: `max-width: 860px`, `border-radius: 16px`, `overflow: hidden`, white background, shadow.  
Two-column grid: `340px` left | `1fr` right. Single column on mobile (left panel collapses to a top strip).

### Left Panel (dark navy `#0d1b3e`)
Top to bottom:
1. **Social proof banner** (slightly lighter navy strip): 🛍 "3710+ orders fulfilled in last 24hrs" — `font-size: 13px`, white, centered
2. **Back arrow** `←` — white, `font-size: 18px`, `padding: 16px`, clickable → `navigate('/course')`
3. **Brand logo placeholder** — colored rectangle or initials block, `height: 60px`, centered, mimics CampusX logo style
4. **Brand name** "CampusX" — white, `font-size: 22px`, `font-weight: 700`, centered
5. **Price row** — `₹1,499 ›` — white, `font-size: 22px`, `font-weight: 700`, inside a rounded darker rectangle (`background: rgba(255,255,255,0.12)`, `border-radius: 8px`, `padding: 14px 24px`)
6. **Footer** (absolute bottom): "Secured by Cashfree Payments" — small, white/muted, centered (with a simple "Cashfree" wordmark in light text)

### Right Panel (white)
Vertical scroll if needed. `padding: 28px`.

**Section 1 — UPI QR**
Header: "Payment Options for +91 9916110441" (`font-size: 14px`, `font-weight: 600`) + "Change" link (blue, right-aligned)

QR block (border `1px solid #e5e7eb`, `border-radius: 12px`, `padding: 20px`):
- Left: QR code placeholder (gray grid of small squares, `120×120px`, CSS `background` pattern or a simple bordered div with text "QR" centered)
- Right:
  - "Scan and pay with"
  - Three colored circles/icons for Google Pay (green/blue), PhonePe (purple), Paytm (navy) — `16×16px` colored SVG circles with initials
  - "or other UPI apps"

**Section 2 — Other Payment Options**  
Label: "Other Payment Options" — `font-size: 14px`, `font-weight: 600`, `color: #374151`, `margin-top: 24px`

Five list rows (each `border-bottom: 1px solid #f3f4f6`, `padding: 16px 0`, `cursor: pointer`, hover `background: #f9fafb`):
1. 💳 **Card** — "Card" label, right side shows small Visa/MC/Amex colored text badges, `›` chevron
2. ⚡ **Pay by UPI ID** — text only, `›`
3. 👜 **Wallets** — text only, `›`
4. 🏦 **Net Banking** — text only, `›`
5. ⏰ **Paylater** — text only, `›`

Each row: `onClick={() => navigate('/payment/success')}` — any payment method click triggers success.

### State
```ts
// Read from location.state or use hardcoded defaults
const amount = 1499
```

---

## Step 5 — PaymentSuccessPage (`PaymentSuccessPage.tsx`)

### Layout
Full viewport, centered flex column, white background.

### Animation Sequence
Uses `useState<'check' | 'text' | 'redirect'>('check')` + `useEffect` with `setTimeout` chain:

```
T=0ms    Mount → begin checkmark draw animation
T=600ms  setPhase('text') → "Payment successful!" fades in
T=1600ms setPhase('redirect') → "Opening course..." appears with ellipsis animation  
T=2600ms window.open(YOUTUBE_URL, '_self') or window.location.href = YOUTUBE_URL
```

`YOUTUBE_URL = 'https://www.youtube.com/watch?v=-Lt-ntUDj-g&list=PLKnIA16_RmvaYH3poI0oJvbDF4zEvpq8W&index=4'`

### Checkmark Animation (pure CSS, no library)
```
<div class="circle"> ← green circle, scale-in keyframe (0.4s ease-out)
  <svg> ← checkmark path, stroke-dashoffset draw animation (0.3s, delay 0.3s)
</div>
```

Keyframes defined as inline `<style>` tag or added to `index.css`:
- `@keyframes scaleIn` — `transform: scale(0)` → `scale(1)`
- `@keyframes drawCheck` — `stroke-dashoffset: 100` → `0`

### Text elements
- "Payment successful!" — `font-size: 26px`, `font-weight: 700`, `color: #111`, fade-in via `opacity: 0 → 1` transition
- "Opening course…" — `font-size: 15px`, `color: #6b7280`, with CSS `::after` content cycling `. → .. → ...` via keyframe animation

---

## Step 6 — Routing Update in `App.tsx`

Add inside `<Routes>` (no auth wrapper — these pages are publicly accessible):
```tsx
<Route path="/course"           element={<CoursePage />} />
<Route path="/payment"          element={<PaymentPage />} />
<Route path="/payment/success"  element={<PaymentSuccessPage />} />
```

Add three imports at top of file.

---

## Step 7 — Responsiveness Rules

| Breakpoint | CoursePage | OrderDrawer | PaymentPage |
|---|---|---|---|
| ≥ 768px | Two-column grid | Slides from right (380px wide) | Two-panel layout |
| < 768px | Single column, card first | Full-width, slides from bottom | Single column, left panel = top strip |

Use `@media (max-width: 768px)` queries inline via a `style` tag in each component, or CSS-in-JS using a `useWindowWidth` hook. Prefer inline media queries in a `<style>` block at the component root to avoid new dependencies.

---

## Step 8 — Implementation Order

Execute in this order to avoid broken intermediate states:

1. Create `payment/OrderDrawer.tsx` (no deps, pure component)
2. Create `CoursePage.tsx` (depends on OrderDrawer)
3. Create `PaymentSuccessPage.tsx` (standalone, no deps)
4. Create `PaymentPage.tsx` (uses `useNavigate`, no other deps)
5. Modify `App.tsx` — remove modal, add 3 routes + imports
6. Modify `HeroSection.tsx` — swap button to Link

---

## Step 9 — Constraints Checklist

- [ ] No new npm packages installed
- [ ] No changes to `LandingNavbar`, `StatsBand`, `FeaturesSection`, `CtaSection`, `LandingFooter`
- [ ] No changes to `LoginPage`, `RegisterPage`, `DashboardPage`, `ProfilePage`
- [ ] No changes to `index.css` variables or global resets
- [ ] `ExpenseSummaryCard.tsx` not touched (only unused by hero now)
- [ ] All new components use inline styles or existing CSS variables only
- [ ] No real payment API calls — Cashfree UI is a faithful visual simulation

---

## Key Data Constants

```ts
const COURSE = {
  title:       'Advanced RAG',
  instructor:  'CampusX',
  language:    'Hinglish',
  validity:    '1095 days',
  price:       1999,
  couponCode:  'RAGEARLY',
  couponDisc:  500,
  finalPrice:  1499,
}

const YOUTUBE_URL =
  'https://www.youtube.com/watch?v=-Lt-ntUDj-g&list=PLKnIA16_RmvaYH3poI0oJvbDF4zEvpq8W&index=4'
```

---

## Definition of Done

- "See how it works" no longer opens a modal — navigates to `/course`
- Course page visually matches `1)BuyNow.png` + `2)RAGCourse.png`
- "BUY NOW" opens Order drawer matching `3)Order.png`
- Coupon RAGEARLY is pre-applied and removable
- "Proceed" navigates to `/payment`
- Payment page visually matches `4)Payment.png`
- Any payment method click triggers success flow
- Success animation plays, then redirects to YouTube URL
- All pages are mobile-responsive
- No console errors
- Landing page (all sections outside hero button) unchanged
