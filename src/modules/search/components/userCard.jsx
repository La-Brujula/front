import { NavLink } from 'react-router-dom';
import { getTitle } from '@shared/utils/areaUtils';

export const UserCard = ({ user }) => {
  console.log(user.searchName);
  return (
    <NavLink
      to={user.email}
      className="grid grid-cols-2 xl:grid-cols-[max-content,_2fr,_1fr] gap-8 border-b-black border-b border-opacity-40 pb-6"
    >
      {!!user.profilePictureUrl ? (
        <img
          src={user.profilePictureUrl}
          alt={`${user.nickname || user.name} profile picture`}
          className="w-20 h-20 rounded-full shrink-0 col-span-2 xl:col-span-1"
        />
      ) : (
        <div className="h-20 w-20 rounded-full bg-slate-400 shrink-0 col-span-2 xl:col-span-1" />
      )}
      <div
        to={user.email}
        className="flex flex-row gap-8 text-left w-full border-b-black border-opacity-40"
      >
        <div className="w-full">
          <h2 className="font-normal text-2xl">
            {!!user.nickname ? user.nickname : `${user.name} ${user.lastName}`}
          </h2>
          {!!user.nickname && (
            <p className="font-normal text-sm opacity-80">
              {user.name} {user.lastName}
            </p>
          )}
          {!!user.headline && (
            <p className="text-sm mt-4 opacity-70 text-black">
              {user.headline}
            </p>
          )}
        </div>
      </div>
      <div
        to={user.email}
        className="flex flex-row gap-8 text-left w-full border-b-black border-opacity-40"
      >
        <div className="">
          {user.subareas?.map((subarea) => (
            <p className="text-base opacity-80" key={subarea}>
              {getTitle(subarea, user.gender)}
            </p>
          ))}
          <p className="text-sm mb-2">
            {user.city}, {user.state}
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
      </div>
    </NavLink>
  );
};
