import { ErrorMessage } from '@shared/components/errorMessage';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@shared/context/firebaseContext';
import { NavLink } from 'react-router-dom';
import { getTitle } from '@shared/utils/areaUtils';

export const ProfileHeader = ({ user }) => {
  const { t } = useTranslation('user');
  const { getUserEmail } = useAuth();

  return !!user ? (
    <div className="max-w-2xl mx-auto w-full">
      <div className="flex flex-col gap-6 mx-auto xl:ml-0 items-center max-w-xs">
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
              alt={`${user.username || user.name} profile picture`}
              className="w-48 h-48 bg-blue rounded-[50%] object-cover object-center"
              loading="eager"
            />
          ) : (
            <div className="h-32 w-32 rounded-full bg-slate-400" />
          )}
        </div>
        <div className="flex flex-col gap-1 text-center relative">
          <h3 className="text-md font-normal">
            {user.nickname
              ? user.nickname
              : [user.name, user.lastname].join(' ')}
          </h3>
          {!!user.subareas &&
            user.subareas.map((activity) => (
              <p className="text-sm" key={activity}>
                {getTitle(activity, user.gender)}
              </p>
            ))}
          <p className="text-xs">
            {user.city} {user.state}
          </p>
          {getUserEmail() == user.email && (
            <NavLink
              to="/crear-usuario/basica"
              className="px-4 py-2 bg-secondary text-white rounded-md mt-4"
            >
              Editar Perfil
            </NavLink>
          )}
        </div>
      </div>
    </div>
  ) : (
    <ErrorMessage message="No User" />
  );
};
