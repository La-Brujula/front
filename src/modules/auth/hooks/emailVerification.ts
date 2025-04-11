import { useMutation } from '@tanstack/react-query';

import { postFetch } from '@/shared/services/backendFetcher';

const BASE_URL = '/auth/verifyEmail';

export function useSendEmailVerification() {
  return useMutation({
    mutationFn: () => postFetch(`${BASE_URL}/send`),
  });
}

export async function verifyEmail(code: string) {
  return await postFetch(`${BASE_URL}/verify`, {
    code,
  });
}

export function useVerifyEmail() {
  return useMutation({
    mutationFn: (code: string) =>
      postFetch(`${BASE_URL}/verify`, {
        code,
      }),
  });
}
