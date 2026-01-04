import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import ProblemSolution from '@/components/ProblemSolution';
import Features from '@/components/Features';
import Roadmap from '@/components/Roadmap';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Umbrella - Read Authentic Chinese Texts at Your Level',
  description: 'Learn Chinese through reading. Adaptive difficulty, instant dictionary, offline access. Join beta testers on iOS.',
  keywords: 'learn Chinese, Chinese reading app, HSK, Chinese comprehension, adaptive learning',
  openGraph: {
    title: 'Umbrella - Read Chinese Authentically',
    description: 'Smart reading app with adaptive difficulty for learning Chinese through authentic texts.',
    type: 'website',
  },
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <ProblemSolution />
        <Features />
        <Roadmap />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
