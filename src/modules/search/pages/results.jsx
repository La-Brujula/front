import { useCallback, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSearch } from '../../../shared/hooks/useSearch';
import { UsersList } from '../components/userList';
import { ResultsFilter } from '../components/resultsFilters';
import { LoadingSpinner } from '../../../shared/components/loadingSpinner';
import { ErrorMessage } from '../../../shared/components/errorMessage';
import { replaceSearchTermsFromIndex } from '../../../shared/utils/busqueda';
import useDebounce from '../../../shared/hooks/useDebounce';
import { SearchOutlined } from '@mui/icons-material';
import ReactVisibilitySensor from 'react-visibility-sensor';

export const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();

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
    [setFilterObject]
  );

  useEffect(() => {
    setValueToSearch(search);
  }, [search]);

  return (
    <>
      <div className="bg-primary absolute top-0 h-48 w-full left-0 -z-10" />
      <div
        className="font-bold border-2 border-white bg-transparent
      text-white placeholder:text-white w-fit flex flex-row gap-1
      justify-center items-center px-2 mx-auto"
        style={{
          backgroundColor: 'rgb(45 123 191 / var(--tw-bg-opacity))',
          fontWeight: '700',
          border: '2px solid #dfe1e5',
          borderColor: 'rgb(237 237 237 / var(--tw-border-opacity))',
          hoverBackgroundColor: 'rgb(27 167 227 / var(--tw-bg-opacity))',
          borderWidth: '2px',
          flexGrow: '1',
          iconColor: 'white',
          borderRadius: '0.375rem',
          placeholderColor: 'white',
          color: 'rgb(237 237 237 / var(--tw-text-opacity))',
          zIndex: 1,
        }}
      >
        <SearchOutlined />
        <input
          type="text"
          defaultValue={search}
          onChange={(ev) => setSearch(ev.currentTarget.value)}
          className="border-none bg-transparent focus:outline-none"
        />
        <p>
          {results?.length}/{total || '...'}
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[20rem_2rem_1fr] gap-12 mt-16">
        <ResultsFilter setFilters={setFilterObject} filters={filters} />
        <div
          className="flex flex-col gap-8 text-left bg-black bg-opacity-20
          rounded-l-3xl p-8 w-full relative"
        >
          <div className="w-[50vw] absolute left-[100%] top-0 h-full bg-black bg-opacity-20 -z-10"></div>
          {!!results && results.length > 0 ? (
            <UsersList users={results} getNext={getNext} />
          ) : (
            !loading && <p>No se encontraron resultados</p>
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
