import { useTranslation } from 'react-i18next';
import { ProfileHeader } from '../components/profileHeader';
import { ContactSection } from '../components/contactInfo';
import { useReviews } from '@shared/hooks/useReviews';
import { useAuth } from '@shared/context/firebaseContext';
import languages from '@shared/constants/languages.json';
import { NavLink } from 'react-router-dom';

export const UserProfilePage = ({ user }) => {
  const { t } = useTranslation('profile');
  const auth = useAuth();
  const { reviews, count, addReview, removeReview, loading } = useReviews(
    user.email
  );

  return (
    <div>
      <ProfileHeader user={user} />
      <div className="max-w-lg xl:max-w-4xl mx-auto px-8 w-full justify-start items-start">
        <div className="flex flex-col xl:flex-row xl:gap-16 order-last xl:order-first xl:shrink">
          <div className="flex flex-col gap-4 justify-items-stretch mt-8 max-w-sm w-full mx-auto text-left">
            <ContactSection user={user} />
            {!!user.university && (
              <div className="py-8">
                <div className="absolute left-0 -z-10 -my-4 overflow-hidden transform w-full">
                  <div className="bg-black bg-opacity-20 w-full h-28 xl:w-1/2 xl:rounded-r-md"></div>
                </div>
                <h4 className="font-normal text-primary">{t('Universidad')}</h4>
                <p>{user.university}</p>
              </div>
            )}
            {user.probono !== undefined && (
              <div className="py-8">
                <div className="absolute left-0 -z-10 -my-4 overflow-hidden transform w-full">
                  <div className="bg-black bg-opacity-20 w-full h-28 xl:w-1/2 xl:rounded-r-md"></div>
                </div>
                <h4 className="font-normal text-primary">
                  Interés en ser becario, servicio social:
                </h4>
                <p>{user.probono ? 'Sí' : 'No'}</p>
              </div>
            )}
          </div>
          <div
            className="flex flex-col gap-6 w-full justify-items-stretch mt-8 max-w-lg
          xl:max-w-3xl mx-auto xl:mx-0 text-left xl:-translate-y-42"
          >
            {!!user.headline && (
              <p className="relative text-center my-8">
                {user.headline}
                <img
                  className="absolute -top-8 left-0 h-6 w-6"
                  src={import.meta.env.BASE_URL + 'img/Apostrofe.svg'}
                />
              </p>
            )}

            <div>
              <h4 className="font-normal text-primary">Recomendaciones: </h4>

              <p>{loading ? '...' : count}</p>
              <p>{reviews?.join(', ')}</p>
              {auth.getUserEmail() != user.email &&
                (!reviews?.includes(auth.getUserEmail()) ? (
                  <h4
                    className="font-normal text-primary cursor-pointer"
                    onClick={() => addReview(auth.getUserEmail())}
                  >
                    Click para recomendar
                  </h4>
                ) : (
                  <h4
                    className="font-normal text-primary cursor-pointer"
                    onClick={() => removeReview(auth.getUserEmail())}
                  >
                    Remover recomendacion
                  </h4>
                ))}
            </div>
            {!!user.characteristics && (
              <div>
                <h4 className="font-normal text-primary">{t('Semblanza')}</h4>
                <p>{user.characteristics}</p>
              </div>
            )}
            {!!user.languages && (
              <div>
                <h4 className="font-normal text-primary">{t('Idiomas')}</h4>
                <table className="grid grid-cols-[max-content,_max-content] gap-x-4 gap-y-2">
                  <tbody>
                    {user.languages.map(({ lang, proficiency }) => (
                      <tr key={lang}>
                        <td>
                          <h5 className="font-normal">
                            {languages[lang] || t(lang)}
                          </h5>
                        </td>
                        <td>
                          <p>{t(proficiency)}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
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
