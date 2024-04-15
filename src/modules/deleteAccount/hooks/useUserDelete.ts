import { useAuth } from '@/shared/providers/authProvider';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { deleteFetch } from '@/shared/services/backendFetcher';
import { useMutation } from '@tanstack/react-query';

export function useDeleteMyUser() {
  const { t } = useTranslation();
  const { logout, account } = useAuth(['logout', 'account']);
  const navigate = useNavigate();

  async function deleteMyAccount() {
    if (
      confirm(
        t(
          `Estás a punto de borrar tu cuenta {{email}}, esto no se puede deshacer.
        
        ¿Quieres continuar?`,
          { replace: { email: account!.email } }
        )
      )
    ) {
      return await deleteFetch('/auth/me');
    }
  }

  return useMutation({
    mutationKey: ['profiles', account],
    mutationFn: deleteMyAccount,
    onSuccess: () => {
      logout();
      navigate({ to: '/' });
    },
  });
}
