import { Skeleton } from '@mui/material';
import { ReactNode } from 'react';
import { ErrorMessage } from './errorMessage';
import React from 'react';

type DataSuspenseProps = {
  loading: boolean;
  children: ReactNode;
  error: Error | null;
  errorComponent?: ReactNode;
};

function DataSuspense(props: DataSuspenseProps) {
  if (props.loading === true) return <Skeleton></Skeleton>;
  if (!!props.error) {
    if (props.errorComponent) return props.errorComponent;
    return <ErrorMessage message={props.error?.message} />;
  }
  return props.children;
}

export default React.memo(DataSuspense);
