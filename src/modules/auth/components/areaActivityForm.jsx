import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { brujulaUtils } from '@shared/utils/brujulaUtils';
import areas from '@shared/constants/areas.json';

export const AreaActivity = () => {
  const { area } = useParams();
  const brujula = brujulaUtils();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { t } = useTranslation('auth');

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        try {
          await brujula.updateUserInfo({ subarea: area + '-' + data.activity });
          navigate('../resumen');
        } catch {
          console.log;
        }
      })}
    >
      <div className="button mb-4">{t(areas[area].label)}</div>
      <input type="hidden" value={area} />
      <select
        {...register('activity', { required: true })}
        className="w-full"
        required
      >
        {areas[area].subareas &&
          areas[area].subareas.map((subarea) => (
            <option key={subarea.id} value={subarea.id}>
              {t(subarea.label)}
            </option>
          ))}
        <option key={1} value="01">
          TEST sub area 01
        </option>
      </select>
      <div className="flex flex-row gap-4 self-center mt-8 justify-center">
        <div className="button font-bold" onClick={() => navigate(-1)}>
          {t('Regresar')}
        </div>
        <input type="submit" className="border-none" value={t('Continuar')} />
      </div>
    </form>
  );
};
