import { EMPLOYMENT_OPTIONS, WORK_RADIUS_OPTIONS } from './jobEnums';

import { z } from 'zod';

export const JobOpening = z.object({
  activity: z.string().length(6),
  count: z.number({ coerce: true }),
  probono: z.boolean({ coerce: true }).catch(false),
  gender: z.optional(z.enum(['male', 'female', 'other'])).catch(undefined),
  ageRangeMin: z.optional(z.number({ coerce: true }).min(0).max(120)),
  ageRangeMax: z.optional(z.number({ coerce: true }).min(0).max(120)),
  school: z.optional(z.string()),
  languages: z.optional(
    z.array(
      z.object({
        lang: z.string().length(2),
        proficiency: z.enum(['basic', 'intermediate', 'advanced', 'native']),
      })
    )
  ),
});
export type TJobOpening = z.infer<typeof JobOpening>;

export const JobPosting = z
  .object({
    // Post
    requesterId: z.optional(z.string().max(128)),
    contactStartDate: z.date({ coerce: true }).catch(new Date()),
    contactEndDate: z
      .date({ coerce: true })
      .catch(
        new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 5) /* 5 days */
      ),
    contactEmail: z.optional(z.string().email()),
    whatsapp: z.optional(z.string()),
    phoneNumbers: z.optional(z.array(z.optional(z.string()))).catch([]),
    // Service
    openings: z.array(JobOpening).max(10),
    location: z.enum(['online', 'hybrid', 'in-person']),
    workRadius: z.enum(WORK_RADIUS_OPTIONS),
    specialRequirements: z.optional(z.string()),
    // Proyect
    employment: z.enum(EMPLOYMENT_OPTIONS),
    description: z.string().max(1024),
    jobStartDate: z.date({ coerce: true }).catch(new Date()),
    jobEndDate: z.optional(z.date({ coerce: true })).catch(undefined),
    budgetLow: z.optional(z.number({ coerce: true })),
    budgetHigh: z.optional(z.number({ coerce: true })),
    benefits: z.optional(z.string().max(1024)),
    notes: z.optional(z.string().max(1024)),
  })
  .refine(
    ({ contactEmail, whatsapp, phoneNumbers }) =>
      !!contactEmail || !!whatsapp || !!phoneNumbers,
    {
      message: 'One of contactEmail, whatsapp, phoneNumbers must be defined',
      path: ['contactEmail'],
    }
  );
export type TJobPosting = z.infer<typeof JobPosting>;

export const jobSearchSchema = z.object({
  query: z.optional(z.string()),
  activity: z.optional(z.string()),
  location: z.optional(z.string()),
  probono: z.optional(z.boolean()),
  employment: z.optional(z.enum(['freelance', 'determinate', 'indeterminate'])),
});

export const defaultSearch = {
  query: undefined,
  activity: undefined,
  location: undefined,
  probono: undefined,
  employment: undefined,
};

export type JobSearch = z.infer<typeof jobSearchSchema>;
