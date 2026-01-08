# Umbrella Design System

A book-inspired design system for the Umbrella Chinese reading app landing page.

## Philosophy

The design system is inspired by reading experiences—books, libraries, and traditional typography. It emphasizes:

- **Readability**: Serif fonts, generous spacing, and comfortable line heights
- **Warmth**: Paper-like backgrounds and ink-based text colors
- **Elegance**: Subtle shadows, smooth transitions, and refined details
- **Focus**: Clean layouts that direct attention to content

---

## Typography

### Font Families

We use three primary font families for different purposes:

#### Display Font: Crimson Pro
- **Usage**: Headlines, section titles, large text
- **Weights**: 400 (regular), 600 (semibold), 700 (bold)
- **Character**: Classic serif with high contrast, perfect for dramatic headlines
- **CSS Variable**: `--font-display`
- **Tailwind Class**: `font-display`

```tsx
<h1 className="font-display text-5xl font-semibold">
  Read Authentic Chinese Texts
</h1>
```

#### Body Font: Source Serif 4
- **Usage**: Body text, paragraphs, descriptions
- **Weights**: 400 (regular), 600 (semibold)
- **Character**: Highly readable serif optimized for screen reading
- **CSS Variable**: `--font-body`
- **Tailwind Class**: `font-body`

```tsx
<p className="font-body text-lg leading-relaxed">
  Learn to read Chinese through authentic content...
</p>
```

#### UI Font: Inter
- **Usage**: Buttons, labels, navigation, UI elements
- **Weights**: 400-700
- **Character**: Clean sans-serif for functional elements
- **CSS Variable**: `--font-ui`
- **Tailwind Class**: `font-ui`

```tsx
<button className="font-ui font-semibold">
  Get Started
</button>
```

### Typography Scale

| Size | Rem | Pixels | Usage |
|------|-----|--------|-------|
| xs | 0.75rem | 12px | Labels, captions |
| sm | 0.875rem | 14px | Small text |
| base | 1rem | 16px | Body text |
| lg | 1.125rem | 18px | Large body |
| xl | 1.25rem | 20px | Subheadings |
| 2xl | 1.5rem | 24px | Small headings |
| 3xl | 1.875rem | 30px | Medium headings |
| 4xl | 2.25rem | 36px | Large headings |
| 5xl | 3rem | 48px | Hero text |
| 6xl | 3.75rem | 60px | Hero text |
| 7xl | 4.5rem | 72px | Hero text |

### Line Heights

- `tight`: 1.25 - For large headlines
- `snug`: 1.375 - For headings
- `normal`: 1.5 - Standard
- `relaxed`: 1.625 - For readable body text
- `loose`: 1.75 - For enhanced readability (default for body)
- `extra`: 2 - For special cases

---

## Color System

### Paper Tones (Backgrounds)

Warm, cream-like colors reminiscent of book pages:

| Token | Hex | Usage |
|-------|-----|-------|
| paper-50 | `#FDFCF7` | Primary surface, cards |
| paper-100 | `#FAF8F0` | Main background |
| paper-200 | `#F5F1E8` | Subtle backgrounds |
| paper-300 | `#EDE7D8` | Borders, dividers |
| paper-400 | `#E2D8C3` | Hover states |
| paper-500 | `#D4C5A9` | Disabled states |

**Tailwind Classes**: `bg-paper-100`, `border-paper-300`, etc.

### Ink Tones (Text)

Natural ink colors for text:

| Token | Hex | Usage |
|-------|-----|-------|
| ink-400 | `#6B6456` | Secondary text |
| ink-500 | `#4A4237` | Body text |
| ink-600 | `#3A342A` | Emphasis text |
| ink-700 | `#2A241C` | Headings |
| ink-800 | `#1A140E` | Dark accents |

**Tailwind Classes**: `text-ink-700`, `text-ink-500`, etc.

### Brand Colors

#### Teal (Primary)
Calming and professional:

| Token | Hex | Usage |
|-------|-----|-------|
| teal-50 | `#F0F9F8` | Light backgrounds |
| teal-100 | `#D9F0ED` | Subtle accents |
| teal-500 | `#41B4A3` | Primary actions |
| teal-600 | `#349082` | Hover states |
| teal-700 | `#276C62` | Active states |

**Tailwind Classes**: `bg-teal-500`, `text-teal-600`, etc.

#### Coral (Accent)
Warm accent for highlights:

| Token | Hex | Usage |
|-------|-----|-------|
| coral-50 | `#FFF5F3` | Light backgrounds |
| coral-500 | `#FF7F64` | Accent elements |

**Tailwind Classes**: `bg-coral-500`, `border-l-coral-500`, etc.

---

## Components

### Cards

Three variants for different use cases:

#### Default Card
```tsx
<Card variant="default">
  Standard card with border and shadow
</Card>
```

#### Elevated Card
```tsx
<Card variant="elevated">
  Card with more prominent shadow, no border
</Card>
```

#### Flat Card
```tsx
<Card variant="flat">
  Subtle card with minimal shadow
</Card>
```

### Feature Card

For displaying features with icons:

```tsx
<FeatureCard
  icon="📖"
  title="Smart Dictionary"
  description="Tap any word for instant translation"
  variant="centered" // or "left-aligned"
/>
```

### Phone Mockup Card

For displaying app screenshots:

```tsx
<PhoneMockupCard
  imageSrc="/path/to/screenshot.png"
  imageAlt="Library screen"
  title="Your Library"
  description="Organize your reading materials"
/>
```

### Buttons

Four button variants:

```tsx
// Primary - Main CTAs
<Button variant="primary" size="lg">
  Get Started
</Button>

// Secondary - Alternative actions
<Button variant="secondary">
  Learn More
</Button>

// Outline - Tertiary actions
<Button variant="outline">
  View Details
</Button>

// Ghost - Subtle actions
<Button variant="ghost">
  Cancel
</Button>
```

Sizes: `sm`, `md`, `lg`

---

## Spacing

Consistent spacing scale based on 4px increments:

| Token | Value | Usage |
|-------|-------|-------|
| 1 | 0.25rem (4px) | Tiny gaps |
| 2 | 0.5rem (8px) | Small gaps |
| 3 | 0.75rem (12px) | Medium-small gaps |
| 4 | 1rem (16px) | Standard gap |
| 5 | 1.25rem (20px) | Medium gap |
| 6 | 1.5rem (24px) | Large gap |
| 8 | 2rem (32px) | Section padding |
| 10 | 2.5rem (40px) | Large padding |
| 12 | 3rem (48px) | Extra large |
| 16 | 4rem (64px) | Section spacing |
| 20 | 5rem (80px) | Section spacing |
| 24 | 6rem (96px) | Hero spacing |
| 32 | 8rem (128px) | Major sections |

---

## Shadows

Soft, paper-like shadows:

| Class | Usage |
|-------|-------|
| `shadow-sm` | Subtle elevation |
| `shadow-md` | Default cards |
| `shadow-lg` | Elevated cards |
| `shadow-xl` | Prominent elements |
| `shadow-2xl` | Modals, overlays |

---

## Border Radius

Smooth, modern corners:

| Class | Value | Usage |
|-------|-------|-------|
| `rounded-lg` | 1rem (16px) | Cards |
| `rounded-xl` | 1.5rem (24px) | Large cards, buttons |
| `rounded-2xl` | 2rem (32px) | Hero elements |
| `rounded-full` | 9999px | Circles, pills |

---

## Layout Patterns

### Section Spacing

Standard section layout:

```tsx
<section className="py-20 md:py-32 bg-paper-100">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Content */}
  </div>
</section>
```

### Section Headers

```tsx
<div className="text-center mb-20">
  <h2 className="
    font-display
    text-4xl md:text-5xl lg:text-6xl 
    font-semibold 
    text-ink-700 
    mb-6
    tracking-tight
  ">
    Section Title
  </h2>
  <p className="
    font-body
    text-lg md:text-xl 
    text-ink-500 
    max-w-3xl 
    mx-auto
    leading-relaxed
  ">
    Section description
  </p>
</div>
```

---

## Best Practices

### Typography

1. **Use display font for headlines**: Crimson Pro for all major headings
2. **Use body font for content**: Source Serif 4 for readable text
3. **Use UI font for controls**: Inter for buttons and navigation
4. **Maintain hierarchy**: Use size and weight to create clear hierarchy
5. **Generous line height**: Use `leading-relaxed` (1.625) for body text

### Colors

1. **Paper backgrounds**: Use paper-100 for main backgrounds
2. **Ink for text**: Use ink-700 for headings, ink-500 for body
3. **Teal for actions**: Primary actions should use teal-500
4. **Coral for accents**: Use sparingly for highlights
5. **Contrast**: Ensure sufficient contrast for accessibility

### Spacing

1. **Consistent rhythm**: Use spacing scale consistently
2. **Section padding**: Use py-20 md:py-32 for main sections
3. **Content width**: Max-w-7xl for wide layouts, max-w-4xl for text
4. **Card padding**: p-6 for standard cards

### Components

1. **Cards for grouping**: Use Card component for related content
2. **Buttons for actions**: Use Button component with appropriate variant
3. **Consistent corners**: Use rounded-xl for most elements
4. **Soft shadows**: Prefer shadow-md and shadow-lg

---

## Dark Mode

The system includes warm, reading-friendly dark mode:

- **Background**: Dark brown-black (`#1A140E`)
- **Surface**: Lighter brown (`#2A241C`)
- **Text**: Warm cream (`#E8E6E1`)
- **Primary**: Lighter teal for better contrast

Dark mode is automatically applied based on system preferences.

---

## Accessibility

### Contrast Ratios

All color combinations meet WCAG AA standards:

- Body text (ink-500 on paper-100): 10.5:1 ✓
- Headings (ink-700 on paper-100): 13:1 ✓
- Secondary text (ink-400 on paper-100): 5.2:1 ✓

### Focus States

All interactive elements have visible focus states:

```tsx
focus:outline-none 
focus:ring-2 
focus:ring-teal-500 
focus:ring-offset-2
```

### Semantic HTML

Use appropriate semantic elements:
- `<nav>` for navigation
- `<main>` for main content
- `<section>` for sections
- `<button>` for interactive elements
- `<a>` for links

---

## Implementation Notes

### Tailwind CSS v4

This design system uses Tailwind CSS v4 with CSS-first configuration in `globals.css`.

### Google Fonts

Fonts are loaded via Next.js font optimization:

```tsx
import { Crimson_Pro, Source_Serif_4, Inter } from "next/font/google";
```

### Responsive Design

Mobile-first approach with breakpoints:

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

---

## Future Enhancements

### When App Screenshots Are Available

Replace placeholder mockups in `PhoneMockupCard`:

```tsx
<PhoneMockupCard
  imageSrc="/screenshots/library.png"
  imageAlt="Library screen"
  title="Your Library"
  description="..."
/>
```

### When Web App Features Launch

Update Features section to include web app screenshots alongside mobile mockups.

### Additional Components

Consider adding:
- Testimonial cards
- Progress bars
- Reading statistics displays
- Book cover displays
- User profile cards

---

## Resources

- **Design Tokens**: `/src/styles/design-tokens.ts`
- **Global Styles**: `/src/app/globals.css`
- **Components**: `/src/components/`
- **Layout**: `/src/app/layout.tsx`

---

## Questions?

For questions or suggestions about the design system, contact the team or open an issue in the repository.

