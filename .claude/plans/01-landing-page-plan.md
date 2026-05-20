# Plan: Landing Page — `01-landing-page`

Reference design: `spendly-landing-page.jpeg`  
Target: desktop viewport, light + dark mode

---

## Visual Inventory (from reference image)

| Section | Key details |
|---|---|
| **Navbar** | Logo (diamond icon + "Spendly"), "Sign in" ghost link, "Get started" filled-black pill button |
| **Hero card** | Full-width rounded card; left: badge + two-tone serif headline + subtitle + 2 CTAs; right: mini expense-summary card |
| **Stats bar** | 3 partially-visible metric blocks below hero (implied by design) |
| **Features** | Warm-beige background; 3 white cards in a row (icon + title + body) |
| **CTA** | Centered section; "Ready to take control?" heading + subtitle + "Create free account" button |
| **Footer** | Near-black background; centred logo icon + wordmark + tagline |

---

## Phase 0 — Project Bootstrap

**Goal:** get a working Vite dev server with Tailwind and shadcn/ui installed.

### Steps

1. **Scaffold frontend project**
   - Run `npm create vite@latest . -- --template react-ts` inside `frontend/`
   - This produces `index.html`, `src/main.tsx`, `src/App.tsx`, `vite.config.ts`

2. **Install Tailwind CSS v4**
   - `npm install tailwindcss @tailwindcss/vite`
   - Add the Vite plugin to `vite.config.ts`
   - No `tailwind.config.js` needed for v4 (CSS-first config)

3. **Install React Router v7**
   - `npm install react-router-dom`

4. **Install axios**
   - `npm install axios`

5. **Install shadcn/ui prerequisites**
   - `npm install class-variance-authority clsx tailwind-merge lucide-react`
   - `npx shadcn@latest init` — choose "New York" style, CSS variables on, no Tailwind config (v4 mode)
   - shadcn writes to `src/components/ui/` — do not edit those files manually

6. **Configure Vite dev proxy**
   - In `vite.config.ts`, add `server.proxy`: `/api` → `http://localhost:8080`
   - Also set `resolve.alias`: `@` → `src/`

7. **Delete Vite boilerplate** (`App.css`, `assets/react.svg`, default `App.tsx` content)

---

## Phase 1 — Styles & Theme

**Goal:** wire up all CSS layers and CSS custom properties before writing any components.

### Files to create

#### `src/styles/fonts.css`
- Import Google Fonts:
  - **Display / headings:** `Playfair Display` (serif, used for the hero headline)
  - **Body / UI:** `Inter` (sans-serif, used everywhere else)
- `@import url(...)` statements only

#### `src/styles/theme.css`
- Define `:root` light-mode CSS custom properties:
  ```
  --brand-green: #2ca85a
  --page-bg:     #f8f6f4   (warm off-white)
  --section-alt: #ece9e3   (warm beige for features section)
  --footer-bg:   #141414   (near-black)
  --destructive: #d4183d
  --border:      rgba(0,0,0,0.1)
  --text-primary:   #0f0f0f
  --text-muted:     #6b6b6b
  --card-bg:        #ffffff
  --btn-primary-bg: #1a1a1a
  --btn-primary-fg: #ffffff
  ```
- Define `.dark` overrides:
  ```
  --page-bg:      #111110
  --section-alt:  #1a1917
  --footer-bg:    #0a0a09
  --text-primary: #f0ede8
  --text-muted:   #888885
  --card-bg:      #1e1d1b
  --border:       rgba(255,255,255,0.08)
  --btn-primary-bg: #f0ede8
  --btn-primary-fg: #111110
  ```

#### `src/styles/tailwind.css`
- `@import "tailwindcss"` (v4 single-import approach)
- Register all CSS variables as Tailwind theme tokens using `@theme`:
  - `--color-brand-green`, `--color-page-bg`, `--color-section-alt`, etc.
  - `--font-display: 'Playfair Display', serif`
  - `--font-body: 'Inter', sans-serif`

#### `src/styles/globals.css`
- Base resets: `*, html, body { margin:0; padding:0; box-sizing:border-box }`
- `body { background: var(--page-bg); color: var(--text-primary); font-family: var(--font-body) }`
- Smooth scroll: `html { scroll-behavior: smooth }`

#### `src/styles/index.css`
- Entry file that imports in order:
  1. `./fonts.css`
  2. `./tailwind.css`
  3. `./theme.css`
  4. `./globals.css`

#### Update `src/main.tsx`
- Replace the default CSS import with `import './styles/index.css'`

---

## Phase 2 — App Shell & Routing

**Goal:** minimal router and route guards so the landing page renders at `/`.

### Files to create / modify

#### `src/lib/auth.ts`
- `getToken(): string | null` — reads `localStorage.getItem('token')`
- `getUser(): { id, name, email } | null` — reads + JSON-parses `localStorage.getItem('user')`
- `clearAuth()` — removes both keys

#### `src/lib/axios.ts`
- Create an axios instance with `baseURL: '/api'`
- Request interceptor: attach `Authorization: Bearer <token>` if token exists
- Response interceptor: on 401, call `clearAuth()` then redirect to `/login`

#### `src/app/components/GuestRoute.tsx`
- If `getToken()` is non-null, `<Navigate to="/dashboard" />`; otherwise render `<Outlet />`

#### `src/app/components/PrivateRoute.tsx`
- If `getToken()` is null, `<Navigate to="/login" />`; otherwise render `<Outlet />`

#### `src/app/App.tsx`
```
Routes:
  /             → LandingPage       (guest only via GuestRoute)
  /register     → RegisterPage      (guest only)
  /login        → LoginPage         (guest only)
  /dashboard    → DashboardPage     (private)
  /profile      → ProfilePage       (private)
  /terms        → TermsPage         (public)
  /privacy      → PrivacyPage       (public)
```
- Stub all pages except LandingPage for now (simple `<div>Page name</div>`)
- Wrap in `<BrowserRouter>`
- Mount `ThemeProvider` (see Phase 3) at the root

---

## Phase 3 — Theme Provider

**Goal:** class-based dark mode that persists across page reloads.

#### `src/context/ThemeContext.tsx`
- Context: `{ theme: 'light' | 'dark', toggleTheme: () => void }`
- On mount: read `localStorage.getItem('theme')` or fallback to `'light'`
- Apply/remove class `dark` on `document.documentElement`
- Persist to `localStorage` on change

#### `src/app/components/ThemeToggle.tsx`
- Uses `useTheme()` hook
- Renders a single icon button: sun icon (light mode) / moon icon (dark mode)
- Uses `lucide-react` icons: `Sun`, `Moon`

---

## Phase 4 — Landing Page Sections

All sections live inside `src/pages/LandingPage.tsx`. Each section is a separate component in `src/pages/landing/`.

### 4.1 `LandingNavbar`

**File:** `src/pages/landing/LandingNavbar.tsx`

**Layout:** `sticky top-0 z-50`, full-width, `bg-page-bg/90 backdrop-blur`

**Content:**
- Left: logo mark (diamond `◆` character or SVG) + "Spendly" wordmark in `font-body font-semibold`
- Right:
  - `ThemeToggle` button (icon only)
  - "Sign in" → `<Link to="/login">`, ghost/text style
  - "Get started" → `<Link to="/register">`, filled-black pill button (`bg-[var(--btn-primary-bg)] text-[var(--btn-primary-fg)] px-5 py-2 rounded-full`)

**Responsive:** items stack on mobile (out of scope for this spec, desktop-first)

---

### 4.2 `HeroSection`

**File:** `src/pages/landing/HeroSection.tsx`

**Outer wrapper:** full-width with horizontal padding; contains a single large rounded card (`rounded-2xl bg-card-bg border border-border shadow-sm`) with internal two-column grid.

**Left column:**
- Badge pill: `PERSONAL FINANCE TRACKER` — small uppercase text, `border border-border rounded-full px-3 py-1 text-xs font-medium text-text-muted`
- Headline block:
  - Line 1: `"Know where your"` — `font-display font-bold text-5xl text-text-primary`
  - Line 2: `"money goes"` — same size, `font-display font-bold italic text-brand-green`
- Body copy: `"Log expenses, understand your spending patterns, and take control of your financial life — one transaction at a time."` — `text-text-muted text-base leading-relaxed max-w-sm`
- CTA row:
  - Primary: `"Start tracking free"` → `<Link to="/register">` — filled-black rounded button
  - Secondary: `"Sign in"` → `<Link to="/login">` — outlined/ghost button (`border border-border bg-transparent rounded-lg px-5 py-2`)

**Right column — `ExpenseSummaryCard`:**

Sub-component `src/pages/landing/ExpenseSummaryCard.tsx`:
- White card (`bg-white dark:bg-card-bg rounded-xl border border-border shadow-md p-6`)
- Header row: `"MARCH 2026"` label (small muted uppercase) + `"₹12,450"` amount (large bold, right-aligned)
- Category rows (static data, 4 rows):
  | Category | Bar color | Amount |
  |---|---|---|
  | Bills | `#2ca85a` (green) | ₹4,500 |
  | Food | `#e8a020` (amber/orange) | ₹3,200 |
  | Health | `#6b8fd4` (blue-gray) | ₹2,050 |
  | Transport | `#9b7ec8` (purple) | ₹1,800 |
- Each row: label (`text-sm text-text-muted w-20`), progress bar (`flex-1 h-1.5 rounded-full bg-border overflow-hidden` with inner div width proportional to amount), amount (`text-sm text-text-primary text-right w-16`)
- The widths of the bars are computed as `(amount / 12450) * 100`%

---

### 4.3 `StatsBand` *(partially visible in reference)*

**File:** `src/pages/landing/StatsBand.tsx`

Three stat boxes laid out in a centered row. The reference image shows these below the hero card but cropped. Use plausible numbers:

| Stat | Value |
|---|---|
| Users tracking | `2,400+` |
| Expenses logged | `48,000+` |
| Categories supported | `7` |

Each stat: centered column, large bold number (`text-4xl font-bold text-text-primary`), small muted label below. No card background — plain page-bg.

---

### 4.4 `FeaturesSection`

**File:** `src/pages/landing/FeaturesSection.tsx`

**Background:** `bg-section-alt` (warm beige)
**Layout:** centered container, 3-column grid (`grid grid-cols-3 gap-6`)

**Three `FeatureCard` items:**

| Icon (lucide) | Title | Body |
|---|---|---|
| `IndianRupee` | Log expenses instantly | Add any expense in seconds. Category, amount, date, description — all in one simple form. |
| `Target` | Understand your patterns | See exactly where your money goes with category breakdowns and monthly summaries. |
| `Clock` | Filter by time period | View your spending for any date range — last week, last month, or a custom period. |

Each `FeatureCard`:
- `bg-card-bg rounded-xl border border-border p-6`
- Icon in a small circle or plain, `text-text-muted mb-4`
- Title: `font-semibold text-text-primary text-base`
- Body: `text-text-muted text-sm leading-relaxed mt-2`

---

### 4.5 `CtaSection`

**File:** `src/pages/landing/CtaSection.tsx`

**Background:** `bg-page-bg` (same as main, provides visual separation via spacing)
**Layout:** centered column, generous vertical padding

**Content:**
- Heading: `"Ready to take control?"` — `font-display font-bold text-4xl text-text-primary`
- Subtitle: `"Join thousands of people who track their expenses with Spendly."` — `text-text-muted text-base mt-3`
- Button: `"Create free account"` → `<Link to="/register">` — filled-black rounded-full, same style as navbar CTA, `mt-8 px-8 py-3`

---

### 4.6 `LandingFooter`

**File:** `src/pages/landing/LandingFooter.tsx`

**Background:** `bg-footer-bg`
**Layout:** centered column, `py-12`

**Content (all centered):**
- Diamond logo icon: `◆` in `text-brand-green text-2xl` (or an SVG matching the navbar logo)
- Wordmark: `"Spendly"` — `text-white font-semibold text-lg mt-2`
- Tagline: `"Track every rupee. Own your finances."` — `text-white/50 text-sm mt-1`

---

### 4.7 `LandingPage` assembly

**File:** `src/pages/LandingPage.tsx`

Compose all sections in order:
```
<LandingNavbar />
<main>
  <HeroSection />
  <StatsBand />
  <FeaturesSection />
  <CtaSection />
</main>
<LandingFooter />
```

---

## Phase 5 — Dark Mode Polish

Once all sections render correctly in light mode:

1. Verify all colours reference CSS variables (not hard-coded Tailwind colour classes) so `.dark` overrides apply automatically
2. The `ExpenseSummaryCard` category bar colours are hard-coded accent colours — acceptable, they look fine on both dark and light backgrounds
3. The footer is always dark — no changes needed for dark mode
4. Test by clicking `ThemeToggle` in the navbar; verify:
   - Page background flips from `#f8f6f4` to `#111110`
   - Cards flip from `#ffffff` to `#1e1d1b`
   - Text colours invert correctly

---

## Phase 6 — Definition of Done Checklist

- [ ] `npm run dev` starts without errors
- [ ] Visiting `http://localhost:5173` shows the landing page
- [ ] Visual comparison against `spendly-landing-page.jpeg` at 1280px+ viewport:
  - [ ] Navbar: logo, Sign in, Get started all present and positioned correctly
  - [ ] Hero: two-column layout, serif headline, two-tone green italic, expense card with coloured bars
  - [ ] Stats band visible below hero
  - [ ] Features section on warm-beige background with 3 cards
  - [ ] CTA section centred with correct heading and button
  - [ ] Footer dark background, centred logo + tagline
- [ ] Dark mode toggle switches theme and persists on page reload
- [ ] No TypeScript errors (`npm run build` exits 0)
- [ ] `<Link to="/register">` and `<Link to="/login">` navigate without 404

---

## File Manifest (new files to create)

```
frontend/
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── vite.config.ts
└── src/
    ├── main.tsx
    ├── styles/
    │   ├── index.css
    │   ├── fonts.css
    │   ├── theme.css
    │   ├── tailwind.css
    │   └── globals.css
    ├── lib/
    │   ├── auth.ts
    │   └── axios.ts
    ├── context/
    │   └── ThemeContext.tsx
    ├── app/
    │   ├── App.tsx
    │   └── components/
    │       ├── GuestRoute.tsx
    │       ├── PrivateRoute.tsx
    │       └── ThemeToggle.tsx
    └── pages/
        ├── LandingPage.tsx
        ├── LoginPage.tsx          (stub)
        ├── RegisterPage.tsx       (stub)
        ├── DashboardPage.tsx      (stub)
        ├── ProfilePage.tsx        (stub)
        ├── TermsPage.tsx          (stub)
        ├── PrivacyPage.tsx        (stub)
        └── landing/
            ├── LandingNavbar.tsx
            ├── HeroSection.tsx
            ├── ExpenseSummaryCard.tsx
            ├── StatsBand.tsx
            ├── FeaturesSection.tsx
            ├── CtaSection.tsx
            └── LandingFooter.tsx
```
