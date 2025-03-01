import { createFileRoute } from '@tanstack/react-router';
import { jobDetailOptions } from '@/modules/jobs/queries/jobSearchQuery';

export const Route = createFileRoute('/jobs_/$jobId/edit')({
  loader: ({ context, params }) =>
    context?.queryClient.prefetchQuery(jobDetailOptions(params.jobId)),
});
