import { useMemo } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import { useSearch } from '@shared/hooks/useSearch';
import { UsersList } from '../components/userList';
import { Container } from '@shared/layout/container';
import { PorFiltros } from '../components/filtros';

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

      <div className="flex flex-col md:flex-row gap-12 mt-16">
        <div>User's filters</div>
        <UsersList users={results} />
      </div>
    </>
  );
};
