import { postFetch } from '@/shared/services/backendFetcher';
import { useMutation } from '@tanstack/react-query';

const BASE_URL = '/auth/verifyEmail';

export function useSendEmailVerification() {
  return useMutation({
    mutationFn: () => postFetch(`${BASE_URL}/send`),
  });
}

export function verifyEmail(code: string) {
  return postFetch(`${BASE_URL}/verify`, {
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
