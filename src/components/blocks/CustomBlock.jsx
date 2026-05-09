export default function CustomBlock({ content, onChange }) {
  return (
    <div>
      <label className="block text-[10px] text-[#555] mb-1 font-mono uppercase tracking-wider">Markdown content</label>
      <textarea
        className="w-full bg-[#0d0d0d] border border-[#2a2a2a] rounded px-3 py-2 text-[#e8e8e0] font-mono text-xs focus:outline-none focus:border-[#f97316] transition-colors resize-none leading-relaxed"
        rows={10}
        value={content.markdown || ''}
        onChange={e => onChange({ markdown: e.target.value })}
        placeholder="## Section Title&#10;&#10;Write any **markdown** here..."
        spellCheck={false}
      />
    </div>
  )
}
