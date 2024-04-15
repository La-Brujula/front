import { useMutation } from '@tanstack/react-query';
import { IAuthResponse } from '../services/authServices';
import { ApiError } from '../services/backendFetcher';
import { AxiosError } from 'axios';

export function useAuthFunction<T extends (...args: any) => Promise<any>>(
  authFunction: T
) {
  return useMutation<IAuthResponse, ApiError | AxiosError, Parameters<T>[0]>({
    mutationKey: ['auth'],
    mutationFn: ((...args) => authFunction(...args)) as T,
  });
}

export default useAuthFunction;
