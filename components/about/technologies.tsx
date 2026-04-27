'use client'

import type { Icon } from '@phosphor-icons/react'
import {
  ArrowSquareOutIcon,
  BookOpenIcon,
  BugIcon,
  ChartBarIcon,
  ChartLineUpIcon,
  CodeIcon,
  CubeIcon,
  CurrencyEthIcon,
  CursorClickIcon,
  DatabaseIcon,
  DeviceMobileCameraIcon,
  DeviceMobileIcon,
  FileCssIcon,
  FileHtmlIcon,
  FileJsIcon,
  FileTsIcon,
  FireIcon,
  GitBranchIcon,
  GithubLogoIcon,
  GlobeIcon,
  HexagonIcon,
  KeyIcon,
  LightningIcon,
  PaintBucketIcon,
  RobotIcon,
  RocketIcon,
  ShapesIcon,
  SwatchesIcon,
  TableIcon,
  TelegramLogoIcon,
  TerminalIcon,
  TestTubeIcon,
  TreeStructureIcon,
  WindIcon,
} from '@phosphor-icons/react'

type TechProps = {
  name: string
  Icon: Icon
}

const technologies: TechProps[] = [
  { name: 'HTML5', Icon: FileHtmlIcon },
  { name: 'CSS3', Icon: FileCssIcon },
  { name: 'JavaScript', Icon: FileJsIcon },
  { name: 'TypeScript', Icon: FileTsIcon },
  { name: 'Next.js', Icon: ArrowSquareOutIcon },
  { name: 'Astro', Icon: RocketIcon },
  { name: 'TanStack', Icon: TableIcon },
  { name: 'TailwindCSS', Icon: WindIcon },
  { name: 'shadcn/ui', Icon: SwatchesIcon },
  { name: 'SCSS', Icon: PaintBucketIcon },
  { name: 'React Native', Icon: DeviceMobileIcon },
  { name: 'Expo', Icon: DeviceMobileCameraIcon },
  { name: 'Telegram Mini Apps', Icon: TelegramLogoIcon },
  { name: 'Node.js', Icon: TreeStructureIcon },
  { name: 'NestJS', Icon: HexagonIcon },
  { name: 'Express', Icon: LightningIcon },
  { name: 'Swagger', Icon: BookOpenIcon },
  { name: 'JWT', Icon: KeyIcon },
  { name: 'PostgreSQL', Icon: DatabaseIcon },
  { name: 'MongoDB', Icon: DatabaseIcon },
  { name: 'Prisma', Icon: ShapesIcon },
  { name: 'Supabase', Icon: LightningIcon },
  { name: 'Firebase', Icon: FireIcon },
  { name: 'Ethers.js', Icon: CurrencyEthIcon },
  { name: 'Web3', Icon: GlobeIcon },
  { name: 'Jest', Icon: TestTubeIcon },
  { name: 'Cypress', Icon: BugIcon },
  { name: 'Supertest', Icon: TestTubeIcon },
  { name: 'React Testing Library', Icon: TestTubeIcon },
  { name: 'Playwright', Icon: TestTubeIcon },
  { name: 'Git', Icon: GitBranchIcon },
  { name: 'Docker', Icon: CubeIcon },
  { name: 'Grafana', Icon: ChartLineUpIcon },
  { name: 'Prometheus', Icon: ChartBarIcon },
  { name: 'Codex', Icon: CodeIcon },
  { name: 'Claude Code', Icon: RobotIcon },
  { name: 'Cursor', Icon: CursorClickIcon },
  { name: 'GitHub Copilot', Icon: GithubLogoIcon },
  { name: 'Visual Studio Code', Icon: CodeIcon },
  { name: 'Neovim', Icon: TerminalIcon },
  { name: 'WebStorm', Icon: CodeIcon },
]

const Technologies = () => {
  return (
    <div>
      <h2 className='text-gray-300 text-lg font-bold'>Technologie</h2>
      <p className='text-gray-400 text-sm pb-8'>
        Narzędzia i technologie, z których korzystam w mojej pracy
      </p>
      <ul className='text-gray-400 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2'>
        {technologies.map(({ name, Icon }) => (
          <li key={name} className='flex items-center gap-2'>
            <Icon size={20} />
            <span>{name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Technologies
