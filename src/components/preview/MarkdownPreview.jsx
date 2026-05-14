import { useMemo, useState, useEffect } from 'react'
import { marked } from 'marked'
import useReadme from '../../store/useReadme.js'
import { blocksToMarkdown } from '../../lib/markdown.js'
import { Check, Code2, Eye, Download, Camera ,FileWarning, CopySlash } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { duotoneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import EmptyCanvas from '../ui/EmptyCanvas.jsx'

marked.setOptions({ breaks: true, gfm: true })

/*  Stat chips */
function StatChip({ icon, label }) {
  return (
    <div
      className="flex items-center gap-1.5  py-1 rounded-md
                    bg-transparent text-black!"
    >
      {icon}
      <span className="text-[12px]  text">{label}</span>
    </div>
  );
}

/* Action button */
function ActionBtn({ onClick, done, doneLabel, idleLabel, icon }) {
  return (
    <div
      className="
        border-[1.5px] border-[#EFEEEB] rounded-[8px] flex items-center justify-between"
    >
      <button
        onClick={e => {
          e.stopPropagation();
          onClick();
        }}
        className={`
        flex items-center gap-2 px-2 py-[4px] text-[11px]
      `}
      >
        <span>{done ? doneLabel : idleLabel}</span>
      </button>
      <div className="h-9 w-[0.5px] bg-[#EFEEEB] mx-2 relative right-2" />
      <span className="relative right-2 top-[2px] w-4 h-4 rounded-full  ">
        {' '}
        {done ? <Check size={11} strokeWidth={2.5} /> : icon}
      </span>
    </div>
  );
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
      // marked v4+ returns a string synchronously; older/async builds to return a Promise
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

  /* Custom vscDarkPlus override */
  const codeTheme = {
    ...duotoneLight,
    'pre[class*="language-"]': {
      ...duotoneLight['pre[class*="language-"]'],
      background: '#fff',
      margin: 0,
      borderRadius: 0,
      fontSize: '12.5px',
      lineHeight: '1.7',
      padding: 0,
      color : "#000",
    },
    'code[class*="language-"]': {
      ...duotoneLight['code[class*="language-"]'],
      background: 'none',
      fontSize: '12.5px',
      color : "#000",
    },
  };

 const tabs = [
   { id: 'preview', icon: <Eye size={17} />, label: 'Preview' },
   { id: 'code', icon: <Code2 size={17} />, label: 'Code' },
 ];
  return (
    <>
      {/* Toolbar */}
      <div
        className="sticky top-0 z-10 flex-shrink-0 border-b border-white/[0.05] bg-white
                      px-4 py-2.5 flex flex-col items-start gap-2
                      "
      >
        {/* Left */}

        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
           {/* Tab Switcher - Fixed */}
<div className="flex items-center p-[1px] rounded-[10px] border border-gray-200 bg-[#EFEEEB]">
  {tabs.map(tab => (
    <button
      key={tab.id}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        setActiveTab(tab.id);
      }}
      type="button"
      className={`
        flex items-center gap-1.5 px-[10px] py-[6px] rounded-[9px]
        font-mono transition-all duration-200
        ${
          activeTab === tab.id
            ? 'bg-white! text-black! shadow-sm font-semibold'
            : 'text-gray-500 hover:text-gray-700'
        }
      `}
    >
      {tab.icon}
      <span className="hidden sm:inline text-[11px]">{tab.label}</span>
    </button>
  ))}
</div>

            <span className="text-[14px] tracking-tight  text hidden sm:block">
              <span>README</span> <span className="relative bottom-1">.</span> &nbsp;
              <span className="text-[#d9d0d0]">{activeTab === 'preview' ? 'Preview' : 'Code'}</span>
            </span>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2 flex-wrap justify-end">
            <div className="w-px h-4 bg-white/[0.07] mx-1" />

            <ActionBtn
              onClick={copyMarkdown}
              done={copied}
              idleLabel="Copy"
              doneLabel="Copied!"
              icon={<CopySlash size={11} />}
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
      </div>

      <div className="flex-1 min-h-full py-0! flex flex-col overflow-hidden bg-white relative">
        {/* Content area */}
        {blocks.length === 0 ? (
          <EmptyCanvas  />

        ) : (
          <div
            className="flex-1 h-full overflow-y-auto"
            style={{ scrollbarWidth: 'none', }}
          >
            {/* Screenshot notices */}
            {activeTab === 'preview' && screenshotsBlock && validScreenshots.length === 0 && (
              <div
                className="mx-5 mt-2 px-3 py-2.5 rounded-lg
                            bg-amber-500/8 border border-amber-500/20
                            flex items-start gap-2"
              >
                <span className="text-amber-400/80 text-[12px] relative top-1.5">
                  <FileWarning size={12} />
                </span>
                <div>
                  <p className="text-[11px] font-mono text-amber-400/70">
                    Screenshots block has no valid URLs yet
                  </p>
                  <p className="text-[10px] text mt-0.5">
                    Click the block and add an image URL or upload a file.
                  </p>
                </div>
              </div>
            )}
            {activeTab === 'preview' && validScreenshots.length > 0 && (
              <div
                className="mx-5  mt-4 px-3 py-2 rounded-lg
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

            {/*  Preview tab */}
            {activeTab === 'preview' &&
              (!raw?.trim() ? (
                <div className="text-center  text-[12px] font-mono text">
                  No content to preview
                </div>
              ) : (
                <div className="px-3 py-0! max-w-full mx-auto">
                  <style>{PREVIEW_CSS}</style>
                  <div
                    key={screenshotsKey || blocks.length}
                    className="markdown-preview"
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                </div>
              ))}

            {/*  Code tab  */}
            {activeTab === 'code' && (
              <div className="flex flex-col h-full">
                {/* Syntax highlighted code */}
                <div
                  className="flex-1 overflow-auto relative code-view-wrapper"
                  style={{
                    scrollbarWidth: 'none',

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
                      paddingRight: '1.2em',
                      color: '#000000', // light grey for line numbers
                      userSelect: 'none',
                      fontSize: '12px',
                      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                      borderRight: '1px solid #d9d0d0', // light border
                      marginRight: '1.15em',
                      marginLeft: '7px',
                    }}
                    customStyle={{
                      background: '#ffffff', // force white background
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
                        color: '#000000', // dark text for code
                      },
                    }}
                  >
                    {raw || '# Start adding blocks to generate your README'}
                  </SyntaxHighlighter>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <PreviewFooter
        raw={raw}
        kbSize={kbSize}
        validScreenshots={validScreenshots}
        wordCount={wordCount}
      />
    </>
  );
}

/* Preview footer */
function PreviewFooter({ raw, kbSize , validScreenshots , wordCount}) {
  return (
    <div
      className="border-t border-[#d9d0d0] sticky bottom-0 bg-white px-3 py-2
                    flex items-center justify-between gap-4
                    text-[9px] sm:text-[10px]  text font-bold"
    >
      {/* left */}
      <div className='flex items-center w-full gap-4 sm:gap-9'>
        <div className="flex items-center gap-1.5">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span >Updated {new Date().toLocaleTimeString()}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M4 7h16M4 12h16M4 17h10" />
          </svg>
          <span>~{kbSize} KB</span>
        </div>
      </div>

      {/* right */}
      <div className="flex items-center justify-end gap-2  px-1 w-full">
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
          label={`${wordCount}words`}
        />
      </div>
    </div>
  );
}

const PREVIEW_CSS = `
  .markdown-preview {
    color: #1a1a1a;
    font-family: 'Instrument Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 14.5px;
    line-height: 1.6;
  }
  .markdown-preview h1 {
    font-family: "IBM Plex Serif", serif;
    font-size: 40px;
    font-weight: 800;
    letter-spacing: -0.03em;
    margin: 0 0 12px;
    color: #000;
  }
    @media (max-width: 640px) {
      .markdown-preview h1 {
        font-size: 30px;
      }
    }
  .markdown-preview h2 {
    font-family: 'Syne', -apple-system, sans-serif;
    font-size: 19px;
    font-weight: 700;
    color: #000;
    letter-spacing: -0.02em;
    margin: 20px 0 10px;
    border-bottom: 1px solid rgba(0,0,0,0.08);
    padding-bottom: 6px;
  }
  .markdown-preview h3 {
    font-size: 15px;
    font-weight: 600;
    color: #b8860b;
    font-family: 'JetBrains Mono', monospace;
    margin: 12px 0 6px;
  }
  .markdown-preview p {
    margin-bottom: 8px;
    color: #1a1a1a;
  }
  .markdown-preview ul, .markdown-preview ol {
    padding-left: 22px;
    margin-bottom: 8px;
  }
  .markdown-preview li {
    margin-bottom: 4px;
    color: #1a1a1a;
  }
  .markdown-preview a {
    color: #2563eb;
    text-decoration: none;
    border-bottom: 1px solid rgba(37,99,235,0.25);
  }
  .markdown-preview a:hover {
    border-bottom-color: #2563eb;
  }
  .markdown-preview blockquote {
    border-left: 2px solid #fbbf24;
    padding-left: 14px;
    color: #555;
    font-style: italic;
    margin: 10px 0;
    background: #fefce8;
    border-radius: 0 6px 6px 0;
  }
  .markdown-preview code {
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    font-size: 12px;
    background: #f3f4f6;
    border: 1px solid #e5e7eb;
    border-radius: 4px;
    padding: 1px 5px;
    color: #d97706;
  }
  .markdown-preview pre {
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 14px 16px;
    overflow-x: auto;
    margin: 10px 0;
  }
  .markdown-preview pre code {
    background: none;
    border: none;
    padding: 0;
    color: #1e293b;
    font-size: 12px;
  }
  .markdown-preview hr {
    border: none;
    border-top: 1px solid rgba(0,0,0,0.06);
    margin: 8px 0;
  }
  .markdown-preview table {
    width: 100%;
    border-collapse: collapse;
    margin: 10px 0;
    font-size: 13px;
  }
  .markdown-preview th {
    background: #f9fafb;
    color: #1a1a1a;
    padding: 8px 12px;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
    font-weight: 600;
  }
  .markdown-preview td {
    padding: 7px 12px;
    border-bottom: 1px solid #f3f4f6;
    color: #1a1a1a;
  }
  .markdown-preview tr:last-child td {
    border-bottom: none;
  }

  /* Images */
  .badge-wrap { display: inline-block; margin: 0 2px; }
  .badge-img  { display: inline-block !important; height: 20px !important; width: auto !important; vertical-align: middle; }
  .img-wrap:not(.badge-wrap) { position: relative; margin: 12px 0; border-radius: 8px; overflow: hidden; background: #f9fafb; border: 1px solid #e5e7eb; }
  .md-img:not(.badge-img) { width: 100%; height: auto; max-height: 380px; object-fit: contain; cursor: zoom-in; transition: all 0.3s ease; }
  .md-img.zoomed { cursor: zoom-out; max-height: none; }
  .img-caption { text-align: center; font-size: 11px; color: #666; padding: 6px; font-style: italic; background: #f9fafb; }
  .img-error, .img-err-msg { display: flex; align-items: center; justify-content: center; padding: 20px; background: #fef2f2; border-radius: 8px; color: #dc2626; font-size: 12px; font-family: monospace; }
  .img-err-msg { display: none; }
  .md-error { color: #dc2626; padding: 20px; text-align: center; font-family: monospace; font-size: 12px; }
`;

// code css
const CODE_VIEW_CSS = `
  /* Force long lines to wrap inside the syntax highlighter table */
  .code-view-wrapper td:last-child,
  .code-view-wrapper td:last-child code {
    white-space: pre-wrap !important;
    word-break: break-all !important;
    overflow-wrap: anywhere !important;
    color: #1a1a1a !important;
  }
  .code-view-wrapper pre {
    max-width: 100% !important;
    overflow-wrap: anywhere !important;
    background: #ffffff !important;
  }

  /* Line numbers hover effect */
  .react-syntax-highlighter-line-number {
    transition: color 0.15s;
  }

`;
