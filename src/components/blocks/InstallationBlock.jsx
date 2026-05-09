const MANAGERS = ['npm', 'yarn', 'pnpm', 'bun']

export default function InstallationBlock({ content, onChange }) {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs text-[#555] mb-1 font-mono uppercase tracking-wider">Package manager</label>
        <div className="flex gap-1">
          {MANAGERS.map(m => (
            <button
              key={m}
              onClick={() => onChange({ manager: m })}
              className={`px-3 py-1.5 text-xs font-mono rounded border transition-colors ${
                content.manager === m
                  ? 'border-[#ff5757] text-[#ff5757] bg-[#ff5757]/10'
                  : 'border-[#2a2a2a] text-[#555] hover:border-[#3a3a3a] hover:text-[#888]'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-xs text-[#555] mb-1 font-mono uppercase tracking-wider">Package name</label>
        <input
          className="w-full bg-[#0d0d0d] border border-[#2a2a2a] rounded px-3 py-2 text-[#e8e8e0] font-mono text-sm focus:outline-none focus:border-[#ff5757] transition-colors"
          value={content.package}
          onChange={e => onChange({ package: e.target.value })}
          placeholder="your-package-name"
        />
      </div>
      <div>
        <label className="block text-xs text-[#555] mb-1 font-mono uppercase tracking-wider">Extra commands (optional)</label>
        <textarea
          className="w-full bg-[#0d0d0d] border border-[#2a2a2a] rounded px-3 py-2 text-[#888] font-mono text-xs focus:outline-none focus:border-[#ff5757] transition-colors resize-none"
          rows={2}
          value={content.extra}
          onChange={e => onChange({ extra: e.target.value })}
          placeholder="cp .env.example .env"
        />
      </div>
    </div>
  )
}
