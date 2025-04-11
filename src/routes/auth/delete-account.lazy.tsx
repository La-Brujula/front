import { Link, createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { Trans, useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/shared/providers/authProvider';

import { Container } from '@shared/layout/container';

import { useDeleteMyUser } from '../../modules/deleteAccount/hooks/useUserDelete';

export const Route = createLazyFileRoute('/auth/delete-account')({
  component: DeleteUserPage,
});

function DeleteUserPage() {
  const { mutate: deleteMyAccount } = useDeleteMyUser();
  const { account } = useAuth(['account']);
  const { t } = useTranslation('deleteAccount');
  const navigate = useNavigate();
  return (
    <Container>
      <h1>{t('Borrar mi usuario')}</h1>
      <p className="text-lg">
        {t('¿Estás seguro de que quieres eliminar tu usuario de La Brújula?')}
      </p>
      <p className="my-8 text-slate-500">
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
      {account !== null && (
        <Link
          to="/profile/$userId"
          params={{ userId: account.ProfileId }}
          className="button mx-auto mb-4 block w-fit"
        >
          {t('Regresar')}
        </Link>
      )}
      <Button
        variant="link"
        className="cursor-pointer bg-transparent px-4 py-2 text-slate-400"
        onClick={() =>
          deleteMyAccount(undefined, { onSuccess: () => navigate({ to: '/' }) })
        }
      >
        {t('Deseo eliminar mi cuenta de manera definitiva')}
      </Button>
    </Container>
  );
}

export default DeleteUserPage;
