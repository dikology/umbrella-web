import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-[--color-primary] text-white hover:bg-[--color-primary-hover] focus:ring-[--color-primary]',
    secondary: 'bg-[--color-surface] text-[--color-text] border border-[--color-border] hover:bg-gray-50 focus:ring-[--color-primary]',
    outline: 'border border-[--color-primary] text-[--color-primary] hover:bg-[--color-primary] hover:text-white focus:ring-[--color-primary]'
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
