import { useLoggedInAccount } from '@/shared/hooks/useLoggedInAccount';
import { postFetch } from '@/shared/services/backendFetcher';
import { IBackendProfile } from '@/shared/types/user';
import { compress } from '@/shared/utils/compressImage';
import { useQueryClient } from '@tanstack/react-query';

export function useUploadProfileImage() {
  const queryClient = useQueryClient();
  const account = useLoggedInAccount();
  return async (imageFile: File, imageType: 'profile' | 'cover') => {
    const formdata = new FormData();
    const compressedImage = await compress(
      imageFile,
      0.95,
      imageType === 'profile' ? 192 : 384,
      imageType === 'profile' ? 192 : 1536
    );
    formdata.append('image', compressedImage, imageType);
    const backendResponse = await postFetch<IBackendProfile>(
      '/profiles/me/' + imageType,
      formdata
    );
    queryClient.refetchQueries({
      queryKey: ['profiles', account!.ProfileId],
    });
    return backendResponse;
  };
}
