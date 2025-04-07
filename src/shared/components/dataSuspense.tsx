import { Skeleton } from '@mui/material';
import React, { ReactNode } from 'react';
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
    return props.fallback ?? <Skeleton></Skeleton>;
  }
  if (!!props.error) {
    return (
      props.errorComponent ?? <ErrorMessage message={props.error?.message} />
    );
  }
  return props.children;
}

export default React.memo(DataSuspense);
