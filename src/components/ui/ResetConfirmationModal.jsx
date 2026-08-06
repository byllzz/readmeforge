import { AlertTriangle } from "lucide-react";

export default function ResetConfirmationModal({
  userName,
  isOpen,
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onCancel}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[3px] animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl shadow-black/20 border border-black/[0.06] max-w-[380px] w-full mx-4 p-6 animate-in zoom-in-95 slide-in-from-bottom-2 duration-200"
      >
        <div className="w-11 h-11 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center mb-4">
          <AlertTriangle className="w-5 h-5 text-red-500" />
        </div>

        <h3 className="text-[17px] font-semibold text-gray-900 mb-1.5 tracking-tight">
          Reset workspace?
        </h3>
        <p className="text-gray-500 text-[13px] leading-relaxed mb-6">
          This clears every block and setting for{" "}
          <span className="font-medium text-gray-800">{userName}</span>. You'll
          start over with a fresh README — this can't be undone.
        </p>

        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 text-[13px] font-medium text-gray-600! bg-gray-100! hover:bg-gray-200! rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 text-[13px] font-medium text-white! bg-red-600! hover:bg-red-700! rounded-xl transition-colors shadow-sm shadow-red-600/20"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
