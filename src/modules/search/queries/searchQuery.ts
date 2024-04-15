import { infiniteQueryOptions } from '@tanstack/react-query';
import { Search } from '../types/searchParams';
import { getFetch } from '@/shared/services/backendFetcher';

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

export const searchQueryOptions = (search: Search) =>
  infiniteQueryOptions({
    initialPageParam: 0,
    queryKey: ['search', search],
    queryFn: (queryParams) =>
      getFetch<UserDTO[]>('/profiles', {
        params: {
          ...search,
          activity: search.activity || search.category,
          offset: queryParams.pageParam,
        },
        signal: queryParams.signal,
      }),
    getPreviousPageParam: (firstPage) => {
      const next = firstPage.meta.offset - firstPage.meta.limit;
      if (next <= 0) {
        return null;
      }
      return next;
    },
    getNextPageParam: (lastPage) => {
      const next = lastPage.meta.offset + lastPage.meta.limit;
      if (next >= lastPage.meta.total) {
        return null;
      }
      return next;
    },
  });
