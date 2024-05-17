import Input from '@/shared/components/input';
import { EnumGender } from '@/shared/types/genders';
import areas from '@shared/constants/areas.json';
import {
  getAreaObjectByName,
  getAreaFromId,
  getSubAreaFromId,
  getTitle,
  getSubAreaObjectByName,
} from '@shared/utils/areaUtils';
import { useCallback, useMemo } from 'react';
import { RegisterOptions, UseFormRegister, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type AreasForm = {
  area: keyof typeof areas;
  subarea: string;
  activity: string;
};

export const AreaForms = ({
  defaultValue,
  gender,
  changeListener,
}: {
  defaultValue: string;
  gender: EnumGender;
  changeListener: (value: string) => void;
}) => {
  const { register, watch, setValue } = useForm<AreasForm>({
    defaultValues: {
      area: defaultValue ? getAreaFromId(defaultValue) : undefined,
      subarea: defaultValue ? getSubAreaFromId(defaultValue) : undefined,
      activity: defaultValue || undefined,
    },
  });
  const formArea = watch('area');
  const formSubarea = watch('subarea');

  const { t } = useTranslation('auth');

  const subareaHasValid = useCallback(
    (area: keyof typeof areas, subarea: string) => {
      return Object.keys(getAreaObjectByName(area)[subarea]).some((activity) =>
        getTitle(activity, gender)
      );
    },
    [gender]
  );

  const areaHasValid = useCallback(
    (area: keyof typeof areas) => {
      return Object.keys(getAreaObjectByName(area)).some((subarea) =>
        subareaHasValid(area, subarea)
      );
    },
    [gender]
  );
  const resetActivity = useCallback(() => {
    setValue('activity', '');
  }, [setValue]);

  const resetOthers = useCallback(() => {
    setValue('subarea', '');
    resetActivity();
  }, [setValue, resetActivity]);

  const areaRegister = useCallback(
    (fieldName: 'area', options: RegisterOptions) =>
      register(fieldName, { ...options, onChange: resetOthers }),
    [register, resetOthers]
  ) as UseFormRegister<AreasForm>;

  const subareaRegister = useCallback(
    (fieldName: 'subarea', options: RegisterOptions) =>
      register(fieldName, { ...options, onChange: resetActivity }),
    [register, resetActivity]
  ) as UseFormRegister<AreasForm>;

  const validAreas = useMemo(
    () =>
      Object.keys(areas)
        .map(
          (area) =>
            areaHasValid(area as keyof typeof areas) && {
              key: area,
              label: area,
            }
        )
        .filter((v) => !!v),
    [areaHasValid]
  );

  const validSubareas = useMemo(
    () =>
      !!formArea
        ? Object.keys(areas[formArea])
            .map(
              (subarea) =>
                subareaHasValid(formArea, subarea) && {
                  key: subarea,
                  label: subarea,
                }
            )
            .filter((v) => !!v)
        : [],
    [subareaHasValid, formArea]
  );

  const validActivities = useMemo(
    () =>
      !!formArea && !!formSubarea
        ? Object.keys(getSubAreaObjectByName(formArea, formSubarea))
            .map(
              (activity) =>
                getTitle(activity, gender) && {
                  key: activity,
                  label: getTitle(activity, gender),
                }
            )
            .filter((v) => !!v)
        : [],
    [formArea, formSubarea, gender]
  );

  return (
    <div className="col-span-full flex flex-col items-start justify-stretch text-left gap-4 w-full">
      <Input
        label={t('Área')}
        type="select"
        register={areaRegister}
        fieldName="area"
        placeholder={t('Selecciona una opción')}
        items={validAreas}
        inputClass="w-full"
        divClass="w-full"
      />
      {!!formArea && (
        <Input
          type="select"
          fieldName="subarea"
          label={t('Subarea')}
          register={subareaRegister}
          placeholder={t('Selecciona una opción')}
          items={validSubareas}
          inputClass="w-full"
          divClass="w-full"
        />
      )}
      {!!formArea && !!formSubarea && (
        <Input
          fieldName="activity"
          label={t('Actividad')}
          register={register}
          placeholder={t('Selecciona una opción')}
          type="select"
          items={validActivities}
          inputClass="w-full"
          divClass="w-full"
          onChange={(ev) => changeListener(ev.currentTarget.value)}
        />
      )}
    </div>
  );
};

export default AreaForms;
