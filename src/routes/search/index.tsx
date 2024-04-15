import { createFileRoute } from '@tanstack/react-router';
import { Search, searchSchema } from '@/modules/search/types/searchParams';
import { searchQueryOptions } from '@/modules/search/queries/searchQuery';

export const Route = createFileRoute('/search/')({
  validateSearch: (search) => searchSchema.parse(search),
  loaderDeps: ({ search }: { search: Search }) => search,
  loader: ({ context: { queryClient }, deps: searchParams }) =>
    queryClient.prefetchInfiniteQuery(searchQueryOptions(searchParams)),
});
