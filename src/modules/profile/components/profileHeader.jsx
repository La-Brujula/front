import { ErrorMessage } from '@shared/components/errorMessage';
import { useTranslation } from 'react-i18next';

export const ProfileHeader = ({ user }) => {
  const { t } = useTranslation('user');
  return !!user ? (
    <div className="flex flex-col gap-6 max-w-xs mx-auto items-center">
      {!!user.coverPictureUrl ? (
        <img
          src={user.coverPictureUrl || ''}
          alt=""
          className="absolute left-0 -z-10 bg-black bg-opacity-20 w-full
            h-48 object-cover object-center"
        />
      ) : (
        <div
          className="absolute left-0 -z-10 bg-primary bg-opacity-20
          w-full h-48"
        />
      )}
      <div className="mt-8">
        {!!user.profilePictureUrl ? (
          <img
            src={user.profilePictureUrl}
            alt={`${user.username || user.name} profile picture`}
            className="w-48 h-48 bg-blue rounded-[50%]"
            loading="eager"
          />
        ) : (
          <div className="h-32 w-32 rounded-full bg-slate-400" />
        )}
      </div>
      <div className="flex flex-col gap-1 text-center">
        <h3 className="text-md font-normal">
          {user.nickname ? user.nickname : [user.name, user.lastname].join(' ')}
        </h3>
        <p className="text-sm">{user.location}</p>
        <p className="text-xs">{t(user.area)}</p>
        <p className="text-xs">{t(`${user.title}.${user.gender}`)}</p>
      </div>
    </div>
  ) : (
    <ErrorMessage message="No User" />
  );
};
