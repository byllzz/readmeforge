export default function FeaturesBlock({ content, onChange }) {
  const items = content.items || [];

  const update = (i, val) => onChange({ items: items.map((x, idx) => (idx === i ? val : x)) });
  const add = () => onChange({ items: [...items, ''] });
  const remove = (i) => onChange({ items: items.filter((_, idx) => idx !== i) });

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="text-amber-500 text-sm font-bold w-4 shrink-0 select-none">◆</span>
          <input
            className="flex-1 bg-white! border! border-gray-200! rounded-lg px-3 py-2 text-gray-700! text-sm
                       focus:outline-none focus:border-amber-400! focus:ring-1 focus:ring-amber-400/20!
                       placeholder:text-gray-400! transition-colors"
            value={item}
            onChange={(e) => update(i, e.target.value)}
            placeholder={`Feature ${i + 1}`}
          />
          <button
            onClick={() => remove(i)}
            className="text-gray-300 hover:text-red-500 text-lg leading-none p-1 rounded transition-colors"
            title="Remove feature"
          >
            ×
          </button>
        </div>
      ))}
      <button
        onClick={add}
        className="w-full border-2! border-dashed border-gray-200! hover:border-amber-400! bg-gray-50! hover:bg-gray-100!
                   text-gray-500! hover:text-amber-600! text-sm  py-2.5 rounded-lg transition-all duration-200"
      >
        + add feature
      </button>
    </div>
  );
}
