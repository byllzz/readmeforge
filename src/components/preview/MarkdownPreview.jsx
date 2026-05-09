import { useMemo } from 'react'
import { marked } from 'marked'
import useReadme from '../../store/useReadme.js'
import { blocksToMarkdown } from '../../lib/markdown.js'

marked.setOptions({ breaks: true, gfm: true })

export default function MarkdownPreview() {
  const blocks = useReadme(s => s.blocks)
  const raw = useMemo(() => blocksToMarkdown(blocks), [blocks])
  const html = useMemo(() => marked.parse(raw), [raw])

  return (
    <div className="flex-1 min-h-0 overflow-y-auto px-6 py-5">
      {blocks.length === 0 ? (
        <div className="h-full flex items-center justify-center">
          <p className="text-xs text-[#333] font-mono">preview will appear here</p>
        </div>
      ) : (
        <>
          <style>{`
            .markdown-preview { color: #c8c8c0; font-family: 'Instrument Sans', sans-serif; font-size: 14px; line-height: 1.75; }
            .markdown-preview h1 { font-family: 'Syne', sans-serif; font-size: 26px; font-weight: 800; color: #e8e8e0; letter-spacing: -0.03em; margin-bottom: 8px; }
            .markdown-preview h2 { font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 700; color: #e8e8e0; margin: 24px 0 10px; letter-spacing: -0.02em; border-bottom: 1px solid #1e1e1e; padding-bottom: 6px; }
            .markdown-preview h3 { font-size: 13px; font-weight: 600; color: #a8ff57; font-family: 'JetBrains Mono', monospace; margin: 16px 0 6px; }
            .markdown-preview p { margin-bottom: 12px; }
            .markdown-preview blockquote { border-left: 2px solid #7c6dfa; padding-left: 12px; color: #888; font-style: italic; margin: 8px 0 14px; }
            .markdown-preview code { font-family: 'JetBrains Mono', monospace; font-size: 12px; background: #161616; border: 1px solid #2a2a2a; border-radius: 4px; padding: 1px 5px; color: #57ffc8; }
            .markdown-preview pre { background: #0d0d0d; border: 1px solid #2a2a2a; border-radius: 8px; padding: 14px 16px; overflow-x: auto; margin: 8px 0 14px; }
            .markdown-preview pre code { background: none; border: none; padding: 0; color: #a8ff57; font-size: 12px; }
            .markdown-preview ul { padding-left: 18px; margin-bottom: 12px; }
            .markdown-preview li { margin-bottom: 4px; }
            .markdown-preview img { max-width: 100%; border-radius: 8px; border: 1px solid #2a2a2a; margin: 8px 0; display: block; }
            .markdown-preview a { color: #7c6dfa; text-decoration: none; }
            .markdown-preview a:hover { text-decoration: underline; }
            .markdown-preview hr { border: none; border-top: 1px solid #1e1e1e; margin: 20px 0; }
            .markdown-preview strong { color: #e8e8e0; font-weight: 600; }
            .markdown-preview em { color: #888; }
          `}</style>
          <div className="markdown-preview" dangerouslySetInnerHTML={{ __html: html }} />
        </>
      )}
    </div>
  )
}
