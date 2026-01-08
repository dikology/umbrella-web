import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles = `
    font-ui
    inline-flex items-center justify-center 
    font-medium
    rounded-xl 
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500
    disabled:opacity-50 disabled:cursor-not-allowed
    active:scale-[0.98]
  `;

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantStyles = {
    primary: `
      bg-coral-500 text-white 
      hover:bg-coral-600 
      shadow-md hover:shadow-lg
    `,
    secondary: `
      bg-paper-200 text-ink-800 
      border border-paper-400 
      hover:bg-paper-300 hover:border-paper-500
      shadow-sm hover:shadow-md
    `,
    outline: `
      border-2 border-coral-500 text-coral-600 
      hover:bg-coral-500 hover:text-white
      shadow-sm hover:shadow-md
    `,
    ghost: `
      text-ink-600 
      hover:bg-paper-200
    `,
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
