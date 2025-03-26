import { queryOptions } from '@tanstack/react-query';
import { getFetch } from '@/shared/services/backendFetcher';
import {
  AccountContactMethod,
  AccountRoleTypes,
  IAccountDTO,
} from '@/shared/types/account';

export interface AccountDTO {
  email: string;
  role: AccountRoleTypes;
  ProfileId: string;
  contactMethod?: AccountContactMethod;
  jobNotifications?: boolean;
}

export const accountQueryOptions = () =>
  queryOptions({
    queryKey: ['accounts', 'me'],
    queryFn: (queryOptions) =>
      getFetch<IAccountDTO>(`/auth/me`, {
        signal: queryOptions.signal,
      }).then((res) => res.entity),
  });
