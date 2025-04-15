import { createFileRoute } from '@tanstack/react-router';

import { jobDetailOptions } from '@/modules/jobs/queries/jobSearchQuery';
import { jobSearchSchema } from '@/modules/jobs/types/searchParams';

export const Route = createFileRoute('/jobs/$jobId')({
  validateSearch: (search) => jobSearchSchema.parse(search),
  loader: async ({ context, params: { jobId } }) =>
    await context?.queryClient.prefetchQuery(jobDetailOptions(jobId)),
});
