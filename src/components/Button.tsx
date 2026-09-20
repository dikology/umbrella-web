import { ButtonHTMLAttributes } from 'react';

type Variant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  // For the coral CTA band, where the palette flips: paper-coloured fills and
  // a white focus ring, because a coral ring on coral is invisible.
  | 'inverse'
  | 'inverseOutline';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: React.ReactNode;
}

// no-underline: these classes also dress anchors, and the base `a:hover`
// rule would otherwise underline a button. The ring colour belongs to the
// variant, since it depends on the surface the button sits on.
const baseStyles = `
  font-ui
  inline-flex items-center justify-center
  rounded-xl
  no-underline hover:no-underline
  transition-all duration-200
  focus:outline-none focus:ring-2 focus:ring-offset-2
  disabled:opacity-50 disabled:cursor-not-allowed
  active:scale-[0.98]
`;

const sizeStyles: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm font-medium',
  md: 'px-6 py-3 text-base font-medium',
  lg: 'px-8 py-4 text-lg font-semibold',
};

const variantStyles: Record<Variant, string> = {
  primary: `
    bg-coral-500 text-white
    hover:bg-coral-600
    shadow-md hover:shadow-lg
    focus:ring-coral-500
  `,
  secondary: `
    bg-paper-200 text-ink-800
    border border-paper-400
    hover:bg-paper-300 hover:border-paper-500
    shadow-sm hover:shadow-md
    focus:ring-coral-500
  `,
  outline: `
    border-2 border-coral-500 text-coral-600
    hover:bg-coral-500 hover:text-white
    shadow-sm hover:shadow-md
    focus:ring-coral-500
  `,
  ghost: `
    text-ink-600
    hover:bg-paper-200
    focus:ring-coral-500
  `,
  inverse: `
    bg-white text-coral-600
    hover:bg-coral-50
    shadow-xl hover:shadow-2xl
    focus:ring-white focus:ring-offset-coral-600
  `,
  inverseOutline: `
    border-2 border-white
    text-white
    hover:bg-white hover:text-coral-600
    shadow-lg hover:shadow-xl
    focus:ring-white focus:ring-offset-coral-600
  `,
};

/**
 * The button's look, detached from the `<button>` element. CTAs that navigate
 * must render as anchors, and they have to be visually indistinguishable from
 * the buttons beside them.
 */
export function buttonClasses({
  variant = 'primary',
  size = 'md',
  className = '',
}: { variant?: Variant; size?: Size; className?: string } = {}) {
  return `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={buttonClasses({ variant, size, className })} {...props}>
      {children}
    </button>
  );
}
