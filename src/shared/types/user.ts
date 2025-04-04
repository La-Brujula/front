import { UserDTO } from '@/modules/search/queries/searchQuery';
import { EnumGender } from './genders';
import { lang, proficiency } from './languages';
import { Country } from 'react-phone-number-input';

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
export interface IUpdateBackendProfile {
  address?: string;
  associations?: string;
  awards?: string;
  birthday?: string;
  biography?: string;
  certifications?: string;
  characteristics?: string;
  city?: string;
  country?: Country;
  facebook?: string;
  firstName?: string;
  gender?: EnumGender;
  googleMapsLink?: string;
  headline?: string;
  imdb?: string;
  instagram?: string;
  languages?: { lang: lang; proficiency: proficiency }[];
  lastName?: string;
  linkedin?: string;
  nickName?: string;
  phoneNumbers?: string[];
  postalCode?: string;
  primaryActivity?: string;
  probono?: string | boolean;
  remote?: boolean | string;
  secondaryActivity?: string;
  secondaryEmails?: string[];
  state?: string;
  thirdActivity?: string;
  tiktok?: string;
  twitter?: string;
  university?: string;
  vimeo?: string;
  externalLinks?: string[];
  whatsapp?: string;
  workRadius?: string;
  youtube?: string;
}
