import { useMemo, useState, useEffect } from 'react'
import { marked } from 'marked'
import useReadme from '../../store/useReadme.js'
import { blocksToMarkdown } from '../../lib/markdown.js'
import { Check, Code2, Eye, Download, Camera, Copy } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

marked.setOptions({ breaks: true, gfm: true })

/* ─── Empty state ─── */
function EmptyPreview() {
  return (
    <div className="h-full flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center text-center gap-4 max-w-[240px]">
        <div className="w-12 h-12 flex items-center justify-center rounded-xl
                        bg-white/[0.04] border border-white/[0.07]">
          <span className="text-[24px] leading-none">📄</span>
        </div>
        <div className="space-y-1.5">
          <p className="text-[13px] font-mono font-semibold text-white/60 tracking-tight">Empty Preview</p>
          <p className="text-[11px] text-white/25 leading-relaxed font-mono">
            Add blocks to see your README rendered here
          </p>
        </div>
      </div>
    </div>
  )
}

/* ─── Stat chip ─── */
function StatChip({ icon, label }) {
  return (
    <div className="flex items-center gap-1.5 px-2 py-1 rounded-md
                    bg-black border border-white/[0.06]">
      {icon}
      <span className="text-[12px] font-mono text">{label}</span>
    </div>
  )
}

/* ─── Action button ─── */
function ActionBtn({ onClick, done, doneLabel, idleLabel, icon }) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-mono
        border! transition-all duration-200
        ${done
          ? 'bg-emerald-500/10 border-[#444]! text-emerald-400'
          : 'bg-white/[0.04] border-[#444]! text-white/50 hover:text-white'
        }
      `}
    >
      {done
        ? <Check size={11} strokeWidth={2.5} />
        : icon
      }
      <span>{done ? doneLabel : idleLabel}</span>
    </button>
  )
}

export default function MarkdownPreview() {
  const blocks = useReadme(s => s.blocks)
  const [activeTab,   setActiveTab]   = useState('preview')
  const [html,        setHtml]        = useState('')
  const [copied,      setCopied]      = useState(false)
  const [downloading, setDownloading] = useState(false)

  const raw = useMemo(() => blocksToMarkdown(blocks), [blocks])
  const wordCount = useMemo(() =>
    raw.split(/\s+/).filter(w => w.length > 0).length, [raw])
  const kbSize = useMemo(() =>
    (new TextEncoder().encode(raw).length / 1024).toFixed(1), [raw])

  /* Parse markdown → HTML */
  useEffect(() => {
    if (!raw?.trim() || activeTab !== 'preview') { setHtml(''); return }

    const renderer = new marked.Renderer()
    renderer.image = (href, title, text) => {
      let src = typeof href === 'string' ? href : (href?.url || href?.href || '')
      src = src.trim()
      if (!src || src === 'undefined' || src === '[object Object]') {
        return `<div class="img-error"><span>⚠️ Invalid image URL</span></div>`
      }
      const isBadge = src.includes('img.shields.io') || text?.toLowerCase().includes('badge')
      return `
        <div class="img-wrap ${isBadge ? 'badge-wrap' : ''}">
          <img src="${src.replace(/"/g,'&quot;')}"
               alt="${(text||'').replace(/"/g,'&quot;')}"
               title="${(title||'').replace(/"/g,'&quot;')}"
               loading="lazy"
               class="md-img ${isBadge ? 'badge-img' : ''}"
               onclick="this.classList.toggle('zoomed')"
               onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" />
          <div class="img-err-msg">❌ Failed to load image</div>
          ${text && !isBadge ? `<div class="img-caption">${text.replace(/"/g,'&quot;')}</div>` : ''}
        </div>`
    }
    marked.use({ renderer, mangle: false, headerIds: false })
    try {
      const result = marked.parse(raw)
      // marked v4+ returns a string synchronously; older/async builds return a Promise
      if (result && typeof result.then === 'function') {
        result.then(setHtml).catch(err => {
          setHtml(`<div class="md-error">Error: ${err.message}</div>`)
        })
      } else {
        setHtml(result)
      }
    } catch (err) {
      setHtml(`<div class="md-error">Error: ${err.message}</div>`)
    }
  }, [raw, activeTab])

  const copyMarkdown = async () => {
    try { await navigator.clipboard.writeText(raw); setCopied(true); setTimeout(() => setCopied(false), 2000) }
    catch {}
  }

  const downloadReadme = () => {
    const a = Object.assign(document.createElement('a'), {
      href: URL.createObjectURL(new Blob([raw], { type: 'text/markdown' })),
      download: 'README.md',
    })
    document.body.appendChild(a); a.click(); document.body.removeChild(a)
    setDownloading(true); setTimeout(() => setDownloading(false), 2000)
  }

  const screenshotsBlock  = blocks.find(b => b.type === 'screenshots')
  const validScreenshots  = screenshotsBlock?.content?.items?.filter(i => i.url?.trim()) || []
  const screenshotsKey    = validScreenshots.map(s => s.url).join(',')

  /* Custom vscDarkPlus override — richer background, subtle line highlight */
  const codeTheme = {
    ...vscDarkPlus,
    'pre[class*="language-"]': {
      ...vscDarkPlus['pre[class*="language-"]'],
      background: '#0d0d0d',
      margin: 0,
      borderRadius: 0,
      fontSize: '12.5px',
      lineHeight: '1.7',
      padding: '20px 0',
    },
    'code[class*="language-"]': {
      ...vscDarkPlus['code[class*="language-"]'],
      background: 'none',
      fontSize: '12.5px',
    },
  }

  return (
    <>
      {/* ══ Toolbar ══ */}
      <div
        className="sticky top-0 z-10 flex-shrink-0 border-b border-white/[0.05] bg-[#1F1F1F]
                      px-4 py-2.5 flex flex-col items-start gap-2
                      "
      >
        {/* Left — tab switcher + title */}

        <div className='flex items-center justify-between w-full'>
        <div className="flex items-center gap-3">
          <div className="flex items-center p-[3px] rounded-xl bg-white/[0.05] border border-white/[0.07] gap-0.5 ">
            {[
              { id: 'preview', icon: <Eye size={15} />, label: 'Preview' },
              { id: 'code', icon: <Code2 size={15} />, label: 'Code' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-1.5 px-3 py-1.5 rounded-[9px]
                  text-[11px] font-mono transition-all duration-200
                  ${
                    activeTab === tab.id
                      ? 'bg-white! text-black! shadow-sm font-semibold'
                      : 'text-white/40 hover:text-white/70'
                  }
                `}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <span className="text-[11px] font-mono tracking-tight text-white/70 hidden sm:block">
            README.md
          </span>
        </div>

        {/* Right — stats + actions */}
        <div className="flex items-center gap-2 flex-wrap justify-end">
          <div className="w-px h-4 bg-white/[0.07] mx-1" />

          <ActionBtn
            onClick={copyMarkdown}
            done={copied}
            idleLabel="Copy"
            doneLabel="Copied!"
            icon={<Copy size={11} />}
          />
          <ActionBtn
            onClick={downloadReadme}
            done={downloading}
            idleLabel="Download"
            doneLabel="Saved!"
            icon={<Download size={11} />}
          />
        </div>

        </div>

      <div  className="flex items-center justify-end gap-2 mt-2 px-1 w-full">
          <StatChip
          icon={<Camera size={14} className="text" />}
          label={`${validScreenshots.length} img`}
        />
        <StatChip
          icon={
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M4 7h16M4 12h16M4 17h10" />
            </svg>
          }
          label={`${wordCount}w · ${kbSize}KB`}
        />
      </div>


      </div>

      <div className="flex-1 min-h-0 flex flex-col overflow-hidden relative">
        {/* ══ Content area ══ */}
        {blocks.length === 0 ? (
          <EmptyPreview />
        ) : (
          <div
            className="flex-1 min-h-0 overflow-y-auto"
            style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.07) transparent' }}
          >
            {/* Screenshot notices */}
            {activeTab === 'preview' && screenshotsBlock && validScreenshots.length === 0 && (
              <div
                className="mx-5 mt-4 px-3 py-2.5 rounded-lg
                            bg-amber-500/8 border border-amber-500/20
                            flex items-start gap-2"
              >
                <span className="text-amber-400/80 text-[12px]">⚠️</span>
                <div>
                  <p className="text-[11px] font-mono text-amber-400/70">
                    Screenshots block has no valid URLs yet
                  </p>
                  <p className="text-[10px] text-white/25 mt-0.5">
                    Click the block and add an image URL or upload a file.
                  </p>
                </div>
              </div>
            )}
            {activeTab === 'preview' && validScreenshots.length > 0 && (
              <div
                className="mx-5 mt-4 px-3 py-2 rounded-lg
                            bg-emerald-500/8 border border-emerald-500/20
                            flex items-center gap-2"
              >
                <span className="text-emerald-400/80 text-[11px]">✓</span>
                <p className="text-[10px] font-mono text-emerald-400/60">
                  {validScreenshots.length} screenshot{validScreenshots.length > 1 ? 's' : ''}{' '}
                  loaded
                </p>
              </div>
            )}

            {/* ── Preview tab ── */}
            {activeTab === 'preview' &&
              (!raw?.trim() ? (
                <div className="text-center py-16 text-[12px] font-mono text-white/20">
                  No content to preview
                </div>
              ) : (
                <div className="px-6 py-6 max-w-full mx-auto">
                  <style>{PREVIEW_CSS}</style>
                  <div
                    key={screenshotsKey || blocks.length}
                    className="markdown-preview"
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                  <PreviewFooter raw={raw} kbSize={kbSize} />
                </div>
              ))}

            {/* ── Code tab ── */}
            {activeTab === 'code' && (
              <div className="flex flex-col h-full">
                {/* Code header bar */}
                <div
                  className="flex items-center justify-between
                              px-4 py-2 border-b border-white/[0.05]
                              bg-[#0d0d0d]"
                >
                  <div className="flex items-center gap-2">
                    {/* Traffic-light dots */}
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-400/40" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/40" />
                    </div>
                    <div className="w-px h-3 bg-white/[0.07] mx-1" />
                    <span className="text-[10px] font-mono text-white/25">README.md</span>
                    {/* Language badge */}
                    <span
                      className="px-1.5 py-0.5 rounded text-[9px] font-mono
                                   bg-white/[0.05] border border-white/[0.07] text-white/30
                                   uppercase tracking-wider"
                    >
                      markdown
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] font-mono text-white/22">
                    <span>{raw.split('\n').length} lines</span>
                    <div className="w-px h-3 bg-white/[0.07]" />
                    <span>{kbSize} KB</span>
                  </div>
                </div>

                {/* Syntax highlighted code */}
                <div
                  className="flex-1 overflow-auto relative code-view-wrapper"
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgba(255,255,255,0.07) transparent',
                  }}
                >
                  {/* Line-number gutter matches the background */}
                  <style>{CODE_VIEW_CSS}</style>

                  <SyntaxHighlighter
                    language="markdown"
                    style={codeTheme}
                    showLineNumbers={true}
                    wrapLines={true}
                    wrapLongLines={true}
                    lineNumberStyle={{
                      minWidth: '3em',
                      paddingRight: '1.5em',
                      color: 'rgba(255,255,255,0.12)',
                      userSelect: 'none',
                      fontSize: '11px',
                      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                      borderRight: '1px solid rgba(255,255,255,0.05)',
                      marginRight: '1.25em',
                    }}
                    customStyle={{
                      background: '#0d0d0d',
                      margin: 0,
                      borderRadius: 0,
                      minHeight: '100%',
                      fontSize: '12.5px',
                      lineHeight: '1.75',
                      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                    }}
                    codeTagProps={{
                      style: {
                        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                        fontSize: '12.5px',
                      },
                    }}
                  >
                    {raw || '# Start adding blocks to generate your README'}
                  </SyntaxHighlighter>
                </div>

                {/* Code footer */}
                <div
                  className="flex-shrink-0 border-t border-white/[0.05]
                              bg-[#0d0d0d] px-4 py-2
                              flex items-center justify-between"
                >
                  <div className="flex items-center gap-3 text-[10px] font-mono text-white/20">
                    <span>UTF-8</span>
                    <div className="w-px h-3 bg-white/[0.07]" />
                    <span>LF</span>
                    <div className="w-px h-3 bg-white/[0.07]" />
                    <span>Markdown</span>
                  </div>
                  <button
                    onClick={copyMarkdown}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono
                             bg-white/[0.04] border border-white/[0.07]
                             text-white/35 hover:text-white hover:bg-white/[0.08]
                             transition-all duration-150"
                  >
                    {copied ? <Check size={10} strokeWidth={2.5} /> : <Copy size={10} />}
                    <span>{copied ? 'Copied' : 'Copy all'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

/* ─── Preview footer ─── */
function PreviewFooter({ raw, kbSize }) {
  return (
    <div className="mt-10 pt-5 border-t border-white/[0.05]
                    flex items-center justify-center gap-4
                    text-[10px] font-mono text">
      <div className="flex items-center gap-1.5">
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <span>Updated {new Date().toLocaleTimeString()}</span>
      </div>
      <div className="w-px h-3 bg-white/[0.08]" />
      <div className="flex items-center gap-1.5">
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M4 7h16M4 12h16M4 17h10" />
        </svg>
        <span>~{kbSize} KB</span>
      </div>
    </div>
  )
}

/* ─── Markdown preview CSS ─── */
const PREVIEW_CSS = `
  .markdown-preview {
    color: #c0c0b8;
    font-family: 'Instrument Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 14.5px;
    line-height: 1.8;
  }
  .markdown-preview h1 {
    font-family: 'Syne', -apple-system, sans-serif;
    font-size: 30px; font-weight: 800;
    letter-spacing: -0.03em;
    margin: 0 0 16px;
    background: linear-gradient(135deg, #e8e8e0 0%, #b0b0a8 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .markdown-preview h2 {
    font-family: 'Syne', -apple-system, sans-serif;
    font-size: 19px; font-weight: 700;
    color: #d8d8d0; letter-spacing: -0.02em;
    margin: 28px 0 14px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    padding-bottom: 8px;
  }
  .markdown-preview h3 {
    font-size: 15px; font-weight: 600;
    color: #ffd557;
    font-family: 'JetBrains Mono', monospace;
    margin: 20px 0 10px;
  }
  .markdown-preview p { margin-bottom: 14px; color: #a8a8a0; }
  .markdown-preview ul, .markdown-preview ol { padding-left: 22px; margin-bottom: 14px; }
  .markdown-preview li { margin-bottom: 5px; color: #a8a8a0; }
  .markdown-preview a { color: #ffd557; text-decoration: none; border-bottom: 1px solid rgba(255,213,87,0.25); }
  .markdown-preview a:hover { border-bottom-color: #ffd557; }
  .markdown-preview blockquote {
    border-left: 2px solid rgba(255,213,87,0.4);
    padding-left: 14px; color: #787870;
    font-style: italic; margin: 14px 0;
    background: linear-gradient(90deg, rgba(255,213,87,0.04) 0%, transparent 100%);
    border-radius: 0 6px 6px 0;
  }
  .markdown-preview code {
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    font-size: 11.5px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 5px;
    padding: 2px 6px;
    color: #ffd557;
  }
  .markdown-preview pre {
    background: #0d0d0d;
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 10px;
    padding: 16px 18px;
    overflow-x: auto;
    margin: 14px 0;
  }
  .markdown-preview pre code { background: none; border: none; padding: 0; color: #a8ff78; font-size: 12px; }
  .markdown-preview hr { border: none; border-top: 1px solid rgba(255,255,255,0.06); margin: 28px 0; }
  .markdown-preview table { width: 100%; border-collapse: collapse; margin: 14px 0; font-size: 13px; }
  .markdown-preview th { background: rgba(255,255,255,0.04); color: #d0d0c8; padding: 8px 12px; text-align: left; border-bottom: 1px solid rgba(255,255,255,0.08); font-weight: 600; }
  .markdown-preview td { padding: 7px 12px; border-bottom: 1px solid rgba(255,255,255,0.04); color: #a0a098; }
  .markdown-preview tr:last-child td { border-bottom: none; }

  /* Images */
  .badge-wrap { display: inline-block; margin: 0 2px; }
  .badge-img  { display: inline-block !important; height: 20px !important; width: auto !important; vertical-align: middle; }
  .img-wrap:not(.badge-wrap) { position: relative; margin: 18px 0; border-radius: 10px; overflow: hidden; background: #0d0d0d; border: 1px solid rgba(255,255,255,0.06); }
  .md-img:not(.badge-img) { width: 100%; height: auto; max-height: 380px; object-fit: contain; cursor: zoom-in; transition: all 0.3s ease; }
  .md-img.zoomed { cursor: zoom-out; max-height: none; }
  .img-caption { text-align: center; font-size: 11px; color: rgba(255,255,255,0.3); padding: 8px; font-style: italic; background: rgba(0,0,0,0.3); }
  .img-error, .img-err-msg { display: flex; align-items: center; justify-content: center; padding: 20px; background: rgba(255,87,87,0.05); border-radius: 8px; color: rgba(255,87,87,0.7); font-size: 12px; font-family: monospace; }
  .img-err-msg { display: none; }
  .md-error { color: rgba(255,87,87,0.8); padding: 20px; text-align: center; font-family: monospace; font-size: 12px; }
`;

// code css
const CODE_VIEW_CSS = `
  /* Force long lines to wrap inside the syntax highlighter table */
  .code-view-wrapper td:last-child,
  .code-view-wrapper td:last-child code {
    white-space: pre-wrap !important;
    word-break: break-all !important;
    overflow-wrap: anywhere !important;
  }
  .code-view-wrapper pre {
    max-width: 100% !important;
    overflow-wrap: anywhere !important;
  }

  /* Your existing code-view CSS */
  .react-syntax-highlighter-line-number { transition: color 0.15s; }
  .code-scroll-area > pre { min-height: 100% !important; }
  .code-scroll-area::-webkit-scrollbar { width: 6px; height: 6px; }
  .code-scroll-area::-webkit-scrollbar-track { background: transparent; }
  .code-scroll-area::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 3px; }
  .code-scroll-area::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.15); }
`;
