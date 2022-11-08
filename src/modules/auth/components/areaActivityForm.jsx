import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

export const AreaActivity = () => {
  const { area } = useParams();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { t } = useTranslation('auth');

  return (
    <form
      onSubmit={handleSubmit(() => {
        try {
          navigate('../../');
        } catch {}
      })}
    >
      <div className="button mb-4">{t(area)}</div>
      <input type="hidden" value={area} />
      <select {...register('activity')} className="w-full"></select>
    </form>
  );
};
