const MANAGERS = ['npm', 'yarn', 'pnpm', 'bun'];

export default function InstallationBlock({ content, onChange }) {
  return (
    <div className="space-y-4">
      {/* Package manager selector */}
      <div className="space-y-1.5">
        <label className="block text-[10px] text-gray-500 font-mono uppercase tracking-wider">
          Package manager
        </label>
        <div className="flex gap-1.5">
          {MANAGERS.map(m => (
            <button
              key={m}
              onClick={() => onChange({ manager: m })}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-all duration-200 ${
                content.manager === m
                  ? 'border-red-400 text-red-600 bg-red-50 shadow-sm'
                  : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Package name – code‑style */}
      <div className="space-y-1.5">
        <label className="block text-[10px] text-gray-500 font-mono uppercase tracking-wider">
          Package name
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 font-mono text-sm select-none">
            $
          </span>
          <input
            className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-7 pr-3 py-2 text-gray-800 font-mono text-sm
                       focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400/20
                       placeholder:text-gray-400 transition-colors"
            value={content.package}
            onChange={e => onChange({ package: e.target.value })}
            placeholder="your-package-name"
          />
        </div>
      </div>

      {/* Extra commands – code‑style */}
      <div className="space-y-1.5">
        <label className="block text-[10px] text-gray-500 font-mono uppercase tracking-wider">
          Extra commands <span className="text-gray-300 normal-case">(optional)</span>
        </label>
        <textarea
          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-600 font-mono text-sm
                     focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400/20
                     placeholder:text-gray-400 transition-colors resize-none"
          rows={2}
          value={content.extra}
          onChange={e => onChange({ extra: e.target.value })}
          placeholder="cp .env.example .env"
          spellCheck={false}
        />
      </div>
    </div>
  );
}
