import { useLoggedInAccount } from '@/shared/hooks/useLoggedInAccount';
import { IBackendProfile } from '@/shared/types/user';
import ErrorMessage from '@shared/components/errorMessage';
import { getTitle } from '@shared/utils/areaUtils';
import { Link } from '@tanstack/react-router';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UpdateImageControls } from './UpdateImageControls';
import { OpenInNewOutlined } from '@mui/icons-material';

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
    <div className="max-w-2xl mx-auto w-full">
      <div className="flex flex-col gap-2 mx-auto xl:ml-0 items-center max-w-xs">
        {!!headerPictureUrl ? (
          <img
            src={headerPictureUrl || ''}
            alt=""
            crossOrigin="anonymous"
            className="absolute left-0 -z-10 bg-black bg-opacity-20 w-full
            h-48 object-cover object-center"
          />
        ) : (
          <div
            className="absolute left-0 -z-10 bg-primary bg-opacity-20
          w-full h-48"
          />
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
              className="size-48 bg-blue rounded-[50%] object-cover object-center"
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
              className="size-48 bg-white rounded-[50%] object-cover object-center"
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
          <p className="font-bold bg-emerald-200 border-2 border-emerald-500 text-emerald-500 p-1 px-2 rounded-full">
            {t('Correo verificado')}
          </p>
        ) : (
          <Link
            to="/auth/send-verification"
            disabled={!isCurrentUser}
          >
            <p className="font-bold bg-rose-200 border-2 border-rose-500 text-rose-500 p-1 px-2 rounded-full">
              {t('Correo no verificado')}{' '}
              {isCurrentUser && <OpenInNewOutlined fontSize="small" />}
            </p>
          </Link>
        )}
        {!!user.headline && (
          <p className="relative text-center italic text-sm mb-2">
            {user.headline}
          </p>
        )}
        <div className="flex flex-col gap-1 text-center relative">
          <h3 className="text-md font-normal">
            {!!user.nickName ? user.nickName : user.fullName}
          </h3>
          {activities}
          <p className="text-xs">{user.location}</p>
        </div>
        {isCurrentUser && (
          <Link
            to="/me/basic"
            className="bg-primary p-4 py-2 rounded-md text-white"
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
