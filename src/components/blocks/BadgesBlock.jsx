export default function BadgesBlock({ content, onChange }) {
  const badges = content.badges || [];

  const update = (i, field, val) => {
    const next = badges.map((b, idx) => (idx === i ? { ...b, [field]: val } : b));
    onChange({ badges: next });
  };

  const add = () => onChange({ badges: [...badges, { label: 'badge', url: '', link: '' }] });
  const remove = (i) => onChange({ badges: badges.filter((_, idx) => idx !== i) });

  return (
    <div className="space-y-3">
      {badges.map((b, i) => (
        <div key={i} className="bg-white border border-gray-200 rounded-lg p-3 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px]  text-gray-400 uppercase tracking-wider">
              Badge {i + 1}
            </span>
            <button
              onClick={() => remove(i)}
              className="text-gray-400 hover:text-red-500 text-xs transition-colors "
            >
             remove badge
            </button>
          </div>

          {/* Label */}
          <div className="space-y-1">
            <label className="text-[10px]  text-gray-500 uppercase tracking-wider">Label</label>
            <input
              className="w-full bg-white! border! border-gray-200! rounded px-3 py-2 text-gray-700! text-sm
                         focus:outline-none focus:border-cyan-400! focus:ring-1 focus:ring-cyan-400/20!
                         placeholder:text-gray-400! transition-colors"
              value={b.label}
              onChange={(e) => update(i, 'label', e.target.value)}
              placeholder="build | version | license"
            />
          </div>

          {/* Badge URL — code‑style */}
          <div className="space-y-1">
            <label className="text-[10px]  text-gray-500 uppercase tracking-wider">Badge URL</label>
            <input
              className="w-full bg-gray-50 border! border-gray-200! rounded px-3 py-2 text-gray-600! text-sm
                         focus:outline-none focus:border-cyan-400! focus:ring-1 focus:ring-cyan-400/20!
                         placeholder:text-gray-400! transition-colors"
              value={b.url}
              onChange={(e) => update(i, 'url', e.target.value)}
              placeholder="https://img.shields.io/badge/..."
            />
          </div>

          {/* Link URL */}
          <div className="space-y-1">
            <label className="text-[10px]  text-gray-500 uppercase tracking-wider">
              Link <span className="text-gray-300">(optional)</span>
            </label>
            <input
              className="w-full bg-white! border! border-gray-200! rounded px-3 py-2 text-gray-600! text-sm
                         focus:outline-none focus:border-cyan-400! focus:ring-1 focus:ring-cyan-400/20!
                         placeholder:text-gray-400! transition-colors"
              value={b.link}
              onChange={(e) => update(i, 'link', e.target.value)}
              placeholder="https://github.com/user/repo"
            />
          </div>

          {/* Live badge preview */}
          {b.url && (
            <div className="pt-2 border-t! border-gray-100!">
              <span className="text-[10px]  text-gray-400 uppercase tracking-wider block mb-1.5">
                Preview
              </span>
              <div className="flex items-center gap-2">
                {b.link ? (
                  <a href={b.link} target="_blank" rel="noopener noreferrer">
                    <img src={b.url} alt={b.label || 'badge'} className="h-5" />
                  </a>
                ) : (
                  <img src={b.url} alt={b.label || 'badge'} className="h-5" />
                )}
                <span className="text-[10px]  text-gray-400">— {b.label || 'badge'}</span>
              </div>
            </div>
          )}
        </div>
      ))}

      <button
        onClick={add}
        className="w-full border-2! border-dashed! border-gray-200! hover:border-cyan-400! bg-gray-50! hover:bg-gray-100!
                   text-gray-500! hover:text-cyan-600! text-sm  py-2.5 rounded-lg transition-all duration-200"
      >
        + add badge
      </button>
    </div>
  );
}
