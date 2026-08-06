export default function ContributingBlock({ content, onChange }) {
  const steps = content.steps || [];

  const updateStep = (i, val) => onChange({ steps: steps.map((x, idx) => (idx === i ? val : x)) });
  const addStep = () => onChange({ steps: [...steps, ''] });
  const removeStep = (i) => onChange({ steps: steps.filter((_, idx) => idx !== i) });

  return (
    <div className="space-y-3">
      {/* Intro text */}
      <div className="space-y-1">
        <label className="block text-[10px] text-gray-500  uppercase tracking-wider">
          Intro text
        </label>
        <textarea
          className="w-full bg-white! border! border-gray-200! rounded-lg px-3 py-2 text-gray-700! text-sm
                     focus:outline-none focus:border-pink-400! focus:ring-1 focus:ring-pink-400/20!
                     placeholder:text-gray-400! transition-colors resize-none"
          rows={2}
          value={content.text || ''}
          onChange={(e) => onChange({ text: e.target.value })}
          placeholder="Contributions are welcome..."
        />
      </div>

      {/* Steps */}
      <div className="space-y-1">
        <label className="block text-[10px] text-gray-500  uppercase tracking-wider">
          Steps
        </label>
        <div className="space-y-2">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-pink-500 text-sm  font-bold w-5 shrink-0">
                {i + 1}.
              </span>
              <input
                className="flex-1 bg-white! border! border-gray-200! rounded-lg px-3 py-2 text-gray-700! text-sm
                           focus:outline-none focus:border-pink-400! focus:ring-1 focus:ring-pink-400/20!
                           placeholder:text-gray-400! transition-colors"
                value={step}
                onChange={(e) => updateStep(i, e.target.value)}
                placeholder={`Step ${i + 1}`}
              />
              <button
                onClick={() => removeStep(i)}
                className="text-gray-300 hover:text-red-500 text-lg leading-none p-1 rounded transition-colors"
                title="Remove step"
              >
                ×
              </button>
            </div>
          ))}
          <button
            onClick={addStep}
            className="w-full border-2! border-dashed! border-gray-200! hover:border-pink-400! bg-gray-50! hover:bg-gray-100!
                       text-gray-500! hover:text-pink-600! text-sm  py-2.5 rounded-lg transition-all duration-200"
          >
            + add step
          </button>
        </div>
      </div>
    </div>
  );
}
