import { brujulaUtils } from '@shared/utils/brujulaUtils';
import { useEffect } from 'react';
import { useState } from 'react';

export const ProfileBadge = () => {
  const brujula = brujulaUtils();
  const [user, setUser] = useState({});

  useEffect(() => {
    (async () => {
      const url = await brujula.getProfilePictureUrl();
      setUser({ ...user, profilePictureUrl: url });
    })();
    (async () => {
      const data = await brujula.getUserInfo();
      setUser({
        ...user,
        username: data.nickname,
        city: data.city,
        state: data.state,
      });
    })();
  }, []);

  return (
    <div className="flex flex-row gap-6 max-w-xs mx-auto items-center">
      {!!user.profilePictureUrl ? (
        <img
          src={user.profilePictureUrl}
          alt={`${username} profile picture`}
          className="w-32 h-32 bg-blue rounded-[50%]"
        />
      ) : (
        <div classname="h-32 w-32 rounded-full bg-slate-400" />
      )}
      <div className="flex flex-col gap-1 text-left">
        {!!user.username && <h2 className="text-lg">{user.username}</h2>}
        {!!user.location && <p>{user.location}</p>}
        {!!user.title && <p>{user.title}</p>}
        {!!user.industry && <p className="text-sm">{user.industry}</p>}
      </div>
    </div>
  );
};
