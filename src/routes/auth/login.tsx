import { createFileRoute, redirect } from '@tanstack/react-router';
import { z } from 'zod';

const loginSearchParamsSchema = z.object({
  redirect: z.string().optional().catch(''),
});

export const Route = createFileRoute('/auth/login')({
  validateSearch: (search) => loginSearchParamsSchema.parse(search),
  beforeLoad: async ({ search }) => {
    if (localStorage.getItem('jwt') !== null) {
      throw redirect({
        to: search.redirect,
      });
    }
  },
});
