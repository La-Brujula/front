import React, { ReactNode } from 'react';

import { Skeleton } from '@/components/ui/skeleton';

import { ErrorMessage } from './errorMessage';

type DataSuspenseProps = {
  loading: boolean;
  children: ReactNode;
  error: Error | null;
  errorComponent?: ReactNode;
  fallback?: ReactNode;
};

function DataSuspense(props: DataSuspenseProps) {
  if (props.loading === true) {
    return props.fallback ?? <Skeleton className="h-12 w-full" />;
  }
  if (!!props.error) {
    if (props.errorComponent) return props.errorComponent;
    return <ErrorMessage message={props.error?.message} />;
  }
  return props.children;
}

export default React.memo(DataSuspense);
