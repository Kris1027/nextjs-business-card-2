/**
 * Copy for the two system screens - the route-transition loader and the 404.
 *
 * Both used to be themed around the COSMOS design (starfields, orbits, "warp
 * drive engaged", "Sygnał utracony w kosmosie"). That design is gone, so the
 * copy is now plain build/route language that matches the flat violet system.
 */
export const systemContent = {
  loading: {
    ariaLabel: 'Ładowanie strony',
    channel: 'boot',
    label: '/ ładowanie',
    brand: { name: 'zaruszaj', accent: '.pl' },
    command: 'init',
    progressLabel: '// ładowanie systemu',
    log: [
      { time: '[0.012]', mark: 'ok', text: 'montowanie tras' },
      { time: '[0.241]', mark: 'ok', text: 'ładowanie treści' },
      { time: '[0.812]', mark: 'ok', text: 'kompozytor gotowy' },
      { time: '[1.503]', mark: 'ok', text: 'przygotowanie widoku' },
      { time: '[2.140]', mark: 'run', text: 'renderowanie' },
      { time: '[2.998]', mark: 'ok', text: 'gotowe' },
    ],
  },
  notFound: {
    channel: 'system',
    state: 'err',
    tag: 'error_404',
    heading: { before: 'Tej strony', em: 'tu nie ma' },
    body: 'Adres może być błędny albo strona została przeniesiona. Sprawdź pisownię lub wróć na stronę główną.',
    /** Screen-reader description of the terminal block, which is decorative. */
    terminalLabel: (path: string) =>
      `Terminal: cat ${path} - ENOENT, nie znaleziono trasy`,
    resolveKey: 'resolve:',
    resolveErr: 'ENOENT',
    resolveNote: '· nie znaleziono trasy',
    traceLabel: '// ślad wywołania',
    traceIdKey: 'trace.id',
    traceId: '0xCAFE_404',
    trace: {
      resolve: 'router.resolve(',
      notFound: 'RouteNotFound',
      notFoundNote: ': brak dopasowania',
      fallback: 'fallback →',
      fallbackTarget: 'not-found.tsx',
    },
    status: 'online · czekam na komendę',
    actions: {
      label: 'Nawigacja błędu',
      home: 'Wróć na stronę główną',
      offer: 'Zobacz ofertę',
    },
  },
} as const;
