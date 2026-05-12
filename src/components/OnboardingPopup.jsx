import { useState, useEffect } from 'react';
import { X, ArrowRight, Blocks, Eye, Download, Layout, Zap } from 'lucide-react';

const STEPS = [
  {
    icon: <Blocks size={28} />,
    title: 'Choose blocks',
    description: 'Pick from 11 ready‑made blocks — Title, Badges, Features, Installation, and more. Each block is a section of your README.',
    color: '#7c6dfa',
  },
  {
    icon: <Layout size={28} />,
    title: 'Fill in content',
    description: 'Edit each block with your project details. Upload screenshots, add badges, write descriptions — all in a clean visual editor.',
    color: '#fbbf24',
  },
  {
    icon: <Eye size={28} />,
    title: 'Preview live',
    description: 'See exactly how your README will look on GitHub — in real time. Toggle between Preview and Code view.',
    color: '#38bdf8',
  },
  {
    icon: <Download size={28} />,
    title: 'Export instantly',
    description: 'Copy the raw Markdown or download a complete README.md file with one click. Ready to commit!',
    color: '#4ade80',
  },
  {
    icon: <Zap size={28} />,
    title: 'No sign‑up required',
    description: 'Just enter any email — your work is saved locally in your browser. Nothing is sent to a server. Completely private.',
    color: '#ff57a0',
  },
];

export default function OnboardingPopup({ onClose }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Entrance animation
    requestAnimationFrame(() => setIsVisible(true));
  }, []);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => onClose?.(), 200);
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleClose();
    }
  };

  const step = STEPS[currentStep];
  const isLast = currentStep === STEPS.length - 1;

  return (
    <div
      className={`
        fixed inset-0 z-[100] flex items-center justify-center p-4
        transition-all duration-200
        ${isVisible && !isExiting ? 'bg-black/30 backdrop-blur-sm' : 'bg-transparent'}
      `}
      onClick={handleClose}
    >
      {/* Popup card */}
      <div
        onClick={e => e.stopPropagation()}
        className={`
          relative w-full max-w-md bg-white rounded-2xl shadow-2xl shadow-black/10
          border border-gray-100 overflow-hidden
          transition-all duration-300 ease-out
          ${isVisible && !isExiting ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'}
        `}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <X size={16} />
        </button>

        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100">
          <div
            className="h-full bg-gradient-to-r from-purple-500 via-amber-400 to-emerald-400 transition-all duration-500 ease-out"
            style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
          />
        </div>

        {/* Content */}
        <div className="p-8 pt-10 pb-6">
          {/* Icon */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-all duration-300"
            style={{ backgroundColor: `${step.color}10`, color: step.color }}
          >
            {step.icon}
          </div>

          {/* Step counter */}
          <div className="flex items-center justify-center gap-1.5 mb-4">
            {STEPS.map((_, idx) => (
              <div
                key={idx}
                className={`
                  w-1.5 h-1.5 rounded-full transition-all duration-300
                  ${idx === currentStep ? 'bg-gray-800 w-4' : idx < currentStep ? 'bg-gray-400' : 'bg-gray-200'}
                `}
              />
            ))}
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-gray-900 text-center mb-2">
            {step.title}
          </h2>

          {/* Description */}
          <p className="text-sm text-gray-500 text-center leading-relaxed mb-8">
            {step.description}
          </p>

          {/* Actions */}
          <div className="flex items-center justify-between gap-3">
            {/* Skip button */}
            <button
              onClick={handleClose}
              className="text-sm text-gray-400 hover:text-gray-600 transition-colors px-3 py-2"
            >
              Skip
            </button>

            {/* Navigation buttons */}
            <div className="flex items-center gap-2">
              {currentStep > 0 && (
                <button
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="text-sm text-gray-500 hover:text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
              )}
              <button
                onClick={handleNext}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-medium
                         hover:bg-gray-800 active:scale-[0.98] transition-all duration-150"
              >
                {isLast ? 'Got it' : 'Next'}
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 pb-6 text-center">
          <p className="text-[10px] text-gray-300">
            Your data stays local — no server, no tracking.
          </p>
        </div>
      </div>
    </div>
  );
}
