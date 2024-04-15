import {
  ApiError,
  BackendResponse,
  postFetch,
} from '@/shared/services/backendFetcher';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export type ContactFormFields = {
  subject: string;
  name: string;
  email: string;
  message: string;
};

export function useContactForm() {
  return useMutation<
    BackendResponse<undefined>,
    ApiError | AxiosError,
    ContactFormFields
  >({
    mutationKey: ['contact'],
    mutationFn: (values: {
      subject: string;
      name: string;
      email: string;
      message: string;
    }) => postFetch<undefined>('/contact', values as ContactFormFields),
  });
}

export default useContactForm;
