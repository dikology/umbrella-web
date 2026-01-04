import { FeatureCard } from './Card';

export default function Features() {
  return (
    <section id="features" className="py-16 md:py-24 bg-[var(--color-background)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4">
            How Umbrella Works
          </h2>
          <p className="text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Four key features that make reading Chinese texts accessible and enjoyable at any proficiency level.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          <FeatureCard
            icon="📖"
            title="Smart Dictionary at Your Fingertips"
            description="Tap any word. See instant translations, pinyin pronunciation, usage examples, and hear native speaker audio. No more switching between apps."
          />

          <FeatureCard
            icon="🎯"
            title="Adaptive Difficulty Matching"
            description="Our system learns your level by analyzing words you know. It recommends content that's challenging but readable—no more guesswork."
          />

          <FeatureCard
            icon="📱"
            title="Offline Reading Anywhere"
            description="Download texts once, read anywhere. Perfect for flights, commutes, or remote locations. Your progress syncs when you're back online."
          />

          <FeatureCard
            icon="📊"
            title="Progress Tracking & Analytics"
            description="Watch your vocabulary size grow week by week. Track HSK level progress, reading speed, and comprehension improvements with real metrics."
          />
        </div>
      </div>
    </section>
  );
}
