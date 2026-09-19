# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Chinese learners who want to read authentic Chinese rather than drill vocabulary, and teachers/classrooms who guide them. Learners are the Phase 1–2 audience; teacher and classroom tools are a confirmed later audience (PRD Phase 3).

## Product Purpose
Umbrella is a Chinese reading platform: real texts matched to the reader's level, tap-any-word dictionary (translation, pinyin, audio), offline reading, and vocabulary/HSK progress tracking. This site is the web presence for the product. In Phase 1 it is the gateway for iOS TestFlight beta users (brand credibility, TestFlight conversion, waitlist email capture, SEO for "Chinese reading app", "HSK learning"). Success per the PRD: 1,000+ visits, 15–20% email capture, 250+ signups, LCP/FCP/CLS green.

## Positioning
Drill apps (Duolingo, HelloChinese) teach vocabulary and sentences; Umbrella teaches through reading authentic texts (stories, news, essays) at the learner's measured proficiency level.

## Operating Context
Product is in development. The iOS app is in TestFlight beta; a web app is also planned (Phase 2: reading platform, proficiency tracking, dictionary; Phase 3: classroom/teacher dashboard; Phase 4: AI content generation and personalization). Next product priority is the learner's library and tools.

## Capabilities and Constraints
- Platforms: iOS app and web app both planned. The marketing site is web.
- Site must be multilingual. Exact locales are not yet decided.
- Stack: Next.js 16, React 19, TypeScript, Tailwind CSS 4 (existing).
- Phase 1 web scope: landing page, privacy policy/terms, email capture/waitlist. Reading, auth, and teacher tools are not yet built and must not be presented as available.
- Open decisions: which languages, how waitlist emails are stored, TestFlight URL.

## Brand Commitments
Name "Umbrella". An existing design system is documented in `docs/design-system.md` (teal primary per the PRD); treat it as incumbent, not re-decided here.

## Evidence on Hand
None yet: no live TestFlight link, no waitlist backend, no real app screenshots, and no real testers or testimonials confirmed. Future work must not fabricate testimonials, tester counts, ratings, or screenshots. The current hero line "Join testers already learning with Umbrella" implies users that are not confirmed and needs verification.

## Product Principles
- Reading real text is the product; never present drilling as the value.
- Claim only what exists today; roadmap items are labeled as roadmap.
- Serve learners first without foreclosing the teacher/classroom audience.
- Design for many languages and both iOS and web from the start.

## Accessibility & Inclusion
No product-specific standard established. Multilingual support (including Chinese text rendering) is a requirement.
