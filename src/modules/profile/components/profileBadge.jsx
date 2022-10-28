export const ProfileBadge = ({
  user: { profilePicture, username, location, title, industry },
}) => {
  return (
    <div className="flex flex-row gap-6 max-w-xs mx-auto items-center">
      {!!profilePicture && (
        <img
          src={profilePicture}
          alt={`${username} profile picture`}
          className="w-32 h-32 bg-blue rounded-[50%]"
        />
      )}
      <div className="flex flex-col gap-1 text-left">
        {!!username && <h2 className="text-lg">{username}</h2>}
        {!!location && <p>{location}</p>}
        {!!title && <p>{title}</p>}
        {!!industry && <p className="text-sm">{industry}</p>}
      </div>
    </div>
  );
};
