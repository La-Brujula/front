import { useLoggedInAccount } from '@/shared/hooks/useLoggedInAccount';
import {
  recommendProfile,
  unRecommendProfile,
} from '@/shared/services/profileServices';
import { IBackendProfile } from '@/shared/types/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useToggleRecommendation(profileId: string) {
  const queryClient = useQueryClient();
  const account = useLoggedInAccount();
  return useMutation({
    mutationKey: ['profiles', profileId, 'recommended'],
    mutationFn: async () => {
      if (
        queryClient
          .getQueryData<IBackendProfile>(['profiles', profileId])
          ?.recommendations.find(
            (user) => user.primaryEmail == account!.email
          ) == undefined
      ) {
        return recommendProfile(profileId);
      } else {
        return unRecommendProfile(profileId);
      }
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['profiles', profileId] });
    },
  });
}
