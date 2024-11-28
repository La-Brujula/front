import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

export const searchSchema = z.object({
  area: z.optional(z.string().min(1)),
  category: z.optional(z.string().min(3)),
  activities: z.optional(z.string().min(6)),
});

export const Route = createFileRoute('/search/$label')({
  validateSearch: (search) => searchSchema.parse(search),
});
