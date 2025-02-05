import { useCallback, useEffect, useState } from 'react';
import { TJobForm, TJobOpening, TJobPosting } from '../types/searchParams';
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  Path,
  useForm,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
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
  initialValues?: TJobForm;
  register: UseFormRegister<TJobForm>;
  errors?: FieldErrorsImpl<TJobOpening>;
  setValue: UseFormSetValue<TJobForm>;
}) {
  const { register, errors } = props;
  const { t } = useTranslation('jobs');

  const [showMore, setShowMore] = useState(false);

  const selectActivity = useCallback(
    (activity: string) => {
      props.setValue('activity', activity);
    },
    [props.setValue]
  );

  return (
    <div className="flex flex-col gap-4">
      <p
        className={[
          'font-bold',
          props.errors?.activity !== undefined && ' text-red-500',
        ].join(' ')}
      >
        {t('Actividad')} *
      </p>
      <AreaForms
        defaultValue={props.initialValues?.activity || ''}
        changeListener={selectActivity}
        gender={'other'}
        removeElement={() => selectActivity('')}
      />
      <input
        type="hidden"
        {...props.register('activity')}
        value={props.initialValues?.activity}
      />
      {props.errors?.activity !== undefined && (
        <p className="text-red-500">{t(props.errors?.activity.type || '')}</p>
      )}
      <Input
        label={t('Número de vacantes')}
        type="text"
        autoComplete=""
        register={register}
        fieldName="count"
        divClass=""
        required={true}
        error={errors?.count}
      />
      <Input
        label={t('Trabajo remunerado')}
        type="radioGroup"
        register={register}
        fieldName="probono"
        divClass=""
        required={true}
        error={errors?.probono}
        items={[
          { label: t('Sí'), value: '' },
          { label: t('No'), value: 'true' },
        ]}
        setValue={props.setValue}
        value={props.initialValues?.probono ? 'true' : ''}
      />
      {!showMore ? (
        <div
          className="justify-self-center cursor-pointer text-lg font-bold bg-primary px-4 py-2 rounded-md text-white w-fit"
          onClick={() => setShowMore(true)}
        >
          +
        </div>
      ) : (
        <>
          <div
            className="justify-self-center cursor-pointer text-lg font-bold bg-primary px-4 py-2 rounded-md text-white w-fit"
            onClick={() => setShowMore(false)}
          >
            ^
          </div>
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
              error={errors?.ageRangeMin}
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
              error={errors?.ageRangeMax}
            />
          </div>
          <Input
            label={t('Género')}
            type="select"
            register={register}
            fieldName="gender"
            divClass=""
            items={GENDERS.map((gender) => ({ key: gender, label: t(gender) }))}
            error={errors?.gender}
          />
          <label
            htmlFor="languages"
            className="opacity-80 font-normal"
          >
            {t('Idioma')}:
          </label>
          <LanguageListForm
            setValue={props.setValue}
            fieldName="languages"
            defaultState={[]}
            allowNull={true}
          />
          <Input
            label={t('Escuela/Universidad')}
            type="custom"
            register={register}
            fieldName="school"
            component={UniversidadesSelect<TJobForm>}
            error={errors?.school}
          />
        </>
      )}
    </div>
  );
}
