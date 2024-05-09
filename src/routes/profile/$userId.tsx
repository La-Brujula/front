import { createFileRoute, useParams } from '@tanstack/react-router';
import { profileQueryOptions } from '@/modules/profile/queries/userProfile';

export const Route = createFileRoute('/profile/$userId')({
  loader: ({ context: { queryClient }, params: { userId } }) =>
    queryClient.prefetchQuery(profileQueryOptions(userId)),
});
