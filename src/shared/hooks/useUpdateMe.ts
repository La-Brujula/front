import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../providers/authProvider';
import { IBackendProfile, IUpdateBackendProfile } from '../types/user';
import { updateMe } from '../services/profileServices';
import { ApiError, BackendResponse } from '../services/backendFetcher';
import { AxiosError } from 'axios';

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
    onSuccess: (data) => {
      if (data.isSuccess === false) return;
      queryClient.invalidateQueries({ queryKey: ['profiles', data.entity.id] });
    },
  });
}
