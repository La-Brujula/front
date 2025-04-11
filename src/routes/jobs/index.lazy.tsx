import { useCallback, useEffect, useMemo } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import { Link, createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { SearchIcon } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';

import { LoginForm } from '@/modules/auth/components/loginForm';
import { JobsList } from '@/modules/jobs/components/jobList';
import { jobSearchQueryOptions } from '@/modules/jobs/queries/jobSearchQuery';
import { JobSearch } from '@/modules/jobs/types/searchParams';
import DataSuspense from '@/shared/components/dataSuspense';
import ErrorMessage from '@/shared/components/errorMessage';
import { LoadingSpinner } from '@/shared/components/loadingSpinner';
import { useCurrentProfile } from '@/shared/hooks/useCurrentProfile';
import { Container } from '@/shared/layout/container';

export const Route = createLazyFileRoute('/jobs/')({
  component: SearchHomepage,
});

function SearchHomepage() {
  const search = Route.useSearch();

  const { t } = useTranslation('jobs');
  const { data: profile } = useCurrentProfile();

  const isVerified = useMemo(() => {
    profile?.verified;
  }, [profile?.verified]);

  const queryOptions = useMemo(
    () => jobSearchQueryOptions(search, !!profile),
    [search, profile]
  );

  const {
    data: results,
    isLoading: loading,
    error,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(queryOptions);

  const { ref, inView } = useInView();

  const jobs = useMemo(
    () =>
      results !== undefined
        ? [...results.pages.flatMap((page) => page.entity)]
        : [],
    [results]
  );

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
    let timeoutId: NodeJS.Timeout;
    const subscription = watch((data) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        onSubmit(data);
      }, 200);
    });
    return () => {
      clearTimeout(timeoutId);
      subscription.unsubscribe();
    };
  }, [onSubmit, watch]);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
    <>
      <Container className="flex flex-row items-center justify-center">
        <div className="flex flex-row justify-center !p-0">
          {profile?.verified ? (
            <Link
              to="/jobs/create"
              className="rounded-md bg-primary px-8 py-4 text-center text-base font-bold text-white"
            >
              {t('Crea una nueva oferta laboral')}
            </Link>
          ) : (
            <Link
              to="/auth/send-verification"
              className="rounded-md bg-secondary px-8 py-4 text-center text-base font-bold text-white"
            >
              {t('Verifica tu cuenta para crear una oferta')}
            </Link>
          )}
        </div>
      </Container>
      <Container
        className="relative"
        bodyClass="w-full flex flex-col md:grid grid-cols-[1fr_10rem] gap-4 text-white font-bold items-center px-4"
        bg="light-gray"
      >
        <h3 className="col-span-full text-xl font-bold text-primary">
          {t('o encuentra un empleo')}:
        </h3>
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
              count: results?.pages[0].meta?.total || 0,
            })}
          </p>
        </div>
      </Container>
      <Container className="relative !pt-0">
        <div className="mt-16 grid grid-cols-1 gap-12">
          {!profile && (
            <div className="flex flex-col">
              <h1>{t('Sesión no iniciada')}</h1>
              <p>
                {t('Para ver las ofertas laborales por favor inicia sesión')}
              </p>
              <LoginForm redirectUrl="/jobs" />
            </div>
          )}
          {!!profile && (
            <div className="relative flex w-full flex-col gap-8 rounded-l-3xl bg-black bg-opacity-20 px-8 pb-8 text-left">
              <div className="absolute left-[100%] top-0 -z-10 hidden h-full w-[50vw] bg-black bg-opacity-20"></div>
              <DataSuspense
                loading={loading}
                error={error}
              >
                {jobs?.length ? (
                  <JobsList jobs={jobs} />
                ) : (
                  <p className="mt-8">{t('No se encontraron resultados')}</p>
                )}
              </DataSuspense>
              {!loading && hasNextPage && (
                <div ref={ref}>
                  <LoadingSpinner />
                </div>
              )}
              {!!error && <ErrorMessage message={error.toString()} />}
            </div>
          )}
        </div>
      </Container>
    </>
  );
}
