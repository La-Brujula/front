import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useCallback, useEffect, useMemo } from 'react';
import { LoadingSpinner } from '@/shared/components/loadingSpinner';
import { useInView } from 'react-intersection-observer';
import ErrorMessage from '@/shared/components/errorMessage';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { SearchOutlined } from '@mui/icons-material';
import { Container } from '@/shared/layout/container';
import { jobSearchQueryOptions } from '@/modules/jobs/queries/jobSearchQuery';
import DataSuspense from '@/shared/components/dataSuspense';
import { JobsList } from '@/modules/jobs/components/jobList';
import { JobSearch } from '@/modules/jobs/types/searchParams';
import { useCurrentProfile } from '@/shared/hooks/useCurrentProfile';
import { LoginForm } from '@/modules/auth/components/loginForm';

export const Route = createLazyFileRoute('/jobs/')({
  component: SearchHomepage,
});

function SearchHomepage() {
  const search = Route.useSearch();

  const { t } = useTranslation('jobs');
  const { data: profile } = useCurrentProfile();

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
      <Container
        className="relative"
        bodyClass="w-full flex flex-col md:grid grid-cols-[1fr_10rem] gap-4 text-white font-bold items-center px-4"
        bg="light-gray"
      >
        <h3 className="col-span-full text-primary font-bold text-xl">
          {t('o encuentra un empleo')}:
        </h3>
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
              count: results?.pages[0].meta?.total || 0,
            })}
          </p>
        </div>
      </Container>
      <Container className="relative !pt-0">
        <div className="grid grid-cols-1 gap-12 mt-16">
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
