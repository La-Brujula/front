import { createFileRoute } from '@tanstack/react-router';
import { jobDetailOptions } from '@/modules/jobs/queries/jobSearchQuery';

export const Route = createFileRoute('/jobs/$jobId')({
  loader: ({ context, params: { jobId } }) =>
    context.queryClient.prefetchQuery(jobDetailOptions(jobId)),
});
