export default function Roadmap() {
  const phases = [
    {
      phase: "Phase 1",
      timeframe: "Now",
      title: "iOS TestFlight Beta",
      items: ["Landing Page", "Privacy Policy", "Email Collection", "Smart Dictionary"],
      status: "current"
    },
    {
      phase: "Phase 2",
      timeframe: "Somewhere in 2026",
      title: "Full Reading Platform",
      items: ["Web App Launch", "Proficiency Engine", "Device Syncing"],
      status: "upcoming"
    },
    {
      phase: "Phase 3",
      timeframe: "Somewhere in 2026",
      title: "Classroom Tools",
      items: ["Teacher Dashboard", "Student Progress Tracking", "Assignment Management"],
      status: "upcoming"
    },
    {
      phase: "Phase 4",
      timeframe: "Somewhere in 2026",
      title: "AI-Powered Learning",
      items: ["Personalized Content Generation", "Advanced Analytics"],
      status: "upcoming"
    }
  ];

  return (
    <section id="roadmap" className="py-20 md:py-32 bg-paper-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="
            font-display
            text-4xl md:text-5xl lg:text-6xl 
            font-semibold 
            text-ink-800 
            mb-6
            tracking-tight
          ">
            Building Umbrella With You
          </h2>
          <p className="
            font-body
            text-lg md:text-xl 
            text-ink-500 
            max-w-3xl 
            mx-auto
            leading-relaxed
          ">
            We're launching in phases. Here's what's coming. Your feedback shapes every feature.
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute top-24 left-0 right-0 h-1 bg-paper-300 rounded-full"></div>

            <div className="grid grid-cols-4 gap-8">
              {phases.map((phase, index) => (
                <div key={phase.phase} className="relative">
                  {/* Timeline dot */}
                  <div className={`
                    absolute -top-8 left-1/2 transform -translate-x-1/2 
                    w-5 h-5 rounded-full 
                    border-4 border-paper-100 
                    ${phase.status === 'current' ? 'bg-coral-500' : 'bg-paper-400'}
                  `}></div>

                  <div className="
                    bg-surface 
                    border border-paper-300 
                    rounded-xl 
                    p-6 
                    shadow-lg 
                    hover:shadow-xl
                    transition-shadow
                    h-72
                  ">
                    <div className="text-center">
                      <div className={`
                        font-ui
                        inline-block px-4 py-1.5 
                        rounded-full 
                        text-sm font-semibold 
                        mb-3 
                        ${phase.status === 'current'
                          ? 'bg-coral-500 text-white'
                          : 'bg-paper-200 text-ink-600'
                        }
                      `}>
                        {phase.phase}
                      </div>
                      <div className="font-ui text-sm text-ink-400 mb-3">
                        {phase.timeframe}
                      </div>
                      <h3 className="
                        font-display
                        text-lg font-semibold 
                        text-ink-800 
                        mb-4
                      ">
                        {phase.title}
                      </h3>
                      <ul className="font-body text-sm text-ink-500 space-y-2 text-left">
                        {phase.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-2">
                            <span className="text-coral-500 mt-0.5">•</span>
                            <span>{item}</span>
                          </li>
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
                <div className={`
                  flex-shrink-0 w-5 h-5 rounded-full mt-2 
                  ${phase.status === 'current' ? 'bg-coral-500' : 'bg-paper-400'}
                `}></div>

                <div className="
                  bg-surface 
                  border border-paper-300 
                  rounded-xl 
                  p-5 
                  shadow-lg 
                  flex-1
                ">
                  <div className={`
                    font-ui
                    inline-block px-3 py-1 
                    rounded-full 
                    text-sm font-semibold 
                    mb-2 
                    ${phase.status === 'current'
                      ? 'bg-coral-500 text-white'
                      : 'bg-paper-200 text-ink-600'
                    }
                  `}>
                    {phase.phase} • {phase.timeframe}
                  </div>
                  <h3 className="
                    font-display
                    text-lg font-semibold 
                    text-ink-800 
                    mb-3
                  ">
                    {phase.title}
                  </h3>
                  <ul className="font-body text-sm text-ink-500 space-y-2">
                    {phase.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2">
                        <span className="text-coral-500 mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Timeline line (except for last item) */}
              {index < phases.length - 1 && (
                <div className="absolute left-2 top-6 w-1 h-20 bg-paper-300 rounded-full"></div>
              )}
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-20">
          <p className="font-body text-lg text-ink-500 max-w-2xl mx-auto leading-relaxed">
            Ready to be part of the journey? Join our beta testers and help shape the future of language learning.
          </p>
        </div>
      </div>
    </section>
  );
}
