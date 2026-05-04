import Image from 'next/image';
import ProfileImage from '@/public/profile-1.webp';
import { SectionLabel } from '@/components/cosmos/section-label';
import { githubUrl, linkedinUrl } from '@/lib/config';
import { GithubIcon, LinkedinIcon } from '@/components/cosmos/icons';
import { CosmicButton } from '@/components/cosmos/cosmic-button';
import styles from './page.module.css';

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
  [
    'Testy',
    ['Jest', 'Cypress', 'Supertest', 'React Testing Library', 'Playwright'],
  ],
  ['DevOps', ['Git', 'Docker', 'Grafana', 'Prometheus']],
  [
    'Edytory',
    [
      'Codex',
      'Claude Code',
      'Cursor',
      'GitHub Copilot',
      'VS Code',
      'Neovim',
      'WebStorm',
    ],
  ],
];

export default function AboutPage() {
  return (
    <div className='cs-page cs-fade-in'>
      <section>
        <SectionLabel
          code='// 02'
          title='O mnie'
          kicker='// transmisja osobista'
        />
        <div className={styles.aboutGrid}>
          <div className={styles.portrait}>
            <div className={styles.ring} />
            <div className={styles.ring} />
            <div className={styles.photo}>
              <Image src={ProfileImage} alt='Krzysztof' fill sizes='240px' />
            </div>
          </div>
          <div className={styles.body}>
            <div className={styles.role}>{'// inżynier · krk'}</div>
            <div className={styles.name}>Krzysztof Obarzanek</div>
            <div className={styles.socialLinks}>
              <a
                href={githubUrl}
                target='_blank'
                rel='noopener noreferrer'
                className={styles.socialBtn}
              >
                <GithubIcon />
                GitHub
              </a>
              <a
                href={linkedinUrl}
                target='_blank'
                rel='noopener noreferrer'
                className={styles.socialBtn}
              >
                <LinkedinIcon />
                LinkedIn
              </a>
            </div>
            <p className={styles.bio}>
              Jestem pasjonatem technologii, który kocha doradzać w doborze
              sprzętu, składać komputery i tworzyć strony internetowe. Moja
              pasja do technologii napędza mnie do nieustannego doskonalenia
              swoich umiejętności i tworzenia rozwiązań, które łączą innowację z
              praktycznością.
            </p>
            <div className={styles.bodyBtns}>
              <CosmicButton href='/oferta'>Zobacz ofertę</CosmicButton>
              <CosmicButton href='/kontakt' arrow='↗'>
                Kontakt
              </CosmicButton>
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
        <div className={styles.techGrid}>
          {TECHNOLOGIES.map(([cat, items]) => (
            <div key={cat} className={styles.techCat}>
              <div className={styles.techCatName}>{cat}</div>
              <ul>
                {items.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
