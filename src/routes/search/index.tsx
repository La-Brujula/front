import { createFileRoute } from '@tanstack/react-router';

import { searchQueryOptions } from '@/modules/search/queries/searchQuery';
import { Search, SearchSchema } from '@/modules/search/types/searchParams';
import { ErrorMessage } from '@/shared/components/errorMessage';

export const Route = createFileRoute('/search/')({
  validateSearch: (search) => SearchSchema.parse(search),
  loaderDeps: (opts) => opts.search as Search,
  loader: async ({ context: { queryClient }, deps }) => {
    await queryClient.prefetchInfiniteQuery(searchQueryOptions(deps));
  },
  errorComponent: (error) => <ErrorMessage message={error.error?.message} />,
});
