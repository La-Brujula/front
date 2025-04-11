import { useCallback, useMemo } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { MutateOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Path, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useCurrentProfile } from '@/shared/hooks/useCurrentProfile';
import { useUpdateMe } from '@/shared/hooks/useUpdateMe';
import { ApiError, BackendResponse } from '@/shared/services/backendFetcher';
import {
  IBackendProfile,
  ProfileUpdateForm,
  ProfileUpdateRequest,
  TProfileUpdateForm,
  TProfileUpdateRequest,
} from '@/shared/types/user';

export default function useUpdateProfile() {
  const { data: user, error } = useCurrentProfile();
  const { mutate, isPending, error: mutateError } = useUpdateMe();

  const form = useForm<z.infer<typeof ProfileUpdateForm>>({
    // @ts-expect-error
    resolver: zodResolver(ProfileUpdateForm),
    defaultValues: {
      associations: '',
      awards: '',
      birthday: '',
      biography: '',
      certifications: '',
      city: '',
      country: 'MX',
      externalLinks: [],
      facebook: '',
      firstName: '',
      fullName: '',
      gender: 'other',
      headline: '',
      headerPictureUrl: '',
      imdb: '',
      instagram: '',
      languages: [],
      lastName: '',
      linkedin: '',
      location: '',
      nickName: '',
      phoneNumbers: [],
      postalCode: '',
      primaryActivity: '',
      primaryEmail: '',
      probono: false,
      profilePictureUrl: '',
      remote: false,
      searchable: false,
      secondaryActivity: '',
      secondaryEmails: [],
      state: '',
      subscriber: false,
      thirdActivity: '',
      tiktok: '',
      twitter: '',
      type: '',
      university: '',
      vimeo: '',
      whatsapp: '',
      workRadius: '',
      youtube: '',
      verified: false,
      ...user,
    },
  });

  useMemo(() => {
    if (!user) return;
    const res = ProfileUpdateForm.safeParse(user);
    if (!res.success) return;

    for (const [path, value] of Object.entries(res.data)) {
      form.setValue(path as Path<TProfileUpdateForm>, value);
    }
  }, [form.setValue, user]);

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

      console.log(data, res);

      if (res.success) {
        return mutate(res.data, mutationOpts);
      }

      for (const valError of res.error.issues) {
        form.setError(valError.path.join('.') as Path<TProfileUpdateRequest>, {
          type: valError.code,
          message: valError.code,
        });
        form.setFocus(valError.path.join('.') as Path<TProfileUpdateRequest>);
      }
    },
    [mutate, form.setError]
  );

  const createOnSubmit = useCallback(
    (
      onSuccess?: (
        user: BackendResponse<IBackendProfile>,
        requestParams: TProfileUpdateForm
      ) => void,
      onError?: (
        error: ApiError | AxiosError,
        requestParams: TProfileUpdateForm
      ) => void
    ) =>
      async (data: TProfileUpdateRequest) => {
        const res = ProfileUpdateRequest.safeParse(data);
        if (!res.success) {
          for (const error of res.error.issues) {
            form.setError(error.path.join('.') as Path<TProfileUpdateForm>, {
              message: error.message,
            });
          }
          return;
        }
        updateProfile(res.data, {
          onSuccess,
          onError,
        });
      },
    [updateProfile]
  );

  return {
    form,
    error: error ?? mutateError,
    updateProfile,
    createOnSubmit,
    isPending,
    user,
  };
}
