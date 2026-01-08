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
    <footer className="bg-ink-700 border-t border-ink-600">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Brand section */}
        <div className="mb-12 text-center">
          <h2 className="
            font-display
            text-3xl font-semibold
            text-white
            mb-3
          ">
            Umbrella
          </h2>
          <p className="
            font-body
            text-ink-300 
            max-w-2xl 
            mx-auto
          ">
            Learn to read Chinese through authentic texts, matched to your level
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <h3 className="
              font-ui
              text-sm font-semibold
              text-white
              uppercase tracking-wider
              mb-4
            ">
              About
            </h3>
            <ul className="font-body space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="text-ink-300 hover:text-coral-400 transition-colors"
                >
                  About Umbrella
                </button>
              </li>
              {/* <li>
                <a
                  href="#"
                  className="text-ink-300 hover:text-coral-400 transition-colors"
                >
                  Blog (Coming)
                </a>
              </li> */}
              {/* <li>
                <a
                  href="mailto:hello@umbrella-app.com"
                  className="text-ink-300 hover:text-coral-400 transition-colors"
                >
                  Contact
                </a>
              </li> */}
            </ul>
          </div>

          {/* Column 2: Product */}
          <div>
            <h3 className="
              font-ui
              text-sm font-semibold
              text-coral-200
              uppercase tracking-wider
              mb-4
            ">
              Product
            </h3>
            <ul className="font-body space-y-3">
              <li>
                <a
                  href="#"
                  className="text-ink-300 hover:text-coral-400 transition-colors"
                >
                  iOS App (TestFlight)
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-ink-300 hover:text-coral-400 transition-colors"
                >
                  Web App (Roadmap)
                </a>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('roadmap')}
                  className="text-ink-300 hover:text-coral-400 transition-colors"
                >
                  Roadmap
                </button>
              </li>
              <li>
                <a
                  href="mailto:support@umbrella-app.com"
                  className="text-ink-300 hover:text-coral-400 transition-colors"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h3 className="
              font-ui
              text-sm font-semibold
              text-coral-200
              uppercase tracking-wider
              mb-4
            ">
              Legal
            </h3>
            <ul className="font-body space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="text-ink-300 hover:text-coral-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              {/* <li>
                <a
                  href="#"
                  className="text-ink-300 hover:text-coral-400 transition-colors"
                >
                  Terms of Service
                </a>
              </li> */}
              {/* <li>
                <a
                  href="#"
                  className="text-ink-300 hover:text-coral-400 transition-colors"
                >
                  Cookie Policy
                </a>
              </li> */}
              {/* <li>
                <a
                  href="#"
                  className="text-ink-300 hover:text-coral-400 transition-colors"
                >
                  Disclaimer
                </a>
              </li> */}
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h3 className="
              font-ui
              text-sm font-semibold
              text-coral-200
              uppercase tracking-wider
              mb-4
            ">
              Company
            </h3>
            <ul className="font-body space-y-3">
              <li className="text-ink-300">
                Made by language learners, for language learners
              </li>
              <li className="text-ink-300 text-sm">
                © 2026 Umbrella Language Learning
              </li>
              <li className="text-ink-300 text-sm">
                Version 0.1.0
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-ink-600">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="font-body text-ink-400 text-sm">
              © 2026 Umbrella Language Learning. Helping you read Chinese fluently.
            </p>
            <p className="font-body text-ink-400 text-sm mt-2 md:mt-0">
              Made with ❤️ for language learners worldwide.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
