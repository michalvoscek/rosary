import type { BilingualText } from "../types";

export const prayers: Record<string, BilingualText> = {
  signOfTheCross: {
    sk: "V mene Otca i Syna i Ducha Svätého. Amen.",
    en: "In the name of the Father, and of the Son, and of the Holy Spirit. Amen.",
  },
  apostlesCreed: {
    sk: "Verím v Boha, Otca všemohúceho, Stvoriteľa neba i zeme, i v Ježiša Krista, jeho jediného Syna, nášho Pána, ktorý sa počal z Ducha Svätého, narodil sa z Márie Panny, trpel za vlády Poncia Piláta, bol ukrižovaný, umrel a bol pochovaný; zostúpil k zosnulým, tretieho dňa vstal z mŕtvych,vystúpil na nebesia, sedí po pravici Boha Otca všemohúceho. Odtiaľ príde súdiť živých i mŕtvych. Verím v Ducha Svätého, v svätú Cirkev katolícku, v spoločenstvo svätých, v odpustenie hriechov, vo vzkriesenie tela a v život večný. Amen.",
    en: "I believe in God, the Father Almighty, Creator of heaven and earth, and in Jesus Christ, His only Son, our Lord, who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died and was buried; He descended into hell; on the third day He rose again from the dead; He ascended into heaven, and is seated at the right hand of God the Father Almighty; from there He will come to judge the living and the dead. I believe in the Holy Spirit, the Holy Catholic Church, the communion of saints, the forgiveness of sins, the resurrection of the body, and life everlasting. Amen.",
  },
  ourFather: {
    sk: "Otče náš, ktorý si na nebesiach, posväť sa meno tvoje, príď kráľovstvo tvoje, buď vôľa tvoja ako v nebi, tak i na zemi. Chlieb náš každodenný daj nám dnes a odpusť nám naše viny, ako i my odpúšťame svojim vinníkom, a neuveď nás do pokušenia, ale zbav nás zlého. Amen.",
    en: "Our Father, who art in heaven, hallowed be thy name; thy kingdom come; thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses, as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.",
  },
  hailMary: {
    sk: "Zdravas",
    en: "Hail Mary",
  },
  hailMaryFull: {
    sk: "Zdravas’, Mária, milosti plná, Pán s tebou. Požehnaná si medzi ženami a požehnaný je plod života tvojho, Ježiš.Svätá Mária, Matka Božia, pros za nás hriešnych, teraz i v hodinu smrti našej. Amen.",
    en: "Hail Mary, full of grace, the Lord is with thee; blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.",
  },
  gloryBe: {
    sk: "Sláva Otcu i Synu i Duchu Svätému, ako bolo na počiatku, tak nech je teraz i vždycky i na veky vekov. Amen.",
    en: "Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen.",
  },
  fatimaPrayer: {
    sk: "Ó, Ježišu, odpusť nám naše hriechy, zachráň nás od pekelného ohňa a priveď do neba všetky duše, najmä tie, ktoré najviac potrebujú tvoje milosrdenstvo. Amen.",
    en: "O my Jesus, forgive us our sins, save us from the fires of hell, lead all souls to Heaven, especially those who have most need of Thy mercy.",
  },
  hailHolyQueen: {
    sk: "Zdravas Kráľovná, Matka milosrdenstva, život náš i slasť i nádej náš, zdravas! Ku tebe voláme, vyhnanci synovia Evy, ku tebe vzdycháme, úfajúc a plačúc na tomto plačnom údolí. Preto, Orodovnica naša, obráť k nám svoje milosrdné oči a Ježiša, požehnaný plod života tvojho, nám po tejto púti ukáž. Ó láskavá, ó prívetivá, ó presladká Panna Mária! Amen.",
    en: "Hail, Holy Queen, Mother of Mercy, our life, our sweetness and our hope. To thee do we cry, poor banished children of Eve; to thee do we send up our sighs, mourning and weeping in this valley of tears. Turn then, most gracious advocate, thine eyes of mercy toward us, and after this our exile, show unto us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary! Amen.",
  },
};

export const prayerLabels: Record<string, BilingualText> = {
  signOfTheCross: { sk: "Ľudské znamenie", en: "Sign of the Cross" },
  apostlesCreed: { sk: "Apoštolské vyznanie viery", en: "Apostles' Creed" },
  ourFather: { sk: "Otče náš", en: "Our Father" },
  hailMary: { sk: "Zdravas Mária", en: "Hail Mary" },
  gloryBe: { sk: "Sláva Otcu", en: "Glory Be" },
  fatimaPrayer: { sk: "Fatimská prosba", en: "Fatima Prayer" },
  hailHolyQueen: { sk: "Zdravas Kráľovná", en: "Hail Holy Queen" },
  mystery: { sk: "Tajomstvo", en: "Mystery" },
};
