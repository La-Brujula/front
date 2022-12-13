import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ButtonSelect } from '@shared/components/buttonSelect';
import { brujulaUtils } from '@shared/utils/brujulaUtils';
import areas from '@shared/constants/areas.json';

export const AreaForms = () => {
  const brujula = brujulaUtils();
  const { register, handleSubmit, getValues, setValue } = useForm();
  const { t } = useTranslation('auth');

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await brujula.updateUserInfo({ area: data.area });
    navigate(Object.keys(areas)[data.area - 1]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <p>*{t('¿En que área se encuentra tu actividad presencial?')}</p>
      <input type="hidden" {...register('area')} />
      <ButtonSelect
        fieldName={'area'}
        labels={Object.keys(areas)}
        values={Object.values(areas).map((v) =>
          Object.keys(v[Object.keys(v)[0]])[0].charAt(0)
        )}
        getValue={getValues}
        setValue={setValue}
        classname="md:flex-col items-center justify-stretch"
        itemClassname="w-full"
      />

      <div className="flex flex-row gap-4 self-center">
        <div className="button font-bold" onClick={() => navigate(-1)}>
          {t('Regresar')}
        </div>
        <input type="submit" className="border-none" value={t('Continuar')} />
      </div>
    </form>
  );
};

export default AreaForms;
