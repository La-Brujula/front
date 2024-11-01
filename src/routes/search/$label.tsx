import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

export const searchSchema = z.object({
  area: z.string().min(1).catch(''),
  category: z.string().min(3).catch(''),
  activities: z.string().min(6).catch(''),
});

export const Route = createFileRoute('/search/$label')({
  validateSearch: (search) => searchSchema.parse(search),
});
