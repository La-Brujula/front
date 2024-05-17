import { useLoggedInAccount } from '@/shared/hooks/useLoggedInAccount';
import { postFetch } from '@/shared/services/backendFetcher';
import { IBackendProfile } from '@/shared/types/user';
import { compress } from '@/shared/utils/compressImage';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUploadProfileImage() {
  const queryClient = useQueryClient();
  const account = useLoggedInAccount();
  if (account === null) throw 'No account found';
  return useMutation({
    mutationKey: ['profiles', account.ProfileId],
    mutationFn: async (vars: {
      imageFile: File;
      imageType: 'profile' | 'cover';
    }) => {
      const formdata = new FormData();
      const compressedImage = await compress(
        vars.imageFile,
        0.98,
        vars.imageType === 'profile' ? 384 : 768,
        vars.imageType === 'profile' ? 384 : 3072,
        512 * 1024 // 512Kb
      );
      formdata.append('image', compressedImage, vars.imageType);
      return await postFetch<IBackendProfile>(
        '/profiles/me/' + vars.imageType,
        formdata
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['profiles', account.ProfileId],
      });
    },
  });
}
