import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Privacy Policy - Umbrella',
  description: 'Umbrella\'s privacy policy - how we collect, use, and protect your data.',
  robots: 'index, follow',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="max-w-4xl mx-auto px-4 py-16">
        <article className="prose prose-lg prose-slate max-w-none">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary-text mb-4">
              Privacy Policy
            </h1>
            <div className="text-secondary">
              <p className="text-lg">Last Updated: January 4, 2026</p>
              <p className="text-lg">Effective Date: January 10, 2026</p>
            </div>
          </header>

          <section>
            <h2>1. Introduction</h2>
            <p>
              Welcome to <strong>Umbrella</strong> (&ldquo;<strong>we</strong>&rdquo;, &ldquo;<strong>us</strong>&rdquo;, &ldquo;<strong>our</strong>&rdquo;, or &ldquo;<strong>Company</strong>&rdquo;).
              Umbrella is a Chinese language learning platform built to help you read authentic Chinese texts at your proficiency level.
            </p>
            <p>
              We take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and protect information when you visit our website (currently umbrella-app.com, the &ldquo;<strong>Site</strong>&rdquo;), use our iOS mobile application (currently available via TestFlight, the &ldquo;<strong>App</strong>&rdquo;), and interact with our services (collectively, the &ldquo;<strong>Services</strong>&rdquo;).
            </p>
            <p className="font-semibold text-primary-text">
              Please read this Privacy Policy carefully. By accessing or using our Services, you acknowledge that you have read, understood, and agree to be bound by all the terms of this Privacy Policy. If you do not agree, please do not use our Services.
            </p>
          </section>

          <section>
            <h2>2. Information We Collect</h2>

            <h3>2.1 Information You Provide Directly</h3>
            <h4>Email Address</h4>
            <p>When you sign up for our TestFlight beta or join our waiting list, we require your email address. When you contact us for support or provide feedback, we collect the email, subject, and message content.</p>

            <h4>Apple ID (Optional)</h4>
            <p>If you choose to provide your Apple ID when requesting TestFlight access, we store it to facilitate beta testing invitations. Your Apple ID is not shared with anyone except Apple Inc. for TestFlight administration.</p>

            <h4>Feedback & Surveys</h4>
            <p>If you voluntarily provide feedback through surveys, TestFlight feedback forms, or support messages. This helps us improve the product and may be used in testimonials (with your permission).</p>

            <h3>2.2 Information Automatically Collected</h3>
            <h4>Website Analytics</h4>
            <ul>
              <li><strong>IP Address (Anonymized):</strong> Last octet hashed; used to understand traffic geography</li>
              <li><strong>Device & Browser:</strong> Device type (iPhone, iPad, desktop), OS, browser name/version</li>
              <li><strong>Page Views & Navigation:</strong> Which landing page sections you viewed, how long you spent on each</li>
              <li><strong>Referrer:</strong> What link/source brought you to our site</li>
              <li><strong>Events:</strong> Button clicks, form submissions, modal opens</li>
              <li><strong>Scroll Depth:</strong> How far down the page you scrolled (25%, 50%, 75%, 100%)</li>
              <li><strong>Session Duration:</strong> Time on site</li>
            </ul>
          </section>

          <section>
            <h2>3. How We Use Your Information</h2>
            <ul>
              <li><strong>To Provide Services:</strong> Email delivery of TestFlight invitations, customer support responses, beta testing administration</li>
              <li><strong>To Communicate:</strong> Product updates, invitations to beta phases, surveys, event announcements</li>
              <li><strong>To Improve Services:</strong> Analyze user behavior, identify technical issues, A/B test designs, measure conversion rates</li>
              <li><strong>For Research & Analytics:</strong> Aggregate usage statistics (not tied to individuals)</li>
              <li><strong>Legal & Compliance:</strong> Enforce Terms of Service, respond to legal requests</li>
            </ul>
          </section>

          <section>
            <h2>4. Data Sharing & Third Parties</h2>
            <p className="font-semibold"><strong>We do NOT sell your data.</strong> We do share limited information with service providers:</p>
            <ul>
              <li><strong>Apple TestFlight:</strong> Email, Apple ID for beta distribution</li>
              <li><strong>Email Provider:</strong> Email address for sending invitations (encrypted)</li>
              <li><strong>Analytics:</strong> Anonymized IP, page views, events</li>
              <li><strong>Cloud Hosting:</strong> Encrypted database backups</li>
            </ul>
          </section>

          <section>
            <h2>5. Data Retention</h2>
            <table className="min-w-full border border-border my-4">
              <thead className="bg-surface">
                <tr>
                  <th className="border border-border px-4 py-2 text-left">Data Type</th>
                  <th className="border border-border px-4 py-2 text-left">Retention Period</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border px-4 py-2">Email (signup)</td>
                  <td className="border border-border px-4 py-2">Until unsubscribe or 2 years</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2">Analytics</td>
                  <td className="border border-border px-4 py-2">90 days</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2">TestFlight Feedback</td>
                  <td className="border border-border px-4 py-2">1 year</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section>
            <h2>6. Your Privacy Rights</h2>
            <h3>If you are in the European Union (GDPR):</h3>
            <ul>
              <li>✓ <strong>Right to Access:</strong> Request a copy of all data we hold about you</li>
              <li>✓ <strong>Right to Correction:</strong> Ask us to fix inaccurate information</li>
              <li>✓ <strong>Right to Erasure:</strong> Request deletion (&ldquo;right to be forgotten&rdquo;)</li>
              <li>✓ <strong>Right to Data Portability:</strong> Download your data in standard format</li>
              <li>✓ <strong>Right to Object:</strong> Opt-out of marketing emails, analytics</li>
              <li>✓ <strong>Right to Withdraw Consent:</strong> Withdraw consent anytime</li>
            </ul>

            <h3>If you are in California (CCPA):</h3>
            <ul>
              <li>✓ <strong>Right to Know:</strong> Learn what personal information we collect</li>
              <li>✓ <strong>Right to Delete:</strong> Request deletion (with some exceptions)</li>
              <li>✓ <strong>Right to Opt-Out:</strong> Opt-out of any &ldquo;sale&rdquo; of personal information</li>
              <li>✓ <strong>Right to Non-Discrimination:</strong> We will not discriminate</li>
            </ul>
          </section>

          <section>
            <h2>7. Data Security</h2>
            <p><strong>How We Protect Your Data:</strong></p>
            <ul>
              <li><strong>Transmission:</strong> TLS/HTTPS encryption (256-bit, AES)</li>
              <li><strong>Storage:</strong> AES-256 encryption at rest</li>
              <li><strong>Access Control:</strong> Role-based access; employees only access data they need</li>
              <li><strong>Monitoring:</strong> Automated intrusion detection; real-time alerts</li>
            </ul>
          </section>

          <section>
            <h2>8. Children&apos;s Privacy (COPPA)</h2>
            <p>Our Services are intended for ages 13+. We do not knowingly collect information from children under 13 in the US.</p>
            <p>If you are a minor (13-17) in the US, we recommend reviewing this policy with your parent/guardian. You have the same privacy rights as adults.</p>
          </section>

          <section>
            <h2>9. Contact Information</h2>
            <p><strong>Privacy Questions or Requests:</strong></p>
            <p>Email: <a href="mailto:privacy@umbrella-app.com" className="text-primary">privacy@umbrella-app.com</a></p>
            <p>We&apos;ll respond within 30 days.</p>
          </section>

          <section>
            <h2>10. Updates to This Policy</h2>
            <p>We may update this Privacy Policy as our Services evolve. We will notify you of material changes via email (30 days notice) and post the updated policy with a new &ldquo;Last Updated&rdquo; date.</p>
            <p>Your continued use of our Services after updates means you accept the new policy.</p>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}
