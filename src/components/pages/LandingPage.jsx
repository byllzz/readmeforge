import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Landing.css'

const BLOCKS = [
  { icon: 'H1', color: '#7c6dfa', name: 'Title',        desc: 'Name & tagline' },
  { icon: '◈',  color: '#4ade80', name: 'Badges',       desc: 'License, version, CI' },
  { icon: '¶',  color: '#ff9f57', name: 'Description',  desc: 'Project overview' },
  { icon: '✦',  color: '#fbbf24', name: 'Features',     desc: 'Key highlights' },
  { icon: '⬇',  color: '#38bdf8', name: 'Installation', desc: 'npm / yarn / pnpm' },
  { icon: '▶',  color: '#57ffc8', name: 'Usage',        desc: 'Code example' },
  { icon: '⊡',  color: '#ffd557', name: 'Screenshots',  desc: 'Images & captions' },
  { icon: '{}', color: '#57a0ff', name: 'API Docs',     desc: 'Reference entries' },
  { icon: '⌥',  color: '#ff57a0', name: 'Contributing', desc: 'PR guidelines' },
  { icon: '©',  color: '#a0a098', name: 'License',      desc: 'MIT, Apache, GPL…' },
  { icon: '+',  color: '#f97316', name: 'Custom',       desc: 'Raw markdown' },
]

const FEATURES = [
  { icon: '🧱', color: '#7c6dfa', title: 'Block-based editor',   desc: 'Each section is a self-contained block. Add, remove, and reorder them freely. No markdown syntax required.' },
  { icon: '⚡', color: '#a8ff57', title: 'Live preview',         desc: 'See your README render in real time as you type. What you see is exactly what GitHub will show.' },
  { icon: '🎯', color: '#38bdf8', title: 'Drag to reorder',      desc: 'Rearrange any section with a simple drag. Your README structure is always one drag away from perfect.' },
  { icon: '📤', color: '#fbbf24', title: 'Export instantly',     desc: 'Download your README.md with one click, or copy the raw markdown directly to your clipboard.' },
  { icon: '🎨', color: '#ff57a0', title: 'Smart badge builder',  desc: 'Generate shields.io badges with a simple form. License, version, build status — all handled automatically.' },
  { icon: '🔓', color: '#57ffc8', title: 'Free & open source',   desc: 'No accounts. No limits. No paywalls. ReadmeForge is fully open source and will always be free to use.' },
]

const MARQUEE_ITEMS = [
  'Drag & drop blocks', 'Live markdown preview', 'One-click export',
  '11 block types', 'Zero setup', 'Open source',
  'Copy to clipboard', 'Download README.md',
]

export default function LandingPage() {
  // const navigate = useNavigate()
  const cursorRef = useRef(null)
  const ringRef   = useRef(null)
  const rafRef    = useRef(null)
  const pos       = useRef({ mx: 0, my: 0, rx: 0, ry: 0 })

  /* ── cursor ── */
  useEffect(() => {
    const cursor = cursorRef.current
    const ring   = ringRef.current
    if (!cursor || !ring) return

    const onMove = (e) => {
      pos.current.mx = e.clientX
      pos.current.my = e.clientY
      cursor.style.left = e.clientX + 'px'
      cursor.style.top  = e.clientY + 'px'
    }

    const animate = () => {
      const p = pos.current
      p.rx += (p.mx - p.rx) * 0.12
      p.ry += (p.my - p.ry) * 0.12
      ring.style.left = p.rx + 'px'
      ring.style.top  = p.ry + 'px'
      rafRef.current = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMove)
    rafRef.current = requestAnimationFrame(animate)
    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  /* ── scroll reveal ── */
  useEffect(() => {
    const els = document.querySelectorAll('.lp-reveal')
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('lp-visible'); obs.unobserve(e.target) } }),
      { threshold: 0.1 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const handleCursorEnter = () => {
    if (!cursorRef.current || !ringRef.current) return
    cursorRef.current.style.width  = '16px'
    cursorRef.current.style.height = '16px'
    ringRef.current.style.width   = '48px'
    ringRef.current.style.height  = '48px'
    ringRef.current.style.opacity = '0.2'
  }

  const handleCursorLeave = () => {
    if (!cursorRef.current || !ringRef.current) return
    cursorRef.current.style.width  = '10px'
    cursorRef.current.style.height = '10px'
    ringRef.current.style.width   = '32px'
    ringRef.current.style.height  = '32px'
    ringRef.current.style.opacity = '0.4'
  }

  const hoverProps = { onMouseEnter: handleCursorEnter, onMouseLeave: handleCursorLeave }

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="lp-root">

      {/* Cursor */}
      <div ref={cursorRef} className="lp-cursor" />
      <div ref={ringRef}   className="lp-cursor-ring" />

      {/* ── NAV ── */}
      <nav className="lp-nav">
        <div className="lp-nav-logo">
          <div className="lp-logo-dot" />
          ReadmeForge
        </div>
        <div className="lp-nav-links">
          <button className="lp-nav-link" onClick={() => scrollTo('features')} {...hoverProps}>Features</button>
          <button className="lp-nav-link" onClick={() => scrollTo('blocks')}   {...hoverProps}>Blocks</button>
          <button className="lp-nav-link" onClick={() => scrollTo('how')}      {...hoverProps}>How it works</button>
          <a className="lp-nav-link" href="https://github.com" target="_blank" rel="noreferrer" {...hoverProps}>GitHub ↗</a>
          <Link to='/app' className="lp-nav-cta" {...hoverProps}>Launch App →</Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="lp-hero">
        <div className="lp-hero-badge">
          <span className="lp-badge-dot" />
          Now live — free &amp; open source
        </div>

        <h1 className="lp-hero-title">
          Build beautiful<br />
          <span className="lp-accent">READMEs</span><br />
          in minutes.
        </h1>

        <p className="lp-hero-sub">
          Drag. Drop. Done. ReadmeForge turns your project info into a polished README — no markdown knowledge needed.
        </p>

        <div className="lp-hero-actions">
          <Link to="/app" className="lp-btn-primary" {...hoverProps}>
            Start building free →
          </Link>
          <a className="lp-btn-secondary" href="https://github.com" target="_blank" rel="noreferrer" {...hoverProps}>
            ★ Star on GitHub
          </a>
        </div>

        <div className="lp-stat-row">
          <div className="lp-stat"><div className="lp-stat-num">11</div><div className="lp-stat-label">Block types</div></div>
          <div className="lp-stat-divider" />
          <div className="lp-stat"><div className="lp-stat-num">0</div><div className="lp-stat-label">Setup required</div></div>
          <div className="lp-stat-divider" />
          <div className="lp-stat"><div className="lp-stat-num">∞</div><div className="lp-stat-label">READMEs built</div></div>
        </div>
      </section>

      {/* ── TERMINAL MOCKUP ── */}
      <div className="lp-terminal-wrap">
        <div className="lp-terminal">
          <div className="lp-terminal-bar">
            <div className="lp-tdot lp-tdot-red" />
            <div className="lp-tdot lp-tdot-amber" />
            <div className="lp-tdot lp-tdot-green" />
            <div className="lp-terminal-title">ReadmeForge — README.md</div>
          </div>
          <div className="lp-terminal-body">
            {/* Editor panel */}
            <div className="lp-t-panel">
              <div className="lp-t-label">// Editor</div>
              {[
                { icon: 'H1', color: '#7c6dfa', name: 'Title' },
                { icon: '◈',  color: '#4ade80', name: 'Badges' },
                { icon: '✦',  color: '#fbbf24', name: 'Features' },
                { icon: '⬇',  color: '#38bdf8', name: 'Installation' },
                { icon: '▶',  color: '#57ffc8', name: 'Usage' },
              ].map((b, i) => (
                <div key={b.name} className="lp-block-item" style={{ animationDelay: `${0.7 + i * 0.15}s` }}>
                  <div className="lp-block-icon" style={{ background: `${b.color}18`, border: `1px solid ${b.color}30`, color: b.color }}>{b.icon}</div>
                  <div className="lp-block-name">{b.name}</div>
                  <div className="lp-block-drag">⠿</div>
                </div>
              ))}
            </div>

            <div className="lp-t-divider" />

            {/* Preview panel */}
            <div className="lp-t-panel">
              <div className="lp-t-label">// Preview</div>
              <div className="lp-pl lp-pl-h1" />
              <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
                <div className="lp-pl lp-pl-badge" style={{ marginBottom: 0 }} />
                <div className="lp-pl lp-pl-badge" style={{ marginBottom: 0, background: '#4ade80', width: '22%' }} />
              </div>
              <div className="lp-pl lp-pl-p1" />
              <div className="lp-pl lp-pl-p2" />
              <div className="lp-pl lp-pl-p3" />
              <div className="lp-pl lp-pl-h2" />
              {['lp-pl-li', 'lp-pl-li2', 'lp-pl-li3'].map((cls, i) => (
                <div key={cls} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: i < 2 ? 6 : 0 }}>
                  <div className="lp-li-dot" style={{ animationDelay: `${1.3 + i * 0.05}s` }} />
                  <div className={`lp-pl ${cls}`} style={{ marginBottom: 0, flex: 1 }} />
                </div>
              ))}
              <div className="lp-preview-code">
                <div className="lp-code-dot" style={{ background: '#ff5757' }} />
                <div className="lp-code-dot" style={{ background: '#fbbf24' }} />
                <div className="lp-code-dot" style={{ background: '#4ade80' }} />
                <div style={{ flex: 1, height: 6, background: 'var(--lp-border2)', borderRadius: 2, marginLeft: 4 }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MARQUEE ── */}
      <div className="lp-marquee-wrap">
        <div className="lp-marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <div key={i} className="lp-marquee-item">
              {item} <span>✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── FEATURES ── */}
      <section className="lp-section" id="features">
        <div className="lp-reveal">
          <div className="lp-section-label">// Features</div>
          <h2 className="lp-section-title">Everything you need.<br />Nothing you don't.</h2>
          <p className="lp-section-sub">Built for developers who want great READMEs without writing a single line of markdown by hand.</p>
        </div>
        <div className="lp-features-grid lp-reveal">
          {FEATURES.map(f => (
            <div key={f.title} className="lp-feat-card" {...hoverProps}>
              <div className="lp-feat-icon" style={{ background: `${f.color}18`, border: `1px solid ${f.color}22` }}>{f.icon}</div>
              <div className="lp-feat-title">{f.title}</div>
              <div className="lp-feat-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── BLOCKS SHOWCASE ── */}
      <section className="lp-blocks-section" id="blocks">
        <div className="lp-blocks-inner">
          <div className="lp-reveal">
            <div className="lp-section-label">// Blocks</div>
            <h2 className="lp-section-title">11 blocks.<br />Infinite READMEs.</h2>
            <p className="lp-section-sub" style={{ marginBottom: 0 }}>Every section a great README needs, pre-built and ready to fill in.</p>
          </div>
          <div className="lp-blocks-list lp-reveal">
            {BLOCKS.map(b => (
              <div key={b.name} className="lp-block-row" {...hoverProps}>
                <div className="lp-block-row-icon" style={{ background: `${b.color}18`, border: `1px solid ${b.color}30`, color: b.color }}>{b.icon}</div>
                <div className="lp-block-row-name">{b.name}</div>
                <div className="lp-block-row-desc">{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="lp-steps-section" id="how">
        <div className="lp-steps-inner">
          <div className="lp-reveal">
            <div className="lp-section-label">// How it works</div>
            <h2 className="lp-section-title">Three steps.<br />One great README.</h2>
          </div>
          <div className="lp-steps-grid lp-reveal">
            {[
              { n: '01', title: 'Add blocks',     desc: 'Pick from 11 pre-built section blocks. Click to add them to your README in any order.', line: true },
              { n: '02', title: 'Fill & reorder', desc: 'Click any block to edit its content. Drag to reorder sections exactly how you want them.', line: true },
              { n: '03', title: 'Export & ship',  desc: "Download your README.md or copy it to clipboard. Drop it in your repo and you're done.", line: false },
            ].map(s => (
              <div key={s.n} className="lp-step-card">
                <div className="lp-step-num">{s.n}</div>
                <div className="lp-step-title">{s.title}</div>
                <div className="lp-step-desc">{s.desc}</div>
                {s.line && <div className="lp-step-line" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="lp-cta-section">
        <div className="lp-cta-glow" />
        <div className="lp-reveal">
          <h2 className="lp-cta-title">
            Your README<br />deserves to look<br />
            <span className="lp-cta-green">this good.</span>
          </h2>
          <p className="lp-cta-sub">Free. Open source. No signup required.</p>
          <Link to="/app" className="lp-btn-primary lp-btn-lg" {...hoverProps}>
            Start building now →
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="lp-footer">
        <div className="lp-footer-logo">
          <div className="lp-logo-dot" style={{ width: 6, height: 6 }} />
          ReadmeForge
        </div>
        <div className="lp-footer-links">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="lp-footer-link" {...hoverProps}>GitHub</a>
          <a href="#" className="lp-footer-link" {...hoverProps}>Twitter</a>
          <a href="#" className="lp-footer-link" {...hoverProps}>Changelog</a>
        </div>
        <div className="lp-footer-copy">Built by a frontend dev, for frontend devs.</div>
      </footer>

    </div>
  )
}
