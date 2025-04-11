import { useMemo, useState } from 'react';

import { Link } from '@tanstack/react-router';
import { ExternalLinkIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { useLoggedInAccount } from '@/shared/hooks/useLoggedInAccount';
import { IBackendProfile } from '@/shared/types/user';

import ErrorMessage from '@shared/components/errorMessage';
import { getTitle } from '@shared/utils/areaUtils';

import { UpdateImageControls } from './UpdateImageControls';

export const ProfileHeader = ({ user }: { user: IBackendProfile }) => {
  const { t } = useTranslation('user');
  const account = useLoggedInAccount();

  const isCurrentUser = useMemo(
    () => account !== null && account.ProfileId == user.id,
    [account, user.id]
  );

  const [profilePictureUrl, setProfilePictureUrl] = useState(
    user.profilePictureUrl || ''
  );
  const [headerPictureUrl, setHeaderPictureUrl] = useState(
    user.headerPictureUrl || ''
  );

  const activities = useMemo(
    () =>
      [user.primaryActivity, user.secondaryActivity, user.thirdActivity].map(
        (activity) =>
          !!activity && (
            <p
              className="text-sm"
              key={activity}
            >
              {getTitle(activity, user.gender)}
            </p>
          )
      ),
    [
      user.primaryActivity,
      user.secondaryActivity,
      user.thirdActivity,
      user.gender,
      getTitle,
    ]
  );

  return !!user ? (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mx-auto flex max-w-xs flex-col items-center gap-2 xl:ml-0">
        {!!headerPictureUrl ? (
          <img
            src={headerPictureUrl || ''}
            alt=""
            crossOrigin="anonymous"
            className="absolute left-0 -z-10 h-48 w-full bg-black bg-opacity-20 object-cover object-center"
          />
        ) : (
          <div className="absolute left-0 -z-10 h-48 w-full bg-primary bg-opacity-20" />
        )}
        {isCurrentUser && (
          <UpdateImageControls
            user={user}
            imageUrl={headerPictureUrl}
            setImageUrl={setHeaderPictureUrl}
            imageType="cover"
          />
        )}
        <div className="relative mt-8">
          {!!profilePictureUrl ? (
            <img
              src={profilePictureUrl}
              alt={`${user.fullName} profile picture`}
              className="size-48 rounded-[50%] bg-blue object-cover object-center"
              loading="eager"
              crossOrigin="anonymous"
            />
          ) : (
            <img
              src={
                user.type == 'moral'
                  ? '/guias/fotoDePerfil/casita.jpg'
                  : '/guias/fotoDePerfil/Monito.jpg'
              }
              alt="ImagenPredeterminada"
              className="size-48 rounded-[50%] bg-white object-cover object-center"
              loading="eager"
            />
          )}
          {isCurrentUser && (
            <UpdateImageControls
              user={user}
              imageUrl={profilePictureUrl}
              setImageUrl={setProfilePictureUrl}
              imageType="profile"
            />
          )}
        </div>
        {user.verified ? (
          <p className="rounded-full border-2 border-emerald-500 bg-emerald-200 p-1 px-2 font-bold text-emerald-500">
            {t('Correo verificado')}
          </p>
        ) : (
          <Link
            to="/auth/send-verification"
            disabled={!isCurrentUser}
          >
            <p className="rounded-full border-2 border-rose-500 bg-rose-200 p-1 px-2 font-bold text-rose-500">
              {t('Correo no verificado')}{' '}
              {isCurrentUser && <ExternalLinkIcon fontSize="small" />}
            </p>
          </Link>
        )}
        {!!user.headline && (
          <p className="relative mb-2 text-center text-sm italic">
            {user.headline}
          </p>
        )}
        <div className="relative flex flex-col gap-1 text-center">
          <h3 className="text-md font-normal">
            {!!user.nickName ? user.nickName : user.fullName}
          </h3>
          {activities}
          <p className="text-xs">{user.location}</p>
        </div>
        {isCurrentUser && (
          <Link
            to="/me/basic"
            className="rounded-md bg-primary p-4 py-2 text-white"
          >
            {t('Editar perfil')}
          </Link>
        )}
      </div>
    </div>
  ) : (
    <ErrorMessage message={t('No se encontró el usuario')} />
  );
};
