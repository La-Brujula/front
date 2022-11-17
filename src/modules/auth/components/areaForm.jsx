import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';
import { ButtonSelect } from '@shared/components/buttonSelect';
import { brujulaUtils } from '@shared/utils/brujulaUtils';
import areas from '@shared/constants/areas.json';

export const AreaForms = () => {
  const brujula = brujulaUtils();
  const { register, handleSubmit, getValues, setValue } = useForm();
  const { t } = useTranslation('auth');

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await brujula.updateUserInfo({ category: data.area });

    navigate(data.area);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <p>*{t('areaForInPersonActivity')}</p>
      <input type="hidden" {...register('area')} />
      <ButtonSelect
        fieldName={'area'}
        labels={Object.values(areas).map((opt) => t(opt.label))}
        values={Object.keys(areas)}
        getValue={getValues}
        setValue={setValue}
      />

      <div className="flex flex-row gap-4 self-center">
        <div className="button font-bold" onClick={() => navigate(-1)}>
          {t('back')}
        </div>
        <input type="submit" className="border-none" value={t('next')} />
      </div>
    </form>
  );
};

export default AreaForms;
