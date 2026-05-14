import { useState } from "react";

const faqItems = [
  {
    q: "What is ReadmeForge?",
    a: "ReadmeForge is a visual README builder that helps you create stunning GitHub‑ready documentation without writing markdown manually. Drag‑and‑drop blocks, live preview, and one‑click export make it effortless.",
  },
  {
    q: "Do I need an account?",
    a: "No. Just enter any email to save your work locally in your browser. Nothing is sent to a server – your data is completely private.",
  },
  {
    q: "How does local storage work?",
    a: "Your README data is stored in your browser's local storage, keyed by the email you provide. You can even switch between different emails for separate projects.",
  },
  {
    q: "Is it really free?",
    a: "Absolutely. The Free plan includes everything you need. Future Pro and Max plans will unlock advanced features, but the core experience remains free forever.",
  },
];

export default function LandingFAQ() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <section className="max-w-2xl mx-auto mb-24 sm:max-w-3xl">
      <h2 className="text-3xl font-semibold text-center mb-10">Frequently asked questions</h2>
      <div className="divide-y divide-gray-200 border-t border-gray-200">
        {faqItems.map((faq, i) => (
          <div key={i}>
            <button
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              className="w-full flex items-center justify-between py-5 px-6 sm:px-0 text-left text-base font-medium text-gray-900 hover:text-gray-700 transition"
            >
              {faq.q}
              <span className="ml-4 flex-shrink-0 text-gray-400">
                {openFaq === i ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12"/></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4"/></svg>
                )}
              </span>
            </button>
            {openFaq === i && (
              <p className="pb-5 px-4 sm:px-0 text-sm text-gray-600 leading-relaxed">{faq.a}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
