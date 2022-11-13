import { ProfileBadge } from "@modules/profile/components/profileBadge";

export const MinimumInfo = () => {
  return (
    <>
      <ProfileBadge user={user} />
      <div className="flex flex-col gap-8 justify-items-stretch mt-8">
        <div className="flex flex-col gap-4 w-full items-center content-center">
          <p>{t('yourUserInformationProgress')}:</p>
          <ProgressBar progress={30} />
        </div>
        <PrivacyPolicy />
        <div className="flex flex-row gap-6 self-center">
          <NavLink to="revisar">
            <div className="button">{t('reviewUser')}</div>
          </NavLink>
          <NavLink to="completar">
            <div className="button">{t('completeUser')}</div>
          </NavLink>
        </div>
      </div>
    </>
  );
};
