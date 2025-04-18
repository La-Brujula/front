import DataSuspense from '@/shared/components/dataSuspense';
import { useCurrentProfile } from '@/shared/hooks/useCurrentProfile';
import EmailOutlined from '@mui/icons-material/EmailOutlined';
import PhoneOutlined from '@mui/icons-material/PhoneOutlined';
import ErrorMessage from '@shared/components/errorMessage';
import { getTitle } from '@shared/utils/areaUtils';
import { Link, createLazyFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export const Route = createLazyFileRoute('/me/summary')({
  component: ProfileSummary,
});

function ProfileSummary() {
  const { t } = useTranslation(['auth', 'genders', 'countries']);
  const { data: user, isLoading, error } = useCurrentProfile();

  return (
    <DataSuspense
      loading={isLoading}
      error={error}
      errorComponent={
        <ErrorMessage
          message={(error || t('No user could be found')).toString()}
        />
      }
    >
      <div
        className="flex flex-col gap-x-8 gap-y-4
        mx-auto mt-8 w-auto text-left max-w-sm"
      >
        <div className="grid gap-2">
          <h3>
            <EmailOutlined />
          </h3>
          <a
            href={`mailto:${user?.primaryEmail}`}
            className="text-left text-primary underline"
          >
            {user?.primaryEmail}
          </a>
        </div>
        <div className="col-span-2"></div>
        <div className="grid gap-2">
          <h3>{user?.type != 'moral' ? t('Nombre') : t('Razón Social')}</h3>
          <p className="text-left text-primary">{user?.fullName}</p>
        </div>
        {user?.nickName && (
          <div className="grid gap-2">
            <h3>{t('Nickname')}</h3>
            <p className="text-left text-primary">{user?.nickName}</p>
          </div>
        )}
        {user?.type != 'moral' && (
          <div className="grid gap-2">
            <h3>{t('Género')}</h3>
            <p className="text-left text-primary">
              {t(user!.gender || 'other', { ns: 'genders' })}
            </p>
          </div>
        )}
        <div className="col-span-2"></div>
        <div className="grid gap-2">
          <h3>{t('Actividad Principal')}</h3>
          <p className="text-left text-primary">
            {!!user?.primaryActivity &&
              getTitle(user?.primaryActivity, user?.gender)}
          </p>
        </div>
        {user?.secondaryActivity && (
          <div className="grid gap-2">
            <h3>{t('Otras actividades')}</h3>
            <p className="text-left text-primary grid gap-2">
              {[user.secondaryActivity, user.thirdActivity]
                .filter((a) => a != undefined)
                .map((activity) => (
                  <span>{getTitle(activity!, user?.gender)}</span>
                ))}
            </p>
          </div>
        )}
        <div className="col-span-2"></div>
        <div className="grid gap-2">
          <h3>{t('Ciudad')}</h3>
          <p className="text-left text-primary">{user?.city}</p>
        </div>
        <div className="grid gap-2">
          <h3>{t('Estado')}</h3>
          <p className="text-left text-primary">{user?.state}</p>
        </div>
        <div className="grid gap-2">
          <h3>{t('País')}</h3>
          <p className="text-left text-primary">
            {t(user?.country || 'MX', { ns: 'countries' })}
          </p>
        </div>
        {user?.phoneNumbers?.map((tel, i) => (
          <div className="grid grid-cols-subgrid col-span-full">
            <h3>
              <PhoneOutlined />
            </h3>
            <a
              href={`tel:${tel}`}
              className="text-left text-primary underline"
              key={tel + i}
            >
              {tel}
            </a>
          </div>
        ))}
      </div>
      <div className="flex flex-row gap-4 self-center justify-center my-8">
        <Link
          to="/me/stand-out"
          resetScroll
        >
          <div className="button font-bold">{t('Continuar')}</div>
        </Link>
      </div>
    </DataSuspense>
  );
}

export default ProfileSummary;
