import { useQuery } from '@tanstack/react-query';

import { profileQueryOptions } from '@/modules/profile/queries/userProfile';

import { useLoggedInAccount } from './useLoggedInAccount';

export function useProfile(profileId: string) {
  const account = useLoggedInAccount();
  let assignedProfileId: string;
  if (account?.ProfileId === profileId) {
    assignedProfileId = 'me';
  } else {
    assignedProfileId = profileId;
  }
  return useQuery(profileQueryOptions(assignedProfileId));
}
