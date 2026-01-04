import Card from './Card';

export default function ProblemSolution() {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Problem Statement */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-text mb-4">
            The Problem With Language Learning Today
          </h2>
        </div>

        {/* Problem Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <Card>
            <h3 className="text-xl font-semibold text-primary-text mb-3">📚 The Problem</h3>
            <p className="text-secondary leading-relaxed">
              Most learning apps are boring & repetitive. They teach vocabulary drilling, not reading comprehension.
            </p>
          </Card>

          <Card>
            <h3 className="text-xl font-semibold text-primary-text mb-3">🔍 The Gap</h3>
            <p className="text-secondary leading-relaxed">
              Duolingo, HelloChinese teach drilling, not reading. You can't read authentic text. No real-world application.
            </p>
          </Card>

          <Card>
            <h3 className="text-xl font-semibold text-primary-text mb-3">😩 The Frustration</h3>
            <p className="text-secondary leading-relaxed">
              You're stuck: vocabulary drills don't build real comprehension. Progress feels artificial and disconnected.
            </p>
          </Card>
        </div>

        {/* Solution Headline */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-text">
            Umbrella Does Reading Differently
          </h2>
        </div>

        {/* Solution Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <h3 className="text-xl font-semibold text-primary-text mb-3">✓ Authentic Texts</h3>
            <p className="text-secondary leading-relaxed">
              Read real stories, news, essays—not robot sentences. Learn vocabulary in context, the way native speakers do.
            </p>
          </Card>

          <Card>
            <h3 className="text-xl font-semibold text-primary-text mb-3">✓ Your Level Content</h3>
            <p className="text-secondary leading-relaxed">
              AI-powered difficulty matching. No more "too easy" or "impossible." Content that challenges but you can understand.
            </p>
          </Card>

          <Card>
            <h3 className="text-xl font-semibold text-primary-text mb-3">✓ Proficiency Tracking</h3>
            <p className="text-secondary leading-relaxed">
              Watch your vocabulary grow week by week. Unlock HSK levels. Real metrics of improvement, not artificial points.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
