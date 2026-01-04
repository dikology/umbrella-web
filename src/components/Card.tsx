import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
}

export default function Card({ children, className = '', icon }: CardProps) {
  return (
    <div className={`bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow ${className}`}>
      {icon && (
        <div className="flex items-center gap-3 mb-4">
          <div className="text-[var(--color-primary)] text-xl">
            {icon}
          </div>
        </div>
      )}
      {children}
    </div>
  );
}

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card>
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-[var(--color-primary)]/10 rounded-lg mb-4">
          <div className="text-[var(--color-primary)] text-xl">
            {icon}
          </div>
        </div>
        <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">{title}</h3>
        <p className="text-[var(--color-text-secondary)] leading-relaxed">{description}</p>
      </div>
    </Card>
  );
}
