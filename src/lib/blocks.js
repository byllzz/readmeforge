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

export const BLOCK_META = {
  title:        { label: 'Title',        icon: 'H1', color: '#7c6dfa', description: 'Project name & tagline' },
  badges:       { label: 'Badges',       icon: '◈',  color: '#4ade80', description: 'License, version, build status' },
  description:  { label: 'Description',  icon: '¶',  color: '#ff9f57', description: 'Longer project overview' },
  features:     { label: 'Features',     icon: '✦',  color: '#fbbf24', description: 'Key features list' },
  installation: { label: 'Installation', icon: '⬇',  color: '#38bdf8', description: 'Install instructions' },
  usage:        { label: 'Usage',        icon: '▶',  color: '#57ffc8', description: 'How to use the project' },
  screenshots:  { label: 'Screenshots',  icon: '⊡',  color: '#ffd557', description: 'App screenshots or demo' },
  api:          { label: 'API Docs',     icon: '{}', color: '#57a0ff', description: 'API reference entries' },
  contributing: { label: 'Contributing', icon: '⌥',  color: '#ff57a0', description: 'Contribution guidelines' },
  license:      { label: 'License',      icon: '©',  color: '#a0a098', description: 'License info' },
  custom:       { label: 'Custom',       icon: '+',  color: '#f97316', description: 'Write your own markdown' },
}

const DEFAULTS = {
  title:        { name: 'My Awesome Project', tagline: 'A short, punchy description.' },
  badges:       { badges: [{ label: 'License', url: 'https://img.shields.io/badge/license-MIT-blue', link: '' }, { label: 'Version', url: 'https://img.shields.io/badge/version-1.0.0-green', link: '' }] },
  description:  { text: "Write a detailed description of your project here. Explain the problem it solves and who it's for." },
  features:     { items: ['Fast and lightweight', 'Easy to configure', 'Modular architecture', 'Well documented'] },
  installation: { manager: 'npm', package: 'your-package', extra: '' },
  usage:        { language: 'js', code: "import { myFunction } from 'your-package'\n\nconst result = myFunction()\nconsole.log(result)" },
  screenshots:  { items: [{ alt: 'App screenshot', url: '', caption: '' }] },
  api:          { entries: [{ name: 'myFunction(arg)', description: 'What it does', params: 'arg — string, the input value' }] },
  contributing: { text: 'Contributions are welcome! Please open an issue or submit a pull request.', steps: ['Fork the project', 'Create your feature branch (`git checkout -b feature/AmazingFeature`)', 'Commit your changes', 'Push to the branch', 'Open a Pull Request'] },
  license:      { type: 'MIT', year: String(new Date().getFullYear()), author: 'Your Name' },
  custom:       { markdown: '## Custom Section\n\nWrite any **markdown** content here...' },
}

let _id = 1
export function createBlock(type) {
  return {
    id: `block_${_id++}_${Date.now()}`,
    type,
    content: JSON.parse(JSON.stringify(DEFAULTS[type] || {})),
  }
}
