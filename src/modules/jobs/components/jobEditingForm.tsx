import { memo, useCallback, useMemo, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { FieldErrorsImpl, Path, SubmitHandler, useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import Input from '@/shared/components/input';

import { JobDetailDTO } from '../queries/jobSearchQuery';
import {
  EMPLOYMENT_OPTIONS,
  LOCATION_OPTIONS,
  WORK_RADIUS_OPTIONS,
} from '../types/jobEnums';
import {
  JobPostingForm,
  TJobForm,
  TJobOpening,
  TJobPosting,
} from '../types/searchParams';
import JobOpeningForm from './jobOpeningEditingForm';

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

const INITIAL_VALUES = {
  job: {
    contactStartDate: new Date().toISOString().slice(0, 10),
    contactEndDate: new Date(new Date().valueOf() + 1000 * 60 * 60 * 24 * 7)
      .toISOString()
      .slice(0, 10),
    contactEmail: '',
    whatsapp: '',
    phoneNumbers: '',
    location: 'online' as const,
    workRadius: 'state',
    specialRequirements: '',
    employment: 'indeterminate',
    description: '',
    jobStartDate: new Date().toISOString().slice(0, 10),
    jobEndDate: '',
    budgetLow: 0,
    budgetHigh: 0,
    benefits: '',
    notes: '',
  },
  activity: '',
  count: 0,
  probono: false,
  gender: 'other',
  ageRangeMin: 0,
  ageRangeMax: 0,
  school: '',
  languages: [],
} as TJobForm;

function JobEditingForm(props: {
  onSubmit: Function;
  isPending: boolean;
  initialValues?: JobDetailDTO;
}) {
  const [isParsing, setIsParsing] = useState(false);
  const { t } = useTranslation(['jobs', 'errors']);

  const form = useForm({
    resolver: zodResolver(JobPostingForm),
    defaultValues: {
      ...INITIAL_VALUES,
      ...props.initialValues,
      job: {
        contactStartDate:
          props.initialValues?.contactStartDate?.toISOString()?.slice(0, 10) ||
          INITIAL_VALUES.job.contactStartDate,
        contactEndDate:
          props.initialValues?.contactEndDate?.toISOString()?.slice(0, 10) ||
          INITIAL_VALUES.job.contactEndDate,
        contactEmail:
          props.initialValues?.contactEmail || INITIAL_VALUES.job.contactEmail,
        whatsapp: props.initialValues?.whatsapp || INITIAL_VALUES.job.whatsapp,
        phoneNumbers:
          props.initialValues?.phoneNumbers?.[0] ||
          INITIAL_VALUES.job.phoneNumbers,
        location: props.initialValues?.location || INITIAL_VALUES.job.location,
        workRadius:
          props.initialValues?.workRadius || INITIAL_VALUES.job.workRadius,
        specialRequirements:
          props.initialValues?.specialRequirements ||
          INITIAL_VALUES.job.specialRequirements,
        employment:
          props.initialValues?.employment || INITIAL_VALUES.job.employment,
        description:
          props.initialValues?.description || INITIAL_VALUES.job.description,
        jobStartDate:
          props.initialValues?.jobStartDate?.toISOString()?.slice(0, 10) ||
          INITIAL_VALUES.job.jobStartDate,
        jobEndDate:
          props.initialValues?.jobEndDate?.toISOString()?.slice(0, 10) ||
          INITIAL_VALUES.job.jobEndDate,
        budgetLow:
          props.initialValues?.budgetLow || INITIAL_VALUES.job.budgetLow,
        budgetHigh:
          props.initialValues?.budgetHigh || INITIAL_VALUES.job.budgetHigh,
        benefits: props.initialValues?.benefits || INITIAL_VALUES.job.benefits,
        notes: props.initialValues?.notes || INITIAL_VALUES.job.notes,
      },
    },
  });

  const onSubmit = useCallback(
    async (values: TJobForm) => {
      setIsParsing(true);
      const res = JobPostingForm.safeParse(values);
      if (res.success) {
        setIsParsing(false);
        return props.onSubmit(res.data);
      }

      for (const valError of res.error.issues) {
        form.setError(valError.path.join('.') as Path<TJobForm>, {
          type: valError.code,
          message: valError.code,
        });
        form.setFocus(valError.path.join('.') as Path<TJobForm>);
      }
      setIsParsing(false);
    },
    [props.onSubmit, form.setError, form.setFocus, setIsParsing]
  ) as SubmitHandler<TJobForm>;

  const EMPLOYMENT_RADIO_OPTIONS = useMemo(
    () =>
      EMPLOYMENT_OPTIONS.map((option) => ({
        value: option,
        label: t(option),
      })),
    [t]
  );

  const jobLocation = form.watch('job.location');

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto flex w-full max-w-lg flex-col gap-8 text-left"
      >
        <p className="text-sm">*{t('información obligatoria')}</p>
        <div className="flex w-full flex-col gap-4">
          <h2 className="text-primary">{t('Información básica')}</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <Input
              label={t('Inicio de convocatoria')}
              type="date"
              autoComplete=""
              form={form}
              fieldName="job.contactStartDate"
              required={true}
            />

            <Input
              label={t('Fin de Convocatoria')}
              type="date"
              autoComplete={undefined}
              form={form}
              fieldName="job.contactEndDate"
              required={true}
            />
          </div>
          <p className="mt-4">
            {t('Ingresa al menos uno de los siguientes campos')}:
          </p>
          <Input
            label={t('Correo para contacto')}
            type="email"
            form={form}
            fieldName="job.contactEmail"
            required={false}
          />
          <Input
            label={t('Whatsapp de contacto')}
            type="text"
            form={form}
            fieldName="job.whatsapp"
            autoComplete=""
            required={false}
          />
          <Input
            label={t('Teléfono de contacto')}
            type="text"
            form={form}
            fieldName="job.phoneNumbers"
            autoComplete=""
            required={false}
          />
        </div>
        <div className="flex flex-col gap-4 text-left">
          <h2 className="text-primary">{t('Características del servicio')}</h2>
          <JobOpeningForm
            key={props.initialValues?.id ?? Math.random()}
            // @ts-expect-error
            form={form}
          />
        </div>
        <div className="flex flex-col gap-4 text-left">
          <h2 className="text-primary">{t('Características del proyecto')}</h2>
          <Input
            label={t('Ubicación')}
            type="radioGroup"
            form={form}
            fieldName="job.location"
            required={true}
            items={LOCATION_OPTIONS.map((location) => ({
              value: location,
              label: t(location),
            }))}
          />
          {jobLocation === 'online' && (
            <Input
              label={t('Radio de trabajo')}
              type="radioGroup"
              form={form}
              fieldName="job.workRadius"
              items={WORK_RADIUS_OPTIONS.map((radius) => ({
                value: radius,
                label: t(radius),
              }))}
            />
          )}
          <Input
            label={t('Tipo de empleo')}
            type="radioGroup"
            form={form}
            fieldName="job.employment"
            required={true}
            items={EMPLOYMENT_RADIO_OPTIONS}
          />
          <Input
            label={t('Descripción de empleo / proyecto')}
            type="textArea"
            form={form}
            fieldName="job.description"
            required={true}
            maxLength={60}
            inputClass="rounded-md bg-black bg-opacity-20 resize-none col-span-2 p-4 w-full"
            divClass="w-full"
          />
          <div className="grid grid-cols-2 gap-4">
            <p className="col-span-full font-normal opacity-80">
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
              form={form}
              fieldName="job.jobStartDate"
              required={true}
            />
            <Input
              label={t('Fecha tentativa de terminación')}
              type="date"
              hiddenLabel={true}
              form={form}
              fieldName="job.jobEndDate"
              required={false}
            />
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            <p className="col-span-full">{t('Rango de presupuesto')}</p>
            <Input
              label={t('Rango presupuesto bajo')}
              hiddenLabel={true}
              type="text"
              form={form}
              fieldName="job.budgetLow"
              required={false}
            />
            <Input
              label={t('Rango presupuesto alto')}
              hiddenLabel={true}
              type="text"
              form={form}
              fieldName="job.budgetHigh"
              required={false}
            />
          </div>
          <Input
            label={t('Requerimientos especiales del servicio')}
            type="textArea"
            form={form}
            fieldName="job.specialRequirements"
            maxLength={60}
            inputClass="rounded-md bg-black bg-opacity-20 resize-none col-span-2 p-4 w-full"
            divClass="w-full"
            required={false}
          />
          <Input
            label={t('Prestaciones beneficios adicionales')}
            type="textArea"
            form={form}
            fieldName="job.benefits"
            maxLength={60}
            inputClass="rounded-md bg-black bg-opacity-20 resize-none col-span-2 p-4 w-full"
            divClass="w-full"
            required={false}
          />
          <Input
            label={t('Notas adicionales')}
            type="textArea"
            form={form}
            fieldName="job.notes"
            maxLength={60}
            inputClass="rounded-md bg-black bg-opacity-20 resize-none col-span-2 p-4 w-full"
            divClass="w-full"
            required={false}
          />
        </div>
        {!form.formState.isValid && (
          <p className="w-full text-center">
            {t('Llena todos los campos marcados con "*"')}
          </p>
        )}
        <div className="flex flex-row justify-center gap-4">
          <Button
            disabled={props.isPending}
            className="button border border-primary bg-transparent font-bold text-black"
            onClick={history.back}
          >
            {t('Regresar')}
          </Button>
          <Button
            type="submit"
            className="border-none"
            disabled={props.isPending || isParsing}
          >
            {t('Continuar')}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default memo(JobEditingForm);
