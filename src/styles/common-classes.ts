/**
 * Common CSS Class Combinations
 * Reusable class strings for consistent styling
 */

export const commonClasses = {
  // Typography
  heading: {
    hero: 'font-display text-5xl md:text-6xl lg:text-7xl font-semibold text-ink-800 leading-[1.15] tracking-tight',
    h1: 'font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-ink-800 tracking-tight',
    h2: 'font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-ink-800 tracking-tight',
    h3: 'font-display text-2xl md:text-3xl font-semibold text-ink-800',
    h4: 'font-display text-xl md:text-2xl font-semibold text-ink-800',
  },
  
  body: {
    large: 'font-body text-lg md:text-xl text-ink-500 leading-relaxed',
    base: 'font-body text-base md:text-lg text-ink-500 leading-relaxed',
    small: 'font-body text-sm md:text-base text-ink-500 leading-relaxed',
  },
  
  description: {
    large: 'font-body text-lg md:text-xl text-ink-500 max-w-3xl mx-auto leading-relaxed',
    base: 'font-body text-base md:text-lg text-ink-500 max-w-2xl mx-auto leading-relaxed',
  },

  // Sections
  section: {
    container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    containerNarrow: 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8',
    containerWide: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    padding: 'py-20 md:py-32',
    header: 'text-center mb-20',
    headerSmall: 'text-center mb-12',
  },

  // Backgrounds
  bg: {
    paper: 'bg-paper-100',
    surface: 'bg-surface',
    coral: 'bg-gradient-to-br from-coral-500 via-coral-600 to-coral-700',
    hero: 'bg-gradient-to-br from-paper-100 via-paper-50 to-coral-50',
  },

  // Cards
  card: {
    base: 'bg-surface border border-paper-300 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300',
    elevated: 'bg-surface rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300',
    flat: 'bg-surface border border-paper-300 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300',
  },

  // Buttons (base classes, use Button component for consistency)
  button: {
    base: 'font-ui inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]',
    primary: 'bg-coral-500 text-white hover:bg-coral-600 shadow-md hover:shadow-lg',
    secondary: 'bg-paper-200 text-ink-800 border border-paper-400 hover:bg-paper-300 hover:border-paper-500 shadow-sm hover:shadow-md',
    outline: 'border-2 border-coral-500 text-coral-600 hover:bg-coral-500 hover:text-white shadow-sm hover:shadow-md',
    ghost: 'text-ink-600 hover:bg-paper-200',
  },

  // Navigation
  nav: {
    link: 'font-ui text-ink-500 hover:text-ink-800 px-3 py-2 text-sm font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-coral-500 after:transition-all after:duration-200 hover:after:w-full',
    linkMobile: 'font-ui text-ink-500 hover:text-ink-800 hover:bg-paper-200 block px-3 py-2 rounded-lg text-base font-medium w-full text-left transition-colors',
  },

  // Grids
  grid: {
    two: 'grid md:grid-cols-2 gap-8',
    three: 'grid md:grid-cols-3 gap-8',
    four: 'grid md:grid-cols-4 gap-8',
    twoLarge: 'grid md:grid-cols-2 gap-12',
  },

  // Flex
  flex: {
    center: 'flex items-center justify-center',
    between: 'flex items-center justify-between',
    start: 'flex items-start',
    col: 'flex flex-col',
  },

  // Focus states
  focus: 'focus:outline-none focus:ring-2 focus:ring-coral-500 focus:ring-offset-2',
  
  // Transitions
  transition: {
    base: 'transition-all duration-200',
    colors: 'transition-colors duration-200',
    shadow: 'transition-shadow duration-300',
    transform: 'transition-transform duration-200',
  },

  // Hover effects
  hover: {
    scale: 'hover:scale-105 transition-transform duration-200',
    lift: 'hover:-translate-y-1 transition-transform duration-200',
  },

  // Borders
  border: {
    default: 'border border-paper-300',
    thick: 'border-2 border-paper-400',
    accent: 'border-l-4 border-l-coral-500',
    error: 'border-l-4 border-l-coral-700',
  },
} as const;

/**
 * Helper function to combine classes
 * Usage: cn(commonClasses.heading.h1, 'mb-4', 'text-center')
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Responsive text sizes
 */
export const textSizes = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
  '6xl': 'text-6xl',
  '7xl': 'text-7xl',
} as const;

/**
 * Commonly used responsive patterns
 */
export const responsive = {
  text: {
    hero: 'text-5xl md:text-6xl lg:text-7xl',
    h1: 'text-4xl md:text-5xl lg:text-6xl',
    h2: 'text-3xl md:text-4xl lg:text-5xl',
    h3: 'text-2xl md:text-3xl lg:text-4xl',
    large: 'text-lg md:text-xl lg:text-2xl',
    base: 'text-base md:text-lg',
  },
  padding: {
    section: 'py-20 md:py-32',
    container: 'px-4 sm:px-6 lg:px-8',
    card: 'p-4 md:p-6',
  },
  gap: {
    small: 'gap-4 md:gap-6',
    base: 'gap-6 md:gap-8',
    large: 'gap-8 md:gap-12',
  },
} as const;

