import { Container } from '@shared/layout/container';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@shared/context/firebaseContext';
import { useState } from 'react';
import { LoadingSpinner } from '../../../shared/components/loadingSpinner';

const PasswordResetPage = () => {
  const { t } = useTranslation('passwordReset');
  const { register, handleSubmit } = useForm();
  const { resetUserPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  return (
    <Container>
      <h1 className="mb-8">{t('Reiniciar contraseña')}</h1>
      <p className="mb-4">
        {t(
          'Escribe tu correo aquí y si está registrado te llegará un correo para reiniciar tu contraseña'
        )}
      </p>
      {loading ? (
        <LoadingSpinner />
      ) : !emailSent ? (
        <form
          onSubmit={handleSubmit(async (values) => {
            setLoading(true);
            const res = await resetUserPassword(values.email);
            setLoading(false);
            setEmailSent(true);
          })}
          className="grid md:grid-cols-[min-content_1fr] flex-wrap gap-4 justify-center text-left
        max-w-md mx-auto"
        >
          <label htmlFor="email">{t('email')}</label>
          <input
            type="email"
            id="email"
            {...register('email', { required: true })}
            required
          />
          <input
            type="submit"
            value={t('Enviar Correo')}
            className="col-span-full mx-auto w-fit"
          />
        </form>
      ) : (
        <p className="px-4 py-2 rounded-md bg-emerald-400 text-white font-bold">
          Se ha enviado el correo con el link para reiniciar tu contraseña
        </p>
      )}
    </Container>
  );
};

export default PasswordResetPage;
