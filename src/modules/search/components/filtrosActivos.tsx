import { useCallback } from 'react';

import { SearchFilters } from '@/shared/types/SearchFilters';

export const FiltrosActivos = ({
  filters,
  setFilters,
}: {
  filters: SearchFilters;
  setFilters: (v: SearchFilters) => void;
}) => {
  const removeFromFilters = useCallback(
    (filterName: keyof SearchFilters) => () => {
      const obj = {
        ...filters,
        [filterName]: undefined,
      } as SearchFilters;
      setFilters(obj);
    },
    []
  );
  return (
    <div className="mt-4 flex flex-row flex-wrap items-center gap-4">
      <h4 className="text-primary">Filtros Activos:</h4>
      {!!filters &&
        Object.entries(filters)?.map(
          ([k, v]) =>
            !!v && (
              <p
                key={k}
                className="cursor-pointer rounded-lg px-2 py-1 outline outline-primary"
                onClick={removeFromFilters(k as keyof SearchFilters)}
              >
                X <b>{k}</b>: {v.toString()}
              </p>
            )
        )}
    </div>
  );
};
