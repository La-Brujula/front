import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

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
      <div className="button mb-4">{t(area)}</div>
      <input type="hidden" value={area} />
      <select {...register('activity')} className="w-full"></select>
      <div className="flex flex-row gap-4 self-center mt-8 justify-center">
        <NavLink to="../">
          <div className="button font-bold">{t('back')}</div>
        </NavLink>
        <input type="submit" className="border-none" value={t('next')} />
      </div>
    </form>
  );
};
