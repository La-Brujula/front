import { createFileRoute } from '@tanstack/react-router';

import { searchQueryOptions } from '@/modules/search/queries/searchQuery';
import { Search, SearchSchema } from '@/modules/search/types/searchParams';

export const Route = createFileRoute('/search/')({
  validateSearch: (search) => SearchSchema.parse(search),
  loaderDeps: (opts) => opts.search as Search,
  loader: ({ context: { queryClient }, deps }) => {
    queryClient.prefetchInfiniteQuery(searchQueryOptions(deps));
  },
});
