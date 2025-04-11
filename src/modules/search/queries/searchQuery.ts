import { infiniteQueryOptions } from '@tanstack/react-query';

import countryCodes from '@/shared/constants/countryCodes';
import { getFetch } from '@/shared/services/backendFetcher';

import { Search } from '../types/searchParams';

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
  country?: (typeof countryCodes)[number];
  location?: string;
  profilePictureUrl?: string;
  headline?: string;
};

export const searchQueryOptions = (search: Search) =>
  infiniteQueryOptions({
    initialPageParam: 0,
    queryKey: ['search', search],
    queryFn: (queryParams) => {
      if (Object.entries(search).length == 1) {
        throw Error('Realiza una búsqueda para comenzar');
      }
      return getFetch<UserDTO[]>('/profiles', {
        params: {
          ...search,
          activity: search.activity || search.category || search.area,
          offset: queryParams.pageParam,
          country: search.country,
        },
        signal: queryParams.signal,
      });
    },
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
