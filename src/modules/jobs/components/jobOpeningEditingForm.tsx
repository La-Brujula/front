import { useCallback, useState } from 'react';

import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import AreaForms from '@/modules/auth/components/areaForm';
import { LanguageListForm } from '@/modules/auth/components/languageListForm';
import { UniversidadesSelect } from '@/modules/auth/components/universidadesSelect';
import Input from '@/shared/components/input';
import GENDERS from '@/shared/constants/genders';

import { TJobForm } from '../types/searchParams';

export default function JobOpeningForm(props: {
  form: UseFormReturn<TJobForm>;
}) {
  const { t } = useTranslation('jobs');

  const [showMore, setShowMore] = useState(false);

  const selectActivity = useCallback(
    (activity: string) => {
      props.form.setValue('activity', activity);
    },
    [props.form.setValue]
  );

  const activity = props.form.watch('activity');

  return (
    <div className="flex flex-col gap-4">
      <p
        className={[
          'font-bold',
          props.form.formState.errors?.activity !== undefined && 'text-red-500',
        ].join(' ')}
      >
        {t('Actividad')} *
      </p>
      <AreaForms
        defaultValue={activity ?? ''}
        changeListener={selectActivity}
        gender={'other'}
        removeElement={() => selectActivity('')}
      />
      <Input
        type="hidden"
        form={props.form}
        fieldName="activity"
      />
      <Input
        label={t('Número de vacantes')}
        type="text"
        autoComplete=""
        form={props.form}
        fieldName="count"
        divClass=""
        required={true}
      />
      <Input
        label={t('Trabajo no remunerado')}
        type="switch"
        form={props.form}
        fieldName="probono"
        divClass=""
        required={true}
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
              form={props.form}
              fieldName="ageRangeMin"
              divClass=""
              required={true}
            />
            <p className="w-full text-center font-bold">-</p>
            <Input
              label={t('Rango de edad máximo')}
              hiddenLabel={true}
              type="text"
              autoComplete=""
              form={props.form}
              fieldName="ageRangeMax"
              divClass=""
              required={true}
            />
          </div>
          <Input
            label={t('Género')}
            type="select"
            form={props.form}
            fieldName="gender"
            divClass=""
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
            setValue={props.form.setValue}
            fieldName="languages"
            defaultState={[]}
            allowNull={true}
          />
          <UniversidadesSelect
            form={props.form}
            fieldName="school"
            label={t('Escuela/Universidad')}
          />
        </>
      )}
    </div>
  );
}
