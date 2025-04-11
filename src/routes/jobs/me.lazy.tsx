import { useCallback, useEffect, useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Link, createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { SearchIcon } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { JobsList } from '@/modules/jobs/components/jobList';
import { getCreatedJobs } from '@/modules/jobs/queries/jobSearchQuery';
import { JobSearch } from '@/modules/jobs/types/searchParams';
import DataSuspense from '@/shared/components/dataSuspense';
import ErrorMessage from '@/shared/components/errorMessage';
import { LoadingSpinner } from '@/shared/components/loadingSpinner';
import { useCurrentProfile } from '@/shared/hooks/useCurrentProfile';
import { Container } from '@/shared/layout/container';

export const Route = createLazyFileRoute('/jobs/me')({
  component: SearchHomepage,
});

function SearchHomepage() {
  const search = Route.useSearch();

  const { t } = useTranslation('jobs');
  const { data: profile, isLoading } = useCurrentProfile();

  const isVerified = useMemo(() => !!profile?.verified, [profile, isLoading]);

  const queryOptions = useMemo(() => getCreatedJobs(), [search]);

  const { data: res, isLoading: loading, error } = useQuery(queryOptions);

  const jobs = res?.entity;

  const navigate = useNavigate();

  const {
    watch,
    reset: formReset,
    setValue,
    control,
  } = useForm<JobSearch>({
    values: search,
  });

  const filters = watch();

  const onSubmit = useCallback(
    (data: JobSearch) => {
      navigate({
        to: '/jobs',
        search: Object.fromEntries(
          Object.entries(data).filter(([_, value]) => !!value) || []
        ),
        replace: true,
        resetScroll: true,
      });
    },
    [navigate]
  );

  useEffect(() => {
    const subscription = watch((data) => onSubmit(data));
    return () => subscription.unsubscribe();
  }, [onSubmit, watch]);

  return (
    <>
      <Container
        className="relative !pb-4"
        bodyClass="grid grid-cols-1 gap-2 md:grid-cols-[max-content_1fr]"
        bg="lightblue"
      >
        {isVerified ? (
          <Link
            to="/jobs/create"
            className="my-8 rounded-md bg-primary px-4 py-2 text-white"
          >
            {t('Crear nueva oferta laboral')}
          </Link>
        ) : (
          <Link
            to="/auth/send-verification"
            className="my-8 rounded-md bg-secondary px-4 py-2 text-white"
          >
            {t('Verifica tu cuenta para crear una oferta')}
          </Link>
        )}
        <div className="grid w-full grid-cols-[1fr_max-content] items-center gap-4 px-4 font-bold text-white">
          <div className="z-10 mx-auto flex w-full flex-row items-center justify-start gap-1 rounded-md border-2 border-black bg-transparent px-2 font-bold text-black placeholder:text-black">
            <SearchIcon />
            <Controller
              name="query"
              control={control}
              render={({ field: { onChange, ...field } }) => (
                <input
                  type="text"
                  {...field}
                  id="search-field"
                  className="w-full border-none bg-transparent placeholder:text-black placeholder:opacity-50 focus:outline-none"
                  placeholder={t('Ingresa tu búsqueda')}
                  onChange={(ev) => {
                    if (ev.target.value === '') {
                      formReset({ ...filters, query: '' });
                    } else {
                      setValue('query', ev.target.value);
                    }
                    onChange(ev);
                  }}
                />
              )}
            />
          </div>
          <div className="flex flex-row items-center gap-2 text-black">
            <p>
              {t('{{count}} resultado', {
                count: res?.meta.total || 0,
              })}
            </p>
          </div>
        </div>
      </Container>
      <Container className="relative !pt-0">
        <div className="mt-16 grid grid-cols-1 gap-12">
          <h1>{t('Ofertas creadas')}</h1>
          <div className="relative flex w-full flex-col gap-8 rounded-l-3xl bg-black bg-opacity-20 px-8 pb-8 text-left">
            <div className="absolute left-[100%] top-0 -z-10 hidden h-full w-[50vw] bg-black bg-opacity-20"></div>
            <DataSuspense
              loading={loading}
              error={error}
            >
              {!!jobs && jobs.length > 0 ? (
                <JobsList jobs={jobs} />
              ) : (
                <p>{t('No se encontraron resultados')}</p>
              )}
            </DataSuspense>
            {loading && <LoadingSpinner />}
            {!!error && <ErrorMessage message={error.toString()} />}
          </div>
        </div>
      </Container>
    </>
  );
}
