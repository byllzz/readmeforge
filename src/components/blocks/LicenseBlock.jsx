const LICENSE_TYPES = ['MIT', 'Apache-2.0', 'GPL-3.0', 'BSD-2-Clause', 'BSD-3-Clause', 'ISC', 'MPL-2.0', 'Unlicense']

export default function LicenseBlock({ content, onChange }) {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-[10px] text-[#555] mb-1 font-mono uppercase tracking-wider">License type</label>
        <div className="flex flex-wrap gap-1">
          {LICENSE_TYPES.map(l => (
            <button
              key={l}
              onClick={() => onChange({ type: l })}
              className={`px-2.5 py-1 text-xs font-mono rounded border transition-colors ${
                content.type === l
                  ? 'border-[#a0a098] text-[#e8e8e0] bg-[#2a2a2a]'
                  : 'border-[#2a2a2a] text-[#555] hover:border-[#3a3a3a] hover:text-[#888]'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
      <div className="flex gap-3">
        <div className="flex-1">
          <label className="block text-[10px] text-[#555] mb-1 font-mono uppercase tracking-wider">Year</label>
          <input
            className="w-full bg-[#0d0d0d] border border-[#2a2a2a] rounded px-3 py-2 text-[#e8e8e0] font-mono text-sm focus:outline-none focus:border-[#a0a098] transition-colors"
            value={content.year || ''}
            onChange={e => onChange({ year: e.target.value })}
            placeholder="2025"
          />
        </div>
        <div className="flex-1">
          <label className="block text-[10px] text-[#555] mb-1 font-mono uppercase tracking-wider">Author</label>
          <input
            className="w-full bg-[#0d0d0d] border border-[#2a2a2a] rounded px-3 py-2 text-[#e8e8e0] text-sm focus:outline-none focus:border-[#a0a098] transition-colors"
            value={content.author || ''}
            onChange={e => onChange({ author: e.target.value })}
            placeholder="Your Name"
          />
        </div>
      </div>
    </div>
  )
}
