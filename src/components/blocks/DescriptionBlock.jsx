export default function DescriptionBlock({ content, onChange }) {
  return (
    <div>
      <label className="block text-[10px] text-[#555] mb-1 font-mono uppercase tracking-wider">About text</label>
      <textarea
        className="w-full bg-[#0d0d0d] border border-[#2a2a2a] rounded px-3 py-2 text-[#e8e8e0] text-sm focus:outline-none focus:border-[#ff9f57] transition-colors resize-none leading-relaxed"
        rows={5}
        value={content.text || ''}
        onChange={e => onChange({ text: e.target.value })}
        placeholder="Describe your project..."
      />
    </div>
  )
}
