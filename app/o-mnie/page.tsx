import Image from 'next/image'
import ProfileImage from '@/public/profile-1.jpg'
import SectionLabel from '@/components/cosmos/section-label'
import Link from 'next/link'

const TECHNOLOGIES: [string, string[]][] = [
  [
    'Frontend',
    [
      'HTML5',
      'CSS3',
      'JavaScript',
      'TypeScript',
      'Next.js',
      'Astro',
      'TailwindCSS',
      'shadcn/ui',
      'SCSS',
      'TanStack',
    ],
  ],
  ['Mobile', ['React Native', 'Expo', 'Telegram Mini Apps']],
  ['Backend', ['Node.js', 'NestJS', 'Express', 'Swagger', 'JWT']],
  ['Bazy', ['PostgreSQL', 'MongoDB', 'Prisma', 'Supabase', 'Firebase']],
  ['Web3', ['Ethers.js', 'Web3']],
  ['Testy', ['Jest', 'Cypress', 'Supertest', 'React Testing Library', 'Playwright']],
  ['DevOps', ['Git', 'Docker', 'Grafana', 'Prometheus']],
  [
    'Edytory',
    ['Codex', 'Claude Code', 'Cursor', 'GitHub Copilot', 'VS Code', 'Neovim', 'WebStorm'],
  ],
]

export default function AboutPage() {
  return (
    <div className='cs-page cs-fade-in'>
      <section>
        <SectionLabel code='// 02' title='O mnie' kicker='// transmisja osobista' />
        <div className='cs-about-grid'>
          <div className='cs-orbit-portrait'>
            <div className='ring' />
            <div className='ring' />
            <div className='photo'>
              <Image src={ProfileImage} alt='Krzysztof' fill sizes='240px' />
            </div>
          </div>
          <div className='cs-about-body'>
            <div className='cs-about-role'>// inżynier · krk · sektor 7</div>
            <div className='cs-about-name'>Krzysztof Obarzanek</div>
            <p className='cs-about-bio'>
              Jestem pasjonatem technologii, który kocha doradzać w doborze sprzętu, składać
              komputery i tworzyć strony internetowe. Moja pasja do technologii napędza mnie do
              nieustannego doskonalenia swoich umiejętności i tworzenia rozwiązań, które łączą
              innowację z praktycznością.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 8 }}>
              <Link href='/oferta' className='btn-cosmic'>
                Zobacz ofertę <span className='arrow'>→</span>
              </Link>
              <Link href='/kontakt' className='btn-cosmic'>
                Kontakt <span className='arrow'>↗</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionLabel
          code='// tech'
          title='Technologie'
          kicker='Narzędzia, z których korzystam w pracy'
        />
        <div className='cs-tech-grid'>
          {TECHNOLOGIES.map(([cat, items]) => (
            <div key={cat} className='cs-tech-cat'>
              <div className='cs-tech-cat-name'>{cat}</div>
              <ul>
                {items.map(t => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
