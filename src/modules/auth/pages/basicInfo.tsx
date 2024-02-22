import { ButtonSelect } from '@shared/components/buttonSelect';
import ErrorMessage from '@shared/components/errorMessage';
import { LoadingSpinner } from '@shared/components/loadingSpinner';
import genders from '@shared/constants/genders.json';
import { useUserInfo } from '@shared/hooks/useUserInfo';
import { brujulaUtils } from '@shared/utils/brujulaUtils';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { UniversidadesSelect } from '../components/universidadesSelect';
import { useAuth } from '@shared/context/auth';
import { IFirebaseProfileUpdate } from '@/shared/types/user';

export const BasicInfo = () => {
  const auth = useAuth();
  const brujula = brujulaUtils();
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!auth.isLoggedIn) navigate('/iniciar-sesion');
  }, []);
  const { register, handleSubmit, setValue, getValues } =
    useForm<IFirebaseProfileUpdate>();

  const { user, loading, error } = useUserInfo(auth.getUserEmail());

  useMemo(() => {
    if (!!user) {
      setValue('gender', 'Persona Moral');
      Object.entries(user).forEach(([key, value]) =>
        setValue(key as keyof IFirebaseProfileUpdate, value),
      );
    }
  }, [user]);

  const onSubmit = async (data: IFirebaseProfileUpdate) => {
    setIsLoading(true);
    await brujula.updateUserInfo(data);
    setTimeout(() => {
      navigate('../area');
    }, 250);
    setIsLoading(false);
  };

  return loading || isLoading ? (
    <LoadingSpinner />
  ) : user === undefined ? (
    <ErrorMessage message="Could not load user" />
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
        <label
          htmlFor="name"
          className="col-span-1"
        >
          {user.type == 'moral' ? t('Razón Social') : t('Nombre (s)')} *
        </label>
        <input
          type="text"
          id="name"
          {...register('name', { required: true })}
          autoComplete={user?.type != 'moral' ? 'given-name' : ''}
          required
        />
        {user.type != 'moral' && (
          <>
            <label
              htmlFor="lastName"
              className="col-span-1"
            >
              {t('Apellido (s)')} *
            </label>
            <input
              type="text"
              id="lastName"
              {...register('lastname', {
                required: true,
              })}
              autoComplete="family-name"
              required={true}
            />
          </>
        )}
        {user?.type != 'moral' ? (
          <>
            <label htmlFor="gender">{t('Género')}*</label>
            <select
              id="gender"
              {...register('gender', {
                required: true,
              })}
              defaultValue={''}
            >
              <option
                value=""
                disabled
              >
                {t('Género')} *
              </option>
              {genders.map((gender) => (
                <option
                  value={gender}
                  key={gender}
                >
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
        {user?.type != 'moral' && (
          <>
            <label
              htmlFor="birthday"
              className="col-span-1"
            >
              {t('Fecha de nacimiento')}
            </label>
            <input
              type="date"
              id="birthday"
              {...register('birthday')}
              autoComplete="birthday"
            />
          </>
        )}
        <p className="col-span-full text-xs">
          Este dato solamente es para uso interno
        </p>
        <div className="col-span-2 flex flex-col gap-4 text-center">
          <label
            htmlFor="nickname"
            className="col-span-1"
          >
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
        <label
          htmlFor="city"
          className="col-span-1"
        >
          {t('Ciudad')}
        </label>
        <input
          type="text"
          id="city"
          {...register('city')}
        />
        <label
          htmlFor="state"
          className="col-span-1"
        >
          {t('Estado')}
        </label>
        <input
          type="text"
          id="state"
          {...register('state')}
        />
        <label
          htmlFor="country"
          className="col-span-1"
        >
          {t('País')}
        </label>
        <input
          type="text"
          id="country"
          {...register('country')}
        />
        <label
          htmlFor="phone"
          className="col-span-1"
        >
          {t('Teléfono')}
        </label>
        <input
          type="phone"
          id="phone"
          {...register('phone')}
        />
      </div>
      {user?.type != 'moral' && (
        <>
          <label
            htmlFor="phone"
            className="col-span-1"
          >
            {t('¿Te interesa ser becario o hacer servicio social?')}
          </label>
          <input
            type="hidden"
            {...register('probono')}
          />
          <ButtonSelect
            fieldName="probono"
            values={[true, false]}
            labels={['SÍ', 'NO']}
            setValue={setValue}
            getValue={getValues}
          />
          <label
            htmlFor="university"
            className="col-span-1"
          >
            {t('¿Estudias o estudiaste en alguna de estas escuelas?')}
          </label>
          <UniversidadesSelect
            fieldName="university"
            register={register}
          />
        </>
      )}
      {!!error && <ErrorMessage message={error.toString()} />}
      <div className="flex flex-row gap-4 self-center">
        <div
          className="button font-bold bg-transparent border border-primary text-black"
          onClick={() => navigate(-1)}
        >
          {t('Regresar')}
        </div>
        <input
          type="submit"
          className="border-none"
          value={t('Continuar')}
        />
      </div>
    </form>
  );
};

export default BasicInfo;
