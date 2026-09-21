---
name: Umbrella
description: A warm paper-and-ink reading system with a single vermilion accent, for a Chinese reading app.
colors:
  vermilion: "#E74C3C"
  vermilion-deep: "#C0392B"
  vermilion-darker: "#A93226"
  vermilion-wash: "#FFF5F3"
  vermilion-tint: "#FFE5E0"
  paper-bright: "#FDFCF7"
  paper-cream: "#FAF8F0"
  paper-beige: "#F5F1E8"
  paper-aged: "#EDE7D8"
  paper-vintage: "#E2D8C3"
  paper-old-book: "#D4C5A9"
  ink-black: "#1A140E"
  ink-dark: "#2A241C"
  ink-heading: "#3A342A"
  ink-body: "#4A4237"
  ink-muted: "#6B6456"
  ink-faint: "#A8A297"
typography:
  display:
    fontFamily: "Crimson Pro, Georgia, serif"
    fontSize: "clamp(3rem, 6vw, 4.5rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Crimson Pro, Georgia, serif"
    fontSize: "2.25rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Crimson Pro, Georgia, serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "0.01em"
  label:
    fontFamily: "Inter, -apple-system, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "normal"
rounded:
  sm: "0.5rem"
  md: "0.75rem"
  lg: "1rem"
  xl: "1.5rem"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.vermilion}"
    textColor: "#FFFFFF"
    typography: "{typography.label}"
    rounded: "{rounded.xl}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.vermilion-deep}"
  button-secondary:
    backgroundColor: "{colors.paper-beige}"
    textColor: "{colors.ink-black}"
    rounded: "{rounded.xl}"
    padding: "12px 24px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.vermilion-deep}"
    rounded: "{rounded.xl}"
    padding: "12px 24px"
  card:
    backgroundColor: "{colors.paper-bright}"
    textColor: "{colors.ink-body}"
    rounded: "{rounded.xl}"
    padding: "24px"
---

# Design System: Umbrella

## Overview

**Creative North Star: "The Reading Room"**

A quiet library table at the end of the day: warm paper, dark ink, a lamp's worth of soft shadow, and one red seal. Umbrella is a product about reading, so its interface behaves like a well-set page. Serif type carries the voice, generous line height and spacing give the eye room, and the surfaces are the color of paper rather than the color of software.

The system is calm and literate, not loud. Hierarchy comes from type scale and weight in Crimson Pro before it comes from color or boxes. Color is rationed: everything is paper and ink except the vermilion, which behaves like a chop stamp on a page and marks only what the reader should act on or remember.

**Key Characteristics:**
- Paper-toned backgrounds, ink-toned text; no pure white, no pure black.
- Serif for voice (display and body), sans-serif (Inter) only for functional UI.
- One accent, vermilion, used sparingly.
- Soft, warm, brown-tinted shadows; surfaces feel like paper laid on paper.
- Generous reading rhythm: 1.75 body line height, 16px base.

## Colors

A warm-neutral palette of paper and ink, punctuated by a single vermilion accent.

### Primary
- **Vermilion Seal** (#E74C3C): Fills for primary buttons and the outline-button border. The brightest note on the page.
- **Deep Vermilion** (#C0392B): Hover fill, wordmark, emphasized headline words (the hero's "At Your Level."), outline-button text. The text-safe vermilion.
- **Darker Vermilion** (#A93226): Wordmark hover.
- **Vermilion Wash** (#FFF5F3) and **Tint** (#FFE5E0): Icon tile backgrounds, the hero gradient's far end, text selection.

### Neutral
- **Bright Paper** (#FDFCF7): Elevated surfaces: cards, the scrolled navigation bar.
- **Cream Paper** (#FAF8F0): Page background.
- **Beige Paper** (#F5F1E8), **Aged Paper** (#EDE7D8): Secondary buttons, hover fills, dividers.
- **Vintage Paper** (#E2D8C3), **Old Book** (#D4C5A9): Borders on secondary buttons, scrollbar thumbs.
- **Ink Black** (#1A140E): Hero headline, card titles, secondary-button text.
- **Ink Heading** (#3A342A) / **Ink Body** (#4A4237): Headings and body copy.
- **Ink Muted** (#6B6456) / **Ink Faint** (#A8A297): Captions and de-emphasized text. Ink Muted is the site's default text color.

### Named Rules
**The Red Seal Rule.** Vermilion appears on a small share of any screen: the primary action, the wordmark, one emphasized phrase. If a second element on screen is competing in red, one of them is wrong.

**The Warm Neutral Rule.** Every neutral leans warm (brown-yellow undertone). Never introduce a cool gray or pure white/black.

## Typography

**Display Font:** Crimson Pro (with Georgia, serif)
**Body Font:** Source Serif 4 (with Georgia, Times New Roman, serif)
**UI Font:** Inter (with -apple-system, sans-serif); buttons, inputs and navigation only
**Mono Font:** Geist Mono is loaded but unused in the current site.

**Character:** A bookish pairing: Crimson Pro's high-contrast headlines over Source Serif 4's sturdy screen-tuned body, with Inter kept to the controls so the interface reads as tooling around a text.

### Hierarchy
- **Display** (600, clamp 3rem to 4.5rem, 1.15): Hero headline only, tight tracking (-0.025em).
- **Headline** (600, 2.25rem, 1.2): Section titles.
- **Title** (600, 1.25rem, 1.2): Card and feature titles.
- **Body** (400, 1rem to 1.5rem, 1.75, +0.01em): Paragraphs; lead paragraph scales up to 1.5rem on large screens. Keep to about 65 to 75ch.
- **Label** (Inter 500, 0.875rem to 1rem): Buttons, navigation.

### Named Rules
**The Serif Voice Rule.** Reading content and headlines are serif. Inter is reserved for controls; never set a paragraph in it.

## Layout

Single-column page of stacked full-width sections, content centered in a `max-w-6xl` (72rem) container with 16/24/32px side padding by breakpoint. Hero is full viewport height, centered, with a fixed 64px navigation bar above. Feature and problem/solution content uses 3-up grids on desktop that collapse to one column on mobile. Spacing follows Tailwind's 4px scale; section rhythm is generous (roughly 64 to 96px vertical), and gaps between cards are 24px.

## Elevation & Depth

Hybrid: paper-on-paper layering plus soft ambient shadows. Shadows are tinted with ink brown (rgba(74, 66, 55)), never black, and low in opacity (5 to 10%). Surfaces rest with a medium shadow and lift to a larger one on hover, so depth communicates interactivity.

### Shadow Vocabulary
- **Rest** (`0 4px 6px -1px rgba(74,66,55,.1), 0 2px 4px -2px rgba(74,66,55,.1)`): cards, primary buttons.
- **Lift** (`0 10px 15px -3px rgba(74,66,55,.1), 0 4px 6px -4px rgba(74,66,55,.1)`): hover state and the scrolled nav bar.
- **Float** (`0 20px 25px -5px rgba(74,66,55,.1), 0 8px 10px -6px rgba(74,66,55,.1)`): elevated card hover.
- **Device** (`shadow-2xl`): phone mockup only.

### Named Rules
**The Brown Shadow Rule.** Shadows are warm and low-contrast. A gray or black shadow breaks the paper illusion.

## Shapes

Soft and generous. Buttons and cards use 24px (1.5rem) or 12px (0.75rem) radii; icon tiles use 16px; the phone mockup uses 40px outer and 32px inner. Borders are 1px in Aged Paper, or 2px vermilion for outline buttons. Nothing is sharp-cornered or fully pill-shaped.

## Components

### Buttons
- **Shape:** Softly rounded (12px; Tailwind `rounded-xl`, which this theme sets to 0.75rem via `--radius-md`-scale values, so confirm against the compiled CSS before relying on it).
- **Primary:** Vermilion fill, white Inter text, medium shadow; padding 12/24px (md), 16/32px (lg, used in the hero at 56px height).
- **Hover / Focus:** Fill deepens to #C0392B and the shadow lifts. Press scales to 0.98. Focus shows a 2px vermilion ring with 2px offset. Transition 200ms.
- **Secondary:** Beige Paper fill, Ink Black text, Vintage Paper border.
- **Outline:** 2px vermilion border, deep-vermilion text, fills solid vermilion with white text on hover.
- **Ghost:** Ink text, Beige Paper fill on hover.

### Cards / Containers
- **Corner Style:** 12px (`rounded-xl`).
- **Background:** Bright Paper, optional Aged Paper border.
- **Shadow Strategy:** Rest shadow, lifting on hover over 300ms.
- **Internal Padding:** 24px.

### Feature Card
Centered stack: a 56px vermilion-wash rounded tile holding the icon, a Crimson Pro title (20px, semibold), then 15px muted body text.

### Navigation
Fixed, 64px. Transparent over the hero; on scroll becomes 95% Bright Paper with backdrop blur, a lift shadow, and an Aged Paper bottom border. Wordmark "Umbrella" in Crimson Pro in deep vermilion. Links are Inter 14px medium in Ink Body with a 2px vermilion underline that grows on hover. On mobile, a hamburger opens a stacked panel with a full-width primary button.

### Phone Mockup (signature)
Ink Black device frame (40px radius, 8px bezel) with a notch, Bright Paper screen, holding an app screenshot. Currently a placeholder; real screenshots do not exist yet.

## Do's and Don'ts

### Do:
- **Do** keep every surface and text color inside the paper and ink families, with vermilion as the single accent.
- **Do** set headlines in Crimson Pro and reading text in Source Serif 4; use Inter only for controls.
- **Do** use ink-brown tinted shadows and lift them on hover.
- **Do** use deep vermilion (#C0392B), not bright, for vermilion text on paper.
- **Do** keep body line height at 1.75 and paragraphs to 65 to 75ch.

### Don't:
- **Don't** use pure white, pure black, or cool grays.
- **Don't** use vermilion for more than one competing focal point per screen.
- **Don't** use sharp corners or pill shapes; stay in the 12 to 24px radius range.
- **Don't** use gray or black drop shadows.
- **Don't** reference undefined tokens (`bg-surface`, `text-secondary`, `--color-primary`, `--color-ink-200`): they are used in code but not declared in `globals.css`, so they currently resolve to nothing. Use the paper/ink/vermilion tokens above.
- **Don't** treat the dark-mode block as real: it currently maps to the same light values, so the site has no dark theme yet.
- **Don't** introduce teal (Tailwind's default `teal-*`, or the teal primary in the PRD and the legacy `docs/` design-system pages); the shipped site is vermilion-only. The only color families are `coral-*`, `paper-*` and `ink-*`, defined in the `@theme` block of `src/app/globals.css`.
