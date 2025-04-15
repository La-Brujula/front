import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { IBackendProfile } from '@/shared/types/user';

import ErrorMessage from '@shared/components/errorMessage';
import { getTitle } from '@shared/utils/areaUtils';

export const ProfileBadge = ({ user }: { user?: IBackendProfile }) => {
  const { t } = useTranslation('profile');

  if (!user?.id) return <ErrorMessage message={t('No User')} />;

  return (
    <div className="mx-auto flex max-w-xs flex-row items-center gap-6">
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
      <div className="flex flex-col gap-1 text-left">
        <h3 className="text-md font-normal">
          {user.nickName
            ? user.nickName
            : user.fullName
              ? user.fullName
              : user.primaryEmail}
        </h3>
        {user.primaryActivity !== undefined && (
          <p className="text-sm">
            {getTitle(user.primaryActivity, user.gender)}
          </p>
        )}
        {!user.fullName && (
          <Link
            to="/me/basic"
            resetScroll
          >
            {t('Completa tu usuario')}
          </Link>
        )}
      </div>
    </div>
  );
};
