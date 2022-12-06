import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

export const UserCard = ({ user }) => {
  const { t } = useTranslation('subareas');
  return (
    <>
      <NavLink to={user.email} className="flex flex-row gap-8 text-left w-full">
        {!!user.profilePictureUrl ? (
          <img
            src={user.profilePictureUrl}
            alt={`${user.nickname || user.name} profile picture`}
            className="w-20 h-20 rounded-full shrink-0"
          />
        ) : (
          <div className="h-20 w-20 rounded-full bg-slate-400 shrink-0" />
        )}
      </NavLink>
      <NavLink to={user.email} className="flex flex-row gap-8 text-left w-full">
        <div className="w-full">
          <h2 className="font-normal text-2xl">
            {!!user.nickname ? user.nickname : `${user.name} ${user.lastName}`}
          </h2>
          {!!user.nickname && (
            <p className="font-normal text-lg">
              {user.name} {user.lastName}
            </p>
          )}
          {!!user.headline && <p className="text-sm mt-4">{user.headline}</p>}
        </div>
      </NavLink>
      <NavLink to={user.email} className="flex flex-row gap-8 text-left w-full">
        <div className="">
          <p className="text-lg mb-6">
            {user.city}, {user.state}
            <br />
            {user.area}
            <br />
            {t(`${user.subarea}.${user.gender}`)}
            <br />
          </p>
          {!!user.recommendations && (
            <p>
              <span className="block text-lg font-bold">
                {user.recommendations}
              </span>
              Brujulas de recomendación
            </p>
          )}
        </div>
      </NavLink>
    </>
  );
};
