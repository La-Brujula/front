import { EnumGender } from './genders';
import { lang } from './languages';

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
