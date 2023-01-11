import { brujulaUtils } from '@shared/utils/brujulaUtils';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { LanguageListForm } from '../components/languageListForm';
import { useAuth } from '@shared/context/firebaseContext';
import { useUserInfo } from '@shared/hooks/useUserInfo';
import { useEffect, useMemo } from 'react';

export const CaracteristicasPage = () => {
  const brujula = brujulaUtils();
  const { register, handleSubmit, setValue, getValues } = useForm();
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const { isLoggedIn, getUserEmail } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) navigate('/iniciar-sesion');
  }, []);

  const { user } = useUserInfo(getUserEmail());
  useMemo(() => {
    !!user &&
      Object.entries(user).forEach(([key, value]) => setValue(key, value));
  }, [user]);

  const onSubmit = async (data) => {
    await brujula.updateUserInfo(data);
    navigate('/usuarios');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="mb-8">
        <div className="absolute left-0 -z-10 bg-black bg-opacity-20 w-full h-16 overflow-hidden"></div>
        <h2>{t('Características personales')}</h2>
      </div>
      <div
        className="grid grid-cols-[min-content_1fr]
      text-left gap-4 mx-auto items-center gap-x-8 w-full"
      >
        <label htmlFor="caracteristicas" className="text-primary">
          {t('Semblanza')}:
        </label>
        <textarea
          rows="5"
          maxLength={300}
          {...register('characteristics')}
          placeholder={t(
            'Escribe aqui las características que te identifican dentro de la industria'
          )}
          className="rounded-md bg-black bg-opacity-20 resize-none col-span-2 p-4"
        />
        <label htmlFor="languages" className="text-primary">
          {t('Idioma')}:
        </label>
        <LanguageListForm
          setValue={setValue}
          name="languages"
          getValues={getValues}
          defaultState={user?.languages}
        />
        <label htmlFor="asociations">{t('Asociaciones')}:</label>
        <textarea
          rows="5"
          maxLength={300}
          {...register('asociations')}
          placeholder={t(
            'Escibe aquí a que asociaciones de la industria perteneces'
          )}
          className="rounded-md bg-black bg-opacity-20 resize-none col-span-2 p-4"
        />
        <label htmlFor="certifications">{t('Certificaciones')}:</label>
        <textarea
          rows="5"
          maxLength={300}
          {...register('certifications')}
          placeholder={t('Escribe aquí las certificaciónes que haz concluido')}
          className="rounded-md bg-black bg-opacity-20 resize-none col-span-2 p-4"
        />
        <label htmlFor="awards">{t('Reconocimientos')}:</label>
        <textarea
          rows="5"
          maxLength={300}
          {...register('awards')}
          placeholder={t('Escribe aquí los reconocimientos que has obtenido')}
          className="rounded-md bg-black bg-opacity-20 resize-none col-span-2 p-4"
        />
      </div>
      <div className="flex flex-row gap-4 self-center">
        <div className="button font-bold" onClick={() => navigate(-1)}>
          {t('Regresar')}
        </div>
        <input type="submit" className="border-none" value={t('Finalizar')} />
      </div>
    </form>
  );
};

export default CaracteristicasPage;
