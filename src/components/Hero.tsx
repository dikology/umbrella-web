'use client';

import Button from './Button';

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen bg-gradient-to-br from-teal-50 via-slate-50 to-white flex items-center justify-center pt-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Main Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[var(--color-text)] leading-tight mb-6">
          Read Authentic Chinese Texts.<br />
          <span className="block">Understand Every Word.</span><br />
          <span className="block">Track Your Progress.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-[var(--color-text-secondary)] mb-12 max-w-3xl mx-auto leading-relaxed">
          Learn to read Chinese the way you learn to read English—through stories, articles, and ideas that fascinate you. Not through endless vocabulary drills.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={() => scrollToSection('cta')}
            className="w-full sm:w-auto px-8 py-4 text-lg h-14"
          >
            Get TestFlight Access
          </Button>
          <Button
            variant="outline"
            onClick={() => scrollToSection('features')}
            className="w-full sm:w-auto px-8 py-4 text-lg h-14"
          >
            View Features
          </Button>
        </div>

        {/* Trust indicator */}
        <p className="mt-8 text-sm text-[var(--color-text-secondary)]">
          Join 500+ beta testers already learning with Umbrella
        </p>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[var(--color-primary)]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-100/30 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}
