import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactNode, useMemo } from 'react';
import { useAuth } from './authProvider';
import React from 'react';
import { ApiError, isApiError } from '../services/backendFetcher';

const unauthorizedStatuses = ['AE05'];

function useGlobalErrors({
  onAuthError = () => {},
  onServerError = () => {},
  onRecover = () => {},
}) {
  const triggerError = (error: ApiError) => {
    if (unauthorizedStatuses.includes(error.errorCode)) {
      onAuthError();
    } else if (error.errorCode == 'EE00') {
      onServerError();
    }
  };

  const queryCache = new QueryCache({
    onError(error) {
      if (isApiError(error)) {
        triggerError(error);
      }
    },
    onSuccess() {
      onRecover();
    },
  });

  const mutationCache = new MutationCache({
    onError(error) {
      if (isApiError(error)) {
        triggerError(error);
      }
    },
    onSuccess(data) {
      onRecover();
    },
  });

  return { queryCache, mutationCache };
}

function QueryProvider({ children }: { children: ReactNode }) {
  const { logout } = useAuth(['logout']);
  const { queryCache, mutationCache } = useGlobalErrors({
    onAuthError: logout,
  });

  const queryClient = useMemo(
    () =>
      new QueryClient({
        queryCache,
        mutationCache,
        defaultOptions: {
          queries: {
            staleTime: 200,
            retry: false,
          },
          mutations: { retry: false },
        },
      }),
    []
  );
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default React.memo(QueryProvider);
