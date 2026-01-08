'use client';

import Button from './Button';

export default function CTA() {
  const handleGetAccess = () => {
    // For now, just show an alert since email tech is not implemented yet
    alert('TestFlight access signup will be available soon! Check back later.');
  };

  const handleJoinWaitlist = () => {
    // For now, just show an alert since email tech is not implemented yet
    alert('Waiting list signup will be available soon! Check back later.');
  };

  return (
    <section 
      id="cta" 
      className="py-20 md:py-32 bg-gradient-to-br from-coral-500 via-coral-600 to-coral-700 relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Headline */}
        <h2 className="
          font-display
          text-4xl md:text-5xl lg:text-6xl 
          font-semibold 
          text-white 
          mb-8
          tracking-tight
        ">
          Ready to Read Better Chinese?
        </h2>

        {/* Subheading */}
        <p className="
          font-body
          text-lg md:text-xl 
          text-white/90 
          mb-10 
          max-w-3xl 
          mx-auto
          leading-relaxed
        ">
          Join testers learning with Umbrella. Get free access to our iOS app 
          and shape the future of language learning.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
          <button
            onClick={handleGetAccess}
            className="
              font-ui
              w-full sm:w-auto 
              px-8 py-4 
              text-lg font-semibold
              bg-white text-coral-600 
              hover:bg-coral-50 
              rounded-xl 
              shadow-xl hover:shadow-2xl
              transition-all duration-200
              active:scale-[0.98]
            "
          >
            Get TestFlight Access
          </button>
          <button
            onClick={handleJoinWaitlist}
            className="
              font-ui
              w-full sm:w-auto 
              px-8 py-4 
              text-lg font-semibold
              border-2 border-white 
              text-white 
              hover:bg-white hover:text-coral-600 
              rounded-xl 
              shadow-lg hover:shadow-xl
              transition-all duration-200
              active:scale-[0.98]
            "
          >
            Or Join Waiting List
          </button>
        </div>

        {/* Trust Signals */}
        <div className="
          flex flex-col sm:flex-row gap-6 
          justify-center items-center 
          font-body
          text-white/90
        ">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Free iOS beta</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Early web access (Phase 2)</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Shape our roadmap</span>
          </div>
        </div>
      </div>
    </section>
  );
}
