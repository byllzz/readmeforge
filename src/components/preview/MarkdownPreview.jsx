import { useMemo, useState, useEffect } from 'react'
import { marked } from 'marked'
import useReadme from '../../store/useReadme.js'
import { blocksToMarkdown } from '../../lib/markdown.js'
import { Check, Code2, Eye, Download, Camera } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

marked.setOptions({ breaks: true, gfm: true })

export default function MarkdownPreview() {
  const blocks = useReadme(s => s.blocks)
  const [activeTab, setActiveTab] = useState('preview') // 'preview' or 'code'
  const [html, setHtml] = useState('')
  const [copied, setCopied] = useState(false)
  const [downloading, setDownloading] = useState(false)

  const raw = useMemo(() => blocksToMarkdown(blocks), [blocks])

  // Parse markdown to HTML only when on preview tab
  useEffect(() => {
    const parseMarkdown = async () => {
      if (raw && raw.trim() && activeTab === 'preview') {
        const renderer = new marked.Renderer()

        renderer.image = (href, title, text) => {
          let imageUrl = ''
          if (typeof href === 'string') {
            imageUrl = href
          } else if (href && typeof href === 'object') {
            imageUrl = href.url || href.src || href.href || ''
          } else {
            imageUrl = String(href || '')
          }
          imageUrl = imageUrl.trim()

          if (!imageUrl || imageUrl === 'undefined' || imageUrl === '[object Object]') {
            return `
              <div class="image-error-container">
                <span>⚠️ Invalid image URL</span>
              </div>
            `
          }

          const isBadge = imageUrl.includes('img.shields.io') || text?.toLowerCase().includes('badge')

          return `
            <div class="image-container ${isBadge ? 'badge-container' : ''}">
              <img
                src="${imageUrl.replace(/"/g, '&quot;')}"
                alt="${(text || 'Screenshot').replace(/"/g, '&quot;')}"
                title="${(title || '').replace(/"/g, '&quot;')}"
                loading="lazy"
                class="markdown-image ${isBadge ? 'badge-image' : ''}"
                onclick="this.classList.toggle('zoomed')"
                onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"
              />
              <div class="image-error-message">
                ❌ Failed to load image
              </div>
              ${text && !isBadge ? `<div class="image-caption">${text.replace(/"/g, '&quot;')}</div>` : ''}
            </div>
          `
        }

        marked.use({ renderer, mangle: false, headerIds: false })

        try {
          const parsedHtml = await marked.parse(raw)
          setHtml(parsedHtml)
        } catch (error) {
          console.error('Markdown parsing error:', error)
          setHtml(`<div class="error-message">Error parsing markdown: ${error.message}</div>`)
        }
      } else {
        setHtml('')
      }
    }

    parseMarkdown()
  }, [raw, activeTab])


  const copyMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(raw)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const downloadReadme = () => {
    const blob = new Blob([raw], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'README.md'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    setDownloading(true)
    setTimeout(() => setDownloading(false), 2000)
  }

  const screenshotsBlock = blocks.find(b => b.type === 'screenshots')
  const validScreenshots =
    screenshotsBlock?.content?.items?.filter(i => {
      return i.url && typeof i.url === 'string' && i.url.trim() !== ''
    }) || []
  const screenshotsKey = validScreenshots.map(s => s.url).join(',')

  if (blocks.length === 0) {
    return (
      <div className="flex-1 min-h-0 overflow-y-auto bg-[#0a0a0a]">
        <div className="h-full flex items-center justify-center">
          <div className="text-center space-y-3 max-w-sm px-6">
            <div className="text-5xl mb-2 animate-pulse">📄</div>
            <div className="space-y-2">
              <p className="text-sm font-mono font-medium text">Empty Preview</p>
              <p className="text-[11px] text font-mono leading-relaxed">
                Your README preview will appear here
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 min-h-0 overflow-y-auto">
      {/* Toolbar */}
      <div className="sticky top-2 z-10 backdrop-blur-sm flex flex-col items-start">
        {/* top */}
        <div className="flex items-center gap-3 justify-between w-full px-2">
          {/* Tab Switcher */}
          <div className="flex items-center gap-1.5">
            <div className="p-[2px] rounded-[12px] flex items-center bg-black gap-1">
              <button
                onClick={() => setActiveTab('preview')}
                className={`rounded-[10px] h-11 w-11 flex items-center justify-center transition-all duration-200 ${
                  activeTab === 'preview' ? 'bg-white! text-black' : 'text-white hover:bg-white/10'
                }`}
                title="Preview"
              >
                <Eye size={22} className={activeTab === 'preview' ? 'text-black' : 'text-white'} />
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`rounded-[10px] h-11 w-11 flex items-center justify-center transition-all duration-200 ${
                  activeTab === 'code' ? 'bg-white! text-black' : 'text-white hover:bg-white/10'
                }`}
                title="Source Code"
              >
                <Code2 size={22} className={activeTab === 'code' ? 'text-black' : 'text-white'} />
              </button>
            </div>
            <span className="text-[15px] ml-1.5 font-medium text uppercase tracking-tighter">
              Readme.md .{' '}
              <span className="text-[#aaa] opacity-80">
                {activeTab === 'preview' ? 'Preview' : 'Code'}
              </span>
            </span>
          </div>
          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Copy button */}
            <div className="rounded-[8px] border-[#444] border flex items-center justify-between px-2">
              <button
                onClick={copyMarkdown}
                className="relative right-1 group text flex items-center gap-1.5 pl-2 py-1.5 transition-all duration-200"
                title="Copy Markdown"
              >
                {copied ? '✓ Copied to clipboard' : 'Copy'}
              </button>
              <div className="h-9.5 w-[1px] bg-[#444] mx-2"></div>
              <span
                className={`h-5 w-5 rounded-full flex items-center justify-center border border-[#444] ${
                  copied ? 'bg-green-500' : 'bg-[#0a0a0a]'
                } group-hover:opacity-100 transition-opacity duration-200`}
              >
                <Check size={12} className="relative right-[.25px] top-[.5px]" />
              </span>
            </div>

            {/* Download button */}
            <div className="rounded-[8px] border-[#444] border flex items-center justify-between px-2">
              <button
                onClick={downloadReadme}
                className="relative right-1 group text flex items-center gap-1.5 pl-2 py-1.5 transition-all duration-200"
                title="Download README.md"
              >
                {downloading ? '✓ Downloaded!' : 'Download'}
              </button>
              <div className="h-9.5 w-[1px] bg-[#444] mx-2"></div>
              <span className="h-5 w-5 rounded-full flex items-center justify-center border border-[#444] bg-[#0a0a0a]">
                <Download size={12} />
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* bottom */}
      <div className="flex items-center justify-end gap-2 mt-3">
        <div className="h-3 w-px bg-[#1a1a1a]"></div>

        {/* valid screenshot */}
        <div className="flex items-center font-mono gap-1.5 px-2 py-1 bg-[#0d0d0d] rounded-md">
          <span className="text-[12px] text-[#ffd557]">
            <Camera size={14} className="text-white" />
          </span>
          <span className="text-[12px] text">{validScreenshots.length} Screenshot(s)</span>
        </div>

        {/* Blocks count */}
        <div className="flex items-center gap-1.5 px-2 py-1 bg-[#0d0d0d] rounded-md">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text"
          >
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          <span className="text-[12px] text font-mono">
            {blocks.length} {blocks.length === 1 ? 'block' : 'blocks'}
          </span>
        </div>

        {/* Word count */}
        <div className="flex items-center gap-1.5 px-2 py-1 bg-[#0d0d0d] rounded-md border border-[#1a1a1a]">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text"
          >
            <path d="M4 7h16M4 12h16M4 17h10" />
          </svg>
          <span className="text-[12px] font-mono text">
            {raw.split(/\s+/).filter(w => w.length > 0).length} words
          </span>
        </div>
      </div>

      {/* Info Panels (only for preview tab) */}
      {activeTab === 'preview' && (
        <>
          {screenshotsBlock && validScreenshots.length === 0 && (
            <div className="mx-6 mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <div className="flex items-center gap-2 text-yellow-500 text-[11px] font-mono">
                <span>⚠️</span>
                <span>Screenshots block added but no valid image URLs yet</span>
              </div>
              <div className="text-[10px] text-[#888] mt-1">
                Click on the screenshots block and upload an image or enter a valid image URL
              </div>
            </div>
          )}
          {validScreenshots.length > 0 && (
            <div className="mx-6 mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
              <div className="flex items-center gap-2 text-green-500 text-[11px] font-mono">
                <span>✅</span>
                <span>{validScreenshots.length} screenshot(s) will appear below</span>
              </div>
            </div>
          )}
        </>
      )}

      {/* Content */}
      <div className="px-6 py-5 max-w-4xl mx-auto">
        <style>
          {`
            .markdown-preview {
              color: #c8c8c0;
              font-family: 'Instrument Sans', -apple-system, BlinkMacSystemFont, sans-serif;
              font-size: 15px;
              line-height: 1.75;
            }
            .markdown-preview h1 {
              font-family: 'Syne', -apple-system, sans-serif;
              font-size: 32px;
              font-weight: 800;
              color: #e8e8e0;
              letter-spacing: -0.03em;
              margin-bottom: 16px;
              margin-top: 0;
              background: linear-gradient(135deg, #e8e8e0 0%, #c8c8c0 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
            }
            .markdown-preview h2 {
              font-family: 'Syne', -apple-system, sans-serif;
              font-size: 20px;
              font-weight: 700;
              color: #e8e8e0;
              margin: 32px 0 16px;
              letter-spacing: -0.02em;
              border-bottom: 1px solid #1e1e1e;
              padding-bottom: 8px;
            }
            .markdown-preview h3 {
              font-size: 16px;
              font-weight: 600;
              color: #ffd557;
              font-family: 'JetBrains Mono', monospace;
              margin: 20px 0 10px;
            }
            .markdown-preview p { margin-bottom: 16px; color: #b8b8b0; }
            .markdown-preview blockquote {
              border-left: 3px solid #ffd557;
              padding-left: 16px;
              color: #888;
              font-style: italic;
              margin: 16px 0;
              background: linear-gradient(90deg, rgba(255,213,87,0.05) 0%, transparent 100%);
              border-radius: 0 8px 8px 0;
            }
            .markdown-preview code {
              font-family: 'JetBrains Mono', 'Fira Code', monospace;
              font-size: 12px;
              background: #161616;
              border: 1px solid #2a2a2a;
              border-radius: 6px;
              padding: 2px 6px;
              color: #ffd557;

            }
            .markdown-preview pre {
              background: #0d0d0d;
              border: 1px solid #2a2a2a;
              border-radius: 10px;
              padding: 16px 20px;
              overflow-x: auto;
              margin: 16px 0;
            }
            .markdown-preview pre code { background: none; border: none; padding: 0; color: #a8ff57; font-size: 12px; }
            .markdown-preview ul, .markdown-preview ol { padding-left: 24px; margin-bottom: 16px; }
            .markdown-preview li { margin-bottom: 6px; }
            .markdown-preview a { color: #ffd557; text-decoration: none; border-bottom: 1px solid rgba(255,213,87,0.3); }
            .markdown-preview a:hover { border-bottom-color: #ffd557; color: #ffe08a; }
            .markdown-preview hr { border: none; border-top: 1px solid #1e1e1e; margin: 32px 0; }

            .badge-container { display: inline-block; margin: 0 2px; }
            .badge-image { display: inline-block; height: 20px !important; width: auto !important; max-height: 20px !important; object-fit: contain; vertical-align: middle; }

            .image-container:not(.badge-container) {
              position: relative;
              margin: 20px 0;
              border-radius: 12px;
              background: #0d0d0d;
            }
            .markdown-image:not(.badge-image) {
              width: 100%;
              height: auto;
              max-height: 400px;
              object-fit: contain;
              border-radius: 8px;
              cursor: pointer;
              transition: all 0.3s ease;
            }
            .markdown-image.zoomed { cursor: zoom-out; max-height: none; transform: scale(1.02); }
            .image-caption { text-align: center; font-size: 11px; color: #666; margin-top: 8px; font-style: italic; }
            .image-error-container {
              padding: 20px;
              text-align: center;
              background: #1a1a1a;
              border-radius: 8px;
              margin: 20px 0;
              color: #ff5757;
              font-size: 12px;
            }
            .image-error-message {
              display: none;
              padding: 20px;
              text-align: center;
              background: #1a1a1a;
              border-radius: 8px;
              color: #ff5757;
              font-size: 12px;
            }
            .error-message { color: #ff5757; padding: 20px; text-align: center; }
            .code-view { border-radius: 12px; overflow: hidden; width:650px ; }
          `}
        </style>

        {activeTab === 'preview' ? (
          !raw?.trim() ? (
            <div className="text-center py-20">
              <p className="text-[#444] font-mono text-sm">No content to preview</p>
            </div>
          ) : (
            <div
              key={screenshotsKey || blocks.length}
              className="markdown-preview"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          )
        ) : (
          <div className="code-view">
            <SyntaxHighlighter
              language="markdown"
              wordWrap={true}
              style={vscDarkPlus}
              showLineNumbers={true}
              wrapLines={true}
              wrapLongLines={true}
              customStyle={{
                width: '100%',
                margin: 0,
                borderRadius: '12px',
                fontSize: '12px',
              }}
            >
              {raw || '# No content yet'}
            </SyntaxHighlighter>
          </div>
        )}

        <div className="mt-12 pt-6 border-t border-[#1a1a1a] text-center">
          <div className="flex items-center justify-center gap-4 text-[10px] font-mono text-[#444]">
            <div className="flex items-center gap-1.5">
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>Last updated {new Date().toLocaleTimeString()}</span>
            </div>
            <div className="w-px h-3 bg-[#1a1a1a]"></div>
            <div className="flex items-center gap-1.5">
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 7h16M4 12h16M4 17h10" />
              </svg>
              <span>~{Math.ceil(raw.length / 1024)} KB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
