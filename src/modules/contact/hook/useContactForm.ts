import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { z } from 'zod';

import {
  ApiError,
  BackendResponse,
  postFetch,
} from '@/shared/services/backendFetcher';

export const ContactFormFields = z.object({
  subject: z.string(),
  name: z.string(),
  email: z.string(),
  message: z.string(),
});
export type TContactFormFields = z.infer<typeof ContactFormFields>;

export function useContactForm() {
  return useMutation<
    BackendResponse<undefined>,
    ApiError | AxiosError,
    TContactFormFields
  >({
    mutationKey: ['contact'],
    mutationFn: (values) => postFetch<undefined>('/contact', values),
  });
}

export default useContactForm;
