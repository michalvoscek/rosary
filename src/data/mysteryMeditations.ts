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
    start1: { sk: 'ktorý nám prináša radosť spásy', en: 'who brings us the joy of salvation' },
    start2: { sk: 'ktorý sa stal človekom pre nás', en: 'who became man for us' },
    start3: { sk: 'ktorý žije medzi nami', en: 'who lives among us' },
    decade1: { sk: 'ktorý sa počal z Ducha Svätého', en: 'who was conceived by the Holy Spirit' },
    decade2: { sk: 'ktorý sa nám zjavil v láske svojej Matky', en: 'who revealed himself in the love of his Mother' },
    decade3: { sk: 'ktorý sa narodil v chudobe za nás', en: 'who was born in poverty for us' },
    decade4: { sk: 'ktorý bol obetovaný za nás', en: 'who was offered for us' },
    decade5: { sk: 'ktorý nás volá do svojho chrámu', en: 'who calls us to his temple' },
  },
  sorrowful: {
    start1: { sk: 'ktorý za nás trpel', en: 'who suffered for us' },
    start2: { sk: 'ktorý za nás prelial krv', en: 'who shed his blood for us' },
    start3: { sk: 'ktorý za nás zomrel', en: 'who died for us' },
    decade1: { sk: 'ktorý sa za nás krvavo potil', en: 'who sweated blood for us' },
    decade2: { sk: 'ktorý bol za nás bičovaný', en: 'who was scourged for us' },
    decade3: { sk: 'ktorý bol za nás tŕňami korunovaný', en: 'who was crowned with thorns for us' },
    decade4: { sk: 'ktorý za nás niesol ťažký kríž', en: 'who carried the heavy cross for us' },
    decade5: { sk: 'ktorý za nás zomrel na kríži', en: 'who died on the cross for us' },
  },
  glorious: {
    start1: { sk: 'ktorý zvíťazil nad smrťou', en: 'who conquered death' },
    start2: { sk: 'ktorý nás vedie do neba', en: 'who leads us to heaven' },
    start3: { sk: 'ktorý nás napĺňa Duchom Svätým', en: 'who fills us with the Holy Spirit' },
    decade1: { sk: 'ktorý vstal z mŕtvych', en: 'who rose from the dead' },
    decade2: { sk: 'ktorý vystúpil do neba', en: 'who ascended into heaven' },
    decade3: { sk: 'ktorý zoslal Ducha Svätého', en: 'who sent the Holy Spirit' },
    decade4: { sk: 'ktorý vzal Máriu do neba', en: 'who took Mary into heaven' },
    decade5: { sk: 'ktorý korunoval Máriu za Kráľovnú', en: 'who crowned Mary as Queen' },
  },
  luminous: {
    start1: { sk: 'ktorý nás volá k obráteniu', en: 'who calls us to conversion' },
    start2: { sk: 'ktorý nám zjavuje svetlo pravdy', en: 'who reveals the light of truth' },
    start3: { sk: 'ktorý nás živí svojím Telom', en: 'who nourishes us with his Body' },
    decade1: { sk: 'ktorý sa dal pokrstiť za nás', en: 'who was baptized for us' },
    decade2: { sk: 'ktorý premenil vodu na víno', en: 'who changed water into wine' },
    decade3: { sk: 'ktorý ohlasoval Božie kráľovstvo', en: 'who proclaimed the Kingdom of God' },
    decade4: { sk: 'ktorý sa premenil pred apoštolmi', en: 'who was transfigured before the apostles' },
    decade5: { sk: 'ktorý nám dal Eucharistiu', en: 'who gave us the Eucharist' },
  },
};
