export function blocksToMarkdown(blocks) {
  return blocks.map(b => blockToMd(b.type, b.content)).filter(Boolean).join('\n\n---\n\n')
}

function blockToMd(type, c) {
  switch (type) {
    case 'title':
      return [`# ${c.name || 'Project'}`, c.tagline ? `\n> ${c.tagline}` : ''].filter(Boolean).join('\n')

    case 'badges':
      return (c.badges || [])
        .map(b => b.link ? `[![${b.label}](${b.url})](${b.link})` : `![${b.label}](${b.url})`)
        .join(' ')

    case 'description':
      return c.text || ''

    case 'features':
      return `## ✨ Features\n\n${(c.items || []).map(f => `- ${f}`).join('\n')}`

    case 'installation': {
      const mgr = c.manager || 'npm'
      const pkg = c.package || 'your-package'
      const cmd = mgr === 'yarn' ? `yarn add ${pkg}` : mgr === 'pnpm' ? `pnpm add ${pkg}` : mgr === 'bun' ? `bun add ${pkg}` : `npm install ${pkg}`
      const extra = c.extra ? `\n\n\`\`\`bash\n${c.extra}\n\`\`\`` : ''
      return `## 🚀 Installation\n\n\`\`\`bash\n${cmd}\n\`\`\`${extra}`
    }

    case 'usage':
      return `## 📖 Usage\n\n\`\`\`${c.language || 'js'}\n${c.code || ''}\n\`\`\``

    case 'screenshots': {
      const imgs = (c.items || []).filter(i => i.url)
        .map(i => `![${i.alt || 'Screenshot'}](${i.url})${i.caption ? `\n*${i.caption}*` : ''}`)
        .join('\n\n')
      return `## 📸 Screenshots\n\n${imgs || '_No screenshots yet._'}`
    }

    case 'api': {
      const rows = (c.entries || []).map(e =>
        `### \`${e.name}\`\n\n${e.description}${e.params ? `\n\n**Params:** ${e.params}` : ''}`
      ).join('\n\n')
      return `## 📚 API\n\n${rows || '_No entries yet._'}`
    }

    case 'contributing': {
      const steps = (c.steps || []).map((s, i) => `${i + 1}. ${s}`).join('\n')
      return `## 🤝 Contributing\n\n${c.text || ''}\n\n${steps}`
    }

    case 'license':
      return `## 📄 License\n\nDistributed under the **${c.type || 'MIT'}** License.\n\n© ${c.year} ${c.author}`

    case 'custom':
      return c.markdown || ''

    default:
      return ''
  }
}
