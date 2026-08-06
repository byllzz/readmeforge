import { useEffect } from "react";

/**
 * Pure, controlled loading overlay. No localStorage / "have I shown this
 * before" logic lives here anymore — the parent decides *when* to render
 * it, this component just shows a spinner for `duration` ms and then
 * calls onComplete. That's what makes it fast and predictable everywhere
 * it's used (first login, logout, etc) instead of the old ~2s stall.
 */
export default function LoadingSpinner({ onComplete, duration = 450 }) {
  useEffect(() => {
    const t = setTimeout(() => onComplete?.(), duration);
    return () => clearTimeout(t);
  }, [onComplete, duration]);

  return (
    <>
      <style>{`@keyframes _spin { to { transform: rotate(360deg); } }`}</style>
      <div className="fixed inset-0 z-[999] flex items-center justify-center bg-white">
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            border: "3px solid rgba(0,0,0,0.08)",
            borderTopColor: "rgba(0,0,0,0.55)",
            animation: "_spin 0.6s linear infinite",
          }}
        />
      </div>
    </>
  );
}
