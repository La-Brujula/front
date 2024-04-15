import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../providers/authProvider';
import { IBackendProfile, IUpdateBackendProfile } from '../types/user';
import { updateMe } from '../services/profileServices';

export function useUpdateMe() {
  const { isLoggedIn } = useAuth(['isLoggedIn']);
  if (isLoggedIn === false) throw Error('Not logged In');
  return useMutation({
    mutationKey: ['currentUser'],
    mutationFn: (userInfo: IUpdateBackendProfile) => updateMe(userInfo),
  });
}
