import AddOutlined from '@mui/icons-material/AddOutlined';
import { useContext, useMemo, useReducer } from 'react';
import { useUserInfo } from '../../../shared/hooks/useUserInfo';
import { LoadingSpinner } from '@shared/components/loadingSpinner';
import { ErrorMessage } from '@shared/components/errorMessage';
import AreaForms from '../components/areaForm';
import { brujulaUtils } from '@shared/utils/brujulaUtils';
import { AuthContext } from '@shared/context/firebaseContext';
import { useTranslation } from 'react-i18next';
import CloseOutlined from '@mui/icons-material/CloseOutlined';
import { useNavigate } from 'react-router-dom';

const activityReducer = (state, action) => {
  const newArray = !!state ? state.slice() : [];
  switch (action.type) {
    case 'add':
      newArray.splice(newArray.length, 0, action.item);
      return [...newArray];
    case 'remove':
      if (action.index === undefined) throw 'Missing index';
      newArray.splice(action.index, 1);
      return [...newArray];
    case 'change':
      if (action.index === undefined) throw 'Missing index';
      if (action.item === undefined) throw 'Missing item';
      newArray.splice(action.index, 1, action.item);
      return [...newArray];
    case 'clear':
      return [];
  }
};

export const AreasRegistration = () => {
  const auth = useContext(AuthContext);
  const brujula = brujulaUtils();
  const { user, loading, error } = useUserInfo(auth.getUserEmail());

  const navigate = useNavigate();

  const [activities, dispatch] = useReducer(
    activityReducer,
    user?.subareas || [undefined]
  );

  const { t } = useTranslation();

  useMemo(() => {
    if (!user.subareas) return;
    dispatch({ type: 'clear' });
    user.subareas.forEach((activity) =>
      dispatch({ type: 'add', item: activity })
    );
  }, [user]);

  const changeListener = (index) => (activity) => {
    dispatch({ type: 'change', index: index, item: activity });
  };

  return loading ? (
    <LoadingSpinner />
  ) : !!error ? (
    <ErrorMessage message={error.toString()} />
  ) : (
    <>
      <div className="flex flex-col gap-8">
        {activities.map((activity, i) => (
          <div
            key={i}
            className="flex flex-row gap-4 items-center no-wrap w-full"
          >
            <AreaForms
              defaultValue={activity}
              changeListener={changeListener(i)}
              gender={user.gender}
            />
            {activities.length > 1 && (
              <div
                onClick={() => dispatch({ type: 'remove', index: i })}
                className="cursor-pointer"
              >
                <CloseOutlined />
              </div>
            )}
          </div>
        ))}
      </div>
      {activities.length < 3 && (
        <div
          className="cursor-pointer mt-6"
          onClick={() => dispatch({ type: 'add' })}
        >
          <AddOutlined />
        </div>
      )}
      <div className="flex flex-row gap-4 self-center w-full justify-center mt-4">
        <div className="button font-bold" onClick={() => navigate(-1)}>
          {t('Regresar')}
        </div>
        <div
          onClick={async () => {
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
