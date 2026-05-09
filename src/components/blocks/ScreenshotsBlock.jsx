export default function ScreenshotsBlock({ content, onChange }) {
  const items = content.items || []

  const update = (i, field, val) => {
    onChange({ items: items.map((x, idx) => idx === i ? { ...x, [field]: val } : x) })
  }
  const add = () => onChange({ items: [...items, { alt: '', url: '', caption: '' }] })
  const remove = (i) => onChange({ items: items.filter((_, idx) => idx !== i) })

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="bg-[#0d0d0d] border border-[#2a2a2a] rounded p-3 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-mono text-[#555]">Image {i + 1}</span>
            <button onClick={() => remove(i)} className="text-[#444] hover:text-[#ff5757] text-xs transition-colors">remove</button>
          </div>
          <input
            className="w-full bg-[#161616] border border-[#2a2a2a] rounded px-2 py-1.5 text-[#e8e8e0] text-xs focus:outline-none focus:border-[#ffd557] transition-colors"
            value={item.alt}
            onChange={e => update(i, 'alt', e.target.value)}
            placeholder="Alt text"
          />
          <input
            className="w-full bg-[#161616] border border-[#2a2a2a] rounded px-2 py-1.5 text-[#888] text-xs font-mono focus:outline-none focus:border-[#ffd557] transition-colors"
            value={item.url}
            onChange={e => update(i, 'url', e.target.value)}
            placeholder="https://..."
          />
          <input
            className="w-full bg-[#161616] border border-[#2a2a2a] rounded px-2 py-1.5 text-[#888] text-xs focus:outline-none focus:border-[#ffd557] transition-colors"
            value={item.caption}
            onChange={e => update(i, 'caption', e.target.value)}
            placeholder="Caption (optional)"
          />
        </div>
      ))}
      <button
        onClick={add}
        className="w-full border border-dashed border-[#2a2a2a] hover:border-[#ffd557] text-[#555] hover:text-[#ffd557] text-xs font-mono py-2 rounded transition-colors"
      >
        + add screenshot
      </button>
    </div>
  )
}
