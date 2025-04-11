import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { IAuthResponse } from '../services/authServices';
import { ApiError } from '../services/backendFetcher';

export function useAuthFunction<T extends (...args: any) => Promise<any>>(
  authFunction: T
) {
  return useMutation<IAuthResponse, ApiError | AxiosError, Parameters<T>[0]>({
    mutationKey: ['auth'],
    mutationFn: ((...args) => authFunction(...args)) as T,
  });
}

export default useAuthFunction;
