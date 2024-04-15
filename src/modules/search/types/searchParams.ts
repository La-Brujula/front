import { z } from 'zod';

export const searchSchema = z.object({
  name: z.string().optional().catch(undefined),
  query: z.string().optional().catch(undefined),
  gender: z.enum(['male', 'female', 'other']).optional().catch(undefined),
  schools: z.string().optional().catch(undefined),
  associations: z.string().optional().catch(undefined),
  type: z.enum(['fisica', 'moral']).optional().catch(undefined),
  remote: z.boolean({ coerce: true }).optional().catch(undefined),
  socialService: z.boolean({ coerce: true }).optional().catch(undefined),
  location: z.string().optional().catch(undefined),
  category: z.string().optional().catch(undefined),
  activity: z.string().optional().catch(undefined),
  certifications: z.string().optional().catch(undefined),
  language: z.string().optional().catch(undefined),
});

export type Search = z.infer<typeof searchSchema>;
