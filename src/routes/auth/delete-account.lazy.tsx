import { Container } from '@shared/layout/container';
import { useDeleteMyUser } from '../../modules/deleteAccount/hooks/useUserDelete';
import { Trans, useTranslation } from 'react-i18next';
import { Link, createLazyFileRoute } from '@tanstack/react-router';
import { useAuth } from '@/shared/providers/authProvider';

export const Route = createLazyFileRoute('/auth/delete-account')({
  component: DeleteUserPage,
});

function DeleteUserPage() {
  const { mutate: deleteMyAccount } = useDeleteMyUser();
  const { account } = useAuth(['account']);
  const { t } = useTranslation('deleteAccount');
  return (
    <Container>
      <h1>{t('Borrar mi usuario')}</h1>
      <p className="text-lg">
        {t('¿Estás seguro de que quieres eliminar tu usuario de La Brújula?')}
      </p>
      <p className="text-slate-500 my-8">
        <Trans
          i18nKey="deleteAccountDisclaimer"
          t={t}
        >
          Si eliminas tu cuenta: Eliminaremos tu dirección de correo
          electrónico, contraseña y toda la información que hayas dado de alta
          en nuestra plataforma se perderá y no podrás recupeparla. Ya no podrás
          acceder a tu usuario. Se perderá tu cuenta y el acceso a sus métodos
          de autenticación
        </Trans>
      </p>
      <Link
        to="/profile/$userId"
        params={{ userId: account!.ProfileId }}
        className="button mb-4 block w-fit mx-auto"
      >
        {t('Regresar')}
      </Link>
      <button
        className="px-4 py-2 text-slate-400 cursor-pointer bg-transparent"
        onClick={() => deleteMyAccount()}
      >
        {t('Deseo eliminar mi cuenta de manera definitiva')}
      </button>
    </Container>
  );
}

export default DeleteUserPage;
