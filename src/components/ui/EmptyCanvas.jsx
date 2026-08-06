export default function EmptyCanvas() {
  return (
    <div className="flex-1 flex items-center justify-center h-full min-h-[400px] select-none">
      <div className="flex flex-col items-center text-center space-y-5 max-w-[260px] px-4">
        <div className="relative">
          <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gray-50 border border-gray-200 shadow-inner">
            <span className="text-[28px] leading-none">📄</span>
          </div>
        </div>
        <div className="space-y-1.5">
          <p className="text-[14px] font-semibold text-gray-800 tracking-tight">
            Empty canvas
          </p>
          <p className="text-[11px] text-gray-500 leading-relaxed">
            Your README is waiting. Pick a block from the left panel to get
            started.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200">
          <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] text-gray-500">
            click a block to begin
          </span>
        </div>
      </div>
    </div>
  );
}
