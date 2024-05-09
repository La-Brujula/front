import { loginService } from '@/shared/services/authServices';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['authState'],
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginService(email, password),
    onSuccess: (data) => {},
  });
}

export default useLogin;
