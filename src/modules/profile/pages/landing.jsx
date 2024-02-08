import { useTranslation } from 'react-i18next';
import { ProfileHeader } from '../components/profileHeader';
import { ContactSection } from '../components/contactInfo';
import { useAuth } from '@shared/context/firebaseContext';
import languages from '@shared/constants/languages.json';
import { NavLink } from 'react-router-dom';
import { Recommendations } from '../components/recommend';

export const UserProfilePage = ({ user }) => {
  const { t } = useTranslation('profile');
  const auth = useAuth();

  return (
    <div>
      <ProfileHeader user={user} />
      <div className="max-w-lg xl:max-w-4xl mx-auto px-8 w-full justify-start items-start">
        <div className="flex flex-col xl:flex-row xl:gap-16 order-last xl:order-first xl:shrink">
          <div className="flex flex-col gap-4 justify-items-stretch mt-8 max-w-sm w-full mx-auto text-left">
            <ContactSection user={user} />
            {!!user.university && user.type != 'moral' && (
              <div className="py-8">
                <div className="absolute left-0 -z-10 -my-4 overflow-hidden transform w-full">
                  <div className="bg-black bg-opacity-20 w-full h-20 xl:w-1/2 xl:rounded-r-md"></div>
                </div>
                <h4 className="font-normal text-primary">{t('Universidad')}</h4>
                <p>{user.university}</p>
              </div>
            )}
            {!!user.probono && (
              <div className="py-8">
                <div className="absolute left-0 -z-10 -my-4 overflow-hidden transform w-full">
                  <div className="bg-black bg-opacity-20 w-full h-20 xl:w-1/2 xl:rounded-r-md"></div>
                </div>
                <h4 className="font-normal text-primary">
                  Interés en ser becario, servicio social:
                </h4>
                <p>{Sí}</p>
              </div>
            )}
          </div>
          <div
            className="flex flex-col gap-6 w-full justify-items-stretch mt-8 max-w-lg
          xl:max-w-3xl mx-auto xl:mx-0 text-left xl:-translate-y-42"
          >
            <Recommendations user={user} />
            {!!user.characteristics && (
              <div>
                <h4 className="font-normal text-primary">{t('Semblanza')}</h4>
                <p>{user.characteristics}</p>
              </div>
            )}
            {!!user.languages && (
              <div>
                <h4 className="font-normal text-primary">{t('Idiomas')}</h4>
                <div className="grid grid-cols-[max-content,_max-content] gap-x-4 gap-y-2">
                  {user.languages.map(({ lang, proficiency }) => (
                    <>
                      <h5 className="font-normal">
                        {languages[lang] || t(lang)}
                      </h5>
                      <p className="opacity-60">{t(proficiency)}</p>
                    </>
                  ))}
                </div>
              </div>
            )}
            {!!user.asociations && (
              <div>
                <h4 className="font-normal text-primary">
                  {t('Asociaciones')}
                </h4>
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
          </div>
        </div>
        {auth.getUserEmail() == user.email && (
          <NavLink
            to="/cerrar-cuenta"
            className="!text-slate-400 text-sm text-center block"
          >
            Borrar cuenta
          </NavLink>
        )}
      </div>
    </div>
  );
};
