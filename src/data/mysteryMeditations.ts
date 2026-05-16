import type { BilingualText } from '../types';

/**
 * Meditation texts to be inserted after "Ježiš"/"Jesus" in Hail Mary prayers.
 * - start1, start2, start3: for the 3 initial Hail Marys (steps 3, 4, 5)
 * - decade1..decade5: for each of the 5 decades (applied to all 10 Hail Marys in that decade)
 */
export interface MysterySetTexts {
  start1: BilingualText;
  start2: BilingualText;
  start3: BilingualText;
  decade1: BilingualText;
  decade2: BilingualText;
  decade3: BilingualText;
  decade4: BilingualText;
  decade5: BilingualText;
}

export const mysteryMeditations: Record<string, MysterySetTexts> = {
  joyful: {
    start1: { sk: 'ktorý nech rozmnožuje našu vieru', en: 'who brings us the joy of salvation' },
    start2: { sk: 'ktorý nech posilňuje našu nádej', en: 'who became man for us' },
    start3: { sk: 'ktorý nech roznecuje našu lásku', en: 'who lives among us' },
    decade1: { sk: 'ktorého si, Panna, z Ducha Svätého počala', en: 'who was conceived by the Holy Spirit' },
    decade2: { sk: 'ktorého si, Panna, pri návšteve Alžbety v živote nosila', en: 'who revealed himself in the love of his Mother' },
    decade3: { sk: 'ktorého si, Panna, v Betleheme porodila', en: 'who was born in poverty for us' },
    decade4: { sk: 'ktorého si, Panna, so svätým Jozefom v chráme obetovala', en: 'who was offered for us' },
    decade5: { sk: 'ktorého si, Panna, so svätým Jozefom v chráme našla', en: 'who calls us to his temple' },
  },
  sorrowful: {
    start1: { sk: 'ktorý nech osvecuje náš rozum', en: 'who suffered for us' },
    start2: { sk: 'ktorý nech upevňuje našu vôľu', en: 'who shed his blood for us' },
    start3: { sk: 'ktorý nech posilňuje našu pamäť', en: 'who died for us' },
    decade1: { sk: 'ktorý sa pre nás krvou potil', en: 'who sweated blood for us' },
    decade2: { sk: 'ktorý pre nás bičovaný bol', en: 'who was scourged for us' },
    decade3: { sk: 'ktorý pre nás tŕním korunovaný bol', en: 'who was crowned with thorns for us' },
    decade4: { sk: 'ktorý pre nás ťažký kríž niesol', en: 'who carried the heavy cross for us' },
    decade5: { sk: 'ktorý pre nás ukrižovaný bol', en: 'who died on the cross for us' },
  },
  glorious: {
    start1: { sk: 'ktorý nech usporadúva naše myšlienky', en: 'who conquered death' },
    start2: { sk: 'ktorý nech riadi naše slová', en: 'who leads us to heaven' },
    start3: { sk: 'ktorý nech spravuje naše skutky', en: 'who fills us with the Holy Spirit' },
    decade1: { sk: 'ktorý slávne vstal z mŕtvych', en: 'who rose from the dead' },
    decade2: { sk: 'ktorý slávne vystúpil do neba', en: 'who ascended into heaven' },
    decade3: { sk: 'ktorý nám zoslal Ducha Svätého', en: 'who sent the Holy Spirit' },
    decade4: { sk: 'ktorý ťa, Panna, do neba vzal', en: 'who took Mary into heaven' },
    decade5: { sk: 'ktorý ťa, Panna, v nebi korunoval', en: 'who crowned Mary as Queen' },
  },
  luminous: {
    start1: { sk: 'ktorý nech je Svetlom nášho života', en: 'who calls us to conversion' },
    start2: { sk: 'ktorý nech nás uzdravuje milosrdnou láskou', en: 'who reveals the light of truth' },
    start3: { sk: 'ktorý nech nás vezme k sebe do večnej slávy', en: 'who nourishes us with his Body' },
    decade1: { sk: 'ktorý bol pokrstený v Jordáne a začal svoje verejne účinkovanie', en: 'who was baptized for us' },
    decade2: { sk: 'ktorý zázrakom v Káne Galilejskej otvoril srdcia učeníkov pre vieru', en: 'who changed water into wine' },
    decade3: { sk: 'ktorý ohlasoval Božie kráľovstvo a vyzýval ľud na pokánie', en: 'who proclaimed the Kingdom of God' },
    decade4: { sk: 'ktorý sa ukázal v božskej sláve na hore premenenia', en: 'who was transfigured before the apostles' },
    decade5: { sk: 'ktorý nám dal seba za pokrm a nápoj v Oltárnej sviatosti', en: 'who gave us the Eucharist' },
  },
};
