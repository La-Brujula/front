import { useMemo } from 'react';

import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { Link, createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { ContactSection } from '@/modules/profile/components/contactInfo';
import { ProfileHeader } from '@/modules/profile/components/profileHeader';
import { Recommendations } from '@/modules/profile/components/recommend';
import { profileQueryOptions } from '@/modules/profile/queries/userProfile';
import DataSuspense from '@/shared/components/dataSuspense';
import { LoadingSpinner } from '@/shared/components/loadingSpinner';
import { useLoggedInAccount } from '@/shared/hooks/useLoggedInAccount';

// i18next-parser static types

// Proficiency
// t('common:basic')
// t('common:intermediate')
// t('common:advanced')
// t('common:native')

// Languages
// t("common:es")
// t("common:en")
// t("common:fr")
// t("common:de")
// t("common:it")
// t("common:zh")

export const Route = createLazyFileRoute('/profile/$userId')({
  component: UserProfilePage,
  pendingComponent: PendingUserProfilePage,
});

function PendingUserProfilePage() {
  return <LoadingSpinner />;
}

export function UserProfilePage() {
  const { userId } = Route.useParams();
  const navigate = useNavigate();

  const account = useLoggedInAccount();
  let assignedProfileId = account?.ProfileId === userId ? 'me' : userId;

  const queryOptions = useMemo(
    () => profileQueryOptions(assignedProfileId),
    [assignedProfileId]
  );

  const {
    data: user,
    isLoading: loading,
    error,
  } = useSuspenseQuery(queryOptions);
  const { t } = useTranslation('profile');

  if (userId == 'me' && account === null) {
    return navigate({ to: '/auth/login', search: { redirect: '/profile/me' } });
  }

  return (
    <div key={userId}>
      <ProfileHeader user={user!} />
      <div className="mx-auto mb-4 w-full max-w-lg items-start justify-start px-8 xl:max-w-4xl">
        <div className="order-last flex flex-col xl:order-first xl:shrink xl:flex-row xl:gap-16">
          <div className="mx-auto mt-8 flex w-full max-w-sm flex-col justify-items-stretch gap-4 text-left">
            <ContactSection user={user!} />
            {!!user?.university && user.type != 'moral' && (
              <div className="py-8">
                <div className="absolute left-0 -z-10 -my-4 w-full transform overflow-hidden">
                  <div className="h-20 w-full bg-black bg-opacity-20 xl:w-1/2 xl:rounded-r-md"></div>
                </div>
                <h4 className="font-normal text-primary">{t('Universidad')}</h4>
                <p className="truncate">{user.university}</p>
              </div>
            )}
            {!!user?.probono && (
              <div className="py-8">
                <div className="absolute left-0 -z-10 -my-4 w-full transform overflow-hidden">
                  <div className="h-20 w-full bg-black bg-opacity-20 xl:w-1/2 xl:rounded-r-md"></div>
                </div>
                <h4 className="font-normal text-primary">
                  {t('Interés en ser becario, servicio social')}
                </h4>
                <p>{t('Sí')}</p>
              </div>
            )}
          </div>
          <div className="xl:-translate-y-42 mx-auto mt-8 flex w-full max-w-lg flex-col justify-items-stretch gap-6 text-left xl:mx-0 xl:max-w-3xl">
            <Recommendations user={user!} />
            {!!user?.biography && (
              <div>
                <h4 className="font-normal text-primary">{t('Semblanza')}</h4>
                <p>{user.biography}</p>
              </div>
            )}
            {!!user?.languages && (
              <div>
                <h4 className="font-normal text-primary">{t('Idiomas')}</h4>
                <div className="grid grid-cols-[max-content_max-content] gap-x-4 gap-y-2">
                  {user.languages.map(({ lang, proficiency }) => (
                    <div
                      className="col-span-2 grid grid-cols-subgrid"
                      key={lang}
                    >
                      <h5 className="font-normal">
                        {t(lang, { ns: 'languages' })}
                      </h5>
                      <p className="opacity-60">
                        {t(proficiency, { ns: 'languages' })}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {!!user?.associations && (
              <div>
                <h4 className="font-normal text-primary">
                  {t('Asociaciones')}
                </h4>
                <p>{user.associations}</p>
              </div>
            )}
            {!!user?.certifications && (
              <div>
                <h4 className="font-normal text-primary">
                  {t('Certificaciones')}
                </h4>
                <p>{user.certifications}</p>
              </div>
            )}
            {!!user?.awards && (
              <div>
                <h4 className="font-normal text-primary">
                  {t('Reconocimientos')}
                </h4>
                <p>{user.awards}</p>
              </div>
            )}
            <div className="my-8"></div>
          </div>
        </div>
        {account?.email == user?.primaryEmail && (
          <Link
            to="/auth/delete-account"
            className="block text-center text-sm !text-slate-400"
            resetScroll
          >
            {t('Borrar cuenta')}
          </Link>
        )}
      </div>
    </div>
  );
}
