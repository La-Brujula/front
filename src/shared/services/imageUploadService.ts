import { postFetch } from './backendFetcher';

export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append('image', file, file.name);
  const res = await postFetch<{
    imageUrl: string;
    imageId: string;
  }>('/img/image', formData);
  return res.entity;
}
