import areas from '@shared/constants/areas.json';
import { useForm } from 'react-hook-form';
import {
  getAreaFromId,
  getSubAreaFromId,
  getTitle,
} from '@shared/utils/areaUtils';
import { useTranslation } from 'react-i18next';

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

  const { t } = useTranslation('auth');

  const areaHasValid = (area) => {
    return Object.keys(areas[area]).some((subarea) =>
      Object.keys(areas[area][subarea]).some(
        (activity) => areas[area][subarea][activity][gender]?.es
      )
    );
  };

  const subareaHasValid = (area, subarea) => {
    return Object.keys(areas[area][subarea]).some(
      (activity) => areas[area][subarea][activity][gender]?.es
    );
  };

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-[max-content_1fr]
    text-left md:text-right gap-y-4 gap-x-2 w-full items-center"
    >
      <label htmlFor="area">{t('Área')}</label>
      <select {...register('area')} placeholder={t('Área')}>
        <option value="">Selecciona una opción</option>
        {Object.keys(areas).map((area) =>
          areaHasValid(area) ? (
            <option key={area} value={area}>
              {area}
            </option>
          ) : (
            <></>
          )
        )}
      </select>
      {!!area && (
        <>
          <label htmlFor="subarea">{t('Subárea')}</label>
          <select {...register('subarea')}>
            <option value="">Selecciona una opción</option>
            {Object.keys(areas[area]).map((subarea) =>
              subareaHasValid(area, subarea) ? (
                <option key={subarea} value={subarea}>
                  {subarea}
                </option>
              ) : (
                <></>
              )
            )}
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
              Object.keys(areas[area][subarea]).map((activity) =>
                getTitle(activity, gender) ? (
                  <option key={activity} value={activity}>
                    {getTitle(activity, gender)}
                  </option>
                ) : (
                  <></>
                )
              )}
          </select>
        </>
      )}
    </div>
  );
};

export default AreaForms;
