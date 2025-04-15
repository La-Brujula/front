import { createFileRoute } from '@tanstack/react-router';

import { jobDetailOptions } from '@/modules/jobs/queries/jobSearchQuery';

export const Route = createFileRoute('/jobs_/$jobId/edit')({
  loader: async ({ context, params }) =>
    await context?.queryClient.prefetchQuery(jobDetailOptions(params.jobId)),
});
