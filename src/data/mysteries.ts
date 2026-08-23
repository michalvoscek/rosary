import type { MysterySetData } from '../types';

export const mysterySets: MysterySetData[] = [
  {
    id: 'joyful',
    title: { sk: 'Radostné tajomstvá', en: 'Joyful Mysteries' },
    subtitle: { sk: 'Pondelok a Sobota', en: 'Monday and Saturday' },
    color: 'var(--mystery-joyful)',
    decades: [
      { name: { sk: 'Zvestovanie', en: 'The Annunciation' }, description: { sk: 'Anjel zvestuje Panne Márii, že bude Matkou Božieho Syna.', en: 'The Angel Gabriel announces to Mary that she will be the Mother of God\'s Son.' }, color: 'var(--mystery-joyful)', icon: 'message-circle' },
      { name: { sk: 'Navštívenie Alžbety', en: 'The Visitation' }, description: { sk: 'Panna Mária navštevuje svoju príbuznú Alžbetu.', en: 'Mary visits her cousin Elizabeth.' }, color: 'var(--mystery-joyful)', icon: 'users' },
      { name: { sk: 'Narodenie Pána', en: 'The Nativity' }, description: { sk: 'Ježiš Kristus sa narodil v chudobnom žľabe v Betleheme.', en: 'Jesus Christ is born in a poor stable in Bethlehem.' }, color: 'var(--mystery-joyful)', icon: 'star' },
      { name: { sk: 'Obetovanie v chráme', en: 'The Presentation' }, description: { sk: 'Mária a Jozef prinášajú Ježiša do chrámu.', en: 'Mary and Joseph present Jesus in the Temple.' }, color: 'var(--mystery-joyful)', icon: 'church' },
      { name: { sk: 'Nájdenie v chráme', en: 'The Finding in the Temple' }, description: { sk: 'Dvanásťročný Ježiš je nájdený v chráme medzi učiteľmi.', en: 'The twelve-year-old Jesus is found in the Temple among the teachers.' }, color: 'var(--mystery-joyful)', icon: 'search' },
    ],
  },
  {
    id: 'sorrowful',
    title: { sk: 'Bolestné tajomstvá', en: 'Sorrowful Mysteries' },
    subtitle: { sk: 'Utorok a Piatok', en: 'Tuesday and Friday' },
    color: 'var(--mystery-sorrowful)',
    decades: [
      { name: { sk: 'Modlitba v Getsemanskej záhrade', en: 'The Agony in the Garden' }, description: { sk: 'Ježiš sa modlí v Getsemanskej záhrade a krvaví sa od úzkosti.', en: 'Jesus prays in the Garden of Gethsemane and sweats blood from anguish.' }, color: 'var(--mystery-sorrowful)', icon: 'droplets' },
      { name: { sk: 'Bičovanie pri stĺpe', en: 'The Scourging at the Pillar' }, description: { sk: 'Ježiš je kruto bičovaný.', en: 'Jesus is cruelly scourged.' }, color: 'var(--mystery-sorrowful)', icon: 'alert-circle' },
      { name: { sk: 'Korunovanie tŕňovou korunou', en: 'The Crowning with Thorns' }, description: { sk: 'Ježišovi je nasadená tŕňová koruna a vysmievajú sa mu.', en: 'Jesus is crowned with thorns and mocked.' }, color: 'var(--mystery-sorrowful)', icon: 'circle-dot' },
      { name: { sk: 'Nesenie kríža', en: 'The Carrying of the Cross' }, description: { sk: 'Ježiš nesie ťažký kríž na Golgotu.', en: 'Jesus carries the heavy cross to Calvary.' }, color: 'var(--mystery-sorrowful)', icon: 'cross' },
      { name: { sk: 'Ukrižovanie a smrť Pána', en: 'The Crucifixion' }, description: { sk: 'Ježiš umiera na kríži za naše hriechy.', en: 'Jesus dies on the cross for our sins.' }, color: 'var(--mystery-sorrowful)', icon: 'heart-crack' },
    ],
  },
  {
    id: 'glorious',
    title: { sk: 'Slávnostné tajomstvá', en: 'Glorious Mysteries' },
    subtitle: { sk: 'Streda a Nedeľa', en: 'Wednesday and Sunday' },
    color: 'var(--mystery-glorious)',
    decades: [
      { name: { sk: 'Zmŕtvychvstanie', en: 'The Resurrection' }, description: { sk: 'Ježiš vychádza z hrobu živý a oslávený.', en: 'Jesus rises from the tomb, alive and glorified.' }, color: 'var(--mystery-glorious)', icon: 'sun' },
      { name: { sk: 'Nanebovstúpenie', en: 'The Ascension' }, description: { sk: 'Ježiš vystupuje do neba a zasľubuje Ducha Svätého.', en: 'Jesus ascends into heaven and promises the Holy Spirit.' }, color: 'var(--mystery-glorious)', icon: 'arrow-up' },
      { name: { sk: 'Zoslanie Ducha Svätého', en: 'The Descent of the Holy Spirit' }, description: { sk: 'Duch Svätý zostupuje na apoštolov a Máriu.', en: 'The Holy Spirit descends upon the apostles and Mary.' }, color: 'var(--mystery-glorious)', icon: 'flame' },
      { name: { sk: 'Nanebovzatie Panny Márie', en: 'The Assumption' }, description: { sk: 'Panna Mária je vzatá do neba telom i dušou.', en: 'The Virgin Mary is taken into heaven, body and soul.' }, color: 'var(--mystery-glorious)', icon: 'cloud' },
      { name: { sk: 'Korunovanie Panny Márie', en: 'The Coronation' }, description: { sk: 'Panna Mária je korunovaná za Kráľovnú nebies a zeme.', en: 'The Virgin Mary is crowned Queen of heaven and earth.' }, color: 'var(--mystery-glorious)', icon: 'crown' },
    ],
  },
  {
    id: 'luminous',
    title: { sk: 'Svetelné tajomstvá', en: 'Luminous Mysteries' },
    subtitle: { sk: 'Štvrtok', en: 'Thursday' },
    color: 'var(--mystery-luminous)',
    decades: [
      { name: { sk: 'Krst v Jordáne', en: 'The Baptism in the Jordan' }, description: { sk: 'Ježiš je pokrstený v Jordáne a začína svoje verejné pôsobenie.', en: 'Jesus is baptized in the Jordan and begins his public ministry.' }, color: 'var(--mystery-luminous)', icon: 'droplet' },
      { name: { sk: 'Zázračná hostina na svadbe v Káne', en: 'The Wedding at Cana' }, description: { sk: 'Ježiš zmení vodu na víno na prosbu svojej Matky.', en: 'Jesus changes water into wine at his Mother\'s request.' }, color: 'var(--mystery-luminous)', icon: 'wine' },
      { name: { sk: 'Ohlasovanie Božieho kráľovstva', en: 'The Proclamation of the Kingdom' }, description: { sk: 'Ježiš ohlasuje obrátenie a Božie kráľovstvo.', en: 'Jesus proclaims conversion and the Kingdom of God.' }, color: 'var(--mystery-luminous)', icon: 'megaphone' },
      { name: { sk: 'Premenenie Pána', en: 'The Transfiguration' }, description: { sk: 'Ježiš sa premieňa pred apoštolmi na vrchu Tábor.', en: 'Jesus is transfigured before the apostles on Mount Tabor.' }, color: 'var(--mystery-luminous)', icon: 'mountain' },
      { name: { sk: 'Ustanovenie Eucharistie', en: 'The Institution of the Eucharist' }, description: { sk: 'Ježiš ustanovuje Eucharistiu pri Poslednej večeri.', en: 'Jesus institutes the Eucharist at the Last Supper.' }, color: 'var(--mystery-luminous)', icon: 'bread' },
    ],
  },
];

export function getMysterySet(id: string): typeof mysterySets[number] | undefined {
  return mysterySets.find((m) => m.id === id);
}

export function getTodaysMysterySet(): typeof mysterySets[number] {
  const day = new Date().getDay();
  return getMysteryForDay(day);
}

export function getMysteryForDay(day: number): typeof mysterySets[number] {
  switch (day) {
    case 1: // Monday
    case 6: // Saturday
      return mysterySets[0]; // joyful
    case 2: // Tuesday
    case 5: // Friday
      return mysterySets[1]; // sorrowful
    case 3: // Wednesday
    case 0: // Sunday
      return mysterySets[2]; // glorious
    case 4: // Thursday
      return mysterySets[3]; // luminous
    default:
      return mysterySets[0];
  }
}

export const weekdayNames: { sk: string[]; en: string[] } = {
  sk: ['Nedeľa', 'Pondelok', 'Utorok', 'Streda', 'Štvrtok', 'Piatok', 'Sobota'],
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
};

export const monthNames: { sk: string[]; en: string[] } = {
  sk: [
    'Január', 'Február', 'Marec', 'Apríl', 'Máj', 'Jún',
    'Júl', 'August', 'September', 'Október', 'November', 'December',
  ],
  en: [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ],
};

// Week starts on Monday (index 0 = Monday).
export const weekdayNamesMondayFirst: { sk: string[]; en: string[] } = {
  sk: ['Po', 'Ut', 'St', 'Št', 'Pi', 'So', 'Ne'],
  en: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
};
