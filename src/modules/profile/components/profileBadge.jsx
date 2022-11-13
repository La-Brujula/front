import { ErrorMessage } from '@shared/components/errorMessage';

export const ProfileBadge = ({ user }) => {
  console.log(user);
  return !!user ? (
    <div className="flex flex-row gap-6 max-w-xs mx-auto items-center">
      {!!user.profilePictureUrl ? (
        <img
          src={user.profilePictureUrl}
          alt={`${user.username} profile picture`}
          className="w-28 h-28 rounded-[50%]"
        />
      ) : (
        <div className="h-32 w-32 rounded-full bg-slate-400" />
      )}
      <div className="flex flex-col gap-1 text-left">
        <h3 className="text-md font-normal">
          {user.nickname ? user.nickname : [user.name, user.lastname].join(' ')}
        </h3>
        <p className="text-sm">{user.location}</p>
        <p className="text-sm">{user.title}</p>
        <p className="text-xs">{user.area}</p>
      </div>
    </div>
  ) : (
    <ErrorMessage message="No User" />
  );
};
