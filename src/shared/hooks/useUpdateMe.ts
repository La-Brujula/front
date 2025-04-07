import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useAuth } from '../providers/authProvider';
import { ApiError, BackendResponse } from '../services/backendFetcher';
import { updateMe } from '../services/profileServices';
import { IBackendProfile, TProfileUpdateRequest } from '../types/user';

export function useUpdateMe() {
  const { isLoggedIn } = useAuth(['isLoggedIn']);
  if (isLoggedIn === false) throw Error('Not logged In');

  const queryClient = useQueryClient();

  return useMutation<
    BackendResponse<IBackendProfile>,
    ApiError | AxiosError,
    TProfileUpdateRequest
  >({
    mutationKey: ['currentUser'],
    mutationFn: (userInfo: TProfileUpdateRequest) => updateMe(userInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['profiles', 'me'],
        refetchType: 'active',
      });
    },
  });
}
