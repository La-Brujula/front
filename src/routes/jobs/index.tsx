import { createFileRoute } from '@tanstack/react-router';
import { searchQueryOptions } from '@/modules/search/queries/searchQuery';
import { JobSearch, jobSearchSchema } from '@/modules/jobs/types/searchParams';

export const Route = createFileRoute('/jobs/')({
  validateSearch: (search) => jobSearchSchema.parse(search),
  loaderDeps: ({ search }: { search: JobSearch }) => search,
  loader: ({ context, deps: searchParams }) =>
    context?.queryClient.prefetchInfiniteQuery(
      searchQueryOptions(searchParams)
    ),
});
