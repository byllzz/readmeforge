const LICENSE_TYPES = ['MIT', 'Apache-2.0', 'GPL-3.0', 'BSD-2-Clause', 'BSD-3-Clause', 'ISC', 'MPL-2.0', 'Unlicense'];

export default function LicenseBlock({ content, onChange }) {
  return (
    <div className="space-y-4">
      {/* License type selector */}
      <div className="space-y-1.5">
        <label className="block text-[10px] text-gray-500 font-mono uppercase tracking-wider">
          License type
        </label>
        <div className="flex flex-wrap gap-1.5">
          {LICENSE_TYPES.map((l) => (
            <button
              key={l}
              onClick={() => onChange({ type: l })}
              className={`px-2.5 py-1.5 text-xs font-mono rounded-lg border transition-all duration-200 ${
                content.type === l
                  ? 'border-gray-500 text-gray-700 bg-gray-100 shadow-sm'
                  : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Year + Author row */}
      <div className="flex gap-3">
        <div className="flex-1 space-y-1.5">
          <label className="block text-[10px] text-gray-500 font-mono uppercase tracking-wider">
            Year
          </label>
          <input
            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-700 font-mono text-sm
                       focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400/20
                       placeholder:text-gray-400 transition-colors"
            value={content.year || ''}
            onChange={(e) => onChange({ year: e.target.value })}
            placeholder="2025"
          />
        </div>
        <div className="flex-1 space-y-1.5">
          <label className="block text-[10px] text-gray-500 font-mono uppercase tracking-wider">
            Author
          </label>
          <input
            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-700 text-sm
                       focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400/20
                       placeholder:text-gray-400 transition-colors"
            value={content.author || ''}
            onChange={(e) => onChange({ author: e.target.value })}
            placeholder="Your Name"
          />
        </div>
      </div>
    </div>
  );
}
