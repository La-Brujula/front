import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { useAuth } from '@/shared/providers/authProvider';
import { deleteFetch } from '@/shared/services/backendFetcher';

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
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['profiles', 'me'],
    mutationFn: deleteMyAccount,
    onSuccess: () => {
      logout();
      navigate({ to: '/', resetScroll: true });
      queryClient.removeQueries({ queryKey: ['profiles', 'me'] });
    },
  });
}
