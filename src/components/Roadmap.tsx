export default function Roadmap() {
  const phases = [
    {
      phase: "Phase 1",
      timeframe: "Now",
      title: "iOS TestFlight Beta",
      items: ["Landing Page", "Privacy Policy", "Email Collection"],
      status: "current"
    },
    {
      phase: "Phase 2",
      timeframe: "Spring 2026",
      title: "Full Reading Platform",
      items: ["Web App Launch", "Proficiency Engine", "Offline Reading", "Smart Dictionary"],
      status: "upcoming"
    },
    {
      phase: "Phase 3",
      timeframe: "Summer 2026",
      title: "Classroom Tools",
      items: ["Teacher Dashboard", "Student Progress Tracking", "Assignment Management"],
      status: "upcoming"
    },
    {
      phase: "Phase 4",
      timeframe: "Fall 2026",
      title: "AI-Powered Learning",
      items: ["Personalized Content Generation", "Spaced Repetition", "Advanced Analytics"],
      status: "upcoming"
    }
  ];

  return (
    <section id="roadmap" className="py-16 md:py-24 bg-[var(--color-surface)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4">
            Building Umbrella With You
          </h2>
          <p className="text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            We're launching in phases. Here's what's coming. Your feedback shapes every feature.
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute top-24 left-0 right-0 h-0.5 bg-[var(--color-border)]"></div>

            <div className="grid grid-cols-4 gap-8">
              {phases.map((phase, index) => (
                <div key={phase.phase} className="relative">
                  {/* Timeline dot */}
                  <div className={`absolute -top-8 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white ${
                    phase.status === 'current' ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-border)]'
                  }`}></div>

                  <div className="bg-white border border-[var(--color-border)] rounded-lg p-6 shadow-sm h-64">
                    <div className="text-center">
                      <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 ${
                        phase.status === 'current'
                          ? 'bg-[var(--color-primary)] text-white'
                          : 'bg-gray-100 text-[var(--color-text-secondary)]'
                      }`}>
                        {phase.phase}
                      </div>
                      <div className="text-sm text-[var(--color-text-secondary)] mb-2">
                        {phase.timeframe}
                      </div>
                      <h3 className="text-lg font-semibold text-[var(--color-text)] mb-3">
                        {phase.title}
                      </h3>
                      <ul className="text-sm text-[var(--color-text-secondary)] space-y-1">
                        {phase.items.map((item, itemIndex) => (
                          <li key={itemIndex}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="md:hidden space-y-6">
          {phases.map((phase, index) => (
            <div key={phase.phase} className="relative">
              <div className="flex items-start gap-4">
                {/* Timeline dot */}
                <div className={`flex-shrink-0 w-4 h-4 rounded-full mt-2 ${
                  phase.status === 'current' ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-border)]'
                }`}></div>

                <div className="bg-white border border-[var(--color-border)] rounded-lg p-4 shadow-sm flex-1">
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-2 ${
                    phase.status === 'current'
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'bg-gray-100 text-[var(--color-text-secondary)]'
                  }`}>
                    {phase.phase} • {phase.timeframe}
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">
                    {phase.title}
                  </h3>
                  <ul className="text-sm text-[var(--color-text-secondary)] space-y-1">
                    {phase.items.map((item, itemIndex) => (
                      <li key={itemIndex}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Timeline line (except for last item) */}
              {index < phases.length - 1 && (
                <div className="absolute left-2 top-6 w-0.5 h-16 bg-[var(--color-border)]"></div>
              )}
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <p className="text-[var(--color-text-secondary)]">
            Ready to be part of the journey? Join our beta testers and help shape the future of language learning.
          </p>
        </div>
      </div>
    </section>
  );
}
