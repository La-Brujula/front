import { useAuth } from '@/shared/context/auth';
import { IFirebaseProfile } from '@/shared/types/user';
import { useReviews } from '@shared/hooks/useReviews';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

export const Recommendations = ({ user }: { user: IFirebaseProfile }) => {
  const { t } = useTranslation('profile');
  const [showRecs, setShowRecs] = useState(false);
  const { reviews, count, addReview, removeReview, loading } = useReviews(
    user.email,
  );
  const auth = useAuth();

  return (
    <div className="flex flex-col items-center">
      {auth.isLoggedIn &&
        auth.getUserEmail() != user.email &&
        (loading ? (
          <div
            className="flex flex-col gap-2 p-4 px-12 bg-secondary
                rounded-lg w-fit z-[1] cursor-pointer"
          >
            <img
              src={import.meta.env.BASE_URL + 'img/BrujulaWhite.svg'}
              alt=""
              className="max-h-[4rem]"
            />
            <h4 className="text-white text-center">...</h4>
          </div>
        ) : (
          <div
            onClick={() =>
              !reviews?.includes(auth.getUserEmail())
                ? addReview(auth.getUserEmail())
                : removeReview(auth.getUserEmail())
            }
            className="flex flex-col gap-2 p-4 px-12 bg-secondary
                rounded-lg w-fit z-[1] cursor-pointer"
          >
            <img
              src={import.meta.env.BASE_URL + 'img/BrujulaWhite.svg'}
              alt=""
              className="max-h-[4rem]"
            />
            <h4 className="text-white text-center">
              {!reviews?.includes(auth.getUserEmail())
                ? 'Recomendar'
                : 'Quitar Recomendación'}
            </h4>
          </div>
        ))}
      <div
        className={[
          'bg-black bg-opacity-20 p-4 w-full',
          'rounded-lg flex flex-row gap-8 items-center',
          auth.isLoggedIn && auth.getUserEmail() != user.email && 'pt-8 -mt-4',
        ].join(' ')}
      >
        <img
          src={import.meta.env.BASE_URL + 'img/LogoBlue.svg'}
          alt=""
          className="max-h-[4rem]"
        />
        <h5 className="text-2xl">{loading ? '...' : count}</h5>
        <div className="flex flex-col gap-4">
          <h4 className="font-normal text-base">Brújulas de recomendación</h4>
          {!!reviews &&
            (showRecs ? (
              <div
                className="cursor-pointer text-primary"
                onClick={() => setShowRecs(false)}
              >
                {t('Ocultar recomendaciones')}
              </div>
            ) : (
              <div
                className="cursor-pointer text-primary"
                onClick={() => setShowRecs(true)}
              >
                {t('Mostrar recomendaciones')}
              </div>
            ))}
        </div>
      </div>
      {!!reviews && showRecs && (
        <div
          className="p-4 bg-black bg-opacity-10 flex flex-col
        gap-4 rounded-md"
        >
          {reviews?.map((a) => (
            <NavLink
              to={`/usuarios/${a}`}
              className="text-primary"
            >
              {a}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};
