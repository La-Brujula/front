import { profileQueryOptions } from '@/modules/profile/queries/userProfile';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/alerts')({
  beforeLoad: async ({ location }) => {
    if (localStorage.getItem('jwt') === null) {
      throw redirect({
        to: '/auth/login',
        search: {
          // Use the current location to power a redirect after login
          // (Do not use `router.state.resolvedLocation` as it can
          // potentially lag behind the actual current location)
          redirect: location.href,
        },
      });
    }
  },
  loader: ({ context }) => {
    const profileId = JSON.parse(localStorage.getItem('account')!).ProfileId;
    context.queryClient.prefetchQuery(profileQueryOptions(profileId));
  },
});
