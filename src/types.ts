export type Language = 'sk' | 'en';

export type MysterySet = 'joyful' | 'sorrowful' | 'glorious' | 'luminous';

export interface BilingualText {
  sk: string;
  en: string;
}

export interface Mystery {
  name: BilingualText;
  description: BilingualText;
  color: string;
  icon: string;
}

export interface MysterySetData {
  id: MysterySet;
  title: BilingualText;
  subtitle: BilingualText;
  color: string;
  decades: Mystery[];
}
