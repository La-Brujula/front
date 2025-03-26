import { useQuery } from '@tanstack/react-query';
import { accountQueryOptions } from '../queries/account';

export function useCurrentAccount() {
  return useQuery(accountQueryOptions());
}
