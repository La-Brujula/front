import { EnumGender } from '../types/genders';
import { lang } from '../types/languages';

export type SearchFilters =
  | {
      query?: string;
    }
  | {
      name?: string;
      activity?: string;
      location?: string;
      gender?: EnumGender;
      remote?: boolean;
      type?: 'moral' | 'fisica';
      language?: lang | string;
      university?: string;
      probono?: boolean;
      associations?: string;
      email?: string;
      certifications?: string;
    };
