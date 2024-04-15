import { useLoggedInAccount } from '@/shared/hooks/useLoggedInAccount';
import { IBackendProfile } from '@/shared/types/user';
import { CancelOutlined, SaveOutlined } from '@mui/icons-material';
import ErrorMessage from '@shared/components/errorMessage';
import { getTitle } from '@shared/utils/areaUtils';
import { Link } from '@tanstack/react-router';
import { Dispatch, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import UploadImage from './uploadImage';
import { useUploadProfileImage } from '../hooks/useUploadProfileImage';

export const ProfileHeader = ({ user }: { user: IBackendProfile }) => {
  const { t } = useTranslation('user');
  const account = useLoggedInAccount();

  const isCurrentUser = useMemo(
    () => account !== null && account.email == user.primaryEmail,
    [account, user.primaryEmail]
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

  const [profilePictureUrl, setProfilePictureUrl] = useState(
    user.profilePictureUrl
  );
  const [headerPictureUrl, setHeaderPictureUrl] = useState(
    user.headerPictureUrl
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
            setImageUrl={setHeaderPictureUrl}
            userSetPictureUrl={user.headerPictureUrl}
            imageUrl={headerPictureUrl!}
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
              setImageUrl={setProfilePictureUrl}
              userSetPictureUrl={user.profilePictureUrl}
              imageUrl={profilePictureUrl!}
              imageType="profile"
            />
          )}
        </div>
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
            to="/profile/edit/basic"
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
function UpdateImageControls(props: {
  setImageUrl: Dispatch<string>;
  userSetPictureUrl: string | undefined;
  imageUrl: string;
  imageType: 'profile' | 'cover';
}) {
  const upload = useUploadProfileImage();
  const uploadImage = useCallback(async () => {
    const imageFile = await fetch(props.imageUrl)
      .then((r) => r.blob())
      .then(
        (blobFile) =>
          new File([blobFile], props.imageType, { type: blobFile.type })
      );
    const uploadRes = await upload(imageFile, props.imageType);
    if (uploadRes.isSuccess) {
      props.setImageUrl(
        props.imageType == 'cover'
          ? uploadRes.entity.headerPictureUrl!
          : uploadRes.entity.profilePictureUrl!
      );
    }
  }, [upload]);

  const resetInput = useCallback(
    () => props.setImageUrl(props.userSetPictureUrl!),
    [props.setImageUrl]
  );
  return (
    <div className="flex flex-row gap-4 justify-end">
      {props.userSetPictureUrl === props.imageUrl ? (
        <UploadImage
          setImageUrl={props.setImageUrl}
          imageType={props.imageType}
        />
      ) : (
        <>
          <button
            onClick={resetInput}
            className="p-2 rounded-md bg-red-500 text-white"
          >
            <CancelOutlined />
          </button>
          <button
            onClick={uploadImage}
            className="p-2 rounded-md bg-green-500 text-white"
          >
            <SaveOutlined />
          </button>
        </>
      )}
    </div>
  );
}
