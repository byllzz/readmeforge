export default function TitleBlock({ content, onChange }) {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-[10px] text-[#555] mb-1 font-mono uppercase tracking-wider">Project name</label>
        <input
          className="w-full bg-[#0d0d0d] border border-[#2a2a2a] rounded px-3 py-2 text-[#e8e8e0] font-mono text-sm focus:outline-none focus:border-[#7c6dfa] transition-colors"
          value={content.name || ''}
          onChange={e => onChange({ name: e.target.value })}
          placeholder="My Awesome Project"
        />
      </div>
      <div>
        <label className="block text-[10px] text-[#555] mb-1 font-mono uppercase tracking-wider">Tagline</label>
        <input
          className="w-full bg-[#0d0d0d] border border-[#2a2a2a] rounded px-3 py-2 text-[#e8e8e0] text-sm focus:outline-none focus:border-[#7c6dfa] transition-colors"
          value={content.tagline || ''}
          onChange={e => onChange({ tagline: e.target.value })}
          placeholder="A short, snappy description"
        />
      </div>
    </div>
  )
}
