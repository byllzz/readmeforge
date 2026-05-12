// markdown.js
import { BLOCK_TYPES } from './blocks.js'

export function blocksToMarkdown(blocks) {
  // console.log('=== blocksToMarkdown called ===')
  // console.log('Blocks:', blocks.map(b => ({ type: b.type, hasContent: !!b.content })))

  const result = blocks.map(b => blockToMd(b.type, b.content)).filter(Boolean).join('\n\n---\n\n')
  // console.log('Final markdown length:', result.length)
  // console.log('First 500 chars:', result.substring(0, 500))

  return result
}

function blockToMd(type, c) {
  switch (type) {
    case BLOCK_TYPES.TITLE:
      return [`# ${c.name || 'Project'}`, c.tagline ? `\n> ${c.tagline}` : ''].filter(Boolean).join('\n')

    case BLOCK_TYPES.BADGES:
      return (c.badges || [])
        .map(b => b.link ? `[![${b.label}](${b.url})](${b.link})` : `![${b.label}](${b.url})`)
        .join(' ')

    case BLOCK_TYPES.DESCRIPTION:
      return c.text || ''

    case BLOCK_TYPES.FEATURES:
      return `## ✨ Features\n\n${(c.items || []).map(f => `- ${f}`).join('\n')}`

    case BLOCK_TYPES.INSTALLATION: {
      const mgr = c.manager || 'npm'
      const pkg = c.package || 'your-package'
      const cmd = mgr === 'yarn' ? `yarn add ${pkg}` : mgr === 'pnpm' ? `pnpm add ${pkg}` : mgr === 'bun' ? `bun add ${pkg}` : `npm install ${pkg}`
      const extra = c.extra ? `\n\n\`\`\`bash\n${c.extra}\n\`\`\`` : ''
      return `## 🚀 Installation\n\n\`\`\`bash\n${cmd}\n\`\`\`${extra}`
    }

    case BLOCK_TYPES.USAGE:
      return `## 📖 Usage\n\n\`\`\`${c.language || 'js'}\n${c.code || ''}\n\`\`\``

    case BLOCK_TYPES.SCREENSHOTS:
      // console.log('📸 Processing screenshots, content:', c)
      const items = c.items || []

      // Filter items with valid string URLs
      const validImages = items.filter(i => {
        const isValid = i.url && typeof i.url === 'string' && i.url.trim() !== ''
        // if (!isValid) console.log('Invalid image:', i)
        return isValid
      })

      if (validImages.length === 0) {
        // console.log('No valid images, returning empty string')
        return ''
      }

      const imgs = validImages.map(i => {
        const alt = i.alt || 'Screenshot'
        const url = i.url.trim()
        const caption = i.caption ? `\n\n*${i.caption}*` : ''
        // console.log(`Adding image: ${alt} -> ${url}`)
        return `![${alt}](${url})${caption}`
      }).join('\n\n')

      const result = `## 📸 Screenshots\n\n${imgs}`
      // console.log('Generated screenshots markdown:', result.substring(0, 200))
      return result

    case BLOCK_TYPES.API: {
      const rows = (c.entries || []).map(e =>
        `### \`${e.name}\`\n\n${e.description}${e.params ? `\n\n**Params:** ${e.params}` : ''}`
      ).join('\n\n')
      return `## 📚 API\n\n${rows || '_No entries yet._'}`
    }

    case BLOCK_TYPES.CONTRIBUTING: {
      const steps = (c.steps || []).map((s, i) => `${i + 1}. ${s}`).join('\n')
      return `## 🤝 Contributing\n\n${c.text || ''}\n\n${steps}`
    }

    case BLOCK_TYPES.LICENSE:
      return `## 📄 License\n\nDistributed under the **${c.type || 'MIT'}** License.\n\n© ${c.year || new Date().getFullYear()} ${c.author || 'Your Name'}`

    case BLOCK_TYPES.CUSTOM:
      return c.markdown || ''

    default:
      return ''
  }
}
