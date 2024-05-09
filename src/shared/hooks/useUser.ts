import { profileQueryOptions } from '@/modules/profile/queries/userProfile';
import { useQuery } from '@tanstack/react-query';

export function useProfile(profileId: string) {
  return useQuery(profileQueryOptions(profileId));
}
