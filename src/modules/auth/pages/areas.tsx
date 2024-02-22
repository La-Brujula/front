import CloseOutlined from '@mui/icons-material/CloseOutlined';
import ErrorMessage from '@shared/components/errorMessage';
import { LoadingSpinner } from '@shared/components/loadingSpinner';
import { useUserInfo } from '@shared/hooks/useUserInfo';
import { brujulaUtils } from '@shared/utils/brujulaUtils';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ActivityLookupField } from '../components/activityLookupField.js';
import AreaForms from '../components/areaForm.js';
import { useAreasReducer } from '../hooks/useAreasReducer.js';
import { useAuth } from '@shared/context/auth';
import { EnumGender } from '@/shared/types/genders.js';

export const AreasRegistration = () => {
  const auth = useAuth();
  const brujula = brujulaUtils();
  const { user, loading, error: userError } = useUserInfo(auth.getUserEmail());
  const [error, setError] = useState<unknown | undefined>(undefined);

  const navigate = useNavigate();

  const {
    state: activities,
    dispatch,
    removeElement,
  } = useAreasReducer(user?.subareas);

  const { t } = useTranslation('auth');

  useMemo(() => {
    if (!user?.subareas) return;
    dispatch({ type: 'clear' });
    user?.subareas.forEach((activity) =>
      dispatch({ type: 'add', item: activity }),
    );
  }, [user]);

  const changeListener = (index: number) => (activity: string) => {
    dispatch({ type: 'change', index: index, item: activity });
  };

  return loading ? (
    <LoadingSpinner />
  ) : !!userError ? (
    <ErrorMessage message={userError.toString()} />
  ) : (
    <>
      <div className="flex flex-col gap-8">
        <h1>{t('Áreas')}</h1>
        {activities.map((activity, i) => (
          <div
            key={i}
            className="flex flex-row gap-4 items-center no-wrap w-full"
          >
            <AreaForms
              defaultValue={activity}
              changeListener={changeListener(i)}
              gender={user?.gender || 'No Binario'}
            />
            {activities.length > 1 && (
              <div
                onClick={removeElement(i)}
                className="cursor-pointer"
              >
                <CloseOutlined />
              </div>
            )}
          </div>
        ))}
      </div>
      {activities.length < 3 && (
        <div className="mt-12 grid justify-center">
          <ActivityLookupField setValue={changeListener(activities.length)} />
          <div
            className="cursor-pointer mt-6 px-4 py-2 bg-secondary text-white
          rounded-md mx-auto w-fit"
            onClick={() => dispatch({ type: 'add' })}
          >
            {t('Agregar otra actividad')}
          </div>
        </div>
      )}
      {!!error && (
        <div className="my-8">
          <ErrorMessage message={error.toString()} />
        </div>
      )}
      <div className="flex flex-row gap-4 self-center w-full justify-center mt-4">
        <div
          className="button font-bold bg-transparent border border-primary text-black"
          onClick={() => navigate(-1)}
        >
          {t('Regresar')}
        </div>
        <div
          onClick={async () => {
            if (
              activities.length == 0 ||
              activities.some((activity) => !!!activity)
            )
              return setError('Tienes que tener al menos una actividad');
            await brujula.updateUserInfo({ subareas: activities });
            navigate('../resumen');
          }}
          className="button font-bold"
        >
          {t('Continuar')}
        </div>
      </div>
    </>
  );
};

export default AreasRegistration;
