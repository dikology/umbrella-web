import { FeatureCard, PhoneMockupCard } from './Card';

export default function Features() {
  return (
    <section id="features" className="py-20 md:py-32 bg-paper-100">
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
            How Umbrella Works
          </h2>
          <p className="
            font-body
            text-lg md:text-xl 
            text-ink-500 
            max-w-3xl 
            mx-auto
            leading-relaxed
          ">
            Four key features that make reading Chinese texts accessible and enjoyable 
            at any proficiency level.
          </p>
        </div>

        {/* Feature Grid with descriptions */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <FeatureCard
            icon="📖"
            title="Smart Dictionary at Your Fingertips"
            description="Tap any word. See instant translations, pinyin pronunciation, usage examples, and hear native speaker audio. No more switching between apps."
            variant="left-aligned"
          />

          <FeatureCard
            icon="🎯"
            title="Adaptive Difficulty Matching"
            description="Our system learns your level by analyzing words you know. It recommends content that's challenging but readable—no more guesswork."
            variant="left-aligned"
          />

          <FeatureCard
            icon="📱"
            title="Offline Reading Anywhere"
            description="Download texts once, read anywhere. Perfect for flights, commutes, or remote locations. Your progress syncs when you're back online."
            variant="left-aligned"
          />

          <FeatureCard
            icon="📊"
            title="Progress Tracking & Analytics"
            description="Watch your vocabulary size grow week by week. Track HSK level progress, reading speed, and comprehension improvements with real metrics."
            variant="left-aligned"
          />
        </div>

        {/* iPhone Mockups Section */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h3 className="
              font-display
              text-3xl md:text-4xl 
              font-semibold 
              text-ink-800 
              mb-4
              tracking-tight
            ">
              See It In Action
            </h3>
            <p className="
              font-body
              text-lg 
              text-ink-500 
              max-w-2xl 
              mx-auto
            ">
              Experience the app through these key screens
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <PhoneMockupCard
              title="Your Library"
              description="Organize and manage all your Chinese reading materials in one beautiful interface"
            />

            <PhoneMockupCard
              title="Instant Dictionary"
              description="Tap any word for instant translation, pinyin, and audio pronunciation"
            />

            <PhoneMockupCard
              title="Track Progress"
              description="Watch your vocabulary and HSK level grow as you read"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
