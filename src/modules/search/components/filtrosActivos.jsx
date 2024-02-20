import Close from '@mui/icons-material/CloseOutlined';
import { useCallback } from 'react';

export const FiltrosActivos = ({ filters, setFilters }) => {
  const removeFromFilters = useCallback(
    (filterName) => () => {
      const obj = {};
      obj[filterName] = undefined;
      setFilters(obj);
    },
    [],
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
                onClick={removeFromFilters(k)}
              >
                <Close /> <b>{k}</b>: {v.toString()}
              </p>
            ),
        )}
    </div>
  );
};
