import AddOutlined from '@mui/icons-material/AddOutlined';
import { useContext, useMemo } from 'react';
import { useUserInfo } from '@shared/hooks/useUserInfo';
import { LoadingSpinner } from '@shared/components/loadingSpinner';
import ErrorMessage from '@shared/components/errorMessage';
import AreaForms from '../components/areaForm';
import { brujulaUtils } from '@shared/utils/brujulaUtils';
import { AuthContext } from '@shared/context/firebaseContext';
import { useTranslation } from 'react-i18next';
import CloseOutlined from '@mui/icons-material/CloseOutlined';
import { useNavigate } from 'react-router-dom';
import { useAreasReducer } from '../hooks/useAreasReducer';
import { useState } from 'react';
import { ActivityLookupField } from '../components/activityLookupField';

export const AreasRegistration = () => {
  const auth = useContext(AuthContext);
  const brujula = brujulaUtils();
  const { user, loading, error: userError } = useUserInfo(auth.getUserEmail());
  const [error, setError] = useState(undefined);

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
      dispatch({ type: 'add', item: activity })
    );
  }, [user]);

  const changeListener = (index) => (activity) => {
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
              gender={user?.gender}
            />
            {activities.length > 1 && (
              <div onClick={removeElement(i)} className="cursor-pointer">
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
