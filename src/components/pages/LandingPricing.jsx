import { CheckIcon, PlanIcon } from "./LandingIcons";

const freeFeatures = [
  "Visual block editor – no markdown needed",
  "Instant live preview as you build",
  "All block types: badges, screenshots, API, etc.",
  "Markdown & code view with syntax highlighting",
  "One‑click copy or download as README.md",
  "Works completely offline – your data stays local",
  "Multiple isolated workspaces (one per email)",
  "Clean, distraction‑free white interface",
];

const proFeatures = [
  "Everything in Free",
  "Custom block templates",
  "Screenshot cloud uploads",
  "Version history",
  "Priority support",
];

const maxFeatures = [
  "Everything in Pro",
  "5x more usage",
  "Team collaboration",
  "Advanced export options",
  "Early access to new features",
];

export default function LandingPricing() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-center text-4xl font-semibold tracking-tight mb-8">Explore plans</h1>

      {/* Tab Toggle */}
      <div className="flex justify-center mb-12">
        <div className="flex items-center bg-white rounded-full p-1.5 border border-gray-200 shadow-sm">
          <button className="px-5 py-2 rounded-full text-sm font-medium bg-gray-900 text-white shadow">
            Individual
          </button>
          <button className="px-5 py-2 rounded-full text-sm font-medium text-gray-600 hover:text-gray-900">
            Team and Enterprise
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-4">
        {/* Free */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col">
          <div className="mb-3 text-black font-bold">
            <PlanIcon />
          </div>
          <h2 className="text-3xl font-semibold mb-1">Free</h2>
          <p className="text-gray-500 text-sm mb-3">Try ReadmeForge</p>
          <div className="mb-1">
            <span className="text-3xl font-semibold">$0</span>
          </div>
          <p className="text-gray-500 text-sm mb-3">Free for everyone</p>
          <button className="relative top-5 w-full bg-black! text-white! rounded-lg py-2.5 font-medium hover:bg-gray-800 transition mb-8">
            Start building
          </button>
          <div className="border-t border-gray-300 pt-6 space-y-3">
            {freeFeatures.map((f, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <CheckIcon />
                <span className="text-sm text-gray-700">{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pro */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col">
          <div className="mb-3 text-black">
            <PlanIcon />
          </div>
          <h2 className="text-3xl font-semibold mb-1">Pro</h2>
          <p className="text-gray-500 text-sm mb-3">For everyday productivity</p>
          <div className="mb-1">
            <span className="text-3xl font-semibold">$17</span>
          </div>
          <p className="text-gray-500 text-sm mb-3">
            Per month with annual subscription discount ($200 billed up front). $20 if billed
            monthly.
          </p>
          <button className="w-full bg-black! text-white! rounded-lg py-2.5 font-medium hover:bg-gray-800 transition mb-1">
            Try Pro
          </button>
          <p className="text-center text-xs text-gray-700 mb-8">No commitment · Cancel anytime</p>
          <div className="border-t border-gray-300 pt-6">
            <p className="text-sm font-semibold mb-3">Everything in Free, plus:</p>
            <div className="space-y-3">
              {proFeatures.map((f, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckIcon />
                  <span className="text-sm text-gray-700">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Max */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col">
          <div className="mb-3 text-black">
            <PlanIcon />
          </div>
          <h2 className="text-3xl font-semibold mb-1">Max</h2>
          <p className="text-gray-500 text-sm mb-3">5‑20x more usage than Pro</p>
          <div className="mb-1">
            <span className="text-3xl font-semibold">From $100</span>
          </div>
          <p className="text-gray-500 text-sm mb-3">Per month billed monthly</p>
          <button className="relative top-4 w-full bg-black! text-white! rounded-lg py-2.5 font-medium hover:bg-gray-800 transition mb-1">
            Try Max
          </button>
          <span className="text-center text-xs text-gray-700! mb-8">
            No commitment · Cancel anytime
          </span>
          <div className="border-t border-gray-300 pt-6">
            <p className="text-sm font-semibold mb-3">Everything in Pro, plus:</p>
            <div className="space-y-3">
              {maxFeatures.map((f, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckIcon />
                  <span className="text-sm text-gray-700">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-gray-400 mb-20">
        *Usage limits apply. Prices shown don't include applicable tax. Prices and plans are subject
        to change.
      </p>
    </section>
  );
}
