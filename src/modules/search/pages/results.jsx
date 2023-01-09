import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSearch } from '@shared/hooks/useSearch';
import { UsersList } from '../components/userList';
import { PorFiltros } from '../components/filtros';
import { ResultsFilter } from '../components/resultsFilters';
import { LoadingSpinner } from '@shared/components/loadingSpinner';
import { ErrorMessage } from '@shared/components/errorMessage';

export const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();

  const { results, loading, error, setFilterObject, getNext } = useSearch();

  useMemo(() => {
    let filters = {};
    searchParams.forEach((value, key) => (filters[key] = value));
    setFilterObject(filters);
  }, [searchParams]);

  return (
    <>
      <div className="bg-primary absolute top-0 h-48 w-full left-0 -z-10" />
      <p className="text-white font-bold mb-4"></p>
      <PorFiltros
        defaultActividad={searchParams.get('activity')}
        defaultSearch={searchParams.get('search')}
        defaultState={searchParams.get('region')}
      />

      <div className="grid grid-cols-1 md:grid-cols-[20rem,1fr] gap-12 mt-16">
        <ResultsFilter setFilters={setFilterObject} />
        {loading ? (
          <LoadingSpinner />
        ) : !!error ? (
          <ErrorMessage message={error.toString()} />
        ) : !!results ? (
          <UsersList users={results} getNext={getNext} />
        ) : (
          <p>No se encontraron resultados</p>
        )}
      </div>
    </>
  );
};
