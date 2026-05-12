import { useEffect, useState, useRef } from "react";

const STEPS = [
  { label: 'Authenticating locally' },
  { label: 'Loading your blocks' },
  { label: 'Parsing markdown' },
  { label: 'Rendering preview engine' },
  { label: 'Fetching badge shields' },
  { label: 'Warming up syntax highlighter' },
  { label: 'Preparing workspace' },
];
const DURATIONS = [880, 720, 840, 660, 780, 600, 860];

export default function LoadingSpinner() {
  const [doneSteps, setDoneSteps]   = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [typedText, setTypedText]   = useState("");
  const [progress, setProgress]     = useState(0);
  const [finished, setFinished]     = useState(false);
  const typingRef = useRef(null);

  useEffect(() => {
    if (finished || activeStep >= STEPS.length) return;
    const label = STEPS[activeStep].label;
    setTypedText("");
    let i = 0;
    clearInterval(typingRef.current);
    typingRef.current = setInterval(() => {
      i++;
      setTypedText(label.slice(0, i));
      if (i >= label.length) clearInterval(typingRef.current);
    }, 26);
    return () => clearInterval(typingRef.current);
  }, [activeStep, finished]);

  useEffect(() => {
    if (activeStep >= STEPS.length) {
      setFinished(true);
      setProgress(100);
      return;
    }
    const t = setTimeout(() => {
      setDoneSteps(p => [...p, activeStep]);
      setProgress(Math.round(((activeStep + 1) / STEPS.length) * 100));
      setActiveStep(p => p + 1);
    }, DURATIONS[activeStep]);
    return () => clearTimeout(t);
  }, [activeStep]);

  const visible = [...doneSteps.slice(-4), activeStep < STEPS.length ? activeStep : null]
    .filter(i => i !== null && i < STEPS.length);

  return (
    <>
      <style>{`
        @keyframes _rotate        { to { transform: rotate(360deg); } }
        @keyframes _rotateReverse { to { transform: rotate(-360deg); } }
        @keyframes _fadeUp        { from { opacity:0; transform:translateY(4px); } to { opacity:1; transform:translateY(0); } }
        @keyframes _blink         { 0%,100% { opacity:1; } 50% { opacity:0; } }
        @keyframes _shimmer       { from { transform:translateX(-100%); } to { transform:translateX(300%); } }
        @keyframes _pulse         { 0%,100% { opacity:0.5; } 50% { opacity:1; } }
        @keyframes _successScale  { 0% { transform:scale(0.7); opacity:0; } 60% { transform:scale(1.1); } 100% { transform:scale(1); opacity:1; } }
      `}</style>

      <div style={{
        minHeight: "100vh",
        background: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <div style={{ width: 320, display: "flex", flexDirection: "column", alignItems: "center", gap: 32 }}>

          {/* Spinner */}
          <div style={{ position: "relative", width: 80, height: 80, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{
              position: "absolute", inset: 0, borderRadius: "50%",
              border: "1px solid transparent",
              borderTopColor: "rgba(0,0,0,0.12)",
              borderRightColor: "rgba(0,0,0,0.04)",
              animation: "_rotate 2.4s linear infinite",
            }} />
            <div style={{
              position: "absolute", inset: 12, borderRadius: "50%",
              border: "1px solid transparent",
              borderTopColor: "rgba(0,0,0,0.08)",
              borderLeftColor: "rgba(0,0,0,0.08)",
              animation: "_rotateReverse 1.8s linear infinite",
            }} />
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: "#f5f5f5",
              border: "1px solid rgba(0,0,0,0.06)",
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative", zIndex: 1,
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
            </div>
          </div>

          {/* Name */}
          <span style={{
            fontFamily: "-apple-system, 'SF Pro Display', 'Helvetica Neue', sans-serif",
            fontSize: 15, fontWeight: 500,
            color: "rgba(0,0,0,0.75)",
            letterSpacing: "0.01em",
          }}>
            ReadmeForge
          </span>

          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
            {/* Progress bar */}
            <div style={{ width: "100%", height: 1.5, background: "rgba(0,0,0,0.06)", borderRadius: 2, overflow: "hidden" }}>
              <div style={{
                height: "100%",
                width: `${progress}%`,
                background: "rgba(0,0,0,0.2)",
                borderRadius: 2,
                transition: "width 0.55s cubic-bezier(0.4,0,0.2,1)",
                position: "relative", overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.3), transparent)",
                  width: "40%",
                  animation: "_shimmer 1.6s ease-in-out infinite",
                }} />
              </div>
            </div>

            {/* Steps */}
            <div style={{ display: "flex", flexDirection: "column", minHeight: 148 }}>
              {finished ? (
                <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", animation: "_fadeUp 0.3s ease forwards" }}>
                  <div style={{
                    width: 16, height: 16, borderRadius: "50%",
                    border: "1px solid rgba(0,0,0,0.2)",
                    background: "rgba(0,0,0,0.03)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    animation: "_successScale 0.4s ease forwards",
                  }}>
                    <svg width="8" height="8" viewBox="0 0 12 12" fill="none" stroke="rgba(0,0,0,0.6)" strokeWidth="2" strokeLinecap="round">
                      <polyline points="2 6 5 9 10 3"/>
                    </svg>
                  </div>
                  <span style={{ fontSize: 12.5, color: "rgba(0,0,0,0.4)", fontFamily: "-apple-system, sans-serif" }}>
                    Workspace ready
                  </span>
                </div>
              ) : visible.map(i => {
                const isDone = doneSteps.includes(i);
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: "1px solid rgba(0,0,0,0.04)", animation: "_fadeUp 0.22s ease forwards" }}>
                    <div style={{
                      width: 16, height: 16, borderRadius: "50%",
                      border: `1px solid ${isDone ? "rgba(0,0,0,0.15)" : "rgba(0,0,0,0.25)"}`,
                      background: isDone ? "rgba(0,0,0,0.03)" : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                      animation: isDone ? "none" : "_pulse 1.4s ease-in-out infinite",
                    }}>
                      {isDone ? (
                        <svg width="8" height="8" viewBox="0 0 12 12" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="2" strokeLinecap="round">
                          <polyline points="2 6 5 9 10 3"/>
                        </svg>
                      ) : (
                        <div style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(0,0,0,0.6)" }} />
                      )}
                    </div>
                    <span style={{
                      fontSize: 12.5,
                      color: isDone ? "rgba(0,0,0,0.15)" : "rgba(0,0,0,0.7)",
                      fontFamily: "-apple-system, 'Helvetica Neue', sans-serif",
                      letterSpacing: "0.01em",
                    }}>
                      {isDone ? STEPS[i].label : typedText}
                      {!isDone && (
                        <span style={{
                          display: "inline-block", width: 1.5, height: 11,
                          background: "rgba(0,0,0,0.4)", borderRadius: 1,
                          marginLeft: 2, verticalAlign: "middle",
                          animation: "_blink 0.8s step-end infinite",
                        }} />
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <span style={{
            fontFamily: "'SF Mono', 'Fira Code', monospace",
            fontSize: 10, letterSpacing: "0.12em",
            color: finished ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0.15)",
            transition: "color 0.4s",
          }}>
            {finished ? "ready" : `${progress}%`}
          </span>

        </div>
      </div>
    </>
  );
}
