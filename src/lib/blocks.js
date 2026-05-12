import {
  Heading, ShieldCheck, AlignLeft, Star, Download, Play,
  Image, Braces, GitPullRequest, Scale, Code
} from 'lucide-react'

export const BLOCK_TYPES = {
  TITLE:        'title',
  BADGES:       'badges',
  DESCRIPTION:  'description',
  FEATURES:     'features',
  INSTALLATION: 'installation',
  USAGE:        'usage',
  SCREENSHOTS:  'screenshots',
  API:          'api',
  CONTRIBUTING: 'contributing',
  LICENSE:      'license',
  CUSTOM:       'custom',
}

// No more 'description' field – icon + label + color only
export const BLOCK_META = {
  [BLOCK_TYPES.TITLE]:        { label: 'Title',        color: '#7c6dfa' },
  [BLOCK_TYPES.BADGES]:       { label: 'Badges',       color: '#4ade80' },
  [BLOCK_TYPES.DESCRIPTION]:  { label: 'Description',  color: '#ff9f57' },
  [BLOCK_TYPES.FEATURES]:     { label: 'Features',     color: '#fbbf24' },
  [BLOCK_TYPES.INSTALLATION]: { label: 'Installation', color: '#38bdf8' },
  [BLOCK_TYPES.USAGE]:        { label: 'Usage',        color: '#57ffc8' },
  [BLOCK_TYPES.SCREENSHOTS]:  { label: 'Screenshots',  color: '#ffd557' },
  [BLOCK_TYPES.API]:          { label: 'API Docs',     color: '#57a0ff' },
  [BLOCK_TYPES.CONTRIBUTING]: { label: 'Contributing', color: '#ff57a0' },
  [BLOCK_TYPES.LICENSE]:      { label: 'License',      color: '#a0a098' },
  [BLOCK_TYPES.CUSTOM]:       { label: 'Custom',       color: '#f97316' },
}

// Map block types to their Lucide icon components
export const BLOCK_ICONS = {
  [BLOCK_TYPES.TITLE]:        Heading,
  [BLOCK_TYPES.BADGES]:       ShieldCheck,
  [BLOCK_TYPES.DESCRIPTION]:  AlignLeft,
  [BLOCK_TYPES.FEATURES]:     Star,
  [BLOCK_TYPES.INSTALLATION]: Download,
  [BLOCK_TYPES.USAGE]:        Play,
  [BLOCK_TYPES.SCREENSHOTS]:  Image,
  [BLOCK_TYPES.API]:          Braces,
  [BLOCK_TYPES.CONTRIBUTING]: GitPullRequest,
  [BLOCK_TYPES.LICENSE]:      Scale,
  [BLOCK_TYPES.CUSTOM]:       Code,
}

const DEFAULTS = {
  title: {
    name: 'My Awesome Project',
    tagline: 'A magical tool for building beautiful READMEs in minutes ✨'
  },
  badges: {
    badges: [
      { label: 'Build Status', url: 'https://img.shields.io/badge/build-passing-brightgreen', link: '#' },
      { label: 'Version', url: 'https://img.shields.io/badge/version-1.0.0-blue', link: '#' },
      { label: 'License', url: 'https://img.shields.io/badge/license-MIT-green', link: '#' },
      { label: 'PRs Welcome', url: 'https://img.shields.io/badge/PRs-welcome-brightgreen', link: '#' }
    ]
  },
  description: {
    text: '**ReadmeForge** is the fastest way to craft a stunning GitHub‑ready README. Drag‑and‑drop blocks, live preview, and one‑click export – no markdown skills required. Built for developers who care about their project’s first impression.'
  },
  features: {
    items: [
      '🚀 Visual block editor – no markdown headaches',
      '👁️ Live preview as you build',
      '📦 One‑click copy or download as README.md',
      '🎨 Dark & clean interface',
      '🔒 Works completely offline – your data stays local'
    ]
  },
  installation: {
    manager: 'npm',
    package: 'my-awesome-project',
    extra: 'cp .env.example .env\nnpx setup'
  },
  usage: {
    language: 'js',
    code: "import { createReadme } from 'my-awesome-project'\n\nconst readme = await createReadme({\n  title: 'My Project',\n  features: ['fast', 'beautiful']\n})\nconsole.log(readme)"
  },
  screenshots: {
    items: [{ alt: 'App screenshot', url: '', caption: '' }]
  },
  api: {
    entries: [
      { name: 'myFunction(arg)', description: 'What it does', params: 'arg — string, the input value' }
    ]
  },
  contributing: {
    text: 'Contributions are welcome! Please open an issue or submit a pull request.',
    steps: [
      'Fork the project',
      'Create your feature branch (`git checkout -b feature/AmazingFeature`)',
      'Commit your changes',
      'Push to the branch',
      'Open a Pull Request'
    ]
  },
  license: {
    type: 'MIT',
    year: String(new Date().getFullYear()),
    author: 'Your Name'
  },
  custom: {
    markdown: '## Custom Section\n\nWrite any **markdown** content here...'
  },
}

let _id = 1
export function createBlock(type) {
  return {
    id: `block_${_id++}_${Date.now()}`,
    type,
    content: JSON.parse(JSON.stringify(DEFAULTS[type] || {})),
  }
}
