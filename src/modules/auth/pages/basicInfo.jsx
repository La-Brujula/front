import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ButtonSelect } from '@shared/components/buttonSelect';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@shared/context/firebaseContext';
import { brujulaUtils } from '@shared/utils/brujulaUtils';
import { useUserInfo } from '@shared/hooks/useUserInfo';
import { LoadingSpinner } from '@shared/components/loadingSpinner';
import { ErrorMessage } from '@shared/components/errorMessage';
import { useMemo } from 'react';
import { UniversidadesSelect } from '../components/universidadesSelect';
import genders from '@shared/constants/genders.json';

export const BasicInfo = () => {
  const auth = useContext(AuthContext);
  const brujula = brujulaUtils();
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!auth.isLoggedIn) navigate('/iniciar-sesion');
  }, []);
  const { register, handleSubmit, setValue, getValues } = useForm();

  const { user, loading, error } = useUserInfo(auth.getUserEmail());

  useMemo(() => {
    if (!!user) {
      setValue('gender', 'Persona Moral');
      Object.entries(user).forEach(([key, value]) => setValue(key, value));
    }
  }, [user]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    await brujula.updateUserInfo(data);
    setTimeout(() => {
      navigate('../area');
    }, 250);
    setIsLoading(false);
  };

  return loading || isLoading ? (
    <LoadingSpinner />
  ) : (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 mx-auto max-w-lg"
    >
      <p>*{t('información obligatoria')}</p>
      <div
        className="grid grid-cols-[max-content_minmax(12rem,_24rem)]
      text-right gap-4"
      >
        <label htmlFor="name" className="col-span-1">
          {user?.type == 'moral' ? t('Razón Social') : t('Nombre (s)')} *
        </label>
        <input
          type="text"
          id="name"
          {...register('name', { required: true })}
          autoComplete={user?.type != 'moral' && 'given-name'}
          required
        />
        {user?.type != 'moral' ? (
          <>
            <label htmlFor="lastname" className="col-span-1">
              {t('Apellido (s)')} *
            </label>
            <input
              type="text"
              id="lastname"
              {...register('lastname', { required: user?.type != 'moral' })}
              autoComplete="family-name"
              required={user?.type == 'moral'}
            />
          </>
        ) : (
          <></>
        )}
        {user?.type != 'moral' ? (
          <>
            <label htmlFor="gender">{t('Género')}*</label>
            <select
              id="gender"
              {...register('gender', { required: user?.type != 'moral' })}
              defaultValue={''}
            >
              <option value="" disabled>
                {t('Género')} *
              </option>
              {genders.map((gender) => (
                <option value={gender} key={gender}>
                  {t(gender)}
                </option>
              ))}
            </select>
          </>
        ) : (
          <input
            type="hidden"
            {...register('gender', { required: true })}
            value="Persona Moral"
          />
        )}
        {user?.type != 'moral' && <>
          <label htmlFor="birthday" className="col-span-1">
            {t('Fecha de nacimiento')}
          </label>
          <input
            type="date"
            id="birthady"
            {...register('birthday')}
            autoComplete={user?.type != 'moral' && 'birthday'}
          />
        </>
        }
        <p className="col-span-full text-xs">Este dato solamente es para uso interno</p>
        <div className="col-span-2 flex flex-col gap-4 text-center">
          <label htmlFor="nickname" className="col-span-1">
            {t('Nombre con el que quieres aparecer')}
          </label>
          <input
            type="text"
            id="nickname"
            {...register('nickname')}
            autoComplete="nickname"
          />
        </div>
        <p className="col-span-2 text-center">
          {t('¿Dónde resides actualmente?')}
        </p>
        <label htmlFor="city" className="col-span-1">
          {t('Ciudad')}
        </label>
        <input type="text" id="city" {...register('city')} />
        <label htmlFor="state" className="col-span-1">
          {t('Estado')}
        </label>
        <input type="text" id="state" {...register('state')} />
        <label htmlFor="country" className="col-span-1">
          {t('País')}
        </label>
        <input type="text" id="country" {...register('country')} />
        <label htmlFor="phone" className="col-span-1">
          {t('Teléfono')}
        </label>
        <input type="phone" id="phone" {...register('phone')} />
      </div>
      {user?.type != 'moral' && (
        <>
          <label htmlFor="phone" className="col-span-1">
            {t('¿Te interesa ser becario o hacer servicio social?')}
          </label>
          <input type="hidden" {...register('probono')} />
          <ButtonSelect
            fieldName="probono"
            values={[true, false]}
            labels={['SÍ', 'NO']}
            setValue={setValue}
            getValue={getValues}
          />
          <label htmlFor="university" className="col-span-1">
            {t('¿Estudias o estudiaste en alguna de estas escuelas?')}
          </label>
          <UniversidadesSelect fieldname="university" register={register} />
        </>
      )}
      {!!error && <ErrorMessage message={error.toString()} />}
      <div className="flex flex-row gap-4 self-center">
        <div className="button font-bold bg-transparent border border-primary text-black" onClick={() => navigate(-1)}>
          {t('Regresar')}
        </div>
        <input type="submit" className="border-none" value={t('Continuar')} />
      </div>
    </form>
  );
};

export default BasicInfo;
