import { useMutation } from '@tanstack/react-query';
import { uploadImage } from '../services/imageUploadService';

export function useUploadImage() {
  return useMutation({
    mutationKey: ['imageUpload'],
    mutationFn: (imageFile: File) => uploadImage(imageFile),
  });
}
