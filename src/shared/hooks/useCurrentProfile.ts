import { useAuth } from '../providers/authProvider';
import { useProfile } from './useUser';

export function useCurrentProfile() {
  const { account } = useAuth(['account']);
  return useProfile(account !== null ? account.ProfileId : 'null');
}
