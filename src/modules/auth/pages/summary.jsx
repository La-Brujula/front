import { useTranslation } from 'react-i18next';
import { useCurrentUser } from '@shared/hooks/useCurrentUser';
import { LoadingSpinner } from '@shared/components/loadingSpinner';
import { ErrorMessage } from '@shared/components/errorMessage';
import { NavLink } from 'react-router-dom';
import { ProfileHeader } from '@modules/profile/components/profileHeader';
import EmailOutlined from '@mui/icons-material/EmailOutlined';
import PhoneOutlined from '@mui/icons-material/PhoneOutlined';

export const ProfileSummary = () => {
  const { t } = useTranslation('auth');
  const { user, loading, error } = useCurrentUser();

  return loading ? (
    <LoadingSpinner />
  ) : error ? (
    <ErrorMessage message={error.toString()} />
  ) : (
    <>
      <ProfileHeader user={user} />
      <div
        className="grid grid-cols-[max-content_max-content]
      text-right gap-x-8 gap-y-4 mx-auto mt-8 w-auto justify-center"
      >
        <h3>
          <EmailOutlined />
        </h3>
        <a
          href={`mailto:${user.email}`}
          className="text-left text-primary underline"
        >
          {user.email}
        </a>
        <div className="col-span-2"></div>
        <h3>
          <PhoneOutlined />
        </h3>
        <a
          href={`tel:${user.phone}`}
          className="text-left text-primary underline"
        >
          {user.phone}
        </a>
      </div>
      <div className="flex flex-row gap-4 self-center justify-center mt-8">
        <NavLink to="../basica">
          <div className="button font-bold">{t('continue')}</div>
        </NavLink>
      </div>
    </>
  );
};

export default ProfileSummary;
