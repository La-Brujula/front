import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';

export const SignupForm = () => {
  const { register, handleSubmit, setValue, watch, formState } = useForm();
  const tipoDePersona = watch('persona', 'fisica');
  const { t } = useTranslation('auth');
  const navigate = useNavigate()
  return (
    <form
      onSubmit={handleSubmit(() => {
        try {
            navigate('basica')
        } catch (e) {}
      })}
      className="flex flex-col gap-4"
    >
      <input type="hidden" {...register('persona')} required />
      <div className="flex flex-col gap-4">
        <label>{t('personTypeQuestion')}</label>
        <div className="flex flex-row gap-4 items-center justify-center mb-4">
          <button
            className={[
              'outline outline-primary outline-1 px-8 py-4 rounded-lg cursor-pointer',
              tipoDePersona == 'fisica'
                ? 'bg-primary text-white'
                : 'bg-transparent text-primary',
            ].join(' ')}
            onClick={(ev) => {
              setValue('persona', 'fisica', {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true,
              });
              ev.preventDefault();
            }}
          >
            {t('fiscalPerson')}
          </button>
          <button
            className={[
              'outline outline-primary outline-1 px-8 py-4 rounded-lg cursor-pointer',
              tipoDePersona == 'moral'
                ? 'bg-primary text-white'
                : 'bg-transparent text-primary',
            ].join(' ')}
            onClick={(ev) => {
              setValue('persona', 'moral', {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true,
              });
              ev.preventDefault();
            }}
          >
            {t('moralPerson')}
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-baseline gap-8 justify-center">
        <div className="flex flex-col gap-2 items-start grow max-w-xs">
          <label htmlFor="email" className="block">
            {t('email')}
          </label>
          <input
            id="email"
            type="email"
            placeholder={t('email')}
            autoComplete="email"
            className="w-full"
            {...register('email')}
            required
          />
        </div>
        <div className="flex flex-col gap-2 items-start grow max-w-xs">
          <label htmlFor="password">{t('password')}</label>
          <input
            id="password"
            type="password"
            placeholder={t('password')}
            autoComplete="password"
            className="w-full"
            {...register('password')}
            required
          />
        </div>
      </div>
      <input
        type="submit"
        className="max-w-xs mx-auto mt-8 bg-primary"
        value={t('createUser')}
      />
      <p>
        {t('alreadyHaveAccount')}&nbsp;
        <NavLink to="/iniciar-sesion" className="mt-4">
          {t('login')}
        </NavLink>
      </p>
    </form>
  );
};
