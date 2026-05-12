import { useState } from 'react';

export default function LoginModal({ onLogin, onClose }) {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl bg-[#0d0d0d] border border-white/10 p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold">Sign in to ReadmeForge</h2>
          <button onClick={onClose} className="text-[#888] hover:text-white text-2xl leading-none">
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#aaa] mb-1">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              placeholder="you@example.com"
              className="w-full rounded-lg bg-[#161616] border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-[#555] focus:outline-none focus:border-[#ffd557]"
              autoFocus
            />
            {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-white py-2.5 text-sm font-semibold text-black hover:bg-[#e0e0e0] transition"
          >
            Continue with email
          </button>
        </form>
        <p className="text-[#666] text-xs mt-4 text-center">
          No password needed – your data is saved locally on this device.
        </p>
      </div>
    </div>
  );
}
