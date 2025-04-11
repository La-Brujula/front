import { useMemo } from 'react';

import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserDTO } from '@/modules/search/queries/searchQuery';
import DataSuspense from '@/shared/components/dataSuspense';
import { ErrorMessage } from '@/shared/components/errorMessage';
import { useAuth } from '@/shared/providers/authProvider';
import { IBackendProfile } from '@/shared/types/user';

import { useToggleRecommendation } from '../hooks/useToggleRecommendation';

export const Recommendations = ({ user }: { user: IBackendProfile }) => {
  const { t } = useTranslation('profile');
  const { account, isLoggedIn } = useAuth(['account', 'isLoggedIn']);

  const { mutate, isPending, error } = useToggleRecommendation(user?.id);

  const isAlreadyRecommended = useMemo(() => {
    if (!isLoggedIn || !user) return false;
    return (
      user.recommendations?.find(
        (profile: UserDTO) => profile.id == account!.ProfileId
      ) !== undefined
    );
  }, [user.recommendations]);

  if (user === undefined) {
    return <ErrorMessage message={t('No encontramos ese perfíl')} />;
  }

  return (
    <div className="flex flex-col items-center">
      {isLoggedIn && user.id !== account!.ProfileId && (
        <Button
          disabled={isPending}
          className="z-[1] flex h-fit w-fit cursor-pointer flex-col gap-2 rounded-lg bg-secondary px-12 py-4"
          onClick={() => mutate()}
        >
          <img
            src={import.meta.env.BASE_URL + 'img/BrujulaWhite.svg'}
            alt=""
            className="max-h-[4rem]"
          />
          <h4 className="text-center text-white">
            <DataSuspense
              loading={isPending}
              fallback="..."
              error={error}
            >
              {isAlreadyRecommended
                ? t('Dejar de recomendar')
                : t('Recomendar')}
            </DataSuspense>
          </h4>
        </Button>
      )}
      <div
        className={[
          'w-full bg-black bg-opacity-20 p-4',
          'flex flex-row items-center gap-8 rounded-lg',
          isLoggedIn && account!.email != user.primaryEmail && '-mt-4 pt-8',
        ].join(' ')}
      >
        <img
          src={import.meta.env.BASE_URL + 'img/LogoBlue.svg'}
          alt=""
          className="max-h-[4rem]"
        />
        <h5 className="text-2xl">{user.recommendationsCount || 0}</h5>
        <div className="flex flex-col gap-4">
          <h4 className="text-base font-normal">
            {t('Brújulas de recomendación')}
          </h4>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="link">{t('Recomendaciones')}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {user.recommendations.map((a) => (
                <DropdownMenuItem key={a.id}>
                  <Link
                    to="/profile/$userId"
                    params={{ userId: a.id }}
                    className="text-primary"
                    resetScroll
                  >
                    {a.fullName}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
