import { useCallback, useEffect } from 'react';
import { TJobOpening } from '../types/searchParams';
import { FieldError, FieldErrorsImpl, Merge, useForm } from 'react-hook-form';
import AreaForms from '@/modules/auth/components/areaForm';
import { useTranslation } from 'react-i18next';
import Input from '@/shared/components/input';
import GENDERS from '@/shared/constants/genders.json';
import { LanguageListForm } from '@/modules/auth/components/languageListForm';
import { UniversidadesSelect } from '@/modules/auth/components/universidadesSelect';

const DEFAULT_VALUES: TJobOpening = {
  activity: '',
  count: 0,
  probono: false,
  gender: undefined,
  ageRangeMin: undefined,
  ageRangeMax: undefined,
  languages: [],
  school: undefined,
};

export default function JobOpeningForm(props: {
  i: number;
  initialValues?: TJobOpening;
  onChange: (values: TJobOpening) => void;
  errors?: Merge<
    FieldError,
    (Merge<FieldError, FieldErrorsImpl<TJobOpening>> | undefined)[]
  >;
}) {
  const { t } = useTranslation('jobs');
  const { register, formState, setValue, watch } = useForm<TJobOpening>({
    defaultValues: { ...DEFAULT_VALUES, ...props.initialValues },
  });

  const selectActivity = useCallback(
    (activity: string) => {
      setValue('activity', activity);
    },
    [setValue]
  );

  useEffect(
    () =>
      watch((values) => {
        props.onChange(values as TJobOpening);
      }).unsubscribe,
    [props.onChange]
  );

  const activity = watch('activity');

  return (
    <div className="flex flex-col gap-4">
      <p className="font-bold">{t('Actividad')} *</p>
      <AreaForms
        defaultValue={activity}
        changeListener={selectActivity}
        gender={'other'}
        removeElement={() => selectActivity('')}
      />
      <Input
        label={t('Número de vacantes')}
        type="text"
        autoComplete=""
        register={register}
        fieldName="count"
        divClass=""
        required={true}
        error={formState.errors.count}
      />
      <Input
        label={t('Trabajo no remunerado')}
        type="radioGroup"
        register={register}
        fieldName="probono"
        divClass=""
        required={true}
        error={formState.errors.probono}
        items={[
          { label: t('Sí'), value: 'true' },
          { label: t('No'), value: 'false' },
        ]}
        setValue={setValue}
      />
      {formState.isValid && (
        <>
          <div className="grid grid-cols-[1fr_1rem_1fr] gap-y-2 gap-x-2">
            <p className="opacity-80 col-span-full">{t('Rango de edad')}</p>
            <Input
              label={t('Rango de edad mínimo')}
              hiddenLabel={true}
              type="text"
              autoComplete=""
              register={register}
              fieldName="ageRangeMin"
              divClass=""
              required={true}
              error={formState.errors.ageRangeMin}
            />
            <p className="text-center w-full font-bold">-</p>
            <Input
              label={t('Rango de edad máximo')}
              hiddenLabel={true}
              type="text"
              autoComplete=""
              register={register}
              fieldName="ageRangeMax"
              divClass=""
              required={true}
              error={formState.errors.ageRangeMax}
            />
          </div>
          <Input
            label={t('Género')}
            type="select"
            register={register}
            fieldName="gender"
            divClass=""
            items={GENDERS.map((gender) => ({ key: gender, label: t(gender) }))}
            error={formState.errors.gender}
          />
          <label
            htmlFor="languages"
            className="opacity-80 font-normal"
          >
            {t('Idioma')}:
          </label>
          <LanguageListForm
            setValue={setValue}
            fieldName="languages"
            defaultState={[]}
            allowNull={true}
          />
          <Input
            label={t('Escuela/Universidad')}
            type="custom"
            register={register}
            fieldName="school"
            component={UniversidadesSelect<TJobOpening>}
            error={formState.errors.school}
          />
        </>
      )}
    </div>
  );
}
