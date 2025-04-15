import { profileQueryOptions } from '@/modules/profile/queries/userProfile';
import { useUpdateMe } from '@/shared/hooks/useUpdateMe';
import { ApiError, BackendResponse } from '@/shared/services/backendFetcher';
import {
  IBackendProfile,
  ProfileUpdateForm,
  ProfileUpdateRequest,
  TProfileUpdateForm,
  TProfileUpdateRequest,
} from '@/shared/types/user';
import { MutateOptions, useSuspenseQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useCallback, useMemo } from 'react';
import { Path, useForm } from 'react-hook-form';

export default function useUpdateProfile() {
  const { data: user, error } = useSuspenseQuery(profileQueryOptions('me'));
  const { mutate, isPending, error: mutateError } = useUpdateMe();

  const {
    register,
    handleSubmit,
    reset,
    formState,
    setError,
    setValue,
    setFocus,
    watch,
  } = useForm<TProfileUpdateForm>();

  useMemo(() => {
    if (!user) return;
    const res = ProfileUpdateForm.safeParse(user);
    if (!res.success) return;

    for (const [path, value] of Object.entries(res.data)) {
      setValue(path as Path<TProfileUpdateForm>, value);
    }
  }, [user]);

  const updateProfile = useCallback(
    (
      data: TProfileUpdateForm,
      mutationOpts: MutateOptions<
        BackendResponse<IBackendProfile>,
        ApiError | AxiosError,
        TProfileUpdateRequest
      >
    ) => {
      const res = ProfileUpdateRequest.safeParse(data);

      if (res.success) {
        return mutate(res.data, mutationOpts);
      }

      for (const valError of res.error.issues) {
        setError(valError.path.join('.') as Path<TProfileUpdateRequest>, {
          type: valError.code,
          message: valError.code,
        });
        setFocus(valError.path.join('.') as Path<TProfileUpdateRequest>);
      }
    },
    [mutate]
  );

  return {
    register,
    handleSubmit,
    reset,
    formState,
    setError,
    error: error ?? mutateError,
    updateProfile,
    isPending,
    user,
    setValue,
    watch,
  };
}
