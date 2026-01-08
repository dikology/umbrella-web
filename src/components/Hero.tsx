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
    <section 
      id="hero" 
      className="relative min-h-screen bg-gradient-to-br from-paper-100 via-paper-50 to-coral-50 flex items-center justify-center pt-16"
    >
      <div className="max-w-5xl mx-auto px-4 text-center">
        {/* Main Headline - Book-inspired typography */}
        <h1 className="
          font-display
          text-5xl md:text-6xl lg:text-7xl 
          font-semibold 
          text-ink-800 
          leading-[1.15]
          tracking-tight 
          mb-8
        ">
          <span className="block mb-2">Read Authentic</span>
          <span className="block mb-2">Chinese Texts.</span>
          <span className="block text-coral-600">At Your Level.</span>
        </h1>

        {/* Subtitle - Serif body text */}
        <p className="
          font-body
          text-lg md:text-xl lg:text-2xl 
          text-ink-500
          mb-12 
          max-w-3xl 
          mx-auto 
          leading-relaxed
        ">
          Learn to read Chinese the way you learn your native language. Through stories, 
          articles, and ideas that fascinate you.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
          <Button
            onClick={() => scrollToSection('cta')}
            className="w-full sm:w-auto px-8 py-4 text-base h-14"
          >
            Get TestFlight Access
          </Button>
          <Button
            variant="outline"
            onClick={() => scrollToSection('features')}
            className="w-full sm:w-auto px-8 py-4 text-base h-14"
          >
            View Features
          </Button>
        </div>

        {/* Trust indicator - Small serif text */}
        <div className="flex items-center justify-center gap-2 text-sm text-ink-400">
          <svg 
            className="w-5 h-5 text-coral-500" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path 
              fillRule="evenodd" 
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
              clipRule="evenodd" 
            />
          </svg>
          <span className="font-body">Join testers already learning with Umbrella</span>
        </div>
      </div>

      {/* Background decoration - Subtle, paper-like */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-coral-100 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-coral-50 rounded-full blur-3xl"></div>
        
        {/* Book page texture overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234A4237' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>
    </section>
  );
}
