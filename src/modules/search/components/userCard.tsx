import { getTitle } from '@shared/utils/areaUtils';
import { useTranslation } from 'react-i18next';
import { UserDTO } from '../queries/searchQuery';
import { Link } from '@tanstack/react-router';
import CountryFlag from '@/shared/components/countryFlag';
import { useMemo } from 'react';

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
            className="size-20 rounded-full shrink-0 row-span-2 object-cover
          object-center"
          />
        ) : (
          <img
            src={
              user.type == 'moral'
                ? '/guias/fotoDePerfil/casita.jpg'
                : '/guias/fotoDePerfil/Monito.jpg'
            }
            alt="ImagenPredeterminada"
            className="size-20 rounded-full bg-white shrink-0 row-span-2
          object-cover object-center"
            loading="eager"
          />
        )}
        <div
          className="flex flex-row gap-8 text-left w-full border-b-black
        border-opacity-40"
        >
          <div className="w-full flex flex-col gap-2">
            <div className="flex flex-col gap-0 ">
              <h2 className="font-normal text-xl lg:text-lg">
                {!!user.nickName ? user.nickName : user.fullName}
              </h2>
              {!!user.nickName && (
                <p className="font-normal text-xs">{user.fullName}</p>
              )}
            </div>
            {!!user.headline && (
              <p className="text-sm opacity-70 text-black col-span-2 italic">
                {user.headline}
              </p>
            )}
          </div>
        </div>
        <div className="text-right">
          {user.country && (
            <CountryFlag
              country={user.country}
              className="text-4xl"
            />
          )}
        </div>
        <div className="">
          {!!user.primaryActivity && (
            <p className="text-sm opacity-80 font-bold">
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
          <p className="text-xs mt-2 font-medium">
            {user.country
              ? user.location?.replace(
                  user.country,
                  t(`countries:${user.country}`)
                )
              : user.location}
          </p>
        </div>
        {showRecommendations && (
          <div className="grid lg:grid-cols-[4rem_1fr] lg:gap-4 items-center justify-center">
            <img
              src={import.meta.env.BASE_URL + 'img/LogoBlue.svg'}
              alt=""
              className="max-h-[2rem] w-full"
            />
            <p className="text-black">
              <span className="block text-xl font-bold">
                {user.recommendationsCount || 0}
              </span>
              <span className="text-xs leading-3 block">
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
      className="grid grid-cols-[5rem_1fr_1fr] lg:grid-cols-[5rem_5fr_4fr] lg:gap-4
      gap-4 pt-4 gap-y-4 items-center"
      resetScroll={false}
    >
      {content}
    </Link>
  ) : (
    <div
      className="grid grid-cols-[5rem_1fr_1fr] lg:grid-cols-[5rem_5fr_4fr] lg:gap-4
      gap-4 pt-4 gap-y-4 items-center"
    >
      {content}
    </div>
  );
};
