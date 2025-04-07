import { patchFetch } from '@/shared/services/backendFetcher';
import { IAccountDTO, UpdateAccountRequest } from '@/shared/types/account';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdateAccount() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['accounts', 'me'],
    mutationFn: (newAccountInfo: UpdateAccountRequest) =>
      patchFetch<IAccountDTO>('/auth/me/', newAccountInfo),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['accounts', 'me'],
        refetchType: 'active',
      }),
  });
}
