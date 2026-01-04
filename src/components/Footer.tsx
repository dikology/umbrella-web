'use client';

import Link from 'next/link';

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[--color-surface] border-t border-[--color-border]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <h3 className="text-sm font-semibold text-[--color-text] uppercase tracking-wider mb-4">
              About
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="text-[--color-text-secondary] hover:text-[--color-primary] transition-colors"
                >
                  About Umbrella
                </button>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[--color-text-secondary] hover:text-[--color-primary] transition-colors"
                >
                  Blog (Coming)
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@umbrella-app.com"
                  className="text-[--color-text-secondary] hover:text-[--color-primary] transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[--color-text-secondary] hover:text-[--color-primary] transition-colors"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Product */}
          <div>
            <h3 className="text-sm font-semibold text-[--color-text] uppercase tracking-wider mb-4">
              Product
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-[--color-text-secondary] hover:text-[--color-primary] transition-colors"
                >
                  iOS App (TestFlight)
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[--color-text-secondary] hover:text-[--color-primary] transition-colors"
                >
                  Web App (Roadmap)
                </a>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('roadmap')}
                  className="text-[--color-text-secondary] hover:text-[--color-primary] transition-colors"
                >
                  Roadmap
                </button>
              </li>
              <li>
                <a
                  href="mailto:support@umbrella-app.com"
                  className="text-[--color-text-secondary] hover:text-[--color-primary] transition-colors"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h3 className="text-sm font-semibold text-[--color-text] uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-[--color-text-secondary] hover:text-[--color-primary] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[--color-text-secondary] hover:text-[--color-primary] transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[--color-text-secondary] hover:text-[--color-primary] transition-colors"
                >
                  Cookie Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[--color-text-secondary] hover:text-[--color-primary] transition-colors"
                >
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h3 className="text-sm font-semibold text-[--color-text] uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              <li className="text-[--color-text-secondary]">
                Made by language learners, for language learners
              </li>
              <li className="text-[--color-text-secondary] text-sm">
                © 2026 Umbrella Language Learning
              </li>
              <li className="text-[--color-text-secondary] text-sm">
                Version 1.0.0
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-8 pt-8 border-t border-[--color-border]">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[--color-text-secondary] text-sm">
              © 2026 Umbrella Language Learning. Helping you read Chinese fluently.
            </p>
            <p className="text-[--color-text-secondary] text-sm mt-2 md:mt-0">
              Made with ❤️ for language learners worldwide.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
