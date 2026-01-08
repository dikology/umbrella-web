/**
 * Design System Tokens
 * Book-inspired design system for Umbrella reading app
 */

export const designTokens = {
  // Typography Scale
  typography: {
    fontFamilies: {
      display: 'var(--font-crimson)',  // For headlines, dramatic
      body: 'var(--font-source-serif)', // For body text, readable
      ui: 'var(--font-inter)',          // For UI elements, buttons
      mono: 'var(--font-geist-mono)',   // For code, technical
    },
    
    sizes: {
      xs: '0.75rem',      // 12px
      sm: '0.875rem',     // 14px
      base: '1rem',       // 16px
      lg: '1.125rem',     // 18px
      xl: '1.25rem',      // 20px
      '2xl': '1.5rem',    // 24px
      '3xl': '1.875rem',  // 30px
      '4xl': '2.25rem',   // 36px
      '5xl': '3rem',      // 48px
      '6xl': '3.75rem',   // 60px
      '7xl': '4.5rem',    // 72px
    },
    
    lineHeights: {
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '1.75',
      extra: '2',
    },
    
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
  },

  // Color Palette - Book-inspired
  colors: {
    // Neutral palette - warm paper tones
    paper: {
      50: '#FDFCF7',    // Almost white, warm
      100: '#FAF8F0',   // Light cream
      200: '#F5F1E8',   // Soft beige
      300: '#EDE7D8',   // Aged paper
      400: '#E2D8C3',   // Vintage paper
      500: '#D4C5A9',   // Old book
      600: '#B8A888',   // Antique
      700: '#9B8A6F',   // Dark parchment
      800: '#6B5E4C',   // Leather binding
      900: '#4A3F2F',   // Dark leather
    },
    
    // Text colors - ink tones
    ink: {
      50: '#F7F7F5',
      100: '#E8E6E1',
      200: '#C8C4BB',
      300: '#A8A297',
      400: '#6B6456',
      500: '#4A4237',   // Primary text
      600: '#3A342A',   // Headings
      700: '#2A241C',   // Dark headings
      800: '#1A140E',   // Almost black
      900: '#0A0805',   // Pure black
    },
    
    // Brand colors - coral/red primary (from reference image)
    brand: {
      coral: {
        50: '#FFF5F3',
        100: '#FFE5E0',
        200: '#FFCCC1',
        300: '#FFB2A2',
        400: '#FF9983',
        500: '#E74C3C',   // Primary coral/red
        600: '#C0392B',
        700: '#A93226',
        800: '#8E2A1F',
        900: '#732218',
      },
      teal: {
        50: '#F0F9F8',
        100: '#D9F0ED',
        200: '#B3E1DA',
        300: '#8DD2C8',
        400: '#67C3B5',
        500: '#41B4A3',   // Secondary teal
        600: '#349082',
        700: '#276C62',
        800: '#1A4841',
        900: '#0D2421',
      },
    },
    
    // Semantic colors
    semantic: {
      success: '#2BB669',
      error: '#C0152F',
      warning: '#F59E0B',
      info: '#3B82F6',
    },
  },

  // Spacing Scale
  spacing: {
    '0': '0',
    'px': '1px',
    '0.5': '0.125rem',  // 2px
    '1': '0.25rem',     // 4px
    '2': '0.5rem',      // 8px
    '3': '0.75rem',     // 12px
    '4': '1rem',        // 16px
    '5': '1.25rem',     // 20px
    '6': '1.5rem',      // 24px
    '8': '2rem',        // 32px
    '10': '2.5rem',     // 40px
    '12': '3rem',       // 48px
    '16': '4rem',       // 64px
    '20': '5rem',       // 80px
    '24': '6rem',       // 96px
    '32': '8rem',       // 128px
  },

  // Border Radius - Softer, book-like
  borderRadius: {
    none: '0',
    sm: '0.25rem',      // 4px
    DEFAULT: '0.5rem',  // 8px
    md: '0.75rem',      // 12px
    lg: '1rem',         // 16px
    xl: '1.5rem',       // 24px
    '2xl': '2rem',      // 32px
    full: '9999px',
  },

  // Shadows - Soft, paper-like
  shadows: {
    sm: '0 1px 2px 0 rgba(74, 66, 55, 0.05)',
    DEFAULT: '0 1px 3px 0 rgba(74, 66, 55, 0.1), 0 1px 2px -1px rgba(74, 66, 55, 0.1)',
    md: '0 4px 6px -1px rgba(74, 66, 55, 0.1), 0 2px 4px -2px rgba(74, 66, 55, 0.1)',
    lg: '0 10px 15px -3px rgba(74, 66, 55, 0.1), 0 4px 6px -4px rgba(74, 66, 55, 0.1)',
    xl: '0 20px 25px -5px rgba(74, 66, 55, 0.1), 0 8px 10px -6px rgba(74, 66, 55, 0.1)',
    '2xl': '0 25px 50px -12px rgba(74, 66, 55, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(74, 66, 55, 0.05)',
  },

  // Z-index Scale
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
} as const;

export type DesignTokens = typeof designTokens;

