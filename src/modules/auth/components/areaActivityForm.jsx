import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import areas from '@shared/constants/areas.json';

export const AreaActivity = () => {
  const { area } = useParams();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { t } = useTranslation('auth');

  return (
    <form
      onSubmit={handleSubmit(() => {
        try {
          navigate('../privacy');
        } catch {}
      })}
    >
      <div className="button mb-4">{t(areas[area].label)}</div>
      <input type="hidden" value={area} />
      <select
        {...register('activity', { required: true })}
        className="w-full"
        required
      >
        <option value="">{t('selectOne')}</option>
        {areas[area].subareas &&
          areas[area].subareas.map((subarea) => (
            <option key={subarea.id} value={subarea.id}>
              {t(subarea.label)}
            </option>
          ))}
      </select>
      <div className="flex flex-row gap-4 self-center mt-8 justify-center">
        <div className="button font-bold" onClick={() => navigate(-1)}>
          {t('back')}
        </div>
        <input type="submit" className="border-none" value={t('next')} />
      </div>
    </form>
  );
};
