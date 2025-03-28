import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  ApiError,
  BackendResponse,
  postFetch,
} from '../services/backendFetcher';

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
