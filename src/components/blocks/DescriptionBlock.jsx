export default function DescriptionBlock({ content, onChange }) {
  return (
    <div className="space-y-1">
      <label className="block text-[10px] text-gray-500 font-mono uppercase tracking-wider">
        About text
      </label>
      <textarea
        className="w-full bg-white! border! border-gray-200! rounded-lg px-3 py-2.5 text-gray-700! text-sm
                   focus:outline-none focus:border-orange-400! focus:ring-1 focus:ring-orange-400/20!
                   placeholder:text-gray-400! transition-colors resize-none leading-relaxed"
        rows={5}
        value={content.text || ''}
        onChange={(e) => onChange({ text: e.target.value })}
        placeholder="Describe your project..."
      />
    </div>
  );
}
