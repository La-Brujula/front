import { queryOptions } from '@tanstack/react-query';
import { getFetch } from '@/shared/services/backendFetcher';
import { IBackendProfile } from '@/shared/types/user';

export type UserDTO = {
  id: string;
  primaryEmail: string;
  type: 'moral' | 'fisica';
  subscriber: boolean;
  fullName?: string;
  nickName?: string;
  primaryActivity?: string;
  recommendationsCount: number;
  secondaryActivity?: string;
  thirdActivity?: string;
  gender?: 'male' | 'female' | 'other';
  location?: string;
  profilePictureUrl?: string;
  headline?: string;
};

export const profileQueryOptions = (profileId: string) =>
  queryOptions({
    queryKey: ['profiles', profileId],
    queryFn: (queryOptions) =>
      getFetch<IBackendProfile>(`/profiles/${profileId}`, {
        signal: queryOptions.signal,
      }).then((res) => res.entity),
  });
