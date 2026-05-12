import { useState } from 'react';
import LoginModal from './LoginModal';

export default function LandingPage({ onLogin }) {
  const [showLogin, setShowLogin] = useState(false);

  const features = [
    {
      title: 'Visual Block Editor',
      desc: 'Drag, drop, and reorder sections like badges, features, and screenshots.',
      icon: '🧱',
    },
    {
      title: 'Instant Preview',
      desc: 'See exactly how your README will render on GitHub, in real time.',
      icon: '👁️',
    },
    {
      title: 'Markdown & Code View',
      desc: 'Toggle between a rich preview and raw markdown with syntax highlighting.',
      icon: '📝',
    },
    {
      title: 'No Account Required',
      desc: 'Your data is saved locally per email – no sign‑up, no server.',
      icon: '🔒',
    },
    {
      title: 'Export Ready',
      desc: 'Copy as markdown or download a perfect README.md with one click.',
      icon: '📦',
    },
    {
      title: 'Dark & Clean UI',
      desc: 'A distraction‑free writing environment inspired by modern code editors.',
      icon: '🌙',
    },
  ];

  const plans = [
    {
      name: 'Free',
      price: '$0',
      desc: 'Forever free for everyone.',
      features: [
        'Unlimited READMEs',
        'All block types',
        'Live markdown preview',
        'Copy & download',
        'Local storage per email',
      ],
      cta: 'Try ReadmeForge',
      popular: false,
    },
    {
      name: 'Pro',
      price: '$17',
      desc: 'Per month (annual discount)',
      features: [
        'Everything in Free',
        'Custom block templates',
        'Screenshot cloud uploads',
        'Version history',
        'Priority support',
      ],
      cta: 'Coming soon',
      popular: true,
    },
    {
      name: 'Max',
      price: '$100',
      desc: 'Per month, billed monthly',
      features: [
        'Everything in Pro',
        '5x more usage',
        'Team collaboration',
        'Advanced export options',
        'Early access to new features',
      ],
      cta: 'Coming soon',
      popular: false,
    },
  ];

  const faqs = [
    {
      q: 'What is ReadmeForge?',
      a: 'ReadmeForge is a visual README builder that helps you create stunning GitHub‑ready documentation without writing markdown manually.',
    },
    {
      q: 'Do I need an account?',
      a: 'No. Just enter any email to save your work locally in your browser. Nothing is sent to a server.',
    },
    {
      q: 'Can I switch between multiple projects?',
      a: 'Yes, you can log in with different emails – each email gets its own isolated workspace.',
    },
    {
      q: 'Is it really free?',
      a: 'Absolutely. The Free plan includes everything you need. Future Pro/Max plans will add advanced features but the core remains free.',
    },
    {
      q: 'Can I download my README?',
      a: 'Yes, you can copy the raw markdown or download a valid README.md file with one click.',
    },
  ];

  const footerLinks = {
    Product: ['Features', 'Pricing', 'Changelog', 'Roadmap'],
    Resources: ['Documentation', 'Tutorials', 'Community', 'Blog'],
    Legal: ['Privacy', 'Terms', 'License'],
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e8e8e0] font-sans">
      {/* Navigation */}
      <header className="sticky top-0 z-20 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📄</span>
            <span className="font-mono font-bold text-lg tracking-tight">ReadmeForge</span>
          </div>
          <button
            onClick={() => setShowLogin(true)}
            className="rounded-lg bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-[#e0e0e0] transition"
          >
            Sign in
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-4 pt-24 pb-16 text-center">
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-b from-white to-[#a0a0a0] bg-clip-text text-transparent">
          Think fast, build faster
        </h1>
        <p className="mt-6 text-lg text-[#888] max-w-2xl mx-auto">
          Brainstorm your project and build a beautiful, professional README in minutes — no
          markdown skills required.
        </p>
        <button
          onClick={() => setShowLogin(true)}
          className="mt-10 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-black hover:bg-[#e0e0e0] transition"
        >
          Start building for free
        </button>
      </section>

      {/* Features grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-20">
        <h2 className="text-center text-2xl font-bold mb-12">Everything you need</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/5 bg-[#0d0d0d] p-6 hover:border-white/10 transition"
            >
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-[#888]">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Plans */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-20">
        <h2 className="text-center text-2xl font-bold mb-4">Explore plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative rounded-2xl border p-6 flex flex-col ${
                plan.popular
                  ? 'border-[#ffd557] bg-[#0d0d0d] shadow-[0_0_25px_rgba(255,213,87,0.1)]'
                  : 'border-white/5 bg-[#0d0d0d]'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#ffd557] px-4 py-0.5 text-xs font-bold text-black">
                  Most popular
                </span>
              )}
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <p className="text-sm text-[#888] mt-1">{plan.desc}</p>
              <div className="mt-5 mb-6">
                <span className="text-4xl font-extrabold">{plan.price}</span>
                {plan.price !== '$0' && <span className="text-sm text-[#888]">/mo</span>}
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#b0b0b0]">
                    <span className="text-[#ffd557] mt-0.5">✓</span>
                    {feat}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setShowLogin(true)}
                className={`w-full rounded-lg py-2.5 text-sm font-semibold transition ${
                  plan.popular
                    ? 'bg-[#ffd557] text-black hover:bg-[#e6c149]'
                    : 'border border-white/10 text-white hover:bg-white/5'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 pb-20">
        <h2 className="text-center text-2xl font-bold mb-12">Frequently asked questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="group border border-white/5 rounded-xl overflow-hidden">
              <summary className="flex items-center justify-between px-6 py-4 cursor-pointer select-none hover:bg-white/[0.02]">
                <span className="font-medium">{faq.q}</span>
                <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="px-6 pb-4 text-sm text-[#888]">{faq.a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#0d0d0d]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-sm font-semibold mb-3">ReadmeForge</h4>
            <p className="text-xs text-[#666]">Build beautiful READMEs, fast.</p>
          </div>
          {Object.entries(footerLinks).map(([cat, links]) => (
            <div key={cat}>
              <h4 className="text-sm font-semibold mb-3">{cat}</h4>
              <ul className="space-y-2">
                {links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="text-xs text-[#888] hover:text-white transition">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/5 py-6 text-center text-xs text-[#555]">
          © {new Date().getFullYear()} ReadmeForge. All work saved locally.
        </div>
      </footer>

      {/* Login modal */}
      {showLogin && <LoginModal onLogin={onLogin} onClose={() => setShowLogin(false)} />}
    </div>
  );
}
