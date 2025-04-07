import { useProfile } from './useUser';

export function useCurrentProfile() {
  return useProfile('me');
}
