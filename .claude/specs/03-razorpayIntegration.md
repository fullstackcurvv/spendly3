````md
# Razorpay Integration Specification

File:
```text
.claude/specs/razorpayIntegration.md
```

---

# Objective

Integrate Razorpay Test Payment Gateway into the existing:

- React JS
- Tailwind CSS
- Spring Boot
- MongoDB

application.

Replace the current mock payment flow with actual Razorpay integration.

After successful payment:
- Unlock course
- Redirect user
- Play YouTube video

---

# Application Workflow

```text
Landing Page
   ↓
Course Page
   ↓
Buy Now
   ↓
Order Drawer
   ↓
Proceed
   ↓
Razorpay Payment
   ↓
Payment Verification
   ↓
Success Page
   ↓
YouTube Video Playback
```

---

# Tech Stack

## Frontend

## Backend
- Spring Boot
- MongoDB
- Razorpay Java SDK

---

# Razorpay Setup

## Create Razorpay Account

```text
https://dashboard.razorpay.com

username: fullstackcurvv@gmail.com
```

---

# Enable Test Mode

```text
Test Mode ON
```

---

# Generate Test Keys

Get:
```text
KEY_ID: rzp_test_SrbKB6rCYrCCnI
KEY_SECRET: boJ9e6ttaV725ALsJiKbE34u
```

---

# Backend Environment Variables

## application.properties

```properties
razorpay.key=rzp_test_xxxxxxxxx
razorpay.secret=xxxxxxxxxxxxx
```

---

# Backend Dependencies

## pom.xml

---

# Backend Structure

```text
src/main/java/com/app/payment

├── controller
├── service
├── repository
├── model
├── dto
├── config
└── util
```

---

# MongoDB Collections

## orders

---

## purchases

---

# Razorpay Configuration


---

# Backend APIs

---

# 1. Create Order API

## Endpoint

---

## Request

---

## Response

---

## Responsibilities

- Create Razorpay order
- Save order in MongoDB
- Return order details

---

# 2. Verify Payment API

## Endpoint

---

## Request

---

## Responsibilities

- Verify payment signature
- Update order status
- Save purchase
- Unlock course

---

# 3. Webhook API

## Endpoint

---

## Events

```text
payment.captured
payment.failed
```

---

## Responsibilities

- Final payment verification
- Prevent fake success
- Sync payment status

---

# Signature Verification

---

# Frontend Setup

---

# Install Axios

---

# Add Razorpay Script

## public/index.html

---

# Frontend Pages

---

# Frontend Payment Flow

---

# Landing Page

## Action

---

# Buy Now Button

## Action

---

# Proceed Button

## Action

---

# Create Order API Call

---

# Razorpay Checkout

# Success Page

## Responsibilities

- Show success animation
- Validate purchase
- Redirect to video page

---

# YouTube Video Page

## Requirements

- Only purchased users can access
- Prevent direct URL access
- Validate backend authorization

---

# Access Validation API

## Endpoint

---

# Frontend Access Protection

---

# Tailwind UI Requirements

## Buttons

---

## Order Drawer

---

## Success Animation

---

# Claude Code Terminal Workflow

---

# Start Backend

---

# Start Frontend

---

# Suggested Claude Code Prompts

---

# Generate Spring Boot Razorpay APIs

---

# Generate React Razorpay Flow

---

# Generate Mongo Models

---

# Razorpay Test Card

```text
Card Number: 4111 1111 1111 1111
CVV: 123
Expiry: Any Future Date
OTP: 1234
```

---

# Security Requirements

- Never trust frontend payment success
- Verify signatures server-side
- Validate webhook signatures
- Protect video endpoints
- Validate purchase ownership
- Use JWT authentication

---

# Production Readiness

---

# End-to-End Flow

```text
Landing Page
   ↓
Course Page
   ↓
Buy Now
   ↓
Order Drawer
   ↓
Create Razorpay Order
   ↓
Open Razorpay Checkout
   ↓
Complete Payment
   ↓
Verify Payment
   ↓
Save Purchase
   ↓
Unlock Course
   ↓
Play YouTube Video
```

---

# Definition of Done

- Razorpay Test Mode integrated successfully
- Backend Razorpay SDK configured
- Razorpay keys stored securely
- Create Order API working
- Verify Payment API working
- Webhook API implemented
- MongoDB orders collection working
- MongoDB purchases collection working
- React payment flow integrated
- Razorpay popup opens correctly
- Test payments complete successfully
- Payment signature verification implemented
- Payment success updates database
- Payment failure handled properly
- Success page redirects correctly
- Purchased users can access video
- Unauthorized users blocked
- JWT validation implemented
- End-to-end workflow working
- Mock payment flow removed completely
- Production-ready configuration completed
````