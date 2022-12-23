import areas from '@shared/constants/areas.json';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  getAreaFromId,
  getSubAreaFromId,
  getTitle,
} from '../../../shared/utils/areaUtils';

export const AreaForms = ({ defaultValue, gender, changeListener }) => {
  const { register, watch } = useForm({
    defaultValues: {
      area: defaultValue ? getAreaFromId(defaultValue) : undefined,
      subarea: defaultValue ? getSubAreaFromId(defaultValue) : undefined,
      activity: defaultValue || undefined,
    },
  });
  const area = watch('area');
  const subarea = watch('subarea');

  return (
    <div className="grid grid-cols-[max-content_1fr] text-right gap-y-4 gap-x-2 w-full items-center">
      <label htmlFor="area">Area</label>
      <select {...register('area')} placeholder="Area">
        <option value="">Selecciona una opción</option>
        {Object.keys(areas).map((area) => (
          <option key={area}>{area}</option>
        ))}
      </select>
      {!!area && (
        <>
          <label htmlFor="subarea">Subarea</label>
          <select {...register('subarea')}>
            <option value="">Selecciona una opción</option>
            {Object.keys(areas[area]).map((subarea) => (
              <option key={subarea} value={subarea}>
                {subarea}
              </option>
            ))}
          </select>
        </>
      )}
      {!!area && !!subarea && (
        <>
          <label htmlFor="activity">Actividad</label>
          <select
            {...register('activity')}
            placeholder="Actividad"
            onChange={(event) => changeListener(event.target.value)}
          >
            <option value="">Selecciona una opción</option>
            {!!area &&
              !!subarea &&
              !!areas[area][subarea] &&
              Object.keys(areas[area][subarea]).map(
                (activity) =>
                  getTitle(activity, gender) && (
                    <option key={activity} value={activity}>
                      {getTitle(activity, gender)}
                    </option>
                  )
              )}
          </select>
        </>
      )}
    </div>
  );
};

export default AreaForms;
