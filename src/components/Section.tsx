import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  bgColor?: 'default' | 'surface' | 'primary';
  padding?: 'normal' | 'large';
}

export default function Section({
  children,
  className = '',
  bgColor = 'default',
  padding = 'normal'
}: SectionProps) {
  const bgStyles = {
    default: 'bg-bg',
    surface: 'bg-surface',
    primary: 'bg-gradient-to-br from-teal-50 to-slate-100'
  };

  const paddingStyles = {
    normal: 'py-16 md:py-20',
    large: 'py-20 md:py-32'
  };

  return (
    <section className={`${bgStyles[bgColor]} ${paddingStyles[padding]} ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
