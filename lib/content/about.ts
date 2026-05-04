export const aboutContent = {
  section: {
    code: '// 02',
    title: 'O mnie',
    kicker: '// transmisja osobista',
  },
  profile: {
    imageAlt: 'Krzysztof',
    role: '// inżynier · krk',
    name: 'Krzysztof Obarzanek',
    bio: 'Jestem pasjonatem technologii, który kocha doradzać w doborze sprzętu, składać komputery i tworzyć strony internetowe. Moja pasja do technologii napędza mnie do nieustannego doskonalenia swoich umiejętności i tworzenia rozwiązań, które łączą innowację z praktycznością.',
    btnKontakt: 'Kontakt',
  },
  tech: {
    code: '// tech',
    title: 'Technologie',
    kicker: 'Narzędzia, z których korzystam w pracy',
  },
  technologies: [
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
  ] as [string, string[]][],
} as const;
