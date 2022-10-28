import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { ButtonSelect } from '@shared/components/buttonSelect';

export const AreaForms = () => {
  const { register, handleSubmit, getValues, setValue } = useForm();
  const { t } = useTranslation('auth');

  const options = [
    'preproduction',
    'talent',
    'humanResources',
    'supportServices',
    'digitalDevelopment',
    'industry',
  ];
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <p>*{t('areaForInPersonActivity')}</p>
      <input type="hidden" {...register('area')} />
      <ButtonSelect
        fieldName={'area'}
        labels={[
          'preproduction',
          'talent',
          'humanResources',
          'supportServices',
          'digitalDevelopment',
          'industry',
        ].map((opt) => t(opt))}
        values={options}
        getValue={getValues}
        setValue={setValue}
      />

      <div className="flex flex-row gap-4 self-center">
        <NavLink to="../">
          <div className="button font-bold">{t('back')}</div>
        </NavLink>
        <input type="submit" className="border-none" value={t('next')} />
      </div>
    </form>
  );
};
