import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../providers/authProvider';
import { IBackendProfile, IUpdateBackendProfile } from '../types/user';
import { updateMe } from '../services/profileServices';
import { ApiError, BackendResponse } from '../services/backendFetcher';
import { AxiosError } from 'axios';

export function useUpdateMe() {
  const { isLoggedIn } = useAuth(['isLoggedIn']);
  if (isLoggedIn === false) throw Error('Not logged In');
  return useMutation<
    BackendResponse<IBackendProfile>,
    ApiError | AxiosError,
    IUpdateBackendProfile
  >({
    mutationKey: ['currentUser'],
    mutationFn: (userInfo: IUpdateBackendProfile) => updateMe(userInfo),
  });
}
