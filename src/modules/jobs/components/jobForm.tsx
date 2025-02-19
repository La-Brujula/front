import { FieldErrorsImpl, Path, SubmitHandler, useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { JobPosting, TJobOpening, TJobPosting } from '../types/searchParams';
import { useCallback, useMemo, useState } from 'react';
import Input from '@/shared/components/input';
import JobOpeningForm from './jobOpeningForm';
import {
  EMPLOYMENT_OPTIONS,
  LOCATION_OPTIONS,
  WORK_RADIUS_OPTIONS,
} from '../types/jobEnums';
import { JobDetailDTO } from '../queries/jobSearchQuery';

// t('jobs:online')
// t('jobs:hybrid')
// t('jobs:in-person')
// t('jobs:local')
// t('jobs:state')
// t('jobs:national')
// t('jobs:international')
// t('jobs:freelance')
// t('jobs:determinate')
// t('jobs:indeterminate')

const INITIAL_VALUES: TJobPosting = {
  contactStartDate: new Date(),
  contactEndDate: new Date(new Date().valueOf() + 1000 * 60 * 60 * 24 * 7),
  contactEmail: undefined,
  whatsapp: undefined,
  phoneNumbers: undefined,
  openings: [{} as TJobOpening],
  location: 'online',
  workRadius: '',
  specialRequirements: undefined,
  employment: '',
  description: '',
  jobStartDate: new Date(),
  jobEndDate: undefined,
  budgetLow: undefined,
  budgetHigh: undefined,
  benefits: undefined,
  notes: undefined,
};

export default function JobCreationForm(props: {
  onSubmit: Function;
  isPending: boolean;
  initialValues?: JobDetailDTO;
}) {
  const [isParsing, setIsParsing] = useState(false);
  const { t } = useTranslation(['jobs', 'errors']);

  const {
    handleSubmit,
    register,
    setError,
    formState,
    setValue,
    watch,
    setFocus,
  } = useForm<TJobPosting>({
    defaultValues: {
      ...INITIAL_VALUES,
      ...props.initialValues,
      phoneNumbers:
        props.initialValues?.phoneNumbers?.[0] || INITIAL_VALUES.phoneNumbers,
    },
    reValidateMode: 'onChange',
  });

  const openings = watch('openings');
  const location = watch('location');

  const onSubmit = useCallback(
    async (values) => {
      setIsParsing(true);
      const res = JobPosting.safeParse(values);
      if (res.success) {
        setIsParsing(false);
        return props.onSubmit(res.data);
      }

      for (const valError of res.error.issues) {
        setError(valError.path.join('.') as Path<TJobPosting>, {
          type: valError.code,
          message: valError.code,
        });
        setFocus(valError.path.join('.') as Path<TJobPosting>);
      }
      setIsParsing(false);
    },
    [props.onSubmit, setError, setIsParsing]
  ) as SubmitHandler<TJobPosting>;

  const values = watch();

  const EMPLOYMENT_RADIO_OPTIONS = useMemo(
    () =>
      EMPLOYMENT_OPTIONS.map((option) => ({
        value: option,
        label: t(option),
      })),
    [t]
  );
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col text-left gap-8 mx-auto max-w-lg w-full"
    >
      <p className="text-sm">*{t('información obligatoria')}</p>
      <div className="flex flex-col gap-4 w-full">
        <h2 className="text-primary">{t('Información básica')}</h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          <Input
            label={t('Inicio de convocatoria')}
            type="date"
            autoComplete=""
            register={register}
            fieldName="contactStartDate"
            required={true}
            error={formState.errors.contactStartDate}
          />

          <Input
            label={t('Fin de Convocatoria')}
            type="date"
            autoComplete={undefined}
            register={register}
            fieldName="contactEndDate"
            required={true}
            error={formState.errors.contactEndDate}
          />
        </div>
        <p className="mt-4">
          {t('Ingresa al menos uno de los siguientes campos')}:
        </p>
        <Input
          label={t('Correo para contacto')}
          type="email"
          register={register}
          fieldName="contactEmail"
          required={false}
          error={formState.errors.contactEmail}
        />
        <Input
          label={t('Whatsapp de contacto')}
          type="text"
          register={register}
          fieldName="whatsapp"
          autoComplete=""
          required={false}
          error={formState.errors.whatsapp}
        />
        <Input
          label={t('Teléfono de contacto')}
          type="text"
          register={register}
          fieldName="phoneNumbers"
          autoComplete=""
          required={false}
          error={formState.errors.phoneNumbers}
        />
      </div>
      <div className="flex flex-col gap-4 text-left">
        <h2 className="text-primary">{t('Características del servicio')}</h2>
        {openings?.length > 0 &&
          openings.map((o, i) => (
            <>
              <div className="flex flex-row justify-between">
                <h3>
                  {t('Vacante')} {i + 1}
                </h3>
                {openings.length > 1 && (
                  <div
                    className="cursor-pointer text-sm bg-red-500 px-2 py-1 rounded-md text-white w-fit ml-auto"
                    onClick={() =>
                      setValue(
                        'openings',
                        openings.filter((oo) => oo != o)
                      )
                    }
                  >
                    {t('Eliminar vacante')}
                  </div>
                )}
              </div>
              <JobOpeningForm
                key={o.activity}
                i={i}
                register={register}
                setValue={setValue}
                initialValues={o}
                errors={
                  formState.errors.openings?.[i] as FieldErrorsImpl<TJobOpening>
                }
              />
              <hr />
            </>
          ))}
        <div
          className="cursor-pointer bg-primary px-4 py-2 rounded-md text-white"
          onClick={() => setValue('openings', [...openings, {} as TJobOpening])}
        >
          {t('Agregar otra vacante')}
        </div>
      </div>
      <div className="flex flex-col gap-4 text-left">
        <h2 className="text-primary">{t('Características del proyecto')}</h2>
        <Input
          label={t('Ubicación')}
          type="radioGroup"
          register={register}
          fieldName="location"
          required={true}
          error={formState.errors.location}
          items={LOCATION_OPTIONS.map((location) => ({
            value: location,
            label: t(location),
          }))}
          setValue={setValue}
          value={values.location}
        />
        {location === 'online' && (
          <Input
            label={t('Radio de trabajo')}
            type="radioGroup"
            register={register}
            fieldName="workRadius"
            error={formState.errors.workRadius}
            items={WORK_RADIUS_OPTIONS.map((radius) => ({
              value: radius,
              label: t(radius),
            }))}
            setValue={setValue}
            value={values.workRadius || ''}
          />
        )}
        <Input
          label={t('Tipo de empleo')}
          type="radioGroup"
          register={register}
          fieldName="employment"
          required={true}
          error={formState.errors.employment}
          items={EMPLOYMENT_RADIO_OPTIONS}
          setValue={setValue}
          value={values.employment}
        />
        <Input
          label={t('Descripción de empleo / proyecto')}
          type="textArea"
          register={register}
          fieldName="description"
          required={true}
          error={formState.errors.description}
          rows={6}
          maxLength={60}
          inputClass="rounded-md bg-black bg-opacity-20 resize-none col-span-2 p-4 w-full"
          divClass="w-full"
        />
        <div className="grid grid-cols-2 gap-4">
          <p className="col-span-full opacity-80 font-normal">
            <Trans i18nKey="Fecha tentativa de inicio">
              <span className="font-bold opacity-100">
                Fecha tentativa de inicio
              </span>{' '}
              y fin
            </Trans>
          </p>
          <Input
            label={t('Fecha tentativa de inicio')}
            hiddenLabel={true}
            type="date"
            register={register}
            fieldName="jobStartDate"
            required={true}
            error={formState.errors.jobStartDate}
          />
          <Input
            label={t('Fecha tentativa de terminación')}
            type="date"
            hiddenLabel={true}
            register={register}
            fieldName="jobEndDate"
            required={false}
            error={formState.errors.jobEndDate}
          />
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
          <p className="col-span-full">{t('Rango de presupuesto')}</p>
          <Input
            label={t('Rango presupuesto bajo')}
            hiddenLabel={true}
            type="text"
            register={register}
            fieldName="budgetLow"
            required={false}
            error={formState.errors.budgetLow}
          />
          <Input
            label={t('Rango presupuesto alto')}
            hiddenLabel={true}
            type="text"
            register={register}
            fieldName="budgetHigh"
            required={false}
            error={formState.errors.budgetHigh}
          />
        </div>
        <Input
          label={t('Requerimientos especiales del servicio')}
          type="textArea"
          register={register}
          fieldName="specialRequirements"
          rows={3}
          maxLength={60}
          inputClass="rounded-md bg-black bg-opacity-20 resize-none col-span-2 p-4 w-full"
          divClass="w-full"
          required={false}
          error={formState.errors.specialRequirements}
        />
        <Input
          label={t('Prestaciones beneficios adicionales')}
          type="textArea"
          register={register}
          fieldName="benefits"
          rows={3}
          maxLength={60}
          inputClass="rounded-md bg-black bg-opacity-20 resize-none col-span-2 p-4 w-full"
          divClass="w-full"
          required={false}
          error={formState.errors.benefits}
        />
        <Input
          label={t('Notas adicionales')}
          type="textArea"
          register={register}
          fieldName="notes"
          rows={3}
          maxLength={60}
          inputClass="rounded-md bg-black bg-opacity-20 resize-none col-span-2 p-4 w-full"
          divClass="w-full"
          required={false}
          error={formState.errors.notes}
        />
      </div>
      {!formState.isValid && (
        <p className="text-center w-full ">
          {t('Llena todos los campos marcados con "*"')}
        </p>
      )}
      <div className="flex flex-row gap-4 justify-center">
        <button
          disabled={props.isPending}
          className="button font-bold bg-transparent border border-primary text-black"
          onClick={history.back}
        >
          {t('Regresar')}
        </button>
        <input
          type="submit"
          className="border-none"
          disabled={props.isPending || isParsing}
          value={t('Continuar')}
        />
      </div>
    </form>
  );
}
