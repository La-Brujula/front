import { FieldErrorsImpl, Path, SubmitHandler, useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import {
  JobPostingForm,
  TJobForm,
  TJobOpening,
  TJobPosting,
} from '../types/searchParams';
import { memo, useCallback, useMemo, useState } from 'react';
import Input from '@/shared/components/input';
import JobOpeningForm from './jobOpeningEditingForm';
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

function JobEditingForm(props: {
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
  } = useForm<TJobForm>({
    defaultValues: {
      ...INITIAL_VALUES,
      ...props.initialValues,
      job: {
        contactStartDate: (
          props.initialValues?.contactStartDate ||
          INITIAL_VALUES.contactStartDate
        )
          ?.toISOString()
          ?.slice(0, 10),
        contactEndDate: (
          props.initialValues?.contactEndDate || INITIAL_VALUES.contactEndDate
        )
          ?.toISOString()
          ?.slice(0, 10),
        contactEmail:
          props.initialValues?.contactEmail || INITIAL_VALUES.contactEmail,
        whatsapp: props.initialValues?.whatsapp || INITIAL_VALUES.whatsapp,
        phoneNumbers:
          props.initialValues?.phoneNumbers?.[0] || INITIAL_VALUES.phoneNumbers,
        location: props.initialValues?.location || INITIAL_VALUES.location,
        workRadius:
          props.initialValues?.workRadius || INITIAL_VALUES.workRadius,
        specialRequirements:
          props.initialValues?.specialRequirements ||
          INITIAL_VALUES.specialRequirements,
        employment:
          props.initialValues?.employment || INITIAL_VALUES.employment,
        description:
          props.initialValues?.description || INITIAL_VALUES.description,
        jobStartDate: (
          props.initialValues?.jobStartDate || INITIAL_VALUES.jobStartDate
        )
          ?.toISOString()
          ?.slice(0, 10),
        jobEndDate: (
          props.initialValues?.jobEndDate || INITIAL_VALUES.jobEndDate
        )
          ?.toISOString()
          ?.slice(0, 10),
        budgetLow: props.initialValues?.budgetLow || INITIAL_VALUES.budgetLow,
        budgetHigh:
          props.initialValues?.budgetHigh || INITIAL_VALUES.budgetHigh,
        benefits: props.initialValues?.benefits || INITIAL_VALUES.benefits,
        notes: props.initialValues?.notes || INITIAL_VALUES.notes,
      },
    },
  });

  const onSubmit = useCallback(
    async (values) => {
      setIsParsing(true);
      const res = JobPostingForm.safeParse(values);
      if (res.success) {
        setIsParsing(false);
        return props.onSubmit(res.data);
      }

      for (const valError of res.error.issues) {
        setError(valError.path.join('.') as Path<TJobForm>, {
          type: valError.code,
          message: valError.code,
        });
        setFocus(valError.path.join('.') as Path<TJobForm>);
      }
      setIsParsing(false);
    },
    [props.onSubmit, setError, setIsParsing]
  ) as SubmitHandler<TJobForm>;

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
            fieldName="job.contactStartDate"
            required={true}
            error={formState.errors.job?.contactStartDate}
          />

          <Input
            label={t('Fin de Convocatoria')}
            type="date"
            autoComplete={undefined}
            register={register}
            fieldName="job.contactEndDate"
            required={true}
            error={formState.errors.job?.contactEndDate}
          />
        </div>
        <p className="mt-4">
          {t('Ingresa al menos uno de los siguientes campos')}:
        </p>
        <Input
          label={t('Correo para contacto')}
          type="email"
          register={register}
          fieldName="job.contactEmail"
          required={false}
          error={formState.errors.job?.contactEmail}
        />
        <Input
          label={t('Whatsapp de contacto')}
          type="text"
          register={register}
          fieldName="job.whatsapp"
          autoComplete=""
          required={false}
          error={formState.errors.job?.whatsapp}
        />
        <Input
          label={t('Teléfono de contacto')}
          type="text"
          register={register}
          fieldName="job.phoneNumbers"
          autoComplete=""
          required={false}
          error={formState.errors.job?.phoneNumbers}
        />
      </div>
      <div className="flex flex-col gap-4 text-left">
        <h2 className="text-primary">{t('Características del servicio')}</h2>
        <JobOpeningForm
          key={props.initialValues?.id || Math.random()}
          register={register}
          setValue={setValue}
          initialValues={values}
          errors={formState.errors as FieldErrorsImpl<TJobForm>}
        />
      </div>
      <div className="flex flex-col gap-4 text-left">
        <h2 className="text-primary">{t('Características del proyecto')}</h2>
        <Input
          label={t('Ubicación')}
          type="radioGroup"
          register={register}
          fieldName="job.location"
          required={true}
          error={formState.errors.job?.location}
          items={LOCATION_OPTIONS.map((location) => ({
            value: location,
            label: t(location),
          }))}
          setValue={setValue}
        />
        {values.job?.location === 'online' && (
          <Input
            label={t('Radio de trabajo')}
            type="radioGroup"
            register={register}
            fieldName="job.workRadius"
            error={formState.errors.job?.workRadius}
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
          fieldName="job.employment"
          required={true}
          error={formState.errors.job?.employment}
          items={EMPLOYMENT_RADIO_OPTIONS}
          setValue={setValue}
        />
        <Input
          label={t('Descripción de empleo / proyecto')}
          type="textArea"
          register={register}
          fieldName="job.description"
          required={true}
          error={formState.errors.job?.description}
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
            fieldName="job.jobStartDate"
            required={true}
            error={formState.errors.job?.jobStartDate}
          />
          <Input
            label={t('Fecha tentativa de terminación')}
            type="date"
            hiddenLabel={true}
            register={register}
            fieldName="job.jobEndDate"
            required={false}
            error={formState.errors.job?.jobEndDate}
          />
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
          <p className="col-span-full">{t('Rango de presupuesto')}</p>
          <Input
            label={t('Rango presupuesto bajo')}
            hiddenLabel={true}
            type="text"
            register={register}
            fieldName="job.budgetLow"
            required={false}
            error={formState.errors.job?.budgetLow}
          />
          <Input
            label={t('Rango presupuesto alto')}
            hiddenLabel={true}
            type="text"
            register={register}
            fieldName="job.budgetHigh"
            required={false}
            error={formState.errors.job?.budgetHigh}
          />
        </div>
        <Input
          label={t('Requerimientos especiales del servicio')}
          type="textArea"
          register={register}
          fieldName="job.specialRequirements"
          rows={3}
          maxLength={60}
          inputClass="rounded-md bg-black bg-opacity-20 resize-none col-span-2 p-4 w-full"
          divClass="w-full"
          required={false}
          error={formState.errors.job?.specialRequirements}
        />
        <Input
          label={t('Prestaciones beneficios adicionales')}
          type="textArea"
          register={register}
          fieldName="job.benefits"
          rows={3}
          maxLength={60}
          inputClass="rounded-md bg-black bg-opacity-20 resize-none col-span-2 p-4 w-full"
          divClass="w-full"
          required={false}
          error={formState.errors.job?.benefits}
        />
        <Input
          label={t('Notas adicionales')}
          type="textArea"
          register={register}
          fieldName="job.notes"
          rows={3}
          maxLength={60}
          inputClass="rounded-md bg-black bg-opacity-20 resize-none col-span-2 p-4 w-full"
          divClass="w-full"
          required={false}
          error={formState.errors.job?.notes}
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

export default memo(JobEditingForm);
