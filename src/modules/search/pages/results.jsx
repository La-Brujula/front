import { useMemo } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import { useSearch } from '@shared/hooks/useSearch';
import { ProfileBadge } from '@modules/profile/components/profileBadge';
import { UserCard } from '../components/userCard';

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

  return !!results ? (
    <div className="grid grid-cols-[max-content,_1fr,_max-content] gap-8 text-left">
      {results.map((e, i) => (
        <UserCard user={e} key={e.email} />
      ))}
    </div>
  ) : (
    <p>Sin resultados</p>
  );
};
