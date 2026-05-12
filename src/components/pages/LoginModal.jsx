import { useState } from 'react';
import { X, Mail, ArrowRight, Shield } from 'lucide-react';

export default function LoginModal({ onLogin, onClose, inline = false, inputRef }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError('Please enter a valid email address.');
      return;
    }
    onLogin(trimmed);
  };

  const card = (
    <div className="w-full max-w-md rounded-2xl bg-white border border-gray-200 p-6 shadow-2xl shadow-gray-900/10">
      {/* Header — only show close button when used as overlay */}
      {!inline && (
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📄</span>
            <h2 className="text-lg font-bold text-gray-900">Sign in to ReadmeForge</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          {!inline && (
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email address
            </label>
          )}
          <div className="relative">
            <Mail
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              ref={inputRef}
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              placeholder="you@example.com"
              className="w-full rounded-xl bg-gray-50 border border-gray-200 pl-10 pr-4 py-2.5 text-sm text-gray-900
                         placeholder:text-gray-400
                         focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-400/10 focus:bg-white
                         transition-all duration-200"
            />
          </div>
          {error && (
            <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
              <span>⚠️</span> {error}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full rounded-xl bg-gray-900 py-2.5 text-sm font-semibold text-white
                     hover:bg-gray-800 active:scale-[0.98]
                     transition-all duration-200 flex items-center justify-center gap-2
                     shadow-sm shadow-gray-900/10"
        >
          Continue with email
          <ArrowRight size={16} />
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px bg-gray-100" />
        <span className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Privacy first</span>
        <div className="flex-1 h-px bg-gray-100" />
      </div>

      {/* Privacy note */}
      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-100">
        <Shield size={16} className="text-emerald-500 mt-0.5 shrink-0" />
        <p className="text-xs text-gray-500 leading-relaxed">
          No password needed — your data is saved{' '}
          <strong className="text-gray-700">locally on this device</strong>. Nothing is ever sent to a server.
        </p>
      </div>
    </div>
  );

  // Overlay mode (triggered from nav)
  if (!inline) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
        {card}
      </div>
    );
  }

  // Inline mode (embedded in hero left panel)
  return card;
}
