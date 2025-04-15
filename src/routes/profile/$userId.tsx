import { createFileRoute } from '@tanstack/react-router';

import { profileQueryOptions } from '@/modules/profile/queries/userProfile';

export const Route = createFileRoute('/profile/$userId')({
  loader: async ({ context, params: { userId } }) =>
    await context.queryClient.prefetchQuery(profileQueryOptions(userId)),
});
