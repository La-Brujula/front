import { useTranslation } from 'react-i18next';
import { ContactSection } from '@/modules/profile/components/contactInfo';
import { ProfileHeader } from '@/modules/profile/components/profileHeader';
import { Recommendations } from '@/modules/profile/components/recommend';
import { Link, createLazyFileRoute } from '@tanstack/react-router';
import { useMemo } from 'react';
import { profileQueryOptions } from '@/modules/profile/queries/userProfile';
import { useQuery } from '@tanstack/react-query';
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

  const account = useLoggedInAccount();

  const queryOptions = useMemo(() => profileQueryOptions(userId), [userId]);

  const { data: user, isLoading: loading, error } = useQuery(queryOptions);
  const { t } = useTranslation('profile');

  return (
    <DataSuspense
      loading={loading}
      error={error}
    >
      <ProfileHeader user={user!} />
      <div className="max-w-lg xl:max-w-4xl mx-auto px-8 w-full justify-start items-start mb-4">
        <div className="flex flex-col xl:flex-row xl:gap-16 order-last xl:order-first xl:shrink">
          <div className="flex flex-col gap-4 justify-items-stretch mt-8 max-w-sm w-full mx-auto text-left">
            <ContactSection user={user!} />
            {!!user?.university && user.type != 'moral' && (
              <div className="py-8">
                <div className="absolute left-0 -z-10 -my-4 overflow-hidden transform w-full">
                  <div className="bg-black bg-opacity-20 w-full h-20 xl:w-1/2 xl:rounded-r-md"></div>
                </div>
                <h4 className="font-normal text-primary">{t('Universidad')}</h4>
                <p className="truncate">{user.university}</p>
              </div>
            )}
            {!!user?.probono && (
              <div className="py-8">
                <div className="absolute left-0 -z-10 -my-4 overflow-hidden transform w-full">
                  <div className="bg-black bg-opacity-20 w-full h-20 xl:w-1/2 xl:rounded-r-md"></div>
                </div>
                <h4 className="font-normal text-primary">
                  {t('Interés en ser becario, servicio social')}
                </h4>
                <p>{t('Sí')}</p>
              </div>
            )}
          </div>
          <div
            className="flex flex-col gap-6 w-full justify-items-stretch mt-8 max-w-lg
          xl:max-w-3xl mx-auto xl:mx-0 text-left xl:-translate-y-42"
          >
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
                      className="grid grid-cols-subgrid col-span-2"
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
            className="!text-slate-400 text-sm text-center block"
          >
            {t('Borrar cuenta')}
          </Link>
        )}
      </div>
    </DataSuspense>
  );
}
