import { useAuth } from '../providers/authProvider';

export function useLoggedInAccount() {
  const { account } = useAuth(['account']);
  return account;
}
