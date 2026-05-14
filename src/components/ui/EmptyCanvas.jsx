export default function EmptyCanvas() {
  return (
    <div className="flex-1 flex items-center justify-center h-full min-h-[400px] select-none">
      <div className="flex flex-col items-center text-center space-y-5 max-w-[260px] px-4">
        <div className="relative">
          <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/[0.04] border border-white/[0.07] shadow-inner">
            <span className="text-[28px] leading-none">📄</span>
          </div>
          <div className="absolute inset-0 rounded-2xl blur-xl bg-white/[0.03] -z-10 scale-150" />
        </div>
        <div className="space-y-1.5">
          <p className="text-[14px] font-mono font-semibold text tracking-tight">Empty canvas</p>
          <p className="text-[11px] text leading-relaxed">Your README is waiting. Pick a block from the left panel to get started.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.07]">
          <div className="w-1 h-1 rounded-full bg-emerald-400/60 animate-pulse" />
          <span className="text-[10px] font-mono text">click a block to begin</span>
        </div>
      </div>
    </div>
  )
}
