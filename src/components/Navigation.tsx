'use client';

import { useState, useEffect } from 'react';
import Button from './Button';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`
      fixed top-0 left-0 right-0 z-50 
      transition-all duration-300 
      ${isScrolled 
        ? 'bg-paper-50/95 backdrop-blur-md shadow-lg border-b border-paper-300' 
        : 'bg-transparent'
      }
    `}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection('hero')}
              className="
                font-display
                text-2xl font-semibold 
                text-coral-600 
                hover:text-coral-700 
                transition-colors
                tracking-tight
              "
            >
              Umbrella
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button
                onClick={() => scrollToSection('features')}
                className="
                  font-ui
                  text-ink-500 hover:text-ink-800 
                  px-3 py-2 
                  text-sm font-medium 
                  transition-colors
                  relative
                  after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 
                  after:bg-coral-500 after:transition-all after:duration-200
                  hover:after:w-full
                "
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="
                  font-ui
                  text-ink-500 hover:text-ink-800 
                  px-3 py-2 
                  text-sm font-medium 
                  transition-colors
                  relative
                  after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 
                  after:bg-coral-500 after:transition-all after:duration-200
                  hover:after:w-full
                "
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection('roadmap')}
                className="
                  font-ui
                  text-ink-500 hover:text-ink-800 
                  px-3 py-2 
                  text-sm font-medium 
                  transition-colors
                  relative
                  after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 
                  after:bg-coral-500 after:transition-all after:duration-200
                  hover:after:w-full
                "
              >
                Roadmap
              </button>
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              onClick={() => scrollToSection('cta')}
              size="sm"
            >
              Get Beta Access
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="
                inline-flex items-center justify-center 
                p-2 rounded-lg 
                text-ink-500 hover:text-ink-700 
                hover:bg-paper-200 
                focus:outline-none focus:ring-2 focus:ring-inset focus:ring-coral-500
                transition-colors
              "
            >
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-paper-50/95 backdrop-blur-md border-t border-paper-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button
              onClick={() => scrollToSection('features')}
              className="
                font-ui
                text-ink-500 hover:text-ink-700 hover:bg-paper-200
                block px-3 py-2 rounded-lg
                text-base font-medium 
                w-full text-left
                transition-colors
              "
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="
                font-ui
                text-ink-500 hover:text-ink-700 hover:bg-paper-200
                block px-3 py-2 rounded-lg
                text-base font-medium 
                w-full text-left
                transition-colors
              "
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('roadmap')}
              className="
                font-ui
                text-ink-500 hover:text-ink-700 hover:bg-paper-200
                block px-3 py-2 rounded-lg
                text-base font-medium 
                w-full text-left
                transition-colors
              "
            >
              Roadmap
            </button>
            <div className="pt-4 pb-3 border-t border-paper-300">
              <Button
                onClick={() => scrollToSection('cta')}
                className="w-full"
              >
                Get Beta Access
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
