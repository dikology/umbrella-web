# Design System Quick Start Guide

A quick reference for developers working with the Umbrella design system.

---

## 🎨 Typography

### Headings

```tsx
// Hero headline
<h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold text-ink-700 tracking-tight">
  Your Headline
</h1>

// Section heading
<h2 className="font-display text-4xl md:text-5xl font-semibold text-ink-700 tracking-tight">
  Section Title
</h2>

// Subsection heading
<h3 className="font-display text-2xl md:text-3xl font-semibold text-ink-700">
  Subsection
</h3>
```

### Body Text

```tsx
// Large body text (intros, descriptions)
<p className="font-body text-lg md:text-xl text-ink-500 leading-relaxed">
  Your description text...
</p>

// Regular body text
<p className="font-body text-base text-ink-500 leading-relaxed">
  Your content...
</p>

// Secondary text
<p className="font-body text-sm text-ink-400">
  Secondary information...
</p>
```

### UI Text (buttons, labels, navigation)

```tsx
<span className="font-ui text-sm font-medium">
  Label text
</span>
```

---

## 🎨 Colors

### Quick Reference

```tsx
// Backgrounds
bg-paper-100      // Main page background
bg-paper-50       // Card backgrounds
bg-surface        // Elevated surfaces

// Text
text-ink-700      // Headings
text-ink-500      // Body text
text-ink-400      // Secondary text

// Brand
bg-teal-500       // Primary buttons, accents
text-teal-600     // Links, interactive elements
bg-coral-500      // Accent highlights

// Borders
border-paper-300  // Subtle borders
border-paper-400  // Prominent borders
```

---

## 📦 Components

### Button

```tsx
import Button from '@/components/Button';

// Primary button
<Button variant="primary" size="lg">
  Get Started
</Button>

// Secondary button
<Button variant="secondary">
  Learn More
</Button>

// Outline button
<Button variant="outline">
  View Details
</Button>

// Ghost button
<Button variant="ghost">
  Cancel
</Button>
```

### Card

```tsx
import Card from '@/components/Card';

// Standard card
<Card variant="default">
  <h3>Title</h3>
  <p>Content...</p>
</Card>

// Elevated card (more shadow)
<Card variant="elevated">
  Content...
</Card>

// Flat card (subtle)
<Card variant="flat">
  Content...
</Card>

// With accent border
<Card variant="elevated" className="border-l-4 border-l-teal-500">
  Content...
</Card>
```

### Feature Card

```tsx
import { FeatureCard } from '@/components/Card';

<FeatureCard
  icon="📖"
  title="Feature Title"
  description="Feature description goes here..."
  variant="centered" // or "left-aligned"
/>
```

### Phone Mockup

```tsx
import { PhoneMockupCard } from '@/components/Card';

<PhoneMockupCard
  imageSrc="/screenshots/library.png"  // optional
  imageAlt="Library screen"
  title="Your Library"
  description="Organize your reading materials"
/>
```

---

## 📐 Layout Patterns

### Section Container

```tsx
<section className="py-20 md:py-32 bg-paper-100">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Content */}
  </div>
</section>
```

### Section Header

```tsx
<div className="text-center mb-20">
  <h2 className="font-display text-4xl md:text-5xl font-semibold text-ink-700 mb-6 tracking-tight">
    Section Title
  </h2>
  <p className="font-body text-lg md:text-xl text-ink-500 max-w-3xl mx-auto leading-relaxed">
    Section description...
  </p>
</div>
```

### Grid Layouts

```tsx
// 2 columns
<div className="grid md:grid-cols-2 gap-8">
  {/* Items */}
</div>

// 3 columns
<div className="grid md:grid-cols-3 gap-8">
  {/* Items */}
</div>

// 4 columns (timeline, features)
<div className="grid md:grid-cols-4 gap-8">
  {/* Items */}
</div>
```

---

## 🎭 Common Patterns

### Gradient Background

```tsx
<section className="bg-gradient-to-br from-teal-500 via-teal-600 to-teal-700">
  {/* Content */}
</section>
```

### Glassmorphism (navigation)

```tsx
<nav className="bg-paper-50/95 backdrop-blur-md shadow-lg border-b border-paper-300">
  {/* Nav content */}
</nav>
```

### Hover Effects

```tsx
// Card lift
<div className="hover:shadow-xl transition-shadow duration-300">
  Content
</div>

// Scale on hover
<button className="hover:scale-105 active:scale-95 transition-transform">
  Button
</button>

// Underline animation (links)
<a className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-teal-500 after:transition-all hover:after:w-full">
  Link text
</a>
```

### Focus States

```tsx
// Standard focus ring
<button className="focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
  Button
</button>
```

---

## 📱 Responsive Design

### Breakpoints

```
sm:  640px   (small tablets)
md:  768px   (tablets)
lg:  1024px  (desktop)
xl:  1280px  (large desktop)
2xl: 1536px  (extra large)
```

### Mobile-First Approach

```tsx
// Mobile: base (16px), Tablet: 18px, Desktop: 20px
<p className="text-base md:text-lg lg:text-xl">
  Responsive text
</p>

// Mobile: 32px, Desktop: 64px padding
<section className="py-8 md:py-16">
  Content
</section>
```

---

## 🎯 Spacing Scale

Quick reference:

```tsx
gap-4    // 16px  - Small gaps
gap-6    // 24px  - Medium gaps
gap-8    // 32px  - Large gaps
gap-12   // 48px  - Extra large gaps

p-4      // 16px  - Tight padding
p-6      // 24px  - Standard card padding
p-8      // 32px  - Generous padding

mb-4     // 16px  - Small margin
mb-6     // 24px  - Medium margin
mb-12    // 48px  - Section spacing
mb-20    // 80px  - Large section spacing
```

---

## 🎨 Shadow System

```tsx
shadow-sm    // Subtle: Hover states
shadow-md    // Default: Cards
shadow-lg    // Elevated: Important cards
shadow-xl    // Prominent: Modals
shadow-2xl   // Maximum: Overlays
```

---

## 🔄 Transitions

Standard timing:

```tsx
// Quick interactions (buttons, links)
transition-all duration-200

// Shadows and visibility
transition-shadow duration-300

// Transforms and motion
transition-transform duration-200
```

---

## ✨ Utilities

### Using Common Classes

```tsx
import { commonClasses, cn } from '@/styles/common-classes';

// Use predefined classes
<h1 className={commonClasses.heading.hero}>
  Hero Headline
</h1>

// Combine with custom classes
<p className={cn(commonClasses.body.large, 'mb-8', 'text-center')}>
  Description
</p>
```

---

## 🎨 Color Combinations (Tested)

### On Light Backgrounds

```tsx
// Headings on paper
text-ink-700 bg-paper-100        ✓ High contrast

// Body text on paper
text-ink-500 bg-paper-100        ✓ Readable

// Secondary text on paper
text-ink-400 bg-paper-100        ✓ AA compliant
```

### On Dark Backgrounds

```tsx
// Text on teal
text-white bg-teal-500           ✓ High contrast

// Text on dark footer
text-ink-300 bg-ink-700          ✓ Readable
```

### Interactive Elements

```tsx
// Primary button
bg-teal-500 text-white           ✓ Perfect
hover:bg-teal-600

// Links
text-teal-600                    ✓ Clear
hover:text-teal-700
```

---

## 🚀 Quick Tips

### DO ✅

- Use `font-display` for all headings
- Use `font-body` for all content text
- Use `font-ui` for buttons and navigation
- Maintain consistent spacing (use the scale)
- Use `rounded-xl` for most elements
- Include focus states on interactive elements
- Use `leading-relaxed` for body text

### DON'T ❌

- Mix font families arbitrarily
- Use arbitrary spacing values
- Forget responsive variants
- Skip focus states
- Use pure black (#000000)
- Use harsh shadows
- Ignore the color palette

---

## 🔍 Finding What You Need

| Need | Look in |
|------|---------|
| Colors | `globals.css` or this guide |
| Components | `/src/components/` |
| Tokens | `/src/styles/design-tokens.ts` |
| Common classes | `/src/styles/common-classes.ts` |
| Full documentation | `/docs/design-system.md` |

---

## 💡 Examples

### Feature Card Grid

```tsx
<div className="grid md:grid-cols-2 gap-8">
  <FeatureCard
    icon="📖"
    title="Smart Dictionary"
    description="Tap any word for instant translation..."
  />
  <FeatureCard
    icon="🎯"
    title="Adaptive Difficulty"
    description="Content matched to your level..."
  />
</div>
```

### CTA Section

```tsx
<section className="py-20 md:py-32 bg-gradient-to-br from-teal-500 to-teal-700">
  <div className="max-w-4xl mx-auto px-4 text-center">
    <h2 className="font-display text-4xl md:text-5xl font-semibold text-white mb-8">
      Ready to Get Started?
    </h2>
    <Button variant="primary" size="lg">
      Sign Up Now
    </Button>
  </div>
</section>
```

### iPhone Mockup Section

```tsx
<div className="grid md:grid-cols-3 gap-12">
  <PhoneMockupCard
    title="Library"
    description="Your reading collection"
  />
  <PhoneMockupCard
    title="Dictionary"
    description="Instant translations"
  />
  <PhoneMockupCard
    title="Progress"
    description="Track your growth"
  />
</div>
```

---

## 🆘 Common Issues

**Problem**: Font not loading
- **Solution**: Check font variables in `layout.tsx` are properly set

**Problem**: Color not showing
- **Solution**: Ensure color is defined in `globals.css` theme

**Problem**: Dark mode looks wrong
- **Solution**: Check `@media (prefers-color-scheme: dark)` section in `globals.css`

**Problem**: Button styling inconsistent
- **Solution**: Use `<Button>` component instead of `<button>` tag

---

## 📚 Resources

- **Full Documentation**: `/docs/design-system.md`
- **Implementation Guide**: `/docs/design-system-implementation.md`
- **Design Tokens**: `/src/styles/design-tokens.ts`
- **Common Classes**: `/src/styles/common-classes.ts`

---

Happy coding! 🎉

