import CloseOutlined from '@mui/icons-material/CloseOutlined';
import ErrorMessage from '@shared/components/errorMessage';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityLookupField } from '../../../modules/auth/components/activityLookupField.js';
import AreaForms from '../../../modules/auth/components/areaForm.js';
import { useAreasReducer } from '../../../modules/auth/hooks/useAreasReducer.js';
import { useCurrentProfile } from '@/shared/hooks/useCurrentProfile.js';
import {
  createLazyFileRoute,
  useNavigate,
  useRouter,
} from '@tanstack/react-router';
import { useUpdateMe } from '@/shared/hooks/useUpdateMe.js';
import DataSuspense from '@/shared/components/dataSuspense.js';
import { Button } from '@/shared/components/button.js';

export const Route = createLazyFileRoute('/profile/_edit/areas')({
  component: AreasRegistration,
});

function AreasRegistration() {
  const {
    data: user,
    isLoading: loading,
    error: userError,
  } = useCurrentProfile();
  const [error, setError] = useState<unknown | undefined>(undefined);

  const navigate = useNavigate();
  const { history } = useRouter();

  const {
    state: activities,
    dispatch,
    removeElement,
  } = useAreasReducer([], () =>
    [
      user?.primaryActivity,
      user?.secondaryActivity,
      user?.thirdActivity,
    ].filter((f) => f !== null)
  );

  const { t } = useTranslation('auth');

  useMemo(() => {
    if (!user?.primaryActivity) return;
    dispatch({ type: 'clear' });
    if (user.primaryActivity) {
      dispatch({ type: 'add', item: user.primaryActivity });
    }
    if (user.secondaryActivity) {
      dispatch({ type: 'add', item: user.secondaryActivity });
    }
    if (user.thirdActivity) {
      dispatch({ type: 'add', item: user.thirdActivity });
    }
  }, [user]);

  const addOnClick = useCallback(
    (activity: string) => {
      if (!activities.includes(activity))
        dispatch({ type: 'add', item: activity });
    },
    [dispatch, activities]
  );

  const { mutate, isPending, error: mutateError } = useUpdateMe();

  const changeListener = (index: number) => (activity: string) => {
    dispatch({ type: 'change', index: index, item: activity });
  };

  const submitForm = useCallback(async () => {
    if (activities.length == 0 || activities.some((activity) => !!!activity))
      return setError(t('Tienes que tener al menos una actividad'));
    mutate(
      {
        primaryActivity: activities[0],
        secondaryActivity: activities.length >= 1 ? activities[1] : undefined,
        thirdActivity: activities.length >= 2 ? activities[2] : undefined,
      },
      {
        onSuccess: () => navigate({ to: '/profile/edit/summary' }),
      }
    );
  }, [mutate, setError, activities]);

  return (
    <DataSuspense
      loading={loading}
      error={userError}
    >
      <div
        className="grid grid-cols-[max-content_minmax(12rem,_24rem)]
        text-left gap-8 mx-auto max-w-lg"
      >
        <h2 className="text-primary col-span-full">{t('Áreas')}</h2>
        {activities?.map((activity, i) => (
          <div
            key={activity}
            className="grid grid-cols-1 md:grid-cols-subgrid col-span-full gap-4"
          >
            <h3 className="text-secondary col-span-full text-lg text-left">
              {i === 0
                ? t('Actividad primaria')
                : i === 1
                  ? t('Actividad secundaria')
                  : i === 2
                    ? t('Actividad terciaria')
                    : t('Por favor contáctenos, no debería pasar esto')}
            </h3>
            <AreaForms
              defaultValue={activity}
              changeListener={changeListener(i)}
              gender={user?.gender || 'other'}
            />
            {activities?.length > 1 && (
              <div className="col-span-full grid justify-center">
                <Button
                  variant="filled"
                  color="secondary"
                  onClick={removeElement(i)}
                  className="cursor-pointer"
                >
                  {t('Borrar')}
                </Button>
              </div>
            )}
          </div>
        ))}
        {activities?.length < 3 && (
          <div className="grid col-span-full justify-center w-full">
            <ActivityLookupField setValue={addOnClick} />
          </div>
        )}
        {activities?.length < 3 && (
          <div className="col-span-full grid justify-center">
            <button
              className="cursor-pointer px-4 py-2 bg-secondary text-white
            rounded-md mx-auto w-fit"
              onClick={() => dispatch({ type: 'add' })}
            >
              {t('Encontrar actividad manualmente')}
            </button>
          </div>
        )}
        {!!error && (
          <div className="col-span-full">
            <ErrorMessage message={error.toString()} />
          </div>
        )}
        {!!mutateError && (
          <div className="col-span-full">
            <ErrorMessage message={mutateError.message} />
          </div>
        )}
        <div className="grid grid-cols-2 col-span-full">
          <div
            className="button font-bold bg-transparent border border-primary text-black"
            onClick={history.back}
          >
            {t('Regresar')}
          </div>
          <button
            onClick={submitForm}
            className="button font-bold"
            disabled={isPending}
          >
            {t('Continuar')}
          </button>
        </div>
      </div>
    </DataSuspense>
  );
}

export default AreasRegistration;
