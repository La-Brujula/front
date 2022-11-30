import { useTranslation } from 'react-i18next';
import { ProfileHeader } from '../components/profileHeader';
import { useUserInfo } from '@shared/hooks/useUserInfo';
import { LoadingSpinner } from '@shared/components/loadingSpinner';
import { ErrorMessage } from '@shared/components/errorMessage';
import { Container } from '@shared/layout/container';
import { useAuth } from '@shared/context/firebaseContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ContactSection } from '../components/contactInfo';

export const LandingPage = () => {
  const { t } = useTranslation('profile');
  const { isLoggedIn, getUserEmail } = useAuth();
  const { user, loading, error } = useUserInfo(getUserEmail());
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) return navigate('/iniciar-sesion');
  }, []);

  console.log(user);

  return loading ? (
    <LoadingSpinner />
  ) : error || !user ? (
    <ErrorMessage message={error?.toString() || 'No user found'} />
  ) : (
    <div>
      <ProfileHeader user={user} />
      <Container>
        <div className="flex flex-col gap-4 justify-items-stretch mt-8 max-w-lg mx-auto text-left">
          {!!user.headline && (
            <p className="relative text-center">
              {user.headline}
              <img
                className="absolute -top-8 left-0 h-8 w-8"
                src={import.meta.env.BASE_URL + 'img/Apostrofe.svg'}
              />
            </p>
          )}

          <h4 className="font-normal text-primary">Recomendar</h4>
          {!!user.university && (
            <div className="py-4">
              <div className="absolute left-0 -z-10 -my-4 bg-black bg-opacity-20 w-full h-20 overflow-hidden"></div>
              <h4 className="font-normal text-primary">{t('Universidad')}</h4>
              <p>{user.university}</p>
            </div>
          )}
          {!!user.probono && (
            <div className="py-4">
              <div className="absolute left-0 -z-10 -my-4 bg-black bg-opacity-20 w-full h-20 overflow-hidden"></div>
              <h4 className="font-normal text-primary">{t('ProBono')}</h4>
              <p>{user.probono}</p>
            </div>
          )}
          {!!user.characteristics && (
            <div>
              <h4 className="font-normal text-primary">
                {t('Características')}
              </h4>
              <p>{user.characteristics}</p>
            </div>
          )}
          {!!user.languages && (
            <div>
              <h4 className="font-normal text-primary">{t('Idiomas')}</h4>
              <div className="grid grid-cols-[max-content,_max-content] gap-x-4 gap-y-6">
                {user.languages.map(({ lang, proficiency }) => (
                  <>
                    <h5 className="font-normal">{t(lang)}</h5>
                    <p>{t(proficiency)}</p>
                  </>
                ))}
              </div>
            </div>
          )}
          {!!user.asociations && (
            <div>
              <h4 className="font-normal text-primary">{t('Asociaciones')}</h4>
              <p>{user.asociations}</p>
            </div>
          )}
          {!!user.certifications && (
            <div>
              <h4 className="font-normal text-primary">
                {t('Certificaciones')}
              </h4>
              <p>{user.certifications}</p>
            </div>
          )}
          {!!user.awards && (
            <div>
              <h4 className="font-normal text-primary">
                {t('Reconocimientos')}
              </h4>
              <p>{user.awards}</p>
            </div>
          )}
          <div className="my-8"></div>
          <ContactSection user={user} />
        </div>
      </Container>
    </div>
  );
};
