import { UserDTO } from '@/modules/search/queries/searchQuery';
import { EnumGender } from './genders';
import { lang, LANGUAGES, PROFICIENCY, proficiency } from './languages';
import { Country } from 'react-phone-number-input';
import { z } from 'zod';
import countryCodes from '../constants/countryCodes';
import genders from '../constants/genders';
import { X } from '@mui/icons-material';

export type UserType = 'fisica' | 'moral';

export interface IBackendProfile {
  associations?: string;
  awards?: string;
  birthday?: string;
  biography?: string;
  certifications?: string;
  city?: string;
  country?: Country;
  externalLinks?: string[];
  facebook?: string;
  firstName?: string;
  fullName?: string;
  gender?: 'male' | 'female' | 'other';
  headline?: string;
  headerPictureUrl?: string;
  id: string;
  imdb?: string;
  instagram?: string;
  languages?: { lang: lang; proficiency: proficiency }[];
  lastName?: string;
  linkedin?: string;
  location?: string;
  nickName?: string;
  phoneNumbers?: string[];
  postalCode?: string;
  primaryActivity?: string;
  primaryEmail: string;
  probono?: boolean;
  profilePictureUrl?: string;
  recommendations: UserDTO[];
  recommendationsCount: number;
  remote?: boolean;
  searchable: boolean;
  secondaryActivity?: string;
  secondaryEmails?: string[];
  state?: string;
  subscriber?: boolean;
  thirdActivity?: string;
  tiktok?: string;
  twitter?: string;
  type?: 'moral' | 'fisica';
  university?: string;
  vimeo?: string;
  whatsapp?: string;
  workRadius?: string;
  youtube?: string;
  verified: boolean;
}

export const ProfileUpdateForm = z.object({
  address: z.optional(z.string()).catch(undefined),
  associations: z.optional(z.string()).catch(undefined),
  awards: z.optional(z.string()).catch(undefined),
  birthday: z.optional(z.string()).catch(undefined),
  biography: z.optional(z.string()).catch(undefined),
  certifications: z.optional(z.string()).catch(undefined),
  characteristics: z.optional(z.string()).catch(undefined),
  city: z.optional(z.string()).catch(undefined),
  country: z.optional(z.enum(countryCodes)),
  facebook: z.optional(z.string()).catch(undefined),
  firstName: z.optional(z.string()).catch(undefined),
  gender: z.optional(z.enum(genders)),
  googleMapsLink: z.optional(z.string()).catch(undefined),
  headline: z.optional(z.string()).catch(undefined),
  imdb: z.optional(z.string()).catch(undefined),
  instagram: z.optional(z.string()).catch(undefined),
  languages: z
    .optional(
      z.array(z.object({ lang: z.string(), proficiency: z.enum(PROFICIENCY) }))
    )
    .catch([]),
  lastName: z.optional(z.string()).catch(undefined),
  linkedin: z.optional(z.string()).catch(undefined),
  nickName: z.optional(z.string()).catch(undefined),
  phoneNumbers: z.optional(z.array(z.string()).catch([])),
  postalCode: z.optional(z.string()).catch(undefined),
  primaryActivity: z.optional(z.string()).catch(undefined),
  probono: z.optional(
    z.preprocess((v) => JSON.stringify(v), z.enum(['true', 'false']))
  ),
  remote: z.optional(
    z.preprocess((v) => JSON.stringify(v), z.enum(['true', 'false']))
  ),
  secondaryActivity: z.optional(z.string()).catch(undefined),
  secondaryEmails: z.optional(z.array(z.string()).catch([])),
  state: z.optional(z.string()).catch(undefined),
  thirdActivity: z.optional(z.string()).catch(undefined),
  tiktok: z.optional(z.string()).catch(undefined),
  twitter: z.optional(z.string()).catch(undefined),
  university: z.optional(z.string()).catch(undefined),
  vimeo: z.optional(z.string()).catch(undefined),
  externalLinks: z.optional(z.array(z.string()).catch([])),
  whatsapp: z.optional(z.string()).catch(undefined),
  workRadius: z.optional(z.string()).catch(undefined),
  youtube: z.optional(z.string()).catch(undefined),
});
export const ProfileUpdateRequest = z.object({
  address: z.optional(z.string()).catch(undefined),
  associations: z.optional(z.string()).catch(undefined),
  awards: z.optional(z.string()).catch(undefined),
  birthday: z.optional(z.string()).catch(undefined),
  biography: z.optional(z.string()).catch(undefined),
  certifications: z.optional(z.string()).catch(undefined),
  characteristics: z.optional(z.string()).catch(undefined),
  city: z.optional(z.string()).catch(undefined),
  country: z.optional(z.enum(countryCodes)),
  facebook: z.optional(z.string()).catch(undefined),
  firstName: z.optional(z.string()).catch(undefined),
  gender: z.optional(z.enum(genders)),
  googleMapsLink: z.optional(z.string()).catch(undefined),
  headline: z.optional(z.string()).catch(undefined),
  imdb: z.optional(z.string()).catch(undefined),
  instagram: z.optional(z.string()).catch(undefined),
  languages: z
    .optional(
      z.array(z.object({ lang: z.string(), proficiency: z.enum(PROFICIENCY) }))
    )
    .catch([]),
  lastName: z.optional(z.string()).catch(undefined),
  linkedin: z.optional(z.string()).catch(undefined),
  nickName: z.optional(z.string()).catch(undefined),
  phoneNumbers: z.optional(z.array(z.string()).catch([])),
  postalCode: z.optional(z.string()).catch(undefined),
  primaryActivity: z.optional(z.string()).catch(undefined),
  probono: z
    .optional(z.preprocess((val) => val === 'true', z.boolean()))
    .catch(undefined),
  remote: z
    .optional(z.preprocess((val) => val === 'true', z.boolean()))
    .catch(undefined),
  secondaryActivity: z.optional(z.string()).catch(undefined),
  secondaryEmails: z.optional(z.array(z.string()).catch([])),
  state: z.optional(z.string()).catch(undefined),
  thirdActivity: z.optional(z.string()).catch(undefined),
  tiktok: z.optional(z.string()).catch(undefined),
  twitter: z.optional(z.string()).catch(undefined),
  university: z.optional(z.string()).catch(undefined),
  vimeo: z.optional(z.string()).catch(undefined),
  externalLinks: z.optional(z.array(z.string()).catch([])),
  whatsapp: z.optional(z.string()).catch(undefined),
  workRadius: z.optional(z.string()).catch(undefined),
  youtube: z.optional(z.string()).catch(undefined),
});

export type TProfileUpdateForm = z.infer<typeof ProfileUpdateForm>;
export type TProfileUpdateRequest = z.infer<typeof ProfileUpdateRequest>;
