export default function BadgesBlock({ content, onChange }) {
  const badges = content.badges || []

  const update = (i, field, val) => {
    const next = badges.map((b, idx) => idx === i ? { ...b, [field]: val } : b)
    onChange({ badges: next })
  }

  const add = () => onChange({ badges: [...badges, { label: 'badge', url: '', link: '' }] })
  const remove = (i) => onChange({ badges: badges.filter((_, idx) => idx !== i) })

  return (
    <div className="space-y-3">
      {badges.map((b, i) => (
        <div key={i} className="bg-[#0d0d0d] border border-[#2a2a2a] rounded p-3 space-y-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-mono text-[#555]">Badge {i + 1}</span>
            <button onClick={() => remove(i)} className="text-[#444] hover:text-[#ff5757] text-xs transition-colors">remove</button>
          </div>
          <input
            className="w-full bg-[#161616] border border-[#2a2a2a] rounded px-2 py-1.5 text-[#e8e8e0] text-xs font-mono focus:outline-none focus:border-[#57c8ff] transition-colors"
            value={b.label}
            onChange={e => update(i, 'label', e.target.value)}
            placeholder="label"
          />
          <input
            className="w-full bg-[#161616] border border-[#2a2a2a] rounded px-2 py-1.5 text-[#888] text-xs font-mono focus:outline-none focus:border-[#57c8ff] transition-colors"
            value={b.url}
            onChange={e => update(i, 'url', e.target.value)}
            placeholder="https://img.shields.io/..."
          />
          <input
            className="w-full bg-[#161616] border border-[#2a2a2a] rounded px-2 py-1.5 text-[#888] text-xs font-mono focus:outline-none focus:border-[#57c8ff] transition-colors"
            value={b.link}
            onChange={e => update(i, 'link', e.target.value)}
            placeholder="Link URL (optional)"
          />
        </div>
      ))}
      <button
        onClick={add}
        className="w-full border border-dashed border-[#2a2a2a] hover:border-[#57c8ff] text-[#555] hover:text-[#57c8ff] text-xs font-mono py-2 rounded transition-colors"
      >
        + add badge
      </button>
    </div>
  )
}
