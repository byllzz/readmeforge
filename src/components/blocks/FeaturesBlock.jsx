export default function FeaturesBlock({ content, onChange }) {
  const items = content.items || []

  const update = (i, val) => onChange({ items: items.map((x, idx) => idx === i ? val : x) })
  const add = () => onChange({ items: [...items, ''] })
  const remove = (i) => onChange({ items: items.filter((_, idx) => idx !== i) })

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="text-[#a8ff57] text-xs font-mono w-4 shrink-0">◆</span>
          <input
            className="flex-1 bg-[#0d0d0d] border border-[#2a2a2a] rounded px-3 py-1.5 text-[#e8e8e0] text-sm focus:outline-none focus:border-[#c857ff] transition-colors"
            value={item}
            onChange={e => update(i, e.target.value)}
            placeholder={`Feature ${i + 1}`}
          />
          <button onClick={() => remove(i)} className="text-[#333] hover:text-[#ff5757] text-sm transition-colors">×</button>
        </div>
      ))}
      <button
        onClick={add}
        className="w-full border border-dashed border-[#2a2a2a] hover:border-[#c857ff] text-[#555] hover:text-[#c857ff] text-xs font-mono py-2 rounded transition-colors"
      >
        + add feature
      </button>
    </div>
  )
}
