import { useCallback, useState } from 'react';

import {
  FieldErrorsImpl,
  Path,
  UseFormRegister,
  UseFormReturn,
  UseFormSetValue,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import AreaForms from '@/modules/auth/components/areaForm';
import { LanguageListForm } from '@/modules/auth/components/languageListForm';
import { UniversidadesSelect } from '@/modules/auth/components/universidadesSelect';
import Input from '@/shared/components/input';
import GENDERS from '@/shared/constants/genders';

import { TJobOpening, TJobPosting } from '../types/searchParams';

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
  form: UseFormReturn<TJobPosting>;
  errors?: FieldErrorsImpl<TJobOpening>;
  setValue: UseFormSetValue<TJobPosting>;
}) {
  const { form, errors, setValue } = props;
  const { t } = useTranslation(['jobs', 'errors']);

  const [showMore, setShowMore] = useState(false);

  const selectActivity = useCallback(
    (activity: string) => {
      props.setValue(`openings.${props.i}.activity`, activity, {
        shouldValidate: true,
      });
    },
    [props.setValue, props.i]
  );

  return (
    <div className="flex flex-col gap-4">
      <p
        className={[
          'font-bold',
          props.errors?.activity !== undefined && 'text-red-500',
        ].join(' ')}
      >
        {t('Actividad')} *
      </p>
      <AreaForms
        defaultValue={props.initialValues?.activity || ''}
        changeListener={selectActivity}
        gender={'other'}
        removeElement={() => selectActivity('')}
        // t('Busca una actividad')
        placeholder="Busca una actividad"
      />
      {props.errors?.activity !== undefined && (
        <p className="text-red-500">
          {t(`errors:${props.errors?.activity.type}` || '')}
        </p>
      )}
      <Input
        label={t('Número de vacantes')}
        type="text"
        autoComplete=""
        form={form}
        fieldName={`openings.${props.i}.count`}
        divClass=""
        required={true}
        error={errors?.count}
      />
      <Input
        label={t('Trabajo no remunerado')}
        type="switch"
        form={form}
        fieldName={`openings.${props.i}.probono`}
        divClass=""
        required={true}
        error={errors?.probono}
      />
      {!showMore ? (
        <div
          className="w-fit cursor-pointer justify-self-center rounded-md bg-primary px-4 py-2 text-lg font-bold text-white"
          onClick={() => setShowMore(true)}
        >
          +
        </div>
      ) : (
        <>
          <div
            className="w-fit cursor-pointer justify-self-center rounded-md bg-primary px-4 py-2 text-lg font-bold text-white"
            onClick={() => setShowMore(false)}
          >
            ^
          </div>
          <div className="grid grid-cols-[1fr_1rem_1fr] gap-x-2 gap-y-2">
            <p className="col-span-full opacity-80">{t('Rango de edad')}</p>
            <Input
              label={t('Rango de edad mínimo')}
              hiddenLabel={true}
              type="text"
              autoComplete=""
              form={form}
              fieldName={`openings.${props.i}.ageRangeMin`}
              divClass=""
              required={true}
              error={errors?.ageRangeMin}
            />
            <p className="w-full text-center font-bold">-</p>
            <Input
              label={t('Rango de edad máximo')}
              hiddenLabel={true}
              type="text"
              autoComplete=""
              form={form}
              fieldName={`openings.${props.i}.ageRangeMax`}
              divClass=""
              required={true}
              error={errors?.ageRangeMax}
            />
          </div>
          <Input
            label={t('Género')}
            type="select"
            form={form}
            fieldName={`openings.${props.i}.gender`}
            items={GENDERS.map((gender) => ({
              value: gender,
              label: t(gender),
            }))}
          />
          <label
            htmlFor="languages"
            className="font-normal opacity-80"
          >
            {t('Idioma')}:
          </label>
          <LanguageListForm
            setValue={props.setValue}
            fieldName={`openings.${props.i}.languages`}
            defaultState={[]}
            allowNull={true}
          />
          <UniversidadesSelect
            label={t('Escuela/Universidad')}
            form={form}
            fieldName={`openings.${props.i}.school`}
          />
        </>
      )}
    </div>
  );
}
