# Visual Reference Guide

Quick visual reference for the Umbrella design system components and patterns.

---

## 🎨 Color Palette

### Paper Tones (Backgrounds)
```
█ #FDFCF7  paper-50   - Card surfaces, elevated elements
█ #FAF8F0  paper-100  - Main background
█ #F5F1E8  paper-200  - Subtle backgrounds
█ #EDE7D8  paper-300  - Borders, dividers
█ #E2D8C3  paper-400  - Hover states
█ #D4C5A9  paper-500  - Disabled states
```

### Ink Tones (Text)
```
█ #6B6456  ink-400  - Secondary text
█ #4A4237  ink-500  - Body text
█ #3A342A  ink-600  - Emphasis
█ #2A241C  ink-700  - Headings
█ #1A140E  ink-800  - Dark accents
```

### Brand Colors
```
█ #F0F9F8  teal-50   - Light backgrounds
█ #D9F0ED  teal-100  - Subtle accents
█ #41B4A3  teal-500  - Primary actions
█ #349082  teal-600  - Hover states
█ #276C62  teal-700  - Active states

█ #FFF5F3  coral-50   - Light accents
█ #FF7F64  coral-500  - Accent highlights
```

---

## 📝 Typography Hierarchy

```
HERO HEADLINE
Font: Crimson Pro Semibold
Size: 72px (mobile: 48px)
Color: ink-700
Usage: Main hero headline

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Section Heading
Font: Crimson Pro Semibold
Size: 60px (mobile: 36px)
Color: ink-700
Usage: Section titles

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Subsection Title
Font: Crimson Pro Semibold
Size: 36px (mobile: 24px)
Color: ink-700
Usage: Subsections

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Body Text (Large)
Font: Source Serif 4 Regular
Size: 20px (mobile: 18px)
Color: ink-500
Line height: 1.75
Usage: Introductions, descriptions

Body Text (Regular)
Font: Source Serif 4 Regular
Size: 16px
Color: ink-500
Line height: 1.75
Usage: Standard content

Small Text
Font: Source Serif 4 Regular
Size: 14px
Color: ink-400
Usage: Captions, metadata

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

UI TEXT
Font: Inter Medium
Size: 16px
Color: varies
Usage: Buttons, navigation, labels
```

---

## 🔘 Button States

### Primary Button
```
┌─────────────────────┐
│  Get Started        │  Default: teal-500, white text
└─────────────────────┘

┌─────────────────────┐
│  Get Started        │  Hover: teal-600, shadow-lg
└─────────────────────┘  Scale: 98%

┌─────────────────────┐
│  Get Started        │  Active: Scale 95%
└─────────────────────┘

┌─────────────────────┐
│  Get Started        │  Focus: Ring teal-500
└─────────────────────┘
```

### Secondary Button
```
┌─────────────────────┐
│  Learn More         │  Default: paper-200, border
└─────────────────────┘

┌─────────────────────┐
│  Learn More         │  Hover: paper-300
└─────────────────────┘
```

### Outline Button
```
┌─────────────────────┐
│  View Details       │  Default: Border teal-500
└─────────────────────┘

┌─────────────────────┐
│  View Details       │  Hover: Filled teal-500
└─────────────────────┘
```

---

## 📦 Card Variants

### Default Card
```
┏━━━━━━━━━━━━━━━━━━━━━━━┓
┃                       ┃  Border: paper-300
┃  Card Content         ┃  Shadow: md
┃                       ┃  Radius: xl (24px)
┃                       ┃
┗━━━━━━━━━━━━━━━━━━━━━━━┛
```

### Elevated Card
```
┏━━━━━━━━━━━━━━━━━━━━━━━┓
┃                       ┃  No border
┃  Card Content         ┃  Shadow: lg
┃                       ┃  Radius: xl
┃                       ┃  Hover: shadow-xl
┗━━━━━━━━━━━━━━━━━━━━━━━┛
     ░░░░░░░
```

### Flat Card
```
┏━━━━━━━━━━━━━━━━━━━━━━━┓
┃                       ┃  Border: paper-300
┃  Card Content         ┃  Shadow: sm
┃                       ┃  Radius: xl
┃                       ┃
┗━━━━━━━━━━━━━━━━━━━━━━━┛
  ░
```

### Feature Card (Centered)
```
┏━━━━━━━━━━━━━━━━━━━━━━━┓
┃                       ┃
┃      ┌─────┐         ┃  Icon container: teal-50
┃      │  📖 │         ┃  Title: Display font
┃      └─────┘         ┃  Description: Body font
┃                       ┃
┃   Feature Title      ┃
┃                       ┃
┃  Feature description  ┃
┃  goes here...         ┃
┃                       ┃
┗━━━━━━━━━━━━━━━━━━━━━━━┛
```

---

## 📱 iPhone Mockup

```
     ┌────────────┐
    ┌┴────────────┴┐        Outer: ink-800 (device frame)
    │              │        Inner: paper-50 (screen)
    │   ╔═══╗      │        Notch: ink-800
    │              │        Content area: Your screenshot
    │              │        or placeholder
    │              │
    │              │
    │              │
    │              │
    │              │
    │              │
    │              │
    │              │
    └──────────────┘

     Title Below
   Short description
```

---

## 🗂️ Section Layouts

### Standard Section
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                                          
         Section Title                    (Center aligned)
    Section description text              (Max-width: 3xl)
                                          
    ┌─────────┐  ┌─────────┐            (Grid: 3 columns)
    │ Card 1  │  │ Card 2  │            
    └─────────┘  └─────────┘            
                                          
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Hero Section
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                                          
         HERO HEADLINE                    (Large display font)
          Second Line                     (Accent color line)
                                          
    Compelling subtitle text              
    that spans multiple lines             
                                          
    ┌──────────────┐  ┌──────────────┐  (Button group)
    │ Primary CTA  │  │ Secondary    │  
    └──────────────┘  └──────────────┘  
                                          
    ✓ Trust indicator text                
                                          
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Timeline Section
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                                          
         Timeline Title                   
                                          
    ●────────●────────●────────●         (Desktop)
    │        │        │        │         
  ┌───┐  ┌───┐  ┌───┐  ┌───┐           
  │ 1 │  │ 2 │  │ 3 │  │ 4 │           
  └───┘  └───┘  └───┘  └───┘           
                                          
    ●  ┌────────────┐                    (Mobile)
    │  │  Phase 1   │                    
    │  └────────────┘                    
    ●  ┌────────────┐                    
       │  Phase 2   │                    
       └────────────┘                    
                                          
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 🎯 Spacing System

```
4px   │  Tiny gaps (gap-1)
8px   ││  Small gaps (gap-2)
16px  ││││  Standard gaps (gap-4)
24px  ││││││  Medium gaps (gap-6)
32px  ││││││││  Large gaps (gap-8)
48px  ││││││││││││  Section spacing (gap-12)
80px  ││││││││││││││││││││  Large sections (mb-20)
128px ││││││││││││││││││││││││││││││  Major sections (py-32)
```

---

## 🎨 Shadow Scale

```
shadow-sm     ░         Subtle (buttons hover)
shadow-md     ░░        Default cards
shadow-lg     ░░░       Elevated cards
shadow-xl     ░░░░      Prominent (modals)
shadow-2xl    ░░░░░     Maximum elevation
```

---

## 🔄 Border Radius

```
rounded-lg      ╭─────╮  16px (Cards)
                │     │
                ╰─────╯

rounded-xl      ╭──────╮  24px (Large cards, buttons)
                │      │
                ╰──────╯

rounded-2xl     ╭───────╮  32px (Hero elements)
                │       │
                ╰───────╯

rounded-full    ●  Circles, pills
```

---

## 📊 Grid Layouts

### 2-Column Grid
```
┌──────────────┐  ┌──────────────┐
│   Item 1     │  │   Item 2     │
└──────────────┘  └──────────────┘

┌──────────────┐  ┌──────────────┐
│   Item 3     │  │   Item 4     │
└──────────────┘  └──────────────┘
```

### 3-Column Grid
```
┌─────────┐  ┌─────────┐  ┌─────────┐
│  Item 1 │  │  Item 2 │  │  Item 3 │
└─────────┘  └─────────┘  └─────────┘
```

### 4-Column Grid (Timeline)
```
┌────┐  ┌────┐  ┌────┐  ┌────┐
│ P1 │  │ P2 │  │ P3 │  │ P4 │
└────┘  └────┘  └────┘  └────┘
```

---

## 🎭 Interactive States

### Link Hover
```
Link text          (Default: teal-600)
─────              (Underline animates in)

Link text          (Hover: teal-700)
━━━━━━━━━         (Full underline)
```

### Card Hover
```
┌─────────────┐     Default: shadow-md
│   Content   │  →  
└─────────────┘     

┌─────────────┐     Hover: shadow-lg
│   Content   │     (Elevated)
└─────────────┘     
   ░░░░░░░
```

### Button Active
```
┌──────────┐     Resting state
│  Button  │     
└──────────┘     

┌─────────┐      Active state (scale 98%)
│ Button  │      
└─────────┘      
```

---

## 🌓 Dark Mode

### Color Adjustments
```
Background:  #FAF8F0  →  #1A140E  (Dark brown-black)
Surface:     #FDFCF7  →  #2A241C  (Lighter brown)
Text:        #3A342A  →  #E8E6E1  (Warm cream)
Primary:     #41B4A3  →  #67C3B5  (Lighter teal)
Border:      #E2D8C3  →  #4A3F2F  (Dark border)
```

---

## 📱 Responsive Breakpoints

```
Mobile          Tablet         Desktop        Large
< 768px         768-1024px     1024-1280px    > 1280px

│               │              │              │
│  Single       │  2 cols      │  3-4 cols    │  Wide
│  column       │              │              │  layout
│               │              │              │
```

---

## ✨ Animation Timing

```
Fast (200ms)      ━━╸         Buttons, links, hover
Standard (300ms)  ━━━━╸       Shadows, cards
Slow (500ms)      ━━━━━━━╸   Page transitions
```

---

## 🎨 Component Combinations

### Hero with CTA
```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                          ┃
┃          HERO HEADLINE                   ┃
┃        Second Line Text                  ┃
┃                                          ┃
┃    Descriptive subtitle text that       ┃
┃    explains the value proposition       ┃
┃                                          ┃
┃    ┌──────────────┐  ┌──────────────┐  ┃
┃    │ Get Started  │  │ Learn More   │  ┃
┃    └──────────────┘  └──────────────┘  ┃
┃                                          ┃
┃    ✓ Trust indicator                    ┃
┃                                          ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

### Feature Section
```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                          ┃
┃         Feature Heading                  ┃
┃      Short description                   ┃
┃                                          ┃
┃  ┌───────────┐  ┌───────────┐          ┃
┃  │  ┌─────┐  │  │  ┌─────┐  │          ┃
┃  │  │ 📖  │  │  │  │ 🎯  │  │          ┃
┃  │  └─────┘  │  │  └─────┘  │          ┃
┃  │  Title    │  │  Title    │          ┃
┃  │  Text...  │  │  Text...  │          ┃
┃  └───────────┘  └───────────┘          ┃
┃                                          ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

---

This visual reference provides a quick overview of the design system's components and patterns. For detailed implementation, refer to the comprehensive documentation.

