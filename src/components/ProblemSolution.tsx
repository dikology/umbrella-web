import Card from './Card';

export default function ProblemSolution() {
  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Problem Statement */}
        <div className="text-center mb-16">
          <h2 className="
            font-display
            text-4xl md:text-5xl 
            font-semibold 
            text-ink-800 
            mb-6
            tracking-tight
          ">
            The Problem With Language Learning Today
          </h2>
          <p className="
            font-body
            text-lg md:text-xl 
            text-ink-500 
            max-w-3xl 
            mx-auto
          ">
            Traditional apps focus on drilling—not actual reading
          </p>
        </div>

        {/* Problem Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          <Card variant="flat" className="border-l-4 border-l-coral-500">
            <h3 className="
              font-display
              text-xl font-semibold 
              text-ink-800 
              mb-3
              flex items-center gap-2
            ">
              <span className="text-2xl">📚</span>
              The Problem
            </h3>
            <p className="font-body text-secondary leading-relaxed">
              Most learning apps are boring & repetitive. They teach vocabulary drilling, not reading comprehension.
            </p>
          </Card>

          <Card variant="flat" className="border-l-4 border-l-coral-500">
            <h3 className="
              font-display
              text-xl font-semibold 
              text-ink-800 
              mb-3
              flex items-center gap-2
            ">
              <span className="text-2xl">🔍</span>
              The Gap
            </h3>
            <p className="font-body text-secondary leading-relaxed">
              Duolingo, HelloChinese teach drilling, not reading. You can't read authentic text. No real-world application.
            </p>
          </Card>

          <Card variant="flat" className="border-l-4 border-l-coral-500">
            <h3 className="
              font-display
              text-xl font-semibold 
              text-ink-800 
              mb-3
              flex items-center gap-2
            ">
              <span className="text-2xl">😩</span>
              The Frustration
            </h3>
            <p className="font-body text-secondary leading-relaxed">
              You're stuck: vocabulary drills don't build real comprehension. Progress feels artificial and disconnected.
            </p>
          </Card>
        </div>

        {/* Divider */}
        <div className="relative mb-24">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-paper-300"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-surface px-6 py-2 font-display text-2xl text-ink-400">
              ⬇
            </span>
          </div>
        </div>

        {/* Solution Headline */}
        <div className="text-center mb-16">
          <h2 className="
            font-display
            text-4xl md:text-5xl 
            font-semibold 
            text-coral-600 
            mb-6
            tracking-tight
          ">
            Umbrella Does Reading Differently
          </h2>
          <p className="
            font-body
            text-lg md:text-xl 
            text-ink-500 
            max-w-3xl 
            mx-auto
          ">
            Learn through authentic content, matched to your level
          </p>
        </div>

        {/* Solution Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          <Card variant="elevated" className="border-l-4 border-l-coral-500">
            <h3 className="
              font-display
              text-xl font-semibold 
              text-ink-800 
              mb-3
              flex items-center gap-2
            ">
              <span className="text-2xl text-coral-600">✓</span>
              Authentic Texts
            </h3>
            <p className="font-body text-secondary leading-relaxed">
              Read real stories, news, essays—not robot sentences. Learn vocabulary in context, the way native speakers do.
            </p>
          </Card>

          <Card variant="elevated" className="border-l-4 border-l-coral-500">
            <h3 className="
              font-display
              text-xl font-semibold 
              text-ink-800 
              mb-3
              flex items-center gap-2
            ">
              <span className="text-2xl text-coral-600">✓</span>
              Your Level Content
            </h3>
            <p className="font-body text-secondary leading-relaxed">
              AI-powered difficulty matching. No more "too easy" or "impossible." Content that challenges but you can understand.
            </p>
          </Card>

          <Card variant="elevated" className="border-l-4 border-l-coral-500">
            <h3 className="
              font-display
              text-xl font-semibold 
              text-ink-800 
              mb-3
              flex items-center gap-2
            ">
              <span className="text-2xl text-coral-600">✓</span>
              Proficiency Tracking
            </h3>
            <p className="font-body text-secondary leading-relaxed">
              Watch your vocabulary grow week by week. Unlock HSK levels. Real metrics of improvement, not artificial points.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
