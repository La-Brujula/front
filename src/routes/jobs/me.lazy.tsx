import { createLazyFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useCallback, useEffect, useMemo } from 'react';
import { LoadingSpinner } from '@/shared/components/loadingSpinner';
import ErrorMessage from '@/shared/components/errorMessage';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { SearchOutlined } from '@mui/icons-material';
import { Container } from '@/shared/layout/container';
import { getCreatedJobs } from '@/modules/jobs/queries/jobSearchQuery';
import DataSuspense from '@/shared/components/dataSuspense';
import { JobsList } from '@/modules/jobs/components/jobList';
import { JobSearch } from '@/modules/jobs/types/searchParams';
import { useCurrentProfile } from '@/shared/hooks/useCurrentProfile';

export const Route = createLazyFileRoute('/jobs/me')({
  component: SearchHomepage,
});

function SearchHomepage() {
  const search = Route.useSearch();

  const { t } = useTranslation('jobs');
  const { data: profile, isLoading } = useCurrentProfile();

  const isVerified = useMemo(
    () => false, //!!profile?.verified
    [profile, isLoading]
  );

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
            className="px-4 py-2 rounded-md bg-primary text-white my-8"
          >
            {t('Crear nueva oferta laboral')}
          </Link>
        ) : (
          <Link
            to="/auth/send-verification"
            className="px-4 py-2 rounded-md bg-secondary text-white my-8"
          >
            {t('Verifica tu cuenta para crear una oferta')}
          </Link>
        )}
        <div
          className="w-full grid grid-cols-[1fr_max-content]
        gap-4 text-white font-bold items-center px-4"
        >
          <div
            className="font-bold border-2 border-black bg-transparent
          text-black placeholder:text-black flex flex-row gap-1
          justify-start items-center px-2 mx-auto rounded-md
          z-10 w-full"
          >
            <SearchOutlined />
            <Controller
              name="query"
              control={control}
              render={({ field: { onChange, ...field } }) => (
                <input
                  type="text"
                  {...field}
                  id="search-field"
                  className="border-none bg-transparent focus:outline-none w-full
              placeholder:text-black placeholder:opacity-50"
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
          <div className="flex flex-row gap-2 items-center text-black">
            <p>
              {t('{{count}} resultado', {
                count: res?.meta.total || 0,
              })}
            </p>
          </div>
        </div>
      </Container>
      <Container className="relative !pt-0">
        <div className="grid grid-cols-1 gap-12 mt-16">
          <h1>{t('Ofertas creadas')}</h1>
          <div
            className="flex flex-col gap-8 text-left bg-black bg-opacity-20
          rounded-l-3xl px-8 pb-8 w-full relative"
          >
            <div
              className="w-[50vw] absolute left-[100%] top-0 h-full bg-black
            bg-opacity-20 -z-10 hidden"
            ></div>
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
