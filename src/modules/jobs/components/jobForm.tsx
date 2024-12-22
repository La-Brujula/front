import { SubmitHandler, useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { JobPosting, TJobOpening, TJobPosting } from '../types/searchParams';
import { useCallback, useMemo } from 'react';
import { ZodError } from 'zod';
import Input from '@/shared/components/input';
import JobOpeningForm from './jobOpeningForm';
import {
  EMPLOYMENT_OPTIONS,
  LOCATION_OPTIONS,
  WORK_RADIUS_OPTIONS,
} from '../types/jobEnums';

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
  onCreate: Function;
  isPending: boolean;
}) {
  const { t } = useTranslation(['jobs', 'errors']);

  const { handleSubmit, register, setError, formState, setValue, watch } =
    useForm<TJobPosting>({
      defaultValues: INITIAL_VALUES,
    });

  const openings = watch('openings');
  const location = watch('location');

  const onSubmit = useCallback(
    async (values) => {
      try {
        const validatedForm = await JobPosting.parseAsync(values);
        props.onCreate(validatedForm);
      } catch (e) {
        const error = e as unknown as ZodError<TJobPosting>;
        console.error(error);

        for (const [field, errors] of Object.entries(
          error.formErrors.fieldErrors
        )) {
          if (errors === undefined) continue;
          setError(field as keyof typeof error.formErrors.fieldErrors, {
            types: Object.fromEntries(
              errors.map((err) => [err, t(err, { ns: 'errors' })])
            ),
          });
        }
      }
    },
    [props.onCreate, setError]
  ) as SubmitHandler<TJobPosting>;

  const updateOpening = useCallback(
    (i: number) => (values: TJobOpening) => {
      setValue(`openings.${i}`, values);
    },
    [setValue]
  );

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
          error={formState.errors.phoneNumbers?.[0]}
        />
      </div>
      <div className="flex flex-col gap-4 text-left">
        <h2 className="text-primary">{t('Características del servicio')}</h2>
        {openings?.length > 0 &&
          openings.map((o, i) => (
            <>
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
                  {t('Quitar posición')}
                </div>
              )}
              <JobOpeningForm
                key={o.activity}
                i={i}
                onChange={updateOpening(i)}
                initialValues={o}
                errors={formState.errors.openings?.[i]}
              />
              <hr />
            </>
          ))}
        <div
          className="cursor-pointer bg-primary px-4 py-2 rounded-md text-white"
          onClick={() => setValue('openings', [...openings, {} as TJobOpening])}
        >
          {t('Agregar solicitud')}
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
        <div
          className="button font-bold bg-transparent border border-primary text-black"
          onClick={history.back}
        >
          {t('Regresar')}
        </div>
        <input
          type="submit"
          className="border-none"
          disabled={props.isPending}
          value={t('Continuar')}
        />
      </div>
    </form>
  );
}
