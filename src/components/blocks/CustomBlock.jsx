export default function CustomBlock({ content, onChange }) {
  return (
    <div className="space-y-1">
      <label className="block text-[10px] text-gray-500 font-mono uppercase tracking-wider">
        Markdown content
      </label>
      <textarea
        className="w-full bg-gray-50 border! border-gray-200! rounded-lg px-3 py-2.5 text-gray-800! font-mono text-sm
                   focus:outline-none focus:border-orange-400! focus:ring-1 focus:ring-orange-400/20!
                   placeholder:text-gray-400! transition-colors resize-none leading-relaxed"
        rows={10}
        value={content.markdown || ''}
        onChange={(e) => onChange({ markdown: e.target.value })}
        placeholder={`## Section Title\n\nWrite any **markdown** here...`}
        spellCheck={false}
      />
    </div>
  );
}
