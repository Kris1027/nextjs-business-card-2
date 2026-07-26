export const homeContent = {
  /* Heads the static ServiceGrid. This block was named `carousel` and its
     kicker read "w transmisji na żywo" back when the section auto-rotated;
     nothing rotates now, so both were corrected. */
  uslugi: {
    code: '// 01',
    title: 'Co buduję',
    kicker: 'Wybrane usługi',
  },
  oferta: {
    code: '// 02',
    title: 'Pełna oferta',
    kicker: 'Cztery moduły',
  },
  callout: {
    imageAlt: 'PC z RGB',
    heading: { before: 'Nie kupuj gotowców', em: 'PC' },
    body1:
      'Gotowe zestawy komputerowe to często strata pieniędzy. Sklepy montują w nich źle dobrane komponenty, a bardzo często wykorzystują części, które zalegają na magazynie. Efekt? Słabsza wydajność i brak sensownej rozbudowy.',
    body2:
      'Za cenę gotowca złożę komputer znacznie wydajniejszy, idealnie dopasowany do Twoich potrzeb i budżetu. Napisz - doradzę i złożę lepszy zestaw.',
    cta: 'Napisz do mnie',
  },
} as const;
