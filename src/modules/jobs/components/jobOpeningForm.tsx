import { useCallback, useEffect, useState } from 'react';

import {
  FieldErrorsImpl,
  Path,
  PathValue,
  UseFormReturn,
  useForm,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
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
  form: UseFormReturn<TJobPosting>;
}) {
  const { form: parentForm } = props;

  const form = useForm<TJobOpening>({
    values: parentForm.getValues().openings[props.i],
  });
  const { t } = useTranslation(['jobs', 'errors']);

  const [showMore, setShowMore] = useState(false);

  const selectActivity = useCallback(
    (activity: string) => {
      form.setValue('activity', activity, {
        shouldValidate: true,
      });
    },
    [form.setValue]
  );

  useEffect(() => {
    const sub = form.watch((values) => {
      for (const [field, value] of Object.entries(values)) {
        parentForm.setValue(
          `openings.${props.i}.${field}` as Path<TJobPosting>,
          value as PathValue<TJobPosting, Path<TJobPosting>>
        );
      }
    });
    return () => sub.unsubscribe();
  }, [parentForm]);

  return (
    <div className="flex flex-col gap-4">
      <p
        className={[
          'font-bold',
          form.formState.errors.activity !== undefined && 'text-red-500',
        ].join(' ')}
      >
        {t('Actividad')} *
      </p>
      <AreaForms
        defaultValue={form.getValues().activity || ''}
        changeListener={selectActivity}
        gender="other"
        removeElement={() => selectActivity('')}
        placeholder={t('Busca una actividad')}
      />
      {form.formState.errors.activity !== undefined && (
        <p className="text-red-500">
          {t(`errors:${form.formState.errors.activity.type}` || '')}
        </p>
      )}
      <Input
        type="text"
        form={form}
        fieldName="count"
        label={t('Número de vacantes')}
        required={true}
      />
      <Input
        type="switch"
        form={form}
        fieldName="probono"
        label={t('Trabajo no remunerado')}
        required={true}
      />
      {!showMore ? (
        <Button
          size="icon"
          className="w-fit justify-self-center rounded-md bg-primary px-4 py-2 text-lg font-bold text-white"
          onClick={() => setShowMore(true)}
        >
          +
        </Button>
      ) : (
        <>
          <Button
            size="icon"
            className="w-fit justify-self-center rounded-md bg-primary px-4 py-2 text-lg font-bold text-white"
            onClick={() => setShowMore(false)}
          >
            ^
          </Button>
          <div className="grid grid-cols-[1fr_1rem_1fr] gap-x-2 gap-y-2">
            <p className="col-span-full opacity-80">{t('Rango de edad')}</p>
            <Input
              type="text"
              form={form}
              fieldName="ageRangeMin"
              label={t('Rango de edad mínimo')}
              hiddenLabel
              autoComplete=""
              required
            />
            <p className="w-full text-center font-bold">-</p>
            <Input
              type="text"
              form={form}
              fieldName="ageRangeMax"
              label={t('Rango de edad máximo')}
              autoComplete=""
              hiddenLabel
              required={true}
            />
          </div>
          <Input
            type="select"
            form={form}
            fieldName="gender"
            label={t('Género')}
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
            form={form}
            allowNull={true}
          />
          <UniversidadesSelect
            form={form}
            fieldName="school"
            label={t('Escuela/Universidad')}
          />
        </>
      )}
    </div>
  );
}
