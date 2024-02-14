import ErrorMessage from '@shared/components/errorMessage';
import { useCategory } from '@shared/hooks/useCategory';
import { getTitle } from '@shared/utils/areaUtils';

export const ProfileBadge = ({ user }) => {
  const { toCategory } = useCategory();
  return !!user ? (
    <div className="flex flex-row gap-6 max-w-xs mx-auto items-center">
      {!!user.profilePictureUrl ? (
        <img
          src={user.profilePictureUrl}
          alt={`${user.nickname || user.name} profile picture`}
          className="size-28 rounded-[50%]"
        />
      ) : (
        <div className="size-28 rounded-full bg-slate-400 shrink" />
      )}
      <div className="flex flex-col gap-1 text-left">
        <h3 className="text-md font-normal">
          {user.nickname ? user.nickname : [user.name, user.lastname].join(' ')}
        </h3>
        <p className="text-sm">{user.location}</p>
        <p className="text-sm">{getTitle(user.subarea, user.gender)}</p>
        <p className="text-xs">{toCategory(user.area)}</p>
      </div>
    </div>
  ) : (
    <ErrorMessage message="No User" />
  );
};
