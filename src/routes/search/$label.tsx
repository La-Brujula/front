import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

export const searchSchema = z.object({
  search: z.string().min(1),
});

export const Route = createFileRoute('/search/$label')({
  validateSearch: (search) => searchSchema.parse(search),
});
