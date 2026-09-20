# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Chinese learners who want to read authentic Chinese rather than drill vocabulary, and teachers/classrooms who guide them. Learners are the Phase 1–2 audience; teacher and classroom tools are a confirmed later audience (PRD Phase 3).

## Product Purpose
Umbrella is a Chinese reading platform: real texts matched to the reader's level, tap-any-word dictionary (translation, pinyin, audio), offline reading, and vocabulary/HSK progress tracking. This site is the web presence for the product. In Phase 1 it is the gateway for iOS TestFlight beta users (brand credibility, TestFlight conversion, account signup, SEO for "Chinese reading app", "HSK learning"). Success per the PRD: 1,000+ visits, 250+ signups, LCP/FCP/CLS green. The PRD's 15–20% "email capture" target was a waiting-list metric and no longer applies; account creation is the single conversion.

## Positioning
Drill apps (Duolingo, HelloChinese) teach vocabulary and sentences; Umbrella teaches through reading authentic texts (stories, news, essays) at the learner's measured proficiency level.

## Operating Context
Product is in development. The iOS app is in TestFlight beta; a web app is also planned (Phase 2: reading platform, proficiency tracking, dictionary; Phase 3: classroom/teacher dashboard; Phase 4: AI content generation and personalization). Next product priority is the learner's library and tools.

## Capabilities and Constraints
- Platforms: iOS app and web app both planned. The marketing site is web.
- Site must be multilingual. Exact locales are not yet decided.
- Stack: Next.js 16, React 19, TypeScript, Tailwind CSS 4 (existing).
- Phase 1 web scope: landing page, privacy policy/terms, and account signup/login. The waiting list is dropped: the landing page converts to `/signup`, not to an email capture form.
- Accounts are built. Signup, login, logout and a session-gated `/space` all work against `umbrella-api`, which owns the auth contract (see `../umbrella-api/CONTEXT.md`). A new account currently lands on an empty `/space`.
- Reading and teacher tools are not yet built and must not be presented as available. Reading lands in this phase; do not claim it until it ships.
- Open decisions: which languages, TestFlight URL.

## Brand Commitments
Name "Umbrella". The incumbent design system is `DESIGN.md`: warm paper and ink with a single vermilion accent (`coral-*` in code). Treat it as incumbent, not re-decided here. The teal primary in `docs/design-system.md` and the PRD was never shipped; `src/styles/design-tokens.ts` still carries it, and it should not be reintroduced.

## Evidence on Hand
Little: no live TestFlight link, no real app screenshots, and no real testers or testimonials confirmed. Future work must not fabricate testimonials, tester counts, ratings, or screenshots. The unverified hero line "Join testers already learning with Umbrella" has been removed. Every TestFlight CTA is wired to `NEXT_PUBLIC_TESTFLIGHT_URL` and hides itself while that is unset, so publishing a link is a config change, not a code change.

## Product Principles
- Reading real text is the product; never present drilling as the value.
- Claim only what exists today; roadmap items are labeled as roadmap.
- Serve learners first without foreclosing the teacher/classroom audience.
- Design for many languages and both iOS and web from the start.

## Accessibility & Inclusion
No product-specific standard established. Multilingual support (including Chinese text rendering) is a requirement.
