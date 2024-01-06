import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSearch } from '../../../shared/hooks/useSearch';
import { UsersList } from '../components/userList';
import { PorFiltros } from '../components/querySearchField';
import { ResultsFilter } from '../components/resultsFilters';
import { LoadingSpinner } from '../../../shared/components/loadingSpinner';
import { ErrorMessage } from '../../../shared/components/errorMessage';
import { FiltrosActivos } from '../components/filtrosActivos';

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
  } = useSearch();

  useMemo(() => {
    const search = searchParams.get('search'), activity = searchParams.get('activity'), category = searchParams.get('category');
    setFilterObject({ search: !!search && !!activity ? [search, activity].join(' ') : search || activity, category: category });
  }, [searchParams]);

  return (
    <>
      <div className="bg-primary absolute top-0 h-48 w-full left-0 -z-10" />
      <PorFiltros defaultSearch={searchParams.get('search') || filters.search} setFilters={setFilterObject} />

      <div className="grid grid-cols-1 lg:grid-cols-[20rem,1fr] gap-12 mt-16">
        <ResultsFilter setFilters={setFilterObject} filters={filters} />
        <div
          className="flex flex-col gap-8 text-left bg-black bg-opacity-20
          rounded-l-3xl p-8 w-full relative"
        >
          <div className="w-[50vw] absolute left-[100%] top-0 h-full bg-black bg-opacity-20"></div>
          {!!results && results.length > 0 ? (
            <UsersList users={results} getNext={getNext} />
          ) : !loading && (
            <p>No se encontraron resultados</p>
          )}
          {loading && <LoadingSpinner />}
          {!loading && hasMore && (
            <div
              className="px-4 py-2 text-white bg-secondary
            cursor-pointer rounded-md text-c"
              onClick={getNext}
            >
              Cargar más
            </div>
          )}
          {!!error && <ErrorMessage message={error.toString()} />}
        </div>
      </div>
    </>
  );
};
