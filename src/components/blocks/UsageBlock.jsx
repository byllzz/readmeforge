const LANGS = ['js', 'ts', 'jsx', 'tsx', 'py', 'bash', 'go', 'rust', 'php', 'ruby']

export default function UsageBlock({ content, onChange }) {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs text-[#555] mb-1 font-mono uppercase tracking-wider">Language</label>
        <div className="flex flex-wrap gap-1">
          {LANGS.map(l => (
            <button
              key={l}
              onClick={() => onChange({ language: l })}
              className={`px-2.5 py-1 text-xs font-mono rounded border transition-colors ${
                content.language === l
                  ? 'border-[#57ffc8] text-[#57ffc8] bg-[#57ffc8]/10'
                  : 'border-[#2a2a2a] text-[#555] hover:border-[#3a3a3a] hover:text-[#888]'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-xs text-[#555] mb-1 font-mono uppercase tracking-wider">Code</label>
        <textarea
          className="w-full bg-[#0d0d0d] border border-[#2a2a2a] rounded px-3 py-2 text-[#a8ff57] font-mono text-xs focus:outline-none focus:border-[#57ffc8] transition-colors resize-none leading-relaxed"
          rows={8}
          value={content.code}
          onChange={e => onChange({ code: e.target.value })}
          placeholder="// your example code here"
          spellCheck={false}
        />
      </div>
    </div>
  )
}
