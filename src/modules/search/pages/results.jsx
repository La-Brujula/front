import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSearch } from '@shared/hooks/useSearch';
import { UsersList } from '../components/userList';
import { PorFiltros } from '../components/filtros';
import { ResultsFilter } from '../components/resultsFilters';

export const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();

  const { results, setFilterObject } = useSearch();

  useMemo(() => {
    let filters = {};
    if (!!searchParams.get('activity'))
      filters['palabraClave'] = searchParams.get('activity');
    if (!!searchParams.get('region'))
      filters['state'] = searchParams.get('region');
    if (!!searchParams.get('search'))
      filters['search'] = searchParams.get('search');
    setFilterObject(filters);
  }, [searchParams]);

  return (
    <>
      <div className="bg-primary absolute top-0 h-48 w-full left-0 -z-10" />
      <p className="text-white font-bold mb-4">
        13 años reuniendo a las personas, empresas e instituciones del medio
        audiovisual y cinematográfico de México
      </p>
      <PorFiltros
        defaultActividad={searchParams.get('activity')}
        defaultSearch={searchParams.get('search')}
        defaultState={searchParams.get('region')}
      />

      <div className="grid grid-cols-1 md:grid-cols-[20rem,1fr] gap-12 mt-16">
        <ResultsFilter />
        <UsersList users={results} />
      </div>
    </>
  );
};
