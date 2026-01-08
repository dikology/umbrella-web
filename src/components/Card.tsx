import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  variant?: 'default' | 'elevated' | 'flat';
}

export default function Card({ 
  children, 
  className = '', 
  icon, 
  variant = 'default' 
}: CardProps) {
  const variantStyles = {
    default: 'bg-surface border border-border shadow-md hover:shadow-lg',
    elevated: 'bg-surface shadow-lg hover:shadow-xl',
    flat: 'bg-surface border border-border shadow-sm hover:shadow-md',
  };

  return (
    <div 
      className={`
        ${variantStyles[variant]}
        rounded-xl p-6 
        transition-all duration-300 
        ${className}
      `}
    >
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
  variant?: 'default' | 'centered' | 'left-aligned';
}

export function FeatureCard({ 
  icon, 
  title, 
  description,
  variant = 'centered' 
}: FeatureCardProps) {
  const iscentered = variant === 'centered';
  
  return (
    <Card variant="elevated" className="h-full">
      <div className={iscentered ? 'text-center' : 'text-left'}>
        <div className={`
          inline-flex items-center justify-center 
          w-14 h-14 
          bg-coral-50 
          rounded-2xl 
          mb-5
          ${iscentered ? '' : ''}
        `}>
          <div className="text-4xl">
            {icon}
          </div>
        </div>
        
        <h3 className="
          text-xl 
          font-semibold 
          text-ink-800 
          mb-3
          tracking-tight
        ">
          {title}
        </h3>
        
        <p className="
          text-secondary 
          leading-relaxed
          text-[15px]
        ">
          {description}
        </p>
      </div>
    </Card>
  );
}

interface PhoneMockupCardProps {
  imageSrc?: string;
  imageAlt?: string;
  title: string;
  description: string;
}

export function PhoneMockupCard({ 
  imageSrc, 
  imageAlt, 
  title, 
  description 
}: PhoneMockupCardProps) {
  return (
    <Card variant="elevated" className="overflow-hidden">
      {/* iPhone mockup container */}
      <div className="aspect-[9/19.5] bg-ink-800 rounded-[2.5rem] p-2 mx-auto max-w-[280px] shadow-2xl">
        <div className="w-full h-full bg-paper-50 rounded-[2rem] overflow-hidden relative">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-ink-800 rounded-b-2xl z-10"></div>
          
          {/* Screenshot placeholder */}
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-teal-50 to-paper-100">
            {imageSrc ? (
              <img 
                src={imageSrc} 
                alt={imageAlt || title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center p-8">
                <div className="text-6xl mb-4">📱</div>
                <p className="text-sm text-secondary">Screenshot placeholder</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Description below mockup */}
      <div className="mt-6 text-center">
        <h3 className="text-lg font-semibold text-ink-800 mb-2">{title}</h3>
        <p className="text-secondary text-sm leading-relaxed">{description}</p>
      </div>
    </Card>
  );
}
