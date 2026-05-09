export default function ApiBlock({ content, onChange }) {
  const entries = content.entries || []

  const update = (i, field, val) => {
    onChange({ entries: entries.map((x, idx) => idx === i ? { ...x, [field]: val } : x) })
  }
  const add = () => onChange({ entries: [...entries, { name: '', description: '', params: '' }] })
  const remove = (i) => onChange({ entries: entries.filter((_, idx) => idx !== i) })

  return (
    <div className="space-y-3">
      {entries.map((entry, i) => (
        <div key={i} className="bg-[#0d0d0d] border border-[#2a2a2a] rounded p-3 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-mono text-[#555]">Entry {i + 1}</span>
            <button onClick={() => remove(i)} className="text-[#444] hover:text-[#ff5757] text-xs transition-colors">remove</button>
          </div>
          <input
            className="w-full bg-[#161616] border border-[#2a2a2a] rounded px-2 py-1.5 text-[#a8ff57] text-xs font-mono focus:outline-none focus:border-[#57a0ff] transition-colors"
            value={entry.name}
            onChange={e => update(i, 'name', e.target.value)}
            placeholder="functionName(arg)"
          />
          <input
            className="w-full bg-[#161616] border border-[#2a2a2a] rounded px-2 py-1.5 text-[#e8e8e0] text-xs focus:outline-none focus:border-[#57a0ff] transition-colors"
            value={entry.description}
            onChange={e => update(i, 'description', e.target.value)}
            placeholder="What it does"
          />
          <input
            className="w-full bg-[#161616] border border-[#2a2a2a] rounded px-2 py-1.5 text-[#888] text-xs focus:outline-none focus:border-[#57a0ff] transition-colors"
            value={entry.params}
            onChange={e => update(i, 'params', e.target.value)}
            placeholder="param — type, description"
          />
        </div>
      ))}
      <button
        onClick={add}
        className="w-full border border-dashed border-[#2a2a2a] hover:border-[#57a0ff] text-[#555] hover:text-[#57a0ff] text-xs font-mono py-2 rounded transition-colors"
      >
        + add entry
      </button>
    </div>
  )
}
