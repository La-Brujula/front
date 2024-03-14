import { ButtonSelect } from '@shared/components/buttonSelect';
import ErrorMessage from '@shared/components/errorMessage';
import { LoadingSpinner } from '@shared/components/loadingSpinner';
import genders from '@shared/constants/genders.json';
import { useUserInfo } from '@shared/hooks/useUserInfo';
import { brujulaUtils } from '@shared/utils/brujulaUtils';
import {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { UniversidadesSelect } from '../components/universidadesSelect';
import { useAuth } from '@shared/context/auth';
import { IFirebaseProfileUpdate } from '@/shared/types/user';
import { Input } from '@/shared/components/input';
import CountrySelect from '@/shared/components/countrySelect';

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
    <ErrorMessage message={t('Could not load user')} />
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
        <Input
          label={user.type == 'moral' ? t('Razón Social') : t('Nombre (s)')}
          type="text"
          autoComplete={user?.type != 'moral' ? 'given-name' : ''}
          register={register}
          fieldName="name"
          divClass="!grid grid-cols-subgrid col-span-2"
          required={true}
        />
        {user.type != 'moral' && (
          <>
            <Input
              label={t('Apellido (s)')}
              type="text"
              autoComplete="family-name"
              register={register}
              fieldName="lastname"
              divClass="!grid grid-cols-subgrid col-span-2"
              required={true}
            />
          </>
        )}
        {user?.type != 'moral' ? (
          <Input
            label={t('Género')}
            type="select"
            register={register}
            fieldName="gender"
            divClass="!grid grid-cols-subgrid col-span-2"
            required={true}
            items={genders.map((gender) => ({
              key: gender == 'Prefiero no decir' ? 'No binario' : gender,
              label: t(gender),
            }))}
          />
        ) : (
          <input
            type="hidden"
            {...register('gender', { required: true })}
            value="Persona Moral"
          />
        )}
        {user?.type != 'moral' && (
          <Input
            label={t('Fecha de nacimiento')}
            type="date"
            register={register}
            fieldName="birthday"
            autoComplete="birthday"
            divClass="!grid grid-cols-subgrid col-span-2"
            required={true}
          />
        )}
        <p className="col-span-full text-xs">
          {t('Este dato solamente es para uso interno')}
        </p>
        <div className="col-span-2 flex flex-col gap-4 text-center">
          <Input
            label={t('Fecha de nacimiento')}
            type="date"
            register={register}
            fieldName="birthday"
            autoComplete="birthday"
            divClass="!grid grid-cols-subgrid col-span-2"
          />
        </div>
        <p className="col-span-2 text-center">
          {t('¿Dónde resides actualmente?')}
        </p>
        <Input
          label={t('País')}
          type="custom"
          register={register}
          fieldName="country"
          autoComplete="country"
          divClass="!grid grid-cols-subgrid col-span-2"
          component={<CountrySelect {...register('country')} />}
        />
        <Input
          label={t('Estado')}
          type="state"
          register={register}
          fieldName="state"
          autoComplete="state"
          divClass="!grid grid-cols-subgrid col-span-2"
        />
        <Input
          label={t('Ciudad')}
          type="city"
          register={register}
          fieldName="city"
          autoComplete="city"
          divClass="!grid grid-cols-subgrid col-span-2"
        />
        <Input
          label={t('Teléfono')}
          type="phone"
          register={register}
          fieldName="phone"
          autoComplete="phone"
          divClass="!grid grid-cols-subgrid col-span-2"
        />
      </div>
      {user?.type != 'moral' && (
        <>
          <Input
            label={t('¿Te interesa ser becario o hacer servicio social?')}
            type="custom"
            register={register}
            fieldName="probono"
            component={
              <ButtonSelect
                fieldName={'probono'}
                values={[true, false]}
                labels={[t('SÍ'), t('NO')]}
                setValue={setValue}
                getValue={getValues}
              />
            }
          />
          <Input
            label={t('¿Estudias o estudiaste en alguna de estas escuelas?')}
            type="custom"
            register={register}
            fieldName="university"
            component={
              <UniversidadesSelect
                onChange={(ev: ChangeEvent<HTMLSelectElement>) =>
                  setValue('university', ev.currentTarget.value)
                }
                placeholder={t('Universidad')}
              />
            }
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
