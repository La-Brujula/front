import { useTranslation } from 'react-i18next';
import { ProgressBar } from '@shared/components/progressBar';
import { ProfileBadge } from '../../profile/components/profileBadge';

export const ProfileSummary = () => {
  const { t } = useTranslation('auth');
  // TODO Connect w/ user info
  return (
    <>
      <ProfileBadge />
      <div className="max-w-xl mx-auto">
        <h2 className='mb-2'>{t('profileCompletion')}</h2>
        <ProgressBar progress={30} />
      </div>
      <div
        className="grid grid-cols-[max-content_max-content]
      text-right gap-x-8 gap-y-4 mx-auto mt-8 w-auto justify-center"
      >
        <h3>{t('email')}</h3>
        <p className="text-left text-primary">email.com</p>
        <div className="col-span-2"></div>
        <h3>{t('name-s')}</h3>
        <p className="text-left text-primary">Nombre</p>
        <h3>{t('lastName-s')}</h3>
        <p className="text-left text-primary">Apelli Dos</p>
        <h3>{t('nickname')}</h3>
        <p className="text-left text-primary">La Quina</p>
        <h3>{t('género')}</h3>
        <p className="text-left text-primary">NB</p>
        <div className="col-span-2"></div>
        <h3>{t('primaryActivity')}</h3>
        <p className="text-left text-primary">Actor de voz</p>
        <div className="col-span-2"></div>
        <h3>{t('city')}</h3>
        <p className="text-left text-primary">Acapulco</p>
        <h3>{t('state')}</h3>
        <p className="text-left text-primary">Guerrero</p>
        <h3>{t('country')}</h3>
        <p className="text-left text-primary">Mexico</p>
        <h3>{t('phone')}</h3>
        <p className="text-left text-primary">+52 55 1234 5678</p>
      </div>
    </>
  );
};
