# Umbrella Web App - Phase 1 PRD
## Landing Page & Privacy Policy (TestFlight Users Gateway)

**Version:** 1.0  
**Last Updated:** January 4, 2026  
**Status:** ACTIVE DEVELOPMENT  
**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4  

---

## Executive Summary

This PRD defines Phase 1 web deliverables for Umbrella, focusing on **external-facing landing page** and **legal compliance (privacy policy)** that serve as the gateway for iOS TestFlight beta users. This phase establishes brand presence, builds trust, and captures emails for the waiting list—preparing for Phase 2's full reading platform launch.

**Phase 1 Web Scope (Limited):**
- ✅ Landing page with TestFlight sign-up
- ✅ Privacy policy + Terms of Service
- ✅ Basic web infrastructure (hosting, SSL, analytics)
- ✅ Email capture + waiting list management
- ❌ Reading functionality (Phase 2)
- ❌ User management/authentication (Phase 2)
- ❌ Teacher/group tools (Phase 3)

**Phase 2+ Scope (Noted for Planning):**
- Phase 2 (Months 5-10): Full reading platform, proficiency tracking, dictionary
- Phase 3 (Months 11-16): Classroom management, teacher dashboard
- Phase 4 (Months 17-24): AI content generation, advanced personalization

---

## 1. Landing Page Requirements

### 1.1 Purpose & Goals

**Primary Goals:**
1. **Brand Credibility:** Establish Umbrella as legitimate, professional language learning tool
2. **TestFlight Conversion:** Guide iOS users to download beta app + enter waitlist
3. **Email Capture:** Build audience for future phases (marketing, feedback requests)
4. **SEO Foundation:** Rank for keywords: "Chinese reading app", "HSK learning", "learn Chinese online"
5. **Social Proof:** Display feature highlights, roadmap

**Success Metrics (Phase 1):**
- 1,000+ page visits
- 15-20% email capture rate (landing visitors → waitlist)
- 250+ email signups
- 98%+ uptime
- <2 sec page load time (Core Web Vitals: LCP, FCP, CLS all green)

### 1.2 Landing Page Sections (Top to Bottom)

#### Section 1: Hero / Navigation

**Header Navigation Bar**
- Fixed/sticky header, white background (light mode), dark on scroll
- Logo + "Umbrella" text (left side)
- Navigation links (center): "Features", "How It Works", "Roadmap"
- CTA Button (right): "Get Beta Access" (teal #208C85, 44px height)
- Mobile: hamburger menu (slide-out nav)

**Hero Section (Full Viewport)**
```
┌────────────────────────────────────────────┐
│                                            │
│   Read Authentic Chinese Texts.            │
│   Understand Every Word.                   │
│   Track Your Progress.                     │
│                                            │
│   Subtitle (smaller): Learn comprehensible │
│   reading at your proficiency level.       │
│                                            │
│   [Get TestFlight Access] [View Features]  │
│                                            │
│   (Background: subtle gradient teal →     │
│    off-white, or illustration of reading) │
│                                            │
└────────────────────────────────────────────┘
```

**Copy Guidance:**
- Headline: Benefit-focused, emotional (inspire); avoid jargon
- Subheading: Problem-solution format
- CTAs: Action-oriented ("Get Beta Access", "Join Waitlist")

**Mobile Responsiveness:**
- Hero text stacks (h1 smaller on mobile: 32px vs. 48px desktop)
- Full viewport on mobile (no scrolling to see CTA)
- Button spans full width on mobile (with padding)

---

#### Section 2: Why Umbrella (Problem + Solution)

**Layout: Problem → Solution Cards**

```
Problem Statement (above cards)
┌─────────────────┬─────────────────┬─────────────────┐
│ 📚 The Problem  │ The Gap          │ The Frustration │
├─────────────────┼─────────────────┼─────────────────┤
│ Most learning   │ Duolingo,       │ You're stuck:   │
│ apps are boring │ HelloChinese    │ vocabulary      │
│ & repetitive.   │ teach drilling, │ drills don't    │
│                 │ not reading.    │ build real       │
│                 │ You can't read  │ comprehension.   │
│                 │ authentic text. │                 │
└─────────────────┴─────────────────┴─────────────────┘

Our Solution (headline below)
┌─────────────────┬─────────────────┬─────────────────┐
│ ✓ Authentic     │ ✓ Your Level    │ ✓ Proficiency   │
│   Texts         │   Content       │   Tracking      │
├─────────────────┼─────────────────┼─────────────────┤
│ Read real       │ AI-powered      │ Watch your      │
│ stories, news,  │ difficulty      │ vocabulary grow │
│ essays—not      │ matching. No    │ week by week.   │
│ robot sentences.│ more too easy   │ Prove your      │
│                 │ or impossible.  │ progress.       │
└─────────────────┴─────────────────┴─────────────────┘
```

**Cards Design:**
- 3 cards on desktop, 1 column on mobile
- Card bg: var(--color-surface) with subtle border
- Icon (left): Feather Icons or Heroicons (20px, teal)
- Heading: H3, 16px, 600 weight
- Body: 14px, gray-500, 1.5 line-height
- Spacing: 24px between cards

---

#### Section 3: Key Features (Feature Cards with Illustrations)

**Headline:** "How Umbrella Works"

**Feature Carousel / Grid:**

```
┌────────────────────────────────────────────┐
│  Feature 1: Smart Dictionary               │
│  [Illustration: tap → popup definition]    │
│  Tap any word. See instant translation,    │
│  pronunciation, usage examples.            │
│                                            │
├────────────────────────────────────────────┤
│  Feature 2: Adaptive Difficulty            │
│  [Illustration: HSK 3 → 4 progression]     │
│  System learns your level. Recommends      │
│  content that's challenging but readable.  │
│                                            │
├────────────────────────────────────────────┤
│  Feature 3: Offline Reading                │
│  [Illustration: plane icon + book]         │
│  Download texts once. Read anywhere—       │
│  flights, subways, remote locations.       │
│                                            │
├────────────────────────────────────────────┤
│  Feature 4: Progress Tracking              │
│  [Illustration: chart going up]            │
│  See your vocabulary size grow. HSK levels │
│  unlocked. Real metrics of improvement.    │
│                                            │
└────────────────────────────────────────────┘
```

**Mobile:** Stack vertically; keep illustrations consistent aspect ratio
**Desktop:** 2x2 grid or carousel

---

#### Section 4: Roadmap / What's Coming

**Visual Timeline (Desktop) → Vertical (Mobile)**

```
Phase 1 (Now)        Phase 2 (Spring)      Phase 3 (Summer)    Phase 4 (Fall)
─────────────────    ──────────────────    ──────────────────  ──────────────
iOS TestFlight       Full Reading App      Classroom Tools     AI Content
Landing Page         Proficiency Engine    Teacher Dashboard   Smart Spaced Rep
Privacy Policy       Better Dictionary     Assignments         Advanced Analytics
```

**Messaging:** Transparent development; user expectations set

**Note:** "Phase 1" = Current (landing page + TestFlight prep)  
**Note:** Don't oversell future phases (features subject to change)

---

#### Section 5: CTA Section (Before Footer)

**Final Push Before Footer:**

```
┌─────────────────────────────────────────────┐
│  Ready to Read Better Chinese?              │
│  Join 500+ beta testers learning with       │
│  Umbrella.                                  │
│                                             │
│  [Get TestFlight Access]                    │
│  [Or join the waiting list]                 │
│                                             │
│  ✓ Free iOS beta                            │
│  ✓ Early access to web platform (Phase 2)   │
│  ✓ Direct feedback influence                │
│                                             │
└─────────────────────────────────────────────┘
```

---

#### Section 6: Footer

**Footer Layout (3-4 columns on desktop, collapse on mobile):**

```
Column 1: About          Column 2: Product        Column 3: Legal
────────────────────    ─────────────────────    ─────────────
• About Umbrella        • iOS App (TestFlight)   • Privacy Policy
• Blog (future)         • Web App (Roadmap)      • Terms of Service
• Contact              • Roadmap                 • Cookie Policy
• (Twitter icon)       • Support                 • Disclaimer

Column 4: Company
────────────────
• Made by [Team]
• © 2026 Umbrella
• Version 1.0.0
```

**Footer Notes:**
- Thin border top (var(--color-border))
- Gray background var(--color-surface)
- Links: gray-500, hover → primary teal
- Copyright: gray-400 (lighter)

---

### 1.3 Email Capture & Conversion Flows

#### Flow A: TestFlight Button (Primary)

```
User clicks [Get TestFlight Access]
    ↓
Modal/Popup opens:
"Download Umbrella iOS Beta"
    ↓
[Input: Email]
[Input: Apple ID (optional)]
[Checkbox: Agree to Privacy Policy]
    ↓
[Request Access]
    ↓
Success state:
"✓ Check your email for TestFlight link"
(+ offer to enter waiting list)
```

**Modal Design:**
- Overlay (dark 30% opacity) over landing page
- Centered modal, 400px width (mobile: full width - 32px padding)
- Close button (X icon, top-right)
- Heading: "Get Early Access"
- 2 input fields: email, Apple ID (both required, email validated)
- Checkbox + link to Privacy Policy (underline legal text)
- Button: "Request Access" (teal, 44px, full width)
- Error states: red text below invalid field

**Backend Logic:**
- Email validation: RFC 5322 (basic) + verification email sent
- De-duplication: check if email already exists in waitlist DB
- Success response: modal shows "Check your email" + countdown (24 hrs valid)
- Store: emails table with timestamp, Apple ID (optional), IP, referrer source

---

#### Flow B: Waiting List Signup (Secondary)

For users not ready for TestFlight:

```
User clicks [Or join the waiting list]
    ↓
Simpler form modal:
[Input: Email only]
[Checkbox: Interested in: iOS / Web / Teacher tools] (multi-select)
    ↓
[Join Waiting List]
    ↓
Success:
"✓ You're on the list! We'll email you updates."
(+ show estimated Phase 2 timeline)
```

---

### 1.4 Landing Page Technical Specifications

#### Performance Targets (Core Web Vitals)

| Metric | Target | Rationale |
|--------|--------|-----------|
| **LCP (Largest Contentful Paint)** | <2.5s | Hero image/text load |
| **FCP (First Contentful Paint)** | <1.5s | First paint visible |
| **CLS (Cumulative Layout Shift)** | <0.1 | No jump when modals open |
| **TTI (Time to Interactive)** | <3s | CTA buttons responsive |

**Optimization Strategies:**
- Next.js Image component (automatic optimization)
- Code splitting (lazy-load features section, testimonials)
- Minified CSS + inline critical styles (above-the-fold)
- Defer non-critical JavaScript (analytics, tracking)
- Preload web fonts (use system fonts as fallback)

#### SEO & Metadata

**Page Title:** "Umbrella - Read Authentic Chinese Texts at Your Level"

**Meta Description:** "Learn Chinese through reading. Adaptive difficulty, instant dictionary, offline access. Join beta testers on iOS."

**Open Graph (Social Sharing):**
- og:title: "Umbrella - Read Chinese Authentically"
- og:description: "Smart reading app with adaptive difficulty..."
- og:image: Logo + app screenshot (1200x630px)
- og:url: umbrella-app.com
- og:type: website

**Structured Data (JSON-LD):**
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Umbrella",
  "description": "Chinese reading app with proficiency-adaptive content",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "iOS",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/PreOrder"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "ratingCount": "50"
  }
}
```

**Keywords (For Meta, Not Visible):**
- Primary: "learn Chinese", "Chinese reading app", "HSK", "Chinese comprehension"
- Secondary: "Chinese learning", "Chinese vocabulary", "adaptive learning"
- Long-tail: "read authentic Chinese texts", "offline Chinese learning"

---

#### Mobile Optimization

**Viewport Meta Tag:**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
```

**Mobile-Specific:**
- Full-width buttons (44px min height for touch)
- Readable font sizes (16px minimum for form inputs)
- No horizontal scroll
- Touch-friendly spacing (12px+ padding in interactive elements)
- Test on actual devices: iPhone SE, 12, 14 Pro; iPad Air

---

#### Analytics & Tracking (Privacy-Respecting)

**Tracking Goals:**
- Where users click (button heatmap)
- Time on page + scroll depth
- Form drop-off points
- Traffic source (referrer)
- Device/browser info

**Tool & Privacy:**
- Use PostHog (self-hosted option for privacy) or Fathom Analytics (privacy-focused)
- No third-party cookies; comply with GDPR/CCPA
- Anonymize IP addresses (hash last octet)
- Respect Do-Not-Track headers
- Privacy policy discloses all tracking

**Events to Track:**
- Page load
- Button clicks: "Get TestFlight Access", "Learn More", etc.
- Form submission: success/error
- Modal open/close
- External link clicks (YouTube, Twitter)
- Scroll depth: 25%, 50%, 75%, 100%

---

### 1.5 Design System Integration

**Colors (Defined in Global CSS):**
```css
:root {
  --color-primary: #208C85 (teal, actions)
  --color-primary-hover: #1A7472
  --color-text: #134252 (dark slate)
  --color-text-secondary: #626C71 (gray)
  --color-background: #FCFCF9 (off-white)
  --color-surface: #FFFFFE (white)
  --color-border: #D5D5D1 (light gray)
  --color-success: #2BB669 (green)
  --color-error: #C0152F (red)
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #1F2121 (dark gray)
    --color-surface: #262828 (darker)
    --color-text: #F5F5F5 (off-white)
    --color-text-secondary: #A7A9A9 (light gray)
  }
}
```

**Typography:**
- H1: 48px, 600 weight, line-height 1.2
- H2: 32px, 600 weight
- H3: 24px, 600 weight
- Body: 16px, 400 weight, line-height 1.6
- Small: 14px, 400 weight

**Spacing:**
- Sections: 80px vertical padding (desktop), 40px mobile
- Card gap: 24px
- Component padding: 16px (button), 20px (card body)

**Components (Reusable):**
- `Button.tsx` (primary, secondary, outline)
- `Card.tsx` (feature cards, testimonials)
- `Modal.tsx` (email signup, forms)
- `Navigation.tsx` (header)
- `Footer.tsx`
- `Section.tsx` (layout wrapper, bg color, padding)

---

## 2. Privacy Policy Requirements

### 2.1 Privacy Policy Scope & Legal Requirements

**Jurisdictions to Consider:**
- **GDPR** (EU users) — strict consent + data rights
- **CCPA** (California) — disclosure + deletion rights
- **COPPA** (under 13 in US) — parental consent
- **China** — if users in mainland China

**Phase 1 Scope:**
- Email collection (landing page signup)
- Analytics (landing page traffic)
- TestFlight feedback (optional)

**Phase 2+ Extensions:**
- User account data (email, HSK level, reading history)
- Third-party integrations (OpenAI for AI content, LLM APIs)
- Cookies (session management, preferences)

### 2.2 Privacy Policy Outline

**Length:** ~2,500-3,000 words (comprehensive but scannable)

**Sections:**

```
1. Introduction
   - What we collect (brief overview)
   - Who we are (company info, contact)
   
2. Information We Collect
   2.1 Directly Provided (email, Apple ID, feedback)
   2.2 Automatically Collected (IP, device, analytics)
   2.3 Third-Party Sources (TestFlight analytics)
   
3. How We Use Your Information
   3.1 Email: TestFlight invitations, product updates, support
   3.2 Analytics: understand user behavior, improve product
   3.3 Aggregate data: not tied to individuals
   
4. Legal Basis for Processing (GDPR)
   - Consent (for email signup)
   - Legitimate interest (product improvement)
   - Contractual (TestFlight agreement)
   
5. Data Sharing & Third Parties
   5.1 Apple TestFlight (required for beta testing)
   5.2 Email service (Resend, SendGrid) - encrypted
   5.3 Analytics service (PostHog, Fathom)
   5.4 Cloud hosting (Railway, AWS) - encrypted at rest
   5.5 Legal obligations (law enforcement requests)
   
6. Data Retention
   - Emails: kept until unsubscribe (max 2 years)
   - Analytics: deleted after 90 days
   - TestFlight feedback: 1 year
   
7. Your Rights (GDPR + CCPA)
   7.1 Access your data
   7.2 Correct inaccurate data
   7.3 Delete data ("right to be forgotten")
   7.4 Data portability
   7.5 Opt-out of marketing emails
   7.6 Withdraw consent anytime
   
8. Data Security
   - TLS/HTTPS for all transmission
   - AES-256 encryption at rest
   - No passwords stored (OAuth where possible)
   - Annual security audit
   
9. Children's Privacy (COPPA)
   - If under 13 in US: parental consent required
   - Minimal data collection for minors
   
10. International Data Transfer
    - EU data → US: Standard Contractual Clauses (SCCs)
    - Data processing agreement with vendors
    
11. Contact Information
    - Email: privacy@umbrella-app.com
    - Mailing address (legal entity)
    - Response time: 30 days
    
12. Changes to Policy
    - Notify users 30 days before material changes
    - Option to opt-out if disagree
    
13. California Privacy Rights (CCPA)
    - Right to know
    - Right to delete
    - Right to opt-out of sale
    - Non-discrimination clause
    
14. Cookies & Tracking Technologies
    - What cookies we use
    - Essential vs. optional
    - How to manage cookies
    - Do-Not-Track header respect
```

---

### 2.3 Privacy Policy Copy (Full Draft)

**PRIVACY POLICY**

**Last Updated:** January 4, 2026  
**Effective Date:** January 10, 2026

---

#### 1. Introduction

Welcome to Umbrella ("**we**", "**us**", "**our**", or "**Company**"). Umbrella is a Chinese language learning platform built to help you read authentic Chinese texts at your proficiency level.

We take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and protect information when you visit our website (currently umbrella-app.com, the "**Site**"), use our iOS mobile application (currently available via TestFlight, the "**App**"), and interact with our services (collectively, the "**Services**").

**Please read this Privacy Policy carefully.** By accessing or using our Services, you acknowledge that you have read, understood, and agree to be bound by all the terms of this Privacy Policy. If you do not agree, please do not use our Services.

---

#### 2. Information We Collect

**2.1 Information You Provide Directly**

**Email Address**
- When you sign up for our TestFlight beta or join our waiting list, we require your email address
- When you contact us for support or provide feedback, we collect the email, subject, and message content

**Apple ID (Optional)**
- If you choose to provide your Apple ID when requesting TestFlight access, we store it to facilitate beta testing invitations
- Your Apple ID is not shared with anyone except Apple Inc. for TestFlight administration

**Account Information (Phase 2+)**
- Once we launch our full platform, we will collect: proficiency level (HSK 1-6), preferred topics, reading goals
- You control what information you add to your profile

**Communication Preferences**
- Checkbox selections for email frequency: product updates, weekly digests, support messages, etc.

**Feedback & Surveys**
- If you voluntarily provide feedback through surveys, TestFlight feedback forms, or support messages
- This helps us improve the product and may be used in testimonials (with your permission)

---

**2.2 Information Automatically Collected**

**Website Analytics**
- **IP Address (Anonymized):** Last octet hashed; used to understand traffic geography
- **Device & Browser:** Device type (iPhone, iPad, desktop), OS, browser name/version
- **Page Views & Navigation:** Which landing page sections you viewed, how long you spent on each
- **Referrer:** What link/source brought you to our site
- **Events:** Button clicks, form submissions, modal opens
- **Scroll Depth:** How far down the page you scrolled (25%, 50%, 75%, 100%)
- **Session Duration:** Time on site
- **Error Logs:** JavaScript errors (to diagnose bugs)

**Technology Collected Via:**
- Analytics service (PostHog or Fathom Analytics)
- Google Analytics (optional, user can opt-out)

---

**2.3 Information from Third Parties**

**Apple TestFlight**
- Apple provides limited analytics: number of downloads, crash logs, user reviews
- We do not have access to your full Apple ID data; Apple shares only TestFlight-relevant information

**Email Service Providers**
- Resend, SendGrid: track email opens, click-through rates
- Used to understand which announcements are valuable

---

#### 3. How We Use Your Information

**To Provide Services:**
- Email delivery of TestFlight invitations
- Customer support responses
- Beta testing administration

**To Communicate:**
- Product updates and feature announcements
- Invitations to beta phases (Phase 2, 3, 4)
- Surveys asking for feedback
- Event announcements (webinars, community calls)

**To Improve Services:**
- Analyze user behavior patterns (which features are clicked, drop-off points)
- Identify technical issues (via error logs)
- A/B test landing page design
- Measure conversion rates (emails → TestFlight downloads)
- Inform product roadmap (which features users are interested in)

**For Research & Analytics:**
- Aggregate usage statistics (not tied to individuals)
- Understand how users discover us (referrer source)
- Benchmark: what % of visitors sign up vs. abandon

**Legal & Compliance:**
- Enforce our Terms of Service
- Respond to legal requests (law enforcement, courts)
- Detect fraud or abuse

**For Marketing (With Consent):**
- Send you promotional emails (only if you opted in)
- Feature your testimonial (with written permission)

---

#### 4. Legal Basis for Processing (GDPR)

We collect and process information under the following legal bases (applicable if you are in EU):

| Data | Basis | Details |
|------|-------|---------|
| Email | Consent | You willingly provide at signup |
| Analytics | Legitimate Interest | Understanding product usage improves our services |
| TestFlight Admin | Contractual | Necessary to deliver beta testing service |
| Support Messages | Consent | You contact us; we respond |

---

#### 5. Data Sharing & Third Parties

**We do NOT sell your data.** We do share limited information with service providers:

| Service | What We Share | Why | Protection |
|---------|---------------|-----|-----------|
| Apple TestFlight | Email, Apple ID | Beta distribution | Apple's privacy controls |
| Email Provider (Resend) | Email address | Sending invitations | TLS encryption, DPA signed |
| Analytics (PostHog) | IP (anonymized), page views, events | Usage insights | Anonymized; self-hosted option |
| Cloud Hosting (Railway) | Database backups, code | Infrastructure | AES-256 encryption at rest, TLS in transit |
| Monitoring (Sentry) | Error logs, session info | Bug detection | PII scrubbing before transmission |

**Data Processing Agreements (DPA):** We have signed Data Processing Agreements with all vendors ensuring they comply with GDPR Article 28.

**Government Requests:** If we receive a legal request (subpoena, warrant) for your data, we will:
1. Notify you (unless legally prohibited)
2. Disclose only the minimum required
3. Request the narrowest scope possible
4. Preserve your rights under applicable law

---

#### 6. Data Retention

| Data Type | Retention Period | Reason for Deletion |
|-----------|------------------|-------------------|
| Email (signup) | Until unsubscribe or 2 years | Regulatory compliance; prevent list decay |
| Apple ID | Until TestFlight access revoked | TestFlight no longer needed |
| Analytics | 90 days | Privacy protection; sufficient for analysis |
| TestFlight Feedback | 1 year | Product improvement timeline |
| Support Messages | 1 year | Support continuity; reference for future issues |
| Error Logs | 30 days | Sufficient for debugging; privacy protection |
| Website Access Logs | 7 days | Security investigation window |

**Exception:** If required by law (e.g., tax audits, legal hold), we may retain data longer.

---

#### 7. Your Privacy Rights

**If you are in the European Union (GDPR):**

✓ **Right to Access:** Request a copy of all data we hold about you  
✓ **Right to Correction:** Ask us to fix inaccurate information  
✓ **Right to Erasure:** Request deletion of your data ("right to be forgotten")  
✓ **Right to Restrict Processing:** Limit how we use your data  
✓ **Right to Data Portability:** Download your data in standard format (CSV, JSON)  
✓ **Right to Object:** Opt-out of marketing emails, analytics, profiling  
✓ **Right to Withdraw Consent:** Withdraw consent for communications anytime  
✓ **Right to Lodge a Complaint:** File a complaint with your national data protection authority (DPA)

**If you are in California (CCPA):**

✓ **Right to Know:** Learn what personal information we collect, use, share  
✓ **Right to Delete:** Request deletion (with some exceptions)  
✓ **Right to Opt-Out:** Opt-out of any "sale" of personal information (we don't sell, but you have the right)  
✓ **Right to Non-Discrimination:** We will not discriminate if you exercise these rights  
✓ **Right to Correct:** Request correction of inaccurate data  

**If you are in Canada or UK, similar rights apply under PIPEDA and UK-GDPR.**

---

**How to Exercise Your Rights:**

Email privacy@umbrella-app.com with:
- Your full name
- Email address
- Specific request (access, correction, deletion, etc.)
- Proof of identity (we'll confirm your email)

**Response Timeline:** We aim to respond within 30 days. If complex, we may request 2 additional months (60 days total).

---

#### 8. Data Security

**How We Protect Your Data:**

- **Transmission:** TLS/HTTPS encryption (256-bit, AES)
- **Storage:** AES-256 encryption at rest for sensitive data
- **Passwords:** Bcrypt hashing (never stored in plain text)
- **Access Control:** Role-based access; employees only access data they need
- **Backups:** Encrypted, stored redundantly
- **Monitoring:** Automated intrusion detection; real-time alerts on suspicious activity
- **Penetration Testing:** Annual third-party security audits

**What We Don't Do:**
- Store payment card information (no PCI-DSS scope)
- Use unencrypted HTTP
- Share data with unvetted vendors
- Store plain-text passwords

---

#### 9. Children's Privacy (COPPA - US, Under 13)

Our Services are intended for ages 13+. We do not knowingly collect information from children under 13 in the US.

**If you are a minor (13-17) in the US:**
- We recommend reviewing this policy with your parent/guardian
- You have the same privacy rights as adults (see Section 7)
- You can request deletion of your account anytime

**If you are under 13 and our service becomes available to you:**
- Parent/guardian consent required
- We collect minimal data
- Parent can delete child's account anytime

---

#### 10. International Data Transfers

**If you are in Europe and we transfer data to the US:**
- We rely on **Standard Contractual Clauses (SCCs)** as approved by the European Commission
- Data Processing Agreements include data protection safeguards
- You have rights to request details of the transfer mechanism

---

#### 11. Contact Information

**Privacy Questions or Requests:**

Email: privacy@umbrella-app.com

Mailing Address:  
Umbrella Language Learning  
[Company Legal Address]  
[Country]

We'll respond within 30 days.

**Data Protection Officer (EU):**
If you have questions about GDPR, contact our DPA representative via privacy@umbrella-app.com.

---

#### 12. Updates to This Policy

We may update this Privacy Policy as our Services evolve. We will:
- Notify you of material changes via email (30 days notice)
- Post the updated policy with a new "Last Updated" date
- Allow you to review changes and opt-out if you disagree

Your continued use of our Services after updates means you accept the new policy.

---

#### 13. California Consumer Privacy Rights (CCPA Summary)

**In the Last 12 Months, We Have Collected:**
- Category A: Email, name, contact info
- Category B: Device type, IP address, website activity
- Category G: Feedback, testimonials (if you provide)

**Sources:** Directly from you, automatically via analytics

**Purposes:** Service delivery, product improvement, communications

**Sharing:** Only with essential vendors (Apple, email, hosting)

**Your Rights:** Access, delete, opt-out, non-discrimination (see Section 7)

---

#### 14. Cookies & Tracking Technologies

**What Cookies We Use:**

| Cookie | Type | Purpose | Duration |
|--------|------|---------|----------|
| session_id | Essential | Maintain login state (Phase 2+) | Session |
| analytics_opt_in | Optional | Remember your analytics preference | 1 year |
| dark_mode | Preference | Remember dark mode choice | 1 year |
| utm_source, utm_campaign | Analytics | Track referral source | Session |

**Third-Party Cookies:**
- Google Analytics (if enabled): tracks cross-site behavior
- Hotjar (if enabled): records session videos (opt-in)

**Managing Cookies:**
- Decline optional cookies when you first visit
- Adjust in browser settings (Settings → Privacy → Cookies)
- Some cookies are required for basic functionality

**Do-Not-Track (DNT):**
If you enable DNT in your browser, we disable non-essential analytics.

---

#### 15. Accessibility

This Privacy Policy is available in plain language. If you need it in another format (large print, audio, etc.), email privacy@umbrella-app.com.

---

#### 16. Questions or Concerns?

If you have concerns about our privacy practices or how we've handled your data, please contact:

**Privacy Team**  
privacy@umbrella-app.com

Or file a complaint with your local data protection authority:
- **EU:** Your country's National Data Protection Authority (DPA)
- **US:** California Attorney General (CCPA complaints)
- **UK:** Information Commissioner's Office (ICO)

---

**End of Privacy Policy**

---

### 2.4 Terms of Service (Companion Document)

**Scope:** Separate from Privacy Policy; covers usage rules, liability limitations, intellectual property

**Key Sections:**
1. Acceptance of Terms
2. License & Restrictions (can't scrape content, reverse-engineer)
3. Disclaimer of Warranties (provided "as-is")
4. Limitation of Liability (we're not liable for indirect damages)
5. Termination (we can suspend your account for violations)
6. Intellectual Property (Umbrella owns app, not your data)
7. Dispute Resolution (arbitration clause)
8. Governing Law (jurisdiction)

**Length:** ~1,500 words

**Not Included in This PRD:** Full draft; outline provided for implementation

---

## 3. Technical Implementation

### 3.1 Technology Stack

**Frontend (Already in package.json):**
- Next.js 16.1.1
- React 19.2.3
- React DOM 19.2.3
- TypeScript 5 (via @types packages)
- Tailwind CSS 4 (via @tailwindcss/postcss)

**Backend (Not in Scope for Phase 1, but noted for Phase 2):**
- Python 3.11 + FastAPI (mentioned in full PRD)
- PostgreSQL (database)

**Hosting & Services:**
- Railway (recommended; simple deployment)
- Vercel (alternative for Next.js)
- Custom VPS (Digital Ocean, AWS)

**Email Service:**
- Resend (recommended; simple API, good deliverability)
- SendGrid (alternative)
- Mailgun (alternative)

**Analytics:**
- PostHog (self-hosted or cloud; privacy-friendly)
- Fathom Analytics (privacy-focused, simple)
- Google Analytics 4 (industry standard, requires opt-in)

---

### 3.2 Project Structure

```
umbrella-web/
├── app/
│   ├── page.tsx               # Landing page
│   ├── privacy/
│   │   └── page.tsx           # Privacy policy page
│   ├── layout.tsx             # Root layout
│   └── globals.css            # Global styles (Tailwind)
├── components/
│   ├── Navigation.tsx         # Header navbar
│   ├── Hero.tsx               # Hero section
│   ├── Features.tsx           # Feature cards
│   ├── Testimonials.tsx       # Testimonial section
│   ├── Roadmap.tsx            # Roadmap timeline
│   ├── CTA.tsx                # Call-to-action section
│   ├── Footer.tsx             # Footer
│   ├── EmailSignupModal.tsx   # Popup form
│   ├── Button.tsx             # Reusable button
│   ├── Card.tsx               # Reusable card
│   └── Section.tsx            # Layout wrapper
├── lib/
│   ├── api.ts                 # API client (Phase 2+)
│   ├── analytics.ts           # Analytics wrapper
│   └── constants.ts           # Copy, config
├── public/
│   ├── images/
│   │   ├── hero.png           # Hero illustration
│   │   ├── feature-*.png      # Feature icons
│   │   └── testimonial-*.png  # Avatar images
│   ├── fonts/                 # Web fonts (if custom)
│   └── robots.txt
├── .env.local                 # Environment variables (not in git)
├── .env.example               # Example env file
├── tailwind.config.js         # Tailwind config (design tokens)
├── next.config.js             # Next.js config
├── tsconfig.json              # TypeScript config
├── package.json               # Dependencies
└── README.md                  # Project documentation
```

---

### 3.3 File-by-File Implementation Notes

#### `app/page.tsx` (Landing Page Entry Point)

```typescript
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Testimonials from '@/components/Testimonials'
import Roadmap from '@/components/Roadmap'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Umbrella - Read Authentic Chinese Texts',
  description: 'Learn Chinese through adaptive reading...',
  // OpenGraph, etc.
}

export default function Home() {
  return (
    <>
      <Navigation />
      <Hero />
      <Features />
      <Testimonials />
      <Roadmap />
      <CTA />
      <Footer />
    </>
  )
}
```

---

#### `app/privacy/page.tsx` (Privacy Policy Page)

```typescript
export const metadata = {
  title: 'Privacy Policy - Umbrella',
  robots: 'index, follow',
}

export default function PrivacyPolicy() {
  return (
    <>
      <Navigation />
      <main className="max-w-3xl mx-auto px-4 py-16 prose prose-invert">
        <h1>Privacy Policy</h1>
        <p>Last Updated: {new Date().toLocaleDateString()}</p>
        {/* Content as sections/components or markdown */}
      </main>
      <Footer />
    </>
  )
}
```

---

#### `components/Hero.tsx`

```typescript
import Button from '@/components/Button'
import { useState } from 'react'
import EmailSignupModal from '@/components/EmailSignupModal'

export default function Hero() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-teal-50 to-slate-100 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
          Read Authentic Chinese Texts.
          <br />
          Understand Every Word.
          <br />
          Track Your Progress.
        </h1>
        <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
          Learn comprehensible reading at your proficiency level. Discover texts that challenge but don't frustrate.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button 
            onClick={() => setModalOpen(true)}
            variant="primary"
          >
            Get TestFlight Access
          </Button>
          <Button variant="secondary">
            View Features
          </Button>
        </div>
      </div>
      {modalOpen && <EmailSignupModal onClose={() => setModalOpen(false)} />}
    </section>
  )
}
```

---

#### `components/EmailSignupModal.tsx`

```typescript
import { useState } from 'react'
import Button from '@/components/Button'

interface EmailSignupModalProps {
  onClose: () => void
}

export default function EmailSignupModal({ onClose }: EmailSignupModalProps) {
  const [email, setEmail] = useState('')
  const [appleId, setAppleId] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, appleId, source: 'testflight' }),
      })

      if (!res.ok) throw new Error('Submission failed')

      setStatus('success')
      setEmail('')
      setAppleId('')
      // Show success message
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <div 
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-slate-900 mb-2">Get Early Access</h2>
        <p className="text-slate-600 mb-6">Join the iOS beta. Limited spots available.</p>

        {status === 'success' ? (
          <div className="text-center">
            <p className="text-green-600 font-medium mb-4">
              ✓ Check your email for the TestFlight link!
            </p>
            <p className="text-sm text-slate-600">
              (Link is valid for 24 hours)
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input
              type="text"
              placeholder="Apple ID (optional)"
              value={appleId}
              onChange={(e) => setAppleId(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                required
                className="w-4 h-4"
              />
              <span className="text-sm text-slate-600">
                I agree to the{' '}
                <a href="/privacy" className="text-teal-600 hover:underline">
                  Privacy Policy
                </a>
              </span>
            </label>
            <Button
              type="submit"
              variant="primary"
              disabled={!agreed || !email || status === 'loading'}
              className="w-full"
            >
              {status === 'loading' ? 'Requesting...' : 'Request Access'}
            </Button>
            {status === 'error' && (
              <p className="text-red-600 text-sm">Something went wrong. Try again.</p>
            )}
          </form>
        )}
      </div>
    </div>
  )
}
```

---

### 3.4 API Endpoints (Phase 1)

Only one API endpoint needed for Phase 1:

```
POST /api/waitlist
├─ Request Body: { email, appleId?, source }
├─ Response (Success): { status: 'success', message: 'Check your email' }
├─ Response (Duplicate): { status: 'error', message: 'Email already registered' }
└─ Response (Error): { status: 'error', message: 'Server error' }
```

**Backend Logic (Pseudo-code):**
```python
@app.post("/api/waitlist")
async def add_to_waitlist(email: str, apple_id: Optional[str] = None):
    # Validate email format
    if not validate_email(email):
        return {"status": "error", "message": "Invalid email"}
    
    # Check if already exists
    if db.select_where("waitlist", {"email": email}):
        return {"status": "error", "message": "Email already registered"}
    
    # Insert into database
    db.insert("waitlist", {
        "email": email,
        "apple_id": apple_id,
        "signup_date": datetime.now(),
        "referrer": request.headers.get("referer")
    })
    
    # Send confirmation email
    await email_service.send_testflight_email(email)
    
    return {"status": "success", "message": "Check your email"}
```

---

### 3.5 Environment Variables (.env.local)

```bash
# Analytics
NEXT_PUBLIC_ANALYTICS_KEY=your-posthog-key
NEXT_PUBLIC_ENVIRONMENT=production

# Email Service
RESEND_API_KEY=re_xxxxx

# Backend (Phase 2+)
NEXT_PUBLIC_API_URL=https://api.umbrella-app.com

# Sentry (Error Tracking)
NEXT_PUBLIC_SENTRY_DSN=https://...
```

---

### 3.6 Build & Deployment

#### Local Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Linting
npm run lint
```

#### Deployment (Railway Recommended)

1. Push code to GitHub
2. Connect repo to Railway
3. Set environment variables in Railway dashboard
4. Deploy (auto-deploys on push)
5. Custom domain: umbrella-app.com

#### Performance Checklist

- [ ] Run `npm run build` and check bundle size
- [ ] Test on Lighthouse (target: >90 all scores)
- [ ] Verify Core Web Vitals: LCP <2.5s, FCP <1.5s, CLS <0.1
- [ ] Test on mobile devices (iPhone, Android)
- [ ] Check analytics events firing correctly
- [ ] Verify email signup works end-to-end
- [ ] Test privacy policy page loads fast

---

## 4. Content Guidelines

### 4.1 Copy Tone & Voice

**Brand Voice:**
- **Professional but Warm:** We're educators, not corporate robots
- **Empathetic:** Acknowledge frustration of traditional language learning
- **Clear & Simple:** Avoid jargon; explain concepts simply
- **Motivational:** Inspire learners; show them success is possible

**Examples:**

❌ Bad: "Leverage our AI-powered proficiency detection engine to optimize your Chinese language acquisition trajectory."

✅ Good: "Our app learns your level and shows you texts you can actually understand—no more guessing."

❌ Bad: "Synergistic vocabulary retention with spaced repetition algorithms."

✅ Good: "Read smarter, remember longer. We remind you of words you're struggling with, exactly when you need the help."

---

### 4.2 Key Messaging Pillars

**Pillar 1: Reading Changes Everything**
- Message: "Fluency comes from reading, not drilling."
- Support: Most language apps teach vocabulary isolation; real learning happens through context

**Pillar 2: Your Level, Your Pace**
- Message: "Content that meets you where you are."
- Support: No more "too easy" or "impossible"—our system adapts

**Pillar 3: Authentic & Engaging**
- Message: "Real texts, not robot sentences."
- Support: Stories, news, essays—content you actually want to read

**Pillar 4: Track Real Progress**
- Message: "See yourself grow every week."
- Support: Vocabulary size, HSK levels, reading speed—metrics that matter

---

### 4.3 Landing Page Copy (Full Draft)

**Section 1: Hero**

```
Main Headline:
"Read Authentic Chinese Texts.
Understand Every Word.
Track Your Progress."

Subheading:
"Learn to read Chinese the way you learn to read English—through stories, 
articles, and ideas that fascinate you. Not through endless vocabulary drills."

CTA Button:
"Get TestFlight Access"

Secondary CTA:
"How It Works" (scroll to features)
```

---

**Section 2: Problem/Solution**

```
Section Heading:
"The Problem With Language Learning Today"

Problem 1 - Headline:
"Duolingo teaches vocab. It doesn't teach reading."

Problem 1 - Copy:
"Vocabulary drilling is efficient, but it's not enough. Most apps teach you words 
in isolation. Real fluency comes from reading authentic texts and understanding 
them in context. That's what separates intermediate learners from fluent readers."

[Repeat for Problem 2 & 3...]

Section Heading (below problems):
"Umbrella Does Reading Differently"

Solution 1 - Headline:
"Content That Matches Your Level"

Solution 1 - Copy:
"Ever felt both 'too easy' and 'impossibly hard' at the same time? Umbrella learns 
your proficiency level by analyzing the words you know. Then it shows you texts 
you can read—texts that challenge but don't frustrate. The Goldilocks zone of 
language learning."

[Repeat for Solution 2 & 3...]
```

---

**Section 3: Features**

```
Feature 1 - Headline:
"Smart Dictionary at Your Fingertips"

Feature 1 - Copy:
"Tap any word. See instant definitions, pinyin, usage examples, and hear 
pronunciation from native speakers. No more looking up words in a separate app."

Feature 2 - Headline:
"Track Your Vocabulary Growth"

Feature 2 - Copy:
"See your vocabulary size climb each week. Understand your proficiency level 
(HSK 3? HSK 4?) and watch as you unlock harder texts. Progress you can measure."

Feature 3 - Headline:
"Offline Reading, Anytime"

Feature 3 - Copy:
"Download texts before your flight, commute, or trip. Read offline. Marked words 
sync when you reconnect. Learning never stops, even without internet."

Feature 4 - Headline:
"Real Stories, Real Chinese"

Feature 4 - Copy:
"Read contemporary Chinese news, classic tales, business articles, and personal 
essays. Learn vocabulary in context. Understand the culture. Not robot-generated 
sentences—real human writing."
```

---

**Section 4: Roadmap**

```
Section Heading:
"Building Umbrella With You"

Subheading:
"We're launching in phases. Here's what's coming:"

Timeline:
Phase 1 (Now)
- iOS TestFlight beta
- Landing page
- Join waiting list

Phase 2 (Spring 2026)
- Full reading app (Web + iOS)
- Proficiency engine
- Offline reading

Phase 3 (Summer 2026)
- Teacher tools
- Classroom management
- Student progress tracking

Phase 4 (Fall 2026)
- AI-generated texts (personalized)
- Advanced analytics
- Premium features

Tagline:
"We're excited to build Umbrella with our community. Your feedback shapes 
every feature. Let's learn to read Chinese together."
```

---

**Section 5: Final CTA**

```
Heading:
"Ready to Learn Better?"

Subheading:
"Join 500+ beta testers. Get free access. Shape the future of language learning."

CTA Buttons:
[Get TestFlight Access] [Or Join Waiting List]

Trust Signals:
✓ Free iOS beta
✓ Early access to web app (Phase 2)
✓ Your feedback directly influences product roadmap
✓ Become part of a community learning together
```

---

**Footer Copy**

```
Left Column (About):
Umbrella is building the reading app language learners have been waiting for. 
We believe fluency comes from reading authentic content you care about.

[Social Icons] Twitter | LinkedIn | Discord

Middle Column (Product):
- iOS App (TestFlight)
- Web App (Coming Spring 2026)
- Roadmap
- Blog (Coming)
- Support

Right Column (Legal):
- Privacy Policy
- Terms of Service
- Contact: hello@umbrella-app.com

Bottom:
© 2026 Umbrella Language Learning. Made with ❤️ for language learners.
Version 1.0 | Last Updated Jan 2026
```

---

## 5. Success Metrics & Phase Gate

### 5.1 Launch Metrics (Week 1)

| Metric | Target | Status |
|--------|--------|--------|
| Uptime | 99%+ | KPI |
| Page Load Time (LCP) | <2.5s | KPI |
| Page Load Time (FCP) | <1.5s | KPI |
| Mobile Traffic | 60%+ | Monitor |
| Bounce Rate | <30% | Target |
| Email Signups | 50+ | Stretch |
| TestFlight Conversions | 20+ | Stretch |

### 5.2 Phase 1→2 Gate Criteria

**Must-Have (All Required):**
- ✅ Landing page deployed and <2% downtime
- ✅ Privacy policy approved by legal
- ✅ 250+ emails collected (waitlist + TestFlight)
- ✅ Email delivery 95%+ success rate
- ✅ Core Web Vitals: all green (LCP, FCP, CLS)
- ✅ Mobile responsive tested on real devices
- ✅ Analytics tracking validated

**Should-Have (2/3 Required):**
- ✅ 500+ page visits in first month
- ✅ 15%+ email capture rate
- ✅ Press mention or influencer share

**Nice-to-Have:**
- ✅ 1,000+ page visits
- ✅ Early testimonials from TestFlight testers
- ✅ Community (Discord/Slack) with 50+ members

**Go/No-Go:** Requires PM + Engineering sign-off on all Must-Haves + 2 Should-Haves

---

## 6. Launch Checklist

### 2 Weeks Before Launch

- [ ] Design system finalized (Figma)
- [ ] All copy reviewed by native English speaker
- [ ] Privacy policy reviewed by legal counsel
- [ ] SEO metadata reviewed (title, description, keywords)
- [ ] SSL certificate obtained + configured
- [ ] Domain DNS setup verified
- [ ] Email service (Resend) account configured
- [ ] Analytics (PostHog/Fathom) account setup
- [ ] GitHub repo created, structure finalized
- [ ] Environment variables documented (.env.example)

### 1 Week Before Launch

- [ ] All components built + tested in isolation
- [ ] Landing page fully assembled in Next.js
- [ ] Privacy policy page formatted and accessible
- [ ] Email signup flow tested end-to-end
- [ ] Mobile testing on real iPhone (SE, 12, 14 Pro)
- [ ] Tablet testing on iPad
- [ ] Desktop browser testing (Chrome, Safari, Firefox)
- [ ] Lighthouse audit run (target: >90 all sections)
- [ ] Accessibility audit (Axe DevTools)
- [ ] Load test (simulate 100 concurrent visitors)
- [ ] Database backup testing
- [ ] Rollback plan documented

### Launch Day

- [ ] Deploy to production in low-traffic window (midnight UTC)
- [ ] Smoke tests: homepage loads, email signup works, analytics fires
- [ ] Monitor error logs and performance dashboards
- [ ] Announce on Twitter, Product Hunt (if launching publicly)
- [ ] Send TestFlight invites to early supporters
- [ ] Team on-call for first 24 hours

### Week 1 Post-Launch

- [ ] Monitor daily: uptime, page load times, email delivery
- [ ] Respond to early user feedback
- [ ] Fix any critical bugs within 2 hours
- [ ] Analyze: traffic source, bounce rate, conversion rate
- [ ] Daily standup (15 min) on metrics

---

## 7. Phase 2 Transition Notes

**What Developers Should Prepare For Phase 2:**

1. **Backend API Setup:** Python FastAPI, PostgreSQL, async endpoints
2. **Authentication:** Email/password + OAuth (Apple, WeChat)
3. **Reading Experience Component:** Text display, annotation, dictionary integration
4. **Proficiency Engine:** Algorithm for HSK level detection
5. **iOS App SwiftUI Prep:** Start architectural design, Core Data schema
6. **Content Management:** Text upload, storage, search indexing

**Database Schema (Design in Phase 1, Build in Phase 2):**
- Users table
- Texts table
- UserTextProgress table
- MarkedWords table
- Vocabulary dictionary table

**Integration Planning:**
- TestFlight beta → full iOS app
- Landing page → web platform (next.js api routes)
- Waiting list emails → Phase 2 onboarding

---

## 8. Appendices

### Appendix A: Design Tokens (Tailwind Config)

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    colors: {
      primary: '#208C85',
      'primary-hover': '#1A7472',
      text: '#134252',
      'text-secondary': '#626C71',
      background: '#FCFCF9',
      surface: '#FFFFFE',
      border: '#D5D5D1',
      success: '#2BB669',
      error: '#C0152F',
      slate: {
        50: '#F8FAFC',
        100: '#F1F5F9',
        // ...
      },
      teal: {
        500: '#208C85',
        600: '#1A7472',
        // ...
      },
    },
    extend: {
      spacing: {
        section: '80px', // 40px on mobile
      },
    },
  },
}
```

---

### Appendix B: Lighthouse Scoring Target

**Target Scores:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 100

**Performance Optimization:**
- Image optimization (WebP, lazy-loading)
- Code splitting (route-based)
- CSS purging (Tailwind)
- Minification (Next.js auto)
- Caching headers (static assets 1 year, dynamic 1 hour)

---

### Appendix C: Launch Announcement Template

```
Title: Introducing Umbrella — Read Chinese Authentically

Subtitle: A new app helping learners read real Chinese texts at their level.

Body:
We're excited to announce Umbrella, an iOS app for reading authentic Chinese texts. 
Whether you're learning through conversations, news, or classic stories—Umbrella 
matches you with content you'll actually understand.

What makes Umbrella different:
✓ Smart dictionary (tap any word)
✓ Adaptive difficulty (content grows with you)
✓ Offline reading (learn anywhere)
✓ Progress tracking (see your vocabulary grow)

We're launching a closed beta on iOS via TestFlight. [Join the waitlist](link).

Early adopters will directly shape the future of the app. We're building this 
with our community.

Coming this spring: web app for reading, proficiency tracking, and more.

[Get TestFlight Access] [View Our Roadmap]

---
Umbrella Language Learning
helping you read Chinese fluently
```

---

**Document Status:** READY FOR IMPLEMENTATION  
**Next Phase:** Phase 2 (Months 5-10) - Full Reading Platform  
**Maintained By:** Product Team  
**Last Updated:** January 4, 2026

