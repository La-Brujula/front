import { useCallback, useState } from 'react';
import { TJobOpening, TJobPosting } from '../types/searchParams';
import {
  FieldErrorsImpl,
  Path,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import AreaForms from '@/modules/auth/components/areaForm';
import { useTranslation } from 'react-i18next';
import Input from '@/shared/components/input';
import GENDERS from '@/shared/constants/genders';
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
  register: UseFormRegister<TJobPosting>;
  errors?: FieldErrorsImpl<TJobOpening>;
  setValue: UseFormSetValue<TJobPosting>;
}) {
  const { register, errors } = props;
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
        // t('Busca una actividad')
        placeholder="Busca una actividad"
      />
      <input
        type="hidden"
        {...props.register(`openings.${props.i}.activity` as Path<TJobPosting>)}
        value={props.initialValues?.activity}
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
        register={register}
        fieldName={`openings.${props.i}.count`}
        divClass=""
        required={true}
        error={errors?.count}
      />
      <Input
        label={t('Trabajo remunerado')}
        type="radioGroup"
        register={register}
        fieldName={`openings.${props.i}.probono`}
        divClass=""
        required={true}
        error={errors?.probono}
        items={[
          { label: t('Sí'), value: 'false' },
          { label: t('No'), value: 'true' },
        ]}
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
              fieldName={`openings.${props.i}.ageRangeMin`}
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
              fieldName={`openings.${props.i}.ageRangeMax`}
              divClass=""
              required={true}
              error={errors?.ageRangeMax}
            />
          </div>
          <Input
            label={t('Género')}
            type="select"
            register={register}
            fieldName={`openings.${props.i}.gender`}
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
            fieldName={`openings.${props.i}.languages`}
            defaultState={[]}
            allowNull={true}
          />
          <Input
            label={t('Escuela/Universidad')}
            type="custom"
            register={register}
            fieldName={`openings.${props.i}.school`}
            component={UniversidadesSelect<TJobPosting>}
            error={errors?.school}
          />
        </>
      )}
    </div>
  );
}
