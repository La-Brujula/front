import { createFileRoute, redirect } from '@tanstack/react-router';
import { z } from 'zod';

const signupParamsSchema = z.object({
  referal: z.string().optional().catch(''),
});

export const Route = createFileRoute('/auth/signup')({
  validateSearch: (search) => signupParamsSchema.parse(search),
});
