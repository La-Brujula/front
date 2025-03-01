import { createFileRoute } from '@tanstack/react-router';
import { Search, searchSchema } from '@/modules/search/types/searchParams';
import { searchQueryOptions } from '@/modules/search/queries/searchQuery';

export const Route = createFileRoute('/search/')({
  validateSearch: (search) => searchSchema.parse(search),
  loaderDeps: (opts) => opts.search as Search,
  loader: ({ context: { queryClient }, deps }) => {
    queryClient.prefetchInfiniteQuery(searchQueryOptions(deps));
  },
});
