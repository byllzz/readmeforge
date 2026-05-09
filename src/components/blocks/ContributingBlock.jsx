export default function ContributingBlock({ content, onChange }) {
  const steps = content.steps || []

  const updateStep = (i, val) => onChange({ steps: steps.map((x, idx) => idx === i ? val : x) })
  const addStep = () => onChange({ steps: [...steps, ''] })
  const removeStep = (i) => onChange({ steps: steps.filter((_, idx) => idx !== i) })

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-[10px] text-[#555] mb-1 font-mono uppercase tracking-wider">Intro text</label>
        <textarea
          className="w-full bg-[#0d0d0d] border border-[#2a2a2a] rounded px-3 py-2 text-[#e8e8e0] text-sm focus:outline-none focus:border-[#ff57a0] transition-colors resize-none"
          rows={2}
          value={content.text || ''}
          onChange={e => onChange({ text: e.target.value })}
          placeholder="Contributions are welcome..."
        />
      </div>
      <div>
        <label className="block text-[10px] text-[#555] mb-2 font-mono uppercase tracking-wider">Steps</label>
        <div className="space-y-2">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-[#ff57a0] text-xs font-mono w-5 shrink-0">{i + 1}.</span>
              <input
                className="flex-1 bg-[#0d0d0d] border border-[#2a2a2a] rounded px-3 py-1.5 text-[#e8e8e0] text-sm focus:outline-none focus:border-[#ff57a0] transition-colors"
                value={step}
                onChange={e => updateStep(i, e.target.value)}
                placeholder={`Step ${i + 1}`}
              />
              <button onClick={() => removeStep(i)} className="text-[#333] hover:text-[#ff5757] text-sm transition-colors">×</button>
            </div>
          ))}
          <button
            onClick={addStep}
            className="w-full border border-dashed border-[#2a2a2a] hover:border-[#ff57a0] text-[#555] hover:text-[#ff57a0] text-xs font-mono py-2 rounded transition-colors"
          >
            + add step
          </button>
        </div>
      </div>
    </div>
  )
}
