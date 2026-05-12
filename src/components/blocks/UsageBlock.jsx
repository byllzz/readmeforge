const LANGS = ['js', 'ts', 'jsx', 'tsx', 'py', 'bash', 'go', 'rust', 'php', 'ruby'];

export default function UsageBlock({ content, onChange }) {
  return (
    <div className="space-y-4">
      {/* Language selector */}
      <div className="space-y-1.5">
        <label className="block text-[10px] text-gray-500 font-mono uppercase tracking-wider">
          Language
        </label>
        <div className="flex flex-wrap gap-1.5">
          {LANGS.map((l) => (
            <button
              key={l}
              onClick={() => onChange({ language: l })}
              className={`px-2.5 py-1.5 text-xs font-mono rounded-lg border transition-all duration-200 ${
                content.language === l
                  ? 'border-emerald-400 text-emerald-600 bg-emerald-50 shadow-sm'
                  : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Code textarea — syntax‑style */}
      <div className="space-y-1.5">
        <label className="block text-[10px] text-gray-500 font-mono uppercase tracking-wider">
          Code
        </label>
        <div className="relative">
          {/* Line numbers gutter (decorative) */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gray-100 border-r border-gray-200 rounded-l-lg
                          flex flex-col items-end pr-2 pt-2 text-[10px] font-mono text-gray-300 select-none pointer-events-none">
            {Array.from({ length: 8 }, (_, i) => (
              <span key={i} className="leading-[1.625]">{i + 1}</span>
            ))}
          </div>
          <textarea
            className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-3 py-2 text-gray-800 font-mono text-sm
                       focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/20
                       placeholder:text-gray-400 transition-colors resize-none leading-[1.625]"
            rows={8}
            value={content.code}
            onChange={(e) => onChange({ code: e.target.value })}
            placeholder="// your example code here"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
