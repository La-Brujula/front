import { useCallback, useState } from 'react';

import { CheckIcon, DownloadIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/shared/components/loadingSpinner';
import { useLoggedInAccount } from '@/shared/hooks/useLoggedInAccount';
import { getFetch } from '@/shared/services/backendFetcher';
import { UserType } from '@/shared/types/user';
import { objectsToCSV } from '@/shared/utils/exportUtils';

import { Search } from '../types/searchParams';

function DownloadResultsButton(props: { search: Search }) {
  const { search } = props;
  const account = useLoggedInAccount();
  const [content, setContent] = useState<UserType[]>();
  const [loading, setLoading] = useState(false);

  const getContent = useCallback(() => {
    setLoading(true);
    getFetch<UserType[]>('/profiles/export', {
      params: {
        ...search,
        activity: search.activity || search.category,
        offset: 0,
      },
    })
      .then((data) => {
        setContent(data.entity);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    (account?.role === 'admin' || account?.role === 'editor') &&
    (loading ? (
      <LoadingSpinner />
    ) : content ? (
      <a
        className="!text-white"
        href={`data:text/csv;charset=utf-8,${encodeURI(objectsToCSV(content))}`}
        download
      >
        <CheckIcon />
      </a>
    ) : (
      <Button
        className="!text-white"
        onClick={getContent}
      >
        <DownloadIcon />
      </Button>
    ))
  );
}

export default DownloadResultsButton;
