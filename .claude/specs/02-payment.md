# Task: Redesign Hero Section + Add Payment Flow (Strict Scope)

You are a senior UI/UX engineer and frontend architect.

Your task is to modify ONLY the HERO SECTION of the existing landing page and implement a production-style payment flow based on the provided reference images.

CRITICAL:
- Do NOT modify any other section of the landing page.
- Do NOT change spacing/layout/colors/fonts outside the hero section.
- Do NOT refactor unrelated components.
- Preserve existing responsiveness and structure outside hero.
- Focus ONLY on:
  1. Hero section redesign
  2. CTA behavior
  3. Payment flow pages
  4. Success redirect to YouTube video

---

# Reference Images

Use these images as exact visual references:

1. Landing Page Hero Reference 
   - File: `@Landing Page.png`

2. Buy Now Course Layout
   - File: `@1)BuyNow.png`

3. Course Card Layout
   - File: `@2)RAGCourse.png`

4. Order Details Layout
   - File: `@3)Order.png`

5. Payment Gateway Layout
   - File: `@4)Payment.png`

---

# Required Hero Section Changes

## Existing Behavior
Currently:
- Clicking "See how it works" opens a modal overlay.

This behavior must be REMOVED completely.

---

# New Behavior

## Hero CTA Flow

When user clicks:

"See how it works"

The application must navigate through this flow:

### Step 1 — Course Purchase Page
Open page matching:
- `@1)BuyNow.png`
- `@2)RAGCourse.png`

---

### Step 2 — Order Summary Drawer/Page
On clicking BUY NOW:
Open order summary UI matching:
- `@3)Order.png`

---

### Step 3 — Payment Module
On clicking Proceed:
Open payment UI matching:
- `@4)Payment.png`

You may use:
- Razorpay OR Cashfree integration structure

---

### Step 4 — Payment Success Redirect

After successful payment:
Automatically redirect user to YouTube video page/player.

Requirements:
- Smooth success transition
- Show success confirmation briefly
- Then redirect

Example flow:
Payment Success
→ Success Animation
→ "Opening course..."
→ Redirect to YouTube

---

# UI/UX Requirements

## Hero Section Design


---

# Technical Requirements

## Stack
Use existing project stack only.

---

# Animation Requirements


---

# Routing Requirements


---

# Responsiveness


---

# Code Quality Requirements

---

# Important Constraints

DO NOT:
- Touch other sections
- Change navbar
- Change footer
- Refactor unrelated code
- Break existing layouts
- Introduce unnecessary dependencies

ONLY modify:
- Hero section
- CTA flow
- Payment flow pages/components

---

# Deliverables

1. Updated hero section
2. Purchase page
3. Order summary page
4. Payment page
5. Success redirect flow
6. Responsive implementation
7. Smooth animations
8. Clean production-ready code

---

# Definition of Done

The task is complete ONLY IF:

- "See how it works" no longer opens modal
- Full purchase/payment flow works
- Hero visually matches reference
- Payment flow matches provided screenshots
- Mobile responsiveness works
- Success redirect opens YouTube video
- No unrelated page sections changed
- UI looks production-grade
- No broken routes/components
- No console errors
- Smooth UX throughout