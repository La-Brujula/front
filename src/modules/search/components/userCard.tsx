import { useMemo } from 'react';

import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import CountryFlag from '@/shared/components/countryFlag';

import { getTitle } from '@shared/utils/areaUtils';

import { UserDTO } from '../queries/searchQuery';

export const UserCard = ({
  user,
  showRecommendations = true,
  hasLink = true,
}: {
  user: UserDTO;
  showRecommendations?: boolean;
  hasLink?: boolean;
}) => {
  const { t } = useTranslation(['search', 'countries']);
  const content = useMemo(
    () => (
      <>
        {!!user.profilePictureUrl ? (
          <img
            src={user.profilePictureUrl}
            crossOrigin="anonymous"
            alt={`${user.nickName || user.fullName} profile picture`}
            className="row-span-2 size-20 shrink-0 rounded-full object-cover object-center"
          />
        ) : (
          <img
            src={
              user.type == 'moral'
                ? '/guias/fotoDePerfil/casita.jpg'
                : '/guias/fotoDePerfil/Monito.jpg'
            }
            alt="ImagenPredeterminada"
            className="row-span-2 size-20 shrink-0 rounded-full bg-white object-cover object-center"
            loading="eager"
          />
        )}
        <div className="flex w-full flex-row gap-8 border-b-black border-opacity-40 text-left">
          <div className="flex w-full flex-col gap-2">
            <div className="flex flex-col gap-0">
              <h2 className="text-xl font-normal lg:text-lg">
                {!!user.nickName ? user.nickName : user.fullName}
              </h2>
              {!!user.nickName && (
                <p className="text-xs font-normal">{user.fullName}</p>
              )}
            </div>
            {!!user.headline && (
              <p className="col-span-2 text-sm italic text-black opacity-70">
                {user.headline}
              </p>
            )}
          </div>
        </div>
        <div className="text-right">
          {user.country && (
            <CountryFlag
              country={user.country}
              className="!size-8"
            />
          )}
        </div>
        <div className="">
          {!!user.primaryActivity && (
            <p className="text-sm font-bold opacity-80">
              {getTitle(user.primaryActivity, user.gender || 'other')}
            </p>
          )}
          {[user.secondaryActivity, user.thirdActivity].map(
            (subarea, i) =>
              subarea !== undefined && (
                <p
                  className="text-xs opacity-80"
                  key={subarea + i}
                >
                  {getTitle(subarea, user.gender || 'other')}
                </p>
              )
          )}
          <p className="mt-2 text-xs font-medium">
            {user.country
              ? user.location?.replace(
                  `, ${user.country}`,
                  `, ${t(`countries:${user.country}`)}`
                )
              : user.location}
          </p>
        </div>
        {showRecommendations && (
          <div className="grid items-center justify-center lg:grid-cols-[4rem_1fr] lg:gap-4">
            <img
              src={import.meta.env.BASE_URL + 'img/LogoBlue.svg'}
              alt=""
              className="max-h-[2rem] w-full"
            />
            <p className="text-black">
              <span className="block text-xl font-bold">
                {user.recommendationsCount || 0}
              </span>
              <span className="block text-xs leading-3">
                {t('Brujula(s) de recomendación')}
              </span>
            </p>
          </div>
        )}
      </>
    ),
    [user, showRecommendations]
  );
  return hasLink ? (
    <Link
      to={'/profile/$userId'}
      params={{ userId: user.id }}
      className="grid grid-cols-[5rem_1fr_1fr] items-center gap-4 gap-y-4 pt-4 lg:grid-cols-[5rem_5fr_4fr] lg:gap-4"
      resetScroll={false}
    >
      {content}
    </Link>
  ) : (
    <div className="grid grid-cols-[5rem_1fr_1fr] items-center gap-4 gap-y-4 pt-4 lg:grid-cols-[5rem_5fr_4fr] lg:gap-4">
      {content}
    </div>
  );
};
