import { useMutation } from '@tanstack/react-query';
import {
  ApiError,
  BackendResponse,
  postFetch,
} from '../services/backendFetcher';
import { AxiosError } from 'axios';

type ErrorReport = {
  pathname: string;
  name: string;
  message: string;
  stack: string;
};

export function useReportError() {
  return useMutation<
    BackendResponse<undefined>,
    ApiError | AxiosError,
    ErrorReport
  >({
    mutationKey: ['error'],
    mutationFn: (e) => postFetch('/reportError', e),
  });
}

export default useReportError;
