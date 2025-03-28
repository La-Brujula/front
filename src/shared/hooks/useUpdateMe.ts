import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useAuth } from '../providers/authProvider';
import { ApiError, BackendResponse } from '../services/backendFetcher';
import { updateMe } from '../services/profileServices';
import { IBackendProfile, IUpdateBackendProfile } from '../types/user';

export function useUpdateMe() {
  const { isLoggedIn } = useAuth(['isLoggedIn']);
  if (isLoggedIn === false) throw Error('Not logged In');

  const queryClient = useQueryClient();

  return useMutation<
    BackendResponse<IBackendProfile>,
    ApiError | AxiosError,
    IUpdateBackendProfile
  >({
    mutationKey: ['currentUser'],
    mutationFn: (userInfo: IUpdateBackendProfile) => updateMe(userInfo),
    onSuccess: (res) => {
      if (res.isSuccess === false) return;
      queryClient.setQueryData(['profiles', 'me'], res.entity);
    },
  });
}
