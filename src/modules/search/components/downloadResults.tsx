import { useLoggedInAccount } from '@/shared/hooks/useLoggedInAccount';
import { CheckOutlined, DownloadOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Search } from '../types/searchParams';
import { useCallback, useState } from 'react';
import { getFetch } from '@/shared/services/backendFetcher';
import { UserType } from '@/shared/types/user';
import { LoadingSpinner } from '@/shared/components/loadingSpinner';
import { objectsToCSV } from '@/shared/utils/exportUtils';

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
        <CheckOutlined />
      </a>
    ) : (
      <IconButton
        className="!text-white"
        onClick={getContent}
      >
        <DownloadOutlined />
      </IconButton>
    ))
  );
}

export default DownloadResultsButton;
