import { SearchOutlined } from '@mui/icons-material';
import { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import ReactVisibilitySensor from 'react-visibility-sensor';
import { ErrorMessage } from '../../../shared/components/errorMessage';
import { LoadingSpinner } from '../../../shared/components/loadingSpinner';
import useDebounce from '../../../shared/hooks/useDebounce';
import { useSearch } from '../../../shared/hooks/useSearch';
import { replaceSearchTermsFromIndex } from '../../../shared/utils/busqueda';
import { ResultsFilter } from '../components/resultsFilters';
import { UsersList } from '../components/userList';

export const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();

  const { t } = useTranslation('search');

  const {
    results,
    loading,
    error,
    setFilterObject,
    getNext,
    hasMore,
    filters,
    total,
  } = useSearch();

  let [search, setSearch] = useDebounce('', 500);

  useMemo(() => {
    setSearch(searchParams.get('search') || '');
    setFilterObject({
      search: !!search && replaceSearchTermsFromIndex(search?.toLowerCase()),
      activity: searchParams.get('activity') || '',
      category: searchParams.get('category') || '',
      name: searchParams.get('name') || '',
    });
  }, [searchParams]);

  const setValueToSearch = useCallback(
    (value) =>
      setFilterObject({
        search: replaceSearchTermsFromIndex(value.toLowerCase()),
      }),
    [setFilterObject],
  );

  useEffect(() => {
    setValueToSearch(search);
  }, [search]);

  return (
    <>
      <div className="bg-primary absolute top-0 h-48 w-full left-0 -z-10" />
      <div
        className="w-full grid grid-cols-[1fr_max-content]
      gap-4 text-white font-bold items-center px-4"
      >
        <div
          className="font-bold border-2 border-white bg-transparent
        text-white placeholder:text-white flex flex-row gap-1
        justify-start items-center px-2 mx-auto rounded-md
        z-10 w-full"
          style={{
            backgroundColor: 'rgb(45 123 191 / var(--tw-bg-opacity))',
            border: '2px solid #dfe1e5',
            borderColor: 'rgb(237 237 237 / var(--tw-border-opacity))',
            hoverBackgroundColor: 'rgb(27 167 227 / var(--tw-bg-opacity))',
            flexGrow: '1',
            iconColor: 'white',
          }}
        >
          <SearchOutlined />
          <input
            type="text"
            defaultValue={search}
            onChange={(ev) => setSearch(ev.currentTarget.value)}
            className="border-none bg-transparent focus:outline-none w-full"
          />
        </div>
        <p>
          {total || '...'} {t('resultados')}
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[20rem_1fr] gap-12 mt-16">
        <ResultsFilter
          setFilters={setFilterObject}
          filters={filters}
        />
        <div
          className="flex flex-col gap-8 text-left bg-black bg-opacity-20
          rounded-l-3xl p-8 w-full relative"
        >
          <div className="w-[50vw] absolute left-[100%] top-0 h-full bg-black bg-opacity-20 -z-10"></div>
          {!!results && results.length > 0 ? (
            <UsersList
              users={results}
              getNext={getNext}
            />
          ) : (
            !loading && !error && <p>No se encontraron resultados</p>
          )}
          {loading && <LoadingSpinner />}
          {!loading && hasMore && (
            <ReactVisibilitySensor
              partialVisibility
              onChange={(isVisible) =>
                isVisible && !loading && !error && getNext()
              }
            >
              <LoadingSpinner />
            </ReactVisibilitySensor>
          )}
          {!!error && <ErrorMessage message={error.toString()} />}
        </div>
      </div>
    </>
  );
};
