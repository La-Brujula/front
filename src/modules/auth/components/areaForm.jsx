import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';
import { ButtonSelect } from '@shared/components/buttonSelect';
import { brujulaUtils } from '../../../shared/utils/brujulaUtils';

export const AreaForms = () => {
  const brujula = brujulaUtils()
  const { register, handleSubmit, getValues, setValue } = useForm();
  const { t } = useTranslation('auth');

  const navigate = useNavigate();

  const options = [
    'preproduction',
    'talent',
    'humanResources',
    'supportServices',
    'digitalDevelopment',
    'industry',
  ];

  const onSubmit = async (data) => {
    await brujula.updateUserInfo({"area": data.area})

    navigate(`./${data.area}`);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
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
