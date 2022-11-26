import { brujulaUtils } from '@shared/utils/brujulaUtils';
import { useAuth } from '@shared/context/firebaseContext';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ButtonSelect } from '@shared/components/buttonSelect';
import { getValue } from '@mui/system';
import { useEffect, useMemo } from 'react';
import { useUserInfo } from '@shared/hooks/useUserInfo';

export const StandoutPage = () => {
  const brujula = brujulaUtils();
  const { register, handleSubmit, setValue, watch } = useForm();
  const profilePicture = watch('profilePicture');
  const coverPicture = watch('coverPicture');
  const profilePictureUrl = watch('profilePictureUrl');
  const coverPictureUrl = watch('coverPictureUrl');
  const { t } = useTranslation('auth');
  const navigate = useNavigate();

  const { isLoggedIn, getUserEmail } = useAuth();

  useEffect(() => {
    if (!isLoggedIn()) navigate('/iniciar-sesion');
  }, []);

  const { user } = useUserInfo(getUserEmail());
  useMemo(() => {
    Object.entries(user).forEach(([key, value]) => setValue(key, value));
  }, [user]);

  // Profile Picture Preview Functionality
  useMemo(() => {
    (async () => {
      if (!profilePicture || !profilePicture[0]) return;
      await brujula.saveUserPicture(profilePicture[0], '/profilePicture');
      const profilePictureUrl = await brujula.getUserPictureUrl('/profilePicture');
      setValue('profilePictureUrl', profilePictureUrl);
    })();
  }, [profilePicture]);

  // Cover Picture Preview Functionality
  useMemo(() => {
    (async () => {
      if (!coverPicture || !coverPicture[0]) return;
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <p>*{t('requiredInformation')}</p>
      <div
        className="grid grid-cols-[min-content_minmax(12rem,_24rem)_max-content]
      text-right gap-4 mx-auto items-center gap-x-8"
      >
        <label htmlFor="profilePicture">{t('Cambia tu foto de usuario')}</label>
        <input type="file" {...register('profilePicture')} />
        <img src={profilePictureUrl} className="w-32 rounded-full" />
        <label htmlFor="coverPicture">{t('Cambia tu foto de portada')}</label>
        <input type="file" {...register('coverPicture')} />
        <img src={coverPictureUrl} className="w-32" />
        <label htmlFor="headline">{t('Agrega un lema o mensaje corto')}</label>
        <textarea
          rows="3"
          maxLength={280}
          {...register('headline')}
          required
          className="rounded-md bg-black bg-opacity-20 resize-none col-span-2 p-4"
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
          required
        />
        <label htmlFor="postalCode">{t('CP')}</label>
        <input
          type="text"
          {...register('postalCode')}
          autoComplete="postal-code"
          required
        />
        <label htmlFor="city">{t('Ciudad')}</label>
        <input
          type="text"
          {...register('city')}
          autoComplete="address-level2"
          required
        />
        <label htmlFor="state">{t('Estado')}</label>
        <input
          type="text"
          {...register('state')}
          autoComplete="address-level1"
          required
        />
        <label htmlFor="country">{t('País')}</label>
        <input
          type="text"
          {...register('country')}
          autoComplete="country-name"
          required
        />
        <label htmlFor="googleMapsLink">{t('🌐')}</label>
        <input type="text" {...register('googleMapsLink')} />
        <hr className="col-span-2 my-2" />
        <div className="col-span-2 flex flex-col gap-4 text-center items-center">
          <h3 className="text-primary text-base">{t('Disponibilidad para viajar')}</h3>
          <label htmlFor="workRadius">{t('¿Cuál es tu radio de trabajo?')}</label>
          <select {...register('workRadius')} className="w-full">
            <option value="">{t('selectOne')}</option>
            <option value="local">{t('local')}</option>
            <option value="state">{t('estatal')}</option>
            <option value="national">{t('nacional')}</option>
            <option value="internacional">{t('internacional')}</option>
          </select>
          <h3 className="text-primary text-base">{t('Servicios a distancia')}</h3>
          <label htmlFor="remoteWork">{t('¿Trabajas online?')}</label>
          <input type="hidden" {...register('remoteWork')} required />
          <ButtonSelect
            fieldName="remoteWork"
            values={[true, false]}
            labels={[t('SÍ'), t('NO')]}
            setValue={setValue}
            getValue={getValue}
          />
        </div>
      </div>
      <div className="flex flex-row gap-4 self-center">
        <div className="button font-bold" onClick={() => navigate(-1)}>
          {t('Regresar')}
        </div>
        <input type="submit" className="border-none" value={t('Continuar')} />
      </div>
    </form>
  );
};

export default StandoutPage;
