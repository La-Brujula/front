import { patchFetch } from '@/shared/services/backendFetcher';
import { IAccountDTO, UpdateAccountRequest } from '@/shared/types/account';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdateAccount() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['accounts', 'me'],
    mutationFn: async (newAccountInfo: UpdateAccountRequest) => {
      return await patchFetch<IAccountDTO>('/auth/me/', newAccountInfo);
    },
    onSuccess: (res) => {
      queryClient.setQueryData(['accounts', 'me'], res.entity);
    },
  });
}
