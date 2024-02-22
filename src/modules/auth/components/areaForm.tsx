import { EnumGender } from '@/shared/types/genders';
import areas from '@shared/constants/areas.json';
import {
  getAreaObjectByName,
  getAreaFromId,
  getSubAreaFromId,
  getTitle,
  getSubAreaObjectByName,
} from '@shared/utils/areaUtils';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export const AreaForms = ({
  defaultValue,
  gender,
  changeListener,
}: {
  defaultValue: string;
  gender: EnumGender;
  changeListener: (value: string) => void;
}) => {
  const { register, watch } = useForm({
    defaultValues: {
      area: defaultValue ? getAreaFromId(defaultValue) : undefined,
      subarea: defaultValue ? getSubAreaFromId(defaultValue) : undefined,
      activity: defaultValue || undefined,
    },
  });
  const formArea = watch('area');
  const formSubarea = watch('subarea');

  const { t } = useTranslation('auth');

  const areaHasValid = (area: string) => {
    return Object.keys(getAreaObjectByName(area)).some((subarea) =>
      Object.keys(getAreaObjectByName(area)[subarea]).some((activity) =>
        getTitle(activity, gender),
      ),
    );
  };

  const subareaHasValid = (area: keyof typeof areas, subarea: string) => {
    return Object.keys(getAreaObjectByName(area)[subarea]).some((activity) =>
      getTitle(activity, gender),
    );
  };

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-[max-content_1fr]
    text-left md:text-right gap-y-4 gap-x-2 w-full items-center"
    >
      <label htmlFor="area">{t('Área')}</label>
      <select {...register('area')}>
        <option value="">Selecciona una opción</option>
        {Object.keys(areas).map((area) =>
          areaHasValid(area as keyof typeof areas) ? (
            <option
              key={area}
              value={area}
            >
              {area}
            </option>
          ) : (
            <></>
          ),
        )}
      </select>
      {!!formArea && (
        <>
          <label htmlFor="subarea">{t('Subarea')}</label>
          <select {...register('subarea')}>
            <option value="">Selecciona una opción</option>
            {Object.keys(areas[formArea]).map((subarea) =>
              subareaHasValid(formArea, subarea) ? (
                <option
                  key={subarea}
                  value={subarea}
                >
                  {subarea}
                </option>
              ) : (
                <></>
              ),
            )}
          </select>
        </>
      )}
      {!!formArea && !!formSubarea && (
        <>
          <label htmlFor="activity">Actividad</label>
          <select
            {...register('activity')}
            onChange={(event) => changeListener(event.target.value)}
          >
            <option value="">Selecciona una opción</option>
            {!!formArea &&
              !!formSubarea &&
              Object.keys(getSubAreaObjectByName(formArea, formSubarea)).map(
                (activity) =>
                  getTitle(activity, gender) ? (
                    <option
                      key={activity}
                      value={activity}
                    >
                      {getTitle(activity, gender)}
                    </option>
                  ) : (
                    <></>
                  ),
              )}
          </select>
        </>
      )}
    </div>
  );
};

export default AreaForms;
