import { ButtonSelect } from '@shared/components/buttonSelect';
import { LoadingSpinner } from '@shared/components/loadingSpinner';
import { useAuth } from '@shared/context/firebaseContext';
import { useUserInfo } from '@shared/hooks/useUserInfo';
import { brujulaUtils } from '@shared/utils/brujulaUtils';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const StandoutPage = () => {
  const brujula = brujulaUtils();
  const { register, handleSubmit, setValue, watch, getValues } = useForm();
  const profilePicture = watch('profilePicture');
  const coverPicture = watch('coverPicture');
  const profilePictureUrl = watch('profilePictureUrl');
  const coverPictureUrl = watch('coverPictureUrl');
  const { t } = useTranslation('auth');
  const navigate = useNavigate();

  const { isLoggedIn, getUserEmail } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) navigate('/iniciar-sesion');
  }, []);

  const { user, loading } = useUserInfo(getUserEmail());
  useMemo(() => {
    !!user &&
      Object.entries(user).forEach(([key, value]) => setValue(key, value));
  }, [user]);

  // Profile Picture Preview Functionality
  useMemo(() => {
    (async () => {
      if (!profilePicture || !profilePicture[0] || profilePicture[0].size == 0)
        return;
      await brujula.saveUserPicture(profilePicture[0], '/profilePicture');
      const url = await brujula.getUserPictureUrl('/profilePicture');
      setValue('profilePictureUrl', url);
    })();
  }, [profilePicture]);

  // Cover Picture Preview Functionality
  useMemo(() => {
    (async () => {
      if (!coverPicture || !coverPicture[0] || coverPicture[0].size == 0)
        return;
      await brujula.saveUserPicture(coverPicture[0], '/coverPicture');
      const url = await brujula.getUserPictureUrl('/coverPicture');
      setValue('coverPictureUrl', url);
    })();
  }, [coverPicture]);

  const onSubmit = async (data) => {
    delete data.profilePicture;
    delete data.coverPicture;
    await brujula.updateUserInfo(data);
    navigate('../contacto');
  };

  return loading ? (
    <LoadingSpinner />
  ) : (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <p>*{t('Information')}</p>
      <div
        className="flex flex-col max-w-lg
      text-right gap-4 mx-auto items-center gap-x-8"
      >
        <div className="grid grid-cols-2 w-full col-span-2 gap-8">
          <div className="flex flex-col gap-4 text-left">
            <label htmlFor="profilePicture">
              {t('Cambia tu foto de usuario')}
            </label>
            <input
              type="file"
              {...register('profilePicture')}
            />
            <img
              src={profilePictureUrl}
              className="w-32 rounded-full"
            />
          </div>
          <div className="flex flex-col gap-4 text-left">
            <label htmlFor="coverPicture">
              {t('Cambia tu foto de portada')}
            </label>
            <input
              type="file"
              {...register('coverPicture')}
            />
            <img
              src={coverPictureUrl}
              className="w-32"
            />
          </div>
        </div>
        <label htmlFor="headline">{t('Agrega un lema o mensaje corto')}</label>
        <textarea
          rows="3"
          maxLength={60}
          {...register('headline')}
          className="rounded-md bg-black bg-opacity-20 resize-none col-span-2 p-4 w-full"
        />
      </div>
      <div className="mb-8">
        <div className="absolute left-0 -z-10 bg-black bg-opacity-20 w-full h-16 overflow-hidden"></div>
        <h2>{t('Ubicación')}</h2>
      </div>
      <div className="grid grid-cols-[min-content_minmax(12rem,_24rem)] text-right gap-4 mx-auto">
        <label htmlFor="address">{t('Dirección')}</label>
        <input
          type="text"
          {...register('address')}
          autoComplete="address"
        />
        <label htmlFor="postalCode">{t('CP')}</label>
        <input
          type="text"
          {...register('postalCode')}
          autoComplete="postal-code"
        />
        <label htmlFor="city">{t('Ciudad')}</label>
        <input
          type="text"
          {...register('city')}
          autoComplete="address-level2"
        />
        <label htmlFor="state">{t('Estado')}</label>
        <input
          type="text"
          {...register('state')}
          autoComplete="address-level1"
        />
        <label htmlFor="country">{t('País')}</label>
        <input
          type="text"
          {...register('country')}
          autoComplete="country-name"
        />
        <label htmlFor="googleMapsLink">{t('🌐')}</label>
        <input
          type="text"
          {...register('googleMapsLink')}
          placeholder="Link de google maps"
        />
        <hr className="col-span-2 my-2" />
        <div className="col-span-2 flex flex-col gap-4 text-center items-center">
          <h3 className="text-primary text-base">
            {t('Disponibilidad para viajar')}
          </h3>
          <label htmlFor="workRadius">
            {t('¿Cuál es tu radio de trabajo?')}
          </label>
          <select
            {...register('workRadius')}
            className="w-full"
          >
            <option value="">{t('Por favor selecciona una opción')}</option>
            <option value="local">{t('Local')}</option>
            <option value="state">{t('Estatal')}</option>
            <option value="national">{t('Nacional')}</option>
            <option value="internacional">{t('Internacional')}</option>
          </select>
          <h3 className="text-primary text-base">
            {t('Servicios a distancia')}
          </h3>
          <label htmlFor="remoteWork">{t('¿Trabajas online?')}</label>
          <input
            type="hidden"
            {...register('remoteWork')}
          />
          <ButtonSelect
            fieldName="remoteWork"
            values={[true, false]}
            labels={[t('SÍ'), t('NO')]}
            setValue={setValue}
            getValue={getValues}
          />
        </div>
      </div>
      <div className="flex flex-row gap-4 self-center">
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

export default StandoutPage;
