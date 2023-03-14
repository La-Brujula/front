import { useTranslation } from 'react-i18next';
import { useUserInfo } from '@shared/hooks/useUserInfo';
import { LoadingSpinner } from '@shared/components/loadingSpinner';
import { ErrorMessage } from '@shared/components/errorMessage';
import { NavLink } from 'react-router-dom';
import { ProfileHeader } from '@modules/profile/components/profileHeader';
import EmailOutlined from '@mui/icons-material/EmailOutlined';
import PhoneOutlined from '@mui/icons-material/PhoneOutlined';
import { useAuth } from '@shared/context/firebaseContext';
import { getTitle } from '@shared/utils/areaUtils';

export const ProfileSummary = () => {
  const { t } = useTranslation('auth');
  const { getUserEmail } = useAuth();
  const { user, loading, error } = useUserInfo(getUserEmail());

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
        <h3>{user?.type != 'moral' ? t('Razón Social') : t('Nombre (s)')}</h3>
        <p className="text-left text-primary">{user.name}</p>
        {user?.type != 'moral' && <>
          <h3>{t('Apellido (s)')}</h3>
          <p className="text-left text-primary">{user.lastname}</p>
        </>
        }
        <h3>{t('Nickname')}</h3>
        <p className="text-left text-primary">{user.nickname}</p>
        {user?.type != 'moral' && <>
          <h3>{t('Género')}</h3>
          <p className="text-left text-primary">{user.gender}</p>
        </>
        }
        <div className="col-span-2"></div>
        <h3>{t('Actividad Principal')}</h3>
        <p className="text-left text-primary">{!!user.subareas && getTitle(user.subareas[0], user.gender)}</p>
        <div className="col-span-2"></div>
        <h3>{t('Ciudad')}</h3>
        <p className="text-left text-primary">{user.city}</p>
        <h3>{t('Estado')}</h3>
        <p className="text-left text-primary">{user.state}</p>
        <h3>{t('País')}</h3>
        <p className="text-left text-primary">{user.country}</p>
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
        <NavLink to="../destaca">
          <div className="button font-bold">{t('Continuar')}</div>
        </NavLink>
      </div>
    </>
  );
};

export default ProfileSummary;
