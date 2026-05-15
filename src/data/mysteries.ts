import type { MysterySetData } from '../types';

export const mysterySets: MysterySetData[] = [
  {
    id: 'joyful',
    title: { sk: 'Radostné tajomstvá', en: 'Joyful Mysteries' },
    subtitle: { sk: 'Pondelok a Sobota', en: 'Monday and Saturday' },
    color: '#7c3aed',
    decades: [
      { name: { sk: 'Zvestovanie', en: 'The Annunciation' }, description: { sk: 'Anjel zvestuje Panne Márii, že bude Matkou Božieho Syna.', en: 'The Angel Gabriel announces to Mary that she will be the Mother of God\'s Son.' }, color: '#7c3aed', icon: 'message-circle' },
      { name: { sk: 'Navštívenie Alžbety', en: 'The Visitation' }, description: { sk: 'Panna Mária navštevuje svoju príbuznú Alžbetu.', en: 'Mary visits her cousin Elizabeth.' }, color: '#7c3aed', icon: 'users' },
      { name: { sk: 'Narodenie Pána', en: 'The Nativity' }, description: { sk: 'Ježiš Kristus sa narodil v chudobnom žľabe v Betleheme.', en: 'Jesus Christ is born in a poor stable in Bethlehem.' }, color: '#7c3aed', icon: 'star' },
      { name: { sk: 'Obetovanie v chráme', en: 'The Presentation' }, description: { sk: 'Mária a Jozef prinášajú Ježiša do chrámu.', en: 'Mary and Joseph present Jesus in the Temple.' }, color: '#7c3aed', icon: 'church' },
      { name: { sk: 'Nájdenie v chráme', en: 'The Finding in the Temple' }, description: { sk: 'Dvanásťročný Ježiš je nájdený v chráme medzi učiteľmi.', en: 'The twelve-year-old Jesus is found in the Temple among the teachers.' }, color: '#7c3aed', icon: 'search' },
    ],
  },
  {
    id: 'sorrowful',
    title: { sk: 'Bolestné tajomstvá', en: 'Sorrowful Mysteries' },
    subtitle: { sk: 'Utorok a Piatok', en: 'Tuesday and Friday' },
    color: '#f43f5e',
    decades: [
      { name: { sk: 'Modlitba v Getsemanskej záhrade', en: 'The Agony in the Garden' }, description: { sk: 'Ježiš sa modlí v Getsemanskej záhrade a krvaví sa od úzkosti.', en: 'Jesus prays in the Garden of Gethsemane and sweats blood from anguish.' }, color: '#f43f5e', icon: 'droplets' },
      { name: { sk: 'Bičovanie pri stĺpe', en: 'The Scourging at the Pillar' }, description: { sk: 'Ježiš je kruto bičovaný.', en: 'Jesus is cruelly scourged.' }, color: '#f43f5e', icon: 'alert-circle' },
      { name: { sk: 'Korunovanie tŕňovou korunou', en: 'The Crowning with Thorns' }, description: { sk: 'Ježišovi je nasadená tŕňová koruna a vysmievajú sa mu.', en: 'Jesus is crowned with thorns and mocked.' }, color: '#f43f5e', icon: 'circle-dot' },
      { name: { sk: 'Nesenie kríža', en: 'The Carrying of the Cross' }, description: { sk: 'Ježiš nesie ťažký kríž na Golgotu.', en: 'Jesus carries the heavy cross to Calvary.' }, color: '#f43f5e', icon: 'cross' },
      { name: { sk: 'Ukrižovanie a smrť Pána', en: 'The Crucifixion' }, description: { sk: 'Ježiš umiera na kríži za naše hriechy.', en: 'Jesus dies on the cross for our sins.' }, color: '#f43f5e', icon: 'heart-crack' },
    ],
  },
  {
    id: 'glorious',
    title: { sk: 'Slávnostné tajomstvá', en: 'Glorious Mysteries' },
    subtitle: { sk: 'Streda a Nedeľa', en: 'Wednesday and Sunday' },
    color: '#f59e0b',
    decades: [
      { name: { sk: 'Zmŕtvychvstanie', en: 'The Resurrection' }, description: { sk: 'Ježiš vychádza z hrobu živý a oslávený.', en: 'Jesus rises from the tomb, alive and glorified.' }, color: '#f59e0b', icon: 'sun' },
      { name: { sk: 'Nanebovstúpenie', en: 'The Ascension' }, description: { sk: 'Ježiš vystupuje do neba a zasľubuje Ducha Svätého.', en: 'Jesus ascends into heaven and promises the Holy Spirit.' }, color: '#f59e0b', icon: 'arrow-up' },
      { name: { sk: 'Zoslanie Ducha Svätého', en: 'The Descent of the Holy Spirit' }, description: { sk: 'Duch Svätý zostupuje na apoštolov a Máriu.', en: 'The Holy Spirit descends upon the apostles and Mary.' }, color: '#f59e0b', icon: 'flame' },
      { name: { sk: 'Nanebovzatie Panny Márie', en: 'The Assumption' }, description: { sk: 'Panna Mária je vzatá do neba telom i dušou.', en: 'The Virgin Mary is taken into heaven, body and soul.' }, color: '#f59e0b', icon: 'cloud' },
      { name: { sk: 'Korunovanie Panny Márie', en: 'The Coronation' }, description: { sk: 'Panna Mária je korunovaná za Kráľovnú nebies a zeme.', en: 'The Virgin Mary is crowned Queen of heaven and earth.' }, color: '#f59e0b', icon: 'crown' },
    ],
  },
  {
    id: 'luminous',
    title: { sk: 'Svetelné tajomstvá', en: 'Luminous Mysteries' },
    subtitle: { sk: 'Štvrtok', en: 'Thursday' },
    color: '#3b82f6',
    decades: [
      { name: { sk: 'Krst v Jordáne', en: 'The Baptism in the Jordan' }, description: { sk: 'Ježiš je pokrstený v Jordáne a začína svoje verejné pôsobenie.', en: 'Jesus is baptized in the Jordan and begins his public ministry.' }, color: '#3b82f6', icon: 'droplet' },
      { name: { sk: 'Zázračná hostina na svadbe v Káne', en: 'The Wedding at Cana' }, description: { sk: 'Ježiš zmení vodu na víno na prosbu svojej Matky.', en: 'Jesus changes water into wine at his Mother\'s request.' }, color: '#3b82f6', icon: 'wine' },
      { name: { sk: 'Ohlasovanie Božieho kráľovstva', en: 'The Proclamation of the Kingdom' }, description: { sk: 'Ježiš ohlasuje obrátenie a Božie kráľovstvo.', en: 'Jesus proclaims conversion and the Kingdom of God.' }, color: '#3b82f6', icon: 'megaphone' },
      { name: { sk: 'Premenenie Pána', en: 'The Transfiguration' }, description: { sk: 'Ježiš sa premieňa pred apoštolmi na vrchu Tábor.', en: 'Jesus is transfigured before the apostles on Mount Tabor.' }, color: '#3b82f6', icon: 'mountain' },
      { name: { sk: 'Ustanovenie Eucharistie', en: 'The Institution of the Eucharist' }, description: { sk: 'Ježiš ustanovuje Eucharistiu pri Poslednej večeri.', en: 'Jesus institutes the Eucharist at the Last Supper.' }, color: '#3b82f6', icon: 'bread' },
    ],
  },
];

export function getMysterySet(id: string): typeof mysterySets[number] | undefined {
  return mysterySets.find((m) => m.id === id);
}

export function getTodaysMysterySet(): typeof mysterySets[number] {
  const day = new Date().getDay();
  // 0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday, 4 = Thursday, 5 = Friday, 6 = Saturday
  switch (day) {
    case 1:
    case 6:
      return mysterySets[0]; // joyful
    case 2:
    case 5:
      return mysterySets[1]; // sorrowful
    case 3:
    case 0:
      return mysterySets[2]; // glorious
    case 4:
      return mysterySets[3]; // luminous
    default:
      return mysterySets[0];
  }
}
