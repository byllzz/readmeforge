export default function TitleBlock({ content, onChange }) {
  return (
    <div className="space-y-4">
      {/* Project name — large, bold feel */}
      <div className="space-y-1.5">
        <label className="block text-[10px] text-gray-500 font-mono uppercase tracking-wider">
          Project name
        </label>
        <input
          className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-gray-800 text-lg font-semibold
                     focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/20
                     placeholder:text-gray-300 transition-colors"
          value={content.name || ''}
          onChange={(e) => onChange({ name: e.target.value })}

        />
      </div>

      {/* Tagline */}
      <div className="space-y-1.5">
        <label className="block text-[10px] text-gray-500 font-mono uppercase tracking-wider">
          Tagline
        </label>
        <input
          className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-600 text-sm
                     focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/20
                     placeholder:text-gray-400 transition-colors"
          value={content.tagline || ''}
          onChange={(e) => onChange({ tagline: e.target.value })}
          placeholder="A short, snappy description"
        />
      </div>
    </div>
  );
}
