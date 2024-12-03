import { SearchFilters } from '@/shared/hooks/useSearch';
import { useCallback } from 'react';

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
    <div className="flex flex-row flex-wrap gap-4 mt-4 items-center">
      <h4 className="text-primary">Filtros Activos:</h4>
      {!!filters &&
        Object.entries(filters)?.map(
          ([k, v]) =>
            !!v && (
              <p
                key={k}
                className="px-2 py-1 outline-primary outline rounded-lg cursor-pointer"
                onClick={removeFromFilters(k as keyof SearchFilters)}
              >
                X <b>{k}</b>: {v.toString()}
              </p>
            )
        )}
    </div>
  );
};
