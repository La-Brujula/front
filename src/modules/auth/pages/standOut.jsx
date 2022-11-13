import { brujulaUtils } from '@shared/utils/brujulaUtils';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';
import { ButtonSelect } from '@shared/components/buttonSelect';
import { getValue } from '@mui/system';
import { useMemo } from 'react';

export const StandoutPage = () => {
  const brujula = brujulaUtils();
  const { register, handleSubmit, setValue, watch } = useForm();
  const profilePicture = watch('profilePicture');
  const coverPicture = watch('coverPicture');
  const profilePictureUrl = watch('profilePictureUrl');
  const coverPictureUrl = watch('coverPictureUrl');
  const { t } = useTranslation('auth');
  const navigate = useNavigate();

  // Profile Picture Preview Functionality
  useMemo(() => {
    (async () => {
      if (!profilePicture || !profilePicture[0]) return;
      await brujula.saveUserPicture(profilePicture[0], '/profilePicture');
      const url = await brujula.getUserPictureUrl('/profilePicture');
      setValue('profilePictureUrl', url);
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
    setTimeout(() => {
      navigate('../contacto');
    }, 250);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <p>*{t('requiredInformation')}</p>
      <div
        className="grid grid-cols-[min-content_minmax(12rem,_24rem)_max-content]
      text-right gap-4 mx-auto items-center gap-x-8"
      >
        <label htmlFor="profilePicture">{t('profilePicture')}</label>
        <input type="file" {...register('profilePicture')} required />
        <img src={profilePictureUrl} className="w-32 rounded-full" />
        <label htmlFor="coverPicture">{t('coverPicture')}</label>
        <input type="file" {...register('coverPicture')} required />
        <img src={coverPictureUrl} className="w-32" />
        <label htmlFor="headline">{t('headline')}</label>
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
        <h2>{t('location')}</h2>
      </div>
      <div className="grid grid-cols-[min-content_minmax(12rem,_24rem)] text-right gap-4 mx-auto">
        <label htmlFor="address">{t('address')}</label>
        <input
          type="text"
          {...register('address')}
          autoComplete="address"
          required
        />
        <label htmlFor="zipCode">{t('zipCode')}</label>
        <input
          type="text"
          {...register('zipCode')}
          autoComplete="zip-code"
          required
        />
        <label htmlFor="city">{t('city')}</label>
        <input type="text" {...register('city')} autoComplete="city" required />
        <label htmlFor="state">{t('state')}</label>
        <input
          type="text"
          {...register('state')}
          autoComplete="state"
          required
        />
        <label htmlFor="country">{t('country')}</label>
        <input
          type="text"
          {...register('country')}
          autoComplete="country"
          required
        />
        <label htmlFor="googleMapsLink">{t('googleMapsLink')}</label>
        <input type="text" {...register('googleMapsLink')} required />
        <hr className="col-span-2 my-2" />
        <div className="col-span-2 flex flex-col gap-4 text-center items-center">
          <label htmlFor="workRadius">{t('workRadius')}</label>
          <input type="text" {...register('workRadius')} required />
          <label htmlFor="remoteWork">{t('remoteWork')}</label>
          <input type="hidden" {...register('remoteWork')} />
          <ButtonSelect
            fieldName="remoteWork"
            values={[true, false]}
            labels={[t('yes'), t('no')]}
            setValue={setValue}
            getValue={getValue}
          />
        </div>
      </div>
      <div className="flex flex-row gap-4 self-center">
        <NavLink to="../">
          <div className="button font-bold">{t('back')}</div>
        </NavLink>
        <input type="submit" className="border-none" value={t('next')} />
      </div>
    </form>
  );
};

export default StandoutPage;
