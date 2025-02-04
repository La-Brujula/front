import { createFileRoute } from '@tanstack/react-router';
import { JobSearch, jobSearchSchema } from '@/modules/jobs/types/searchParams';
import { jobSearchQueryOptions } from '@/modules/jobs/queries/jobSearchQuery';

export const Route = createFileRoute('/jobs/')({
  validateSearch: (search) => jobSearchSchema.parse(search),
  loaderDeps: ({ search }: { search: JobSearch }) => search,
  loader: ({ context, deps: searchParams }) =>
    context?.queryClient.prefetchInfiniteQuery(
      jobSearchQueryOptions(searchParams, true)
    ),
});
