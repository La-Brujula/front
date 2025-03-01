import countryCodes from '@/shared/constants/countryCodes';
import { Country } from 'react-phone-number-input';
import { z } from 'zod';

export const searchSchema = z.object({
  name: z.string().optional().catch(''),
  query: z.string().optional().catch(''),
  gender: z.enum(['male', 'female', 'other', '']).optional().catch(''),
  schools: z.string().optional().catch(''),
  associations: z.string().optional().catch(''),
  type: z.enum(['fisica', 'moral', '']).optional().catch(''),
  remote: z.boolean({ coerce: true }).optional().catch(undefined),
  socialService: z.boolean({ coerce: true }).optional().catch(undefined),
  location: z.string().optional().catch(''),
  area: z.string().optional().catch(''),
  category: z.string().optional().catch(''),
  activity: z.string().optional().catch(''),
  certifications: z.string().optional().catch(''),
  language: z.string().optional().catch(''),
  country: z.enum(countryCodes),
});

export const defaultSearch = {
  name: '',
  query: '',
  gender: '' as '',
  schools: '',
  associations: '',
  type: '' as '',
  remote: undefined,
  socialService: undefined,
  location: '',
  area: '',
  category: '',
  activity: '',
  certifications: '',
  language: '',
  country: 'MX' as const,
};

export type Search = z.infer<typeof searchSchema>;
