import { useTranslation } from 'react-i18next';
import { ProgressBar } from '@shared/components/progressBar';
import { ProfileBadge } from '../components/profileBadge';
import { PrivacyPolicy } from '../components/privacyPolicy';
import { NavLink } from 'react-router-dom';

export const LandingPage = () => {
  const user = {
    profilePicture: './placeholder.svg',
    username: 'La Quina',
    location: 'Acapulco, Gro',
    title: 'Actor de Voz',
    industry: 'Videojuegos',
  };

  const { t } = useTranslation('profile');

  return (
    <>
      <div className="flex flex-col gap-8">
        <ProfileBadge user={user} />
        <div className="flex flex-col gap-4">
          <p>{t('yourUserInformationProgress')}:</p>
          <ProgressBar progress={30} />
        </div>
        <PrivacyPolicy />
        <div className="flex flex-row gap-6 self-center">
          <NavLink to="revisar">
            <div className="button">
              {t('reviewUser')}
            </div>
          </NavLink>
          <NavLink to="completar">
            <div className="button">
              {t('completeUser')}
            </div>
          </NavLink>
        </div>
      </div>
    </>
  );
};
