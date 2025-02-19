import { EMPLOYMENT_OPTIONS, WORK_RADIUS_OPTIONS } from './jobEnums';

import { z } from 'zod';

export const JobOpening = z.object({
  activity: z.string().length(6),
  count: z.number({ coerce: true }).min(0).max(99),
  probono: z.boolean({ coerce: true }),
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
    contactStartDate: z.date({ coerce: true, required_error: 'invalid_type' }),
    contactEndDate: z.date({ coerce: true }),
    contactEmail: z.optional(z.string().email()),
    whatsapp: z.optional(z.string()),
    phoneNumbers: z.optional(z.string()),
    // Service
    openings: z.array(JobOpening).max(10),
    location: z.enum(['online', 'hybrid', 'in-person']),
    workRadius: z.optional(z.enum(WORK_RADIUS_OPTIONS)).catch(undefined),
    specialRequirements: z.optional(z.string()),
    // Proyect
    employment: z.enum(EMPLOYMENT_OPTIONS),
    description: z.string().max(1024),
    jobStartDate: z.date({ coerce: true }).catch(new Date()),
    jobEndDate: z.optional(z.date({ coerce: true })).catch(undefined),
    budgetLow: z.optional(
      z
        .string()
        .transform((v) => v.replace(/,/g, ''))
        .pipe(z.number({ coerce: true }))
    ),
    budgetHigh: z.optional(
      z
        .string()
        .transform((v) => v.replace(/,/g, ''))
        .pipe(z.number({ coerce: true }))
    ),
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

export const JobPostingForm = z
  .object({
    job: z.object({
      contactStartDate: z.optional(z.string()),
      contactEndDate: z.optional(z.string()),
      contactEmail: z.optional(z.string().email()),
      whatsapp: z.optional(z.string()),
      phoneNumbers: z.optional(z.string()),
      location: z.optional(z.enum(['online', 'hybrid', 'in-person'])),
      workRadius: z.optional(z.enum(WORK_RADIUS_OPTIONS)).catch(undefined),
      specialRequirements: z.optional(z.string()),
      employment: z.optional(z.enum(EMPLOYMENT_OPTIONS)),
      description: z.optional(z.string().max(1024)),
      jobStartDate: z.optional(z.string()),
      jobEndDate: z.optional(z.string()).catch(undefined),
      budgetLow: z.optional(z.number({ coerce: true })),
      budgetHigh: z.optional(z.number({ coerce: true })),
      benefits: z.optional(z.string().max(1024)),
      notes: z.optional(z.string().max(1024)),
    }),
    activity: z.optional(z.string().length(6)),
    count: z.optional(z.number({ coerce: true })),
    probono: z.optional(z.boolean()),
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
  })
  .refine(
    ({ job: { contactEmail, whatsapp, phoneNumbers } }) =>
      !!contactEmail || !!whatsapp || !!phoneNumbers,
    {
      message: 'One of contactEmail, whatsapp, phoneNumbers must be defined',
      path: ['contactEmail'],
    }
  );
export type TJobForm = z.infer<typeof JobPostingForm>;

export const jobSearchSchema = z.object({
  query: z.optional(z.string()),
  activity: z.optional(z.string()),
  location: z.optional(z.string()),
  probono: z.optional(z.boolean()),
  employment: z.optional(z.enum(['freelance', 'determinate', 'indeterminate'])),
  requesterId: z.optional(z.string()),
  limit: z.optional(z.number()),
  offset: z.optional(z.number()),
});

export const defaultSearch = {
  query: undefined,
  activity: undefined,
  location: undefined,
  probono: undefined,
  employment: undefined,
  requesterId: undefined,
};

export type JobSearch = z.infer<typeof jobSearchSchema>;
