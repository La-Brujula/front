import { useCallback, useMemo, useState } from 'react';

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
import { JobPosting, TJobOpening, TJobPosting } from '../types/searchParams';
import JobOpeningForm from './jobOpeningForm';

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
  workRadius: 'state',
  specialRequirements: undefined,
  employment: 'indeterminate',
  description: '',
  jobStartDate: new Date(),
  jobEndDate: undefined,
  budgetLow: undefined,
  budgetHigh: undefined,
  benefits: undefined,
  notes: undefined,
};

const today = new Date().toLocaleDateString('fr-ca');

export default function JobCreationForm(props: {
  onSubmit: Function;
  isPending: boolean;
  initialValues?: JobDetailDTO;
}) {
  const [isParsing, setIsParsing] = useState(false);
  const { t } = useTranslation(['jobs', 'errors']);

  const form = useForm<TJobPosting>({
    defaultValues: {
      ...INITIAL_VALUES,
      ...props.initialValues,
      phoneNumbers:
        props.initialValues?.phoneNumbers?.[0] || INITIAL_VALUES.phoneNumbers,
    },
    reValidateMode: 'onChange',
  });

  const values = form.watch();
  const openings = values.openings;
  const location = values.location;

  const onSubmit = useCallback(
    async (values) => {
      setIsParsing(true);
      const res = JobPosting.safeParse(values);
      if (res.success) {
        setIsParsing(false);
        return props.onSubmit(res.data);
      }

      for (const valError of res.error.issues) {
        form.setError(valError.path.join('.') as Path<TJobPosting>, {
          type: valError.code,
          message: valError.code,
        });
        form.setFocus(valError.path.join('.') as Path<TJobPosting>);
      }
      setIsParsing(false);
    },
    [props.onSubmit, form.setError, form.setFocus, setIsParsing]
  ) as SubmitHandler<TJobPosting>;

  const EMPLOYMENT_RADIO_OPTIONS = useMemo(
    () =>
      EMPLOYMENT_OPTIONS.map((option) => ({
        value: option,
        label: t(option),
      })),
    [t]
  );

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
              fieldName="contactStartDate"
              required={true}
            />

            <Input
              label={t('Fin de Convocatoria')}
              type="date"
              autoComplete={undefined}
              form={form}
              fieldName="contactEndDate"
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
            fieldName="contactEmail"
            required={false}
          />
          <Input
            label={t('Whatsapp de contacto')}
            type="tel"
            form={form}
            fieldName="whatsapp"
            required={false}
          />
          <Input
            label={t('Teléfono de contacto')}
            type="tel"
            form={form}
            fieldName="phoneNumbers"
            required={false}
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
                      className="ml-auto w-fit cursor-pointer rounded-md bg-red-500 px-2 py-1 text-sm text-white"
                      onClick={() =>
                        form.setValue(
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
                  form={form}
                />
                <hr />
              </>
            ))}
          <div
            className="cursor-pointer rounded-md bg-primary px-4 py-2 text-white"
            onClick={() =>
              form.setValue('openings', [...openings, {} as TJobOpening])
            }
          >
            {t('Agregar otra vacante')}
          </div>
        </div>
        <div className="flex flex-col gap-4 text-left">
          <h2 className="text-primary">{t('Características del proyecto')}</h2>
          <Input
            label={t('Ubicación')}
            type="radioGroup"
            form={form}
            fieldName="location"
            required={true}
            items={LOCATION_OPTIONS.map((location) => ({
              value: location,
              label: t(location),
            }))}
          />
          {location === 'online' && (
            <Input
              label={t('Radio de trabajo')}
              type="radioGroup"
              form={form}
              fieldName="workRadius"
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
            fieldName="employment"
            required={true}
            items={EMPLOYMENT_RADIO_OPTIONS}
          />
          <Input
            label={t('Descripción de empleo / proyecto')}
            type="textArea"
            form={form}
            fieldName="description"
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
              fieldName="jobStartDate"
              required={true}
            />
            <Input
              label={t('Fecha tentativa de terminación')}
              type="date"
              hiddenLabel={true}
              form={form}
              fieldName="jobEndDate"
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
              fieldName="budgetLow"
              required={false}
            />
            <Input
              label={t('Rango presupuesto alto')}
              hiddenLabel={true}
              type="text"
              form={form}
              fieldName="budgetHigh"
              required={false}
            />
          </div>
          <Input
            label={t('Requerimientos especiales del servicio')}
            type="textArea"
            form={form}
            fieldName="specialRequirements"
            maxLength={60}
            inputClass="rounded-md bg-black bg-opacity-20 resize-none col-span-2 p-4 w-full"
            divClass="w-full"
            required={false}
          />
          <Input
            label={t('Prestaciones beneficios adicionales')}
            type="textArea"
            form={form}
            fieldName="benefits"
            maxLength={60}
            inputClass="rounded-md bg-black bg-opacity-20 resize-none col-span-2 p-4 w-full"
            divClass="w-full"
            required={false}
          />
          <Input
            label={t('Notas adicionales')}
            type="textArea"
            form={form}
            fieldName="notes"
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
