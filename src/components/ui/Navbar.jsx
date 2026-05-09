import { useState } from 'react'
import useReadme from '../../store/useReadme.js'

export default function Navbar() {
  const { blocks, getMarkdown } = useReadme()
  const [toast, setToast] = useState(null)

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(null), 2200)
  }

  function handleCopy() {
    navigator.clipboard.writeText(getMarkdown())
    showToast('✓ Copied to clipboard')
  }

  function handleDownload() {
    const blob = new Blob([getMarkdown()], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'README.md'; a.click()
    URL.revokeObjectURL(url)
    showToast('✓ README.md downloaded')
  }

  return (
    <>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateX(-50%) translateY(6px) } to { opacity:1; transform:translateX(-50%) translateY(0) } }
        .nb:hover { background: #1e1e1e !important; color: #e8e8e0 !important; }
        .nbp:hover { filter: brightness(1.15); }
      `}</style>
      <nav style={{ height:56, background:'#111', borderBottom:'1px solid #1a1a1a', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 20px', flexShrink:0, zIndex:100 }}>
        {/* Logo */}
        <div style={{ fontFamily:'Syne, sans-serif', fontWeight:800, fontSize:17, letterSpacing:'-0.03em', color:'#e8e8e0', display:'flex', alignItems:'center', gap:8 }}>
          <span style={{ width:7, height:7, borderRadius:'50%', background:'#7c6dfa', display:'inline-block' }} />
          ReadmeForge
        </div>

        {/* Actions */}
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <span style={{ fontSize:11, color:'#333', padding:'2px 8px', background:'#161616', borderRadius:99, fontFamily:'JetBrains Mono, monospace' }}>
            {blocks.length} block{blocks.length !== 1 ? 's' : ''}
          </span>
          <button className="nb" onClick={handleCopy}
            style={{ padding:'5px 13px', borderRadius:6, fontSize:12, fontWeight:500, border:'1px solid #222', color:'#888', background:'#161616', cursor:'pointer', transition:'all 0.15s' }}>
            Copy .md
          </button>
          <button className="nbp" onClick={handleDownload}
            style={{ padding:'5px 13px', borderRadius:6, fontSize:12, fontWeight:600, border:'none', color:'#fff', background:'#7c6dfa', cursor:'pointer', transition:'all 0.15s' }}>
            ↓ Download
          </button>
        </div>
      </nav>
      {toast && (
        <div style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', background:'#1a1a1a', border:'1px solid #2a2a2a', color:'#4ade80', padding:'7px 16px', borderRadius:99, fontSize:12, fontFamily:'JetBrains Mono, monospace', zIndex:9999, pointerEvents:'none', animation:'fadeUp 0.2s ease', whiteSpace:'nowrap' }}>
          {toast}
        </div>
      )}
    </>
  )
}
