import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
}

export default function Card({ children, className = '', icon }: CardProps) {
  return (
    <div className={`bg-surface border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow ${className}`}>
      {icon && (
        <div className="flex items-center gap-3 mb-4">
          <div className="text-primary text-xl">
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
        <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
          <div className="text-primary text-xl">
            {icon}
          </div>
        </div>
        <h3 className="text-lg font-semibold text-primary-text mb-2">{title}</h3>
        <p className="text-secondary leading-relaxed">{description}</p>
      </div>
    </Card>
  );
}
