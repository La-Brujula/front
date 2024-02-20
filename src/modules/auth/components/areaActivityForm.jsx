import areas from '@shared/constants/areas.json';
import { brujulaUtils } from '@shared/utils/brujulaUtils';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

export const AreaActivity = () => {
  const { area } = useParams();
  const brujula = brujulaUtils();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { t } = useTranslation('auth');

  const subareas = areas[area];

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        try {
          await brujula.updateUserInfo({ subarea: data.activity });
          navigate('../resumen');
        } catch (e) {
          console.error(e);
        }
      })}
    >
      <div className="button mb-4">{t('Área')}</div>
      <input
        type="hidden"
        value={area}
      />
      <select
        {...register('activity', { required: true })}
        className="w-full"
        required
      >
        {Object.keys(subareas)?.flatMap((subarea) =>
          Object.keys(subareas[subarea]).map((activity) => (
            <option
              key={activity}
              value={activity}
            >
              {t(subareas[subarea][activity]['Alias Genérico'].es)}
            </option>
          )),
        )}
      </select>
      <div className="flex flex-row gap-4 self-center mt-8 justify-center">
        <div
          className="button font-bold bg-transparent border border-primary text-black"
          onClick={() => navigate(-1)}
        >
          {t('Regresar')}
        </div>
        <input
          type="submit"
          className="border-none"
          value={t('Continuar')}
        />
      </div>
    </form>
  );
};
