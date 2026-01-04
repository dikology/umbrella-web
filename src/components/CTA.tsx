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
    <section id="cta" className="py-16 md:py-24 bg-gradient-to-br from-primary to-teal-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Headline */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Read Better Chinese?
        </h2>

        {/* Subheading */}
        <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
          Join 500+ beta testers learning with Umbrella. Get free access to our iOS app and shape the future of language learning.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button
            onClick={handleGetAccess}
            className="w-full sm:w-auto px-8 py-4 text-lg h-14 bg-white text-primary hover:bg-gray-50"
          >
            Get TestFlight Access
          </Button>
          <Button
            variant="outline"
            onClick={handleJoinWaitlist}
            className="w-full sm:w-auto px-8 py-4 text-lg h-14 border-white text-white hover:bg-white hover:text-primary"
          >
            Or Join Waiting List
          </Button>
        </div>

        {/* Trust Signals */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-teal-100">
          <div className="flex items-center gap-2">
            <span className="text-green-300">✓</span>
            <span>Free iOS beta</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-300">✓</span>
            <span>Early access to web platform (Phase 2)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-300">✓</span>
            <span>Direct feedback influence</span>
          </div>
        </div>
      </div>
    </section>
  );
}
