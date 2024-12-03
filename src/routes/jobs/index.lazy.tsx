import { createLazyFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useCallback, useEffect, useMemo } from 'react';
import { LoadingSpinner } from '@/shared/components/loadingSpinner';
import { useInView } from 'react-intersection-observer';
import ErrorMessage from '@/shared/components/errorMessage';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Search, defaultSearch } from '@/modules/search/types/searchParams';
import { Controller, useForm } from 'react-hook-form';
import { SearchOutlined } from '@mui/icons-material';
import { Container } from '@/shared/layout/container';
import DownloadResultsButton from '@/modules/search/components/downloadResults';
import { jobSearchQueryOptions } from '@/modules/jobs/queries/jobSearchQuery';
import DataSuspense from '@/shared/components/dataSuspense';
import { JobsList } from '@/modules/jobs/components/jobList';

export const Route = createLazyFileRoute('/jobs/')({
  component: SearchHomepage,
});

function SearchHomepage() {
  const search = Route.useSearch();

  const queryOptions = useMemo(() => jobSearchQueryOptions(search), [search]);

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
    register,
    watch,
    reset: formReset,
    setValue,
    control,
  } = useForm<Search>({
    values: search,
  });

  const filters = watch();

  const reset = useCallback(() => {
    formReset(defaultSearch);
  }, [formReset, defaultSearch]);

  const onSubmit = useCallback(
    (data: Search) => {
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

  const { t } = useTranslation('jobs');

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
    <Container className="relative">
      <div className="bg-primary absolute top-0 h-24 w-full left-0 -z-10" />
      <Link
        to="/jobs/create"
        className="px-4 py-2 rounded-md bg-secondary text-white my-8"
      >
        {t('Crear nueva oferta laboral')}
      </Link>
      <div
        className="w-full grid grid-cols-[1fr_max-content]
      gap-4 text-white font-bold items-center px-4"
      >
        <div
          className="font-bold border-2 border-white bg-transparent
        text-white placeholder:text-white flex flex-row gap-1
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
                placeholder:text-white placeholder:opacity-50"
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
        <div className="flex flex-row gap-2 items-center">
          <p>
            {t('{{count}} resultado', {
              count: results?.pages[0].meta?.total || 0,
            })}
          </p>
          <DownloadResultsButton search={search} />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-12 mt-16">
        <div
          className="flex flex-col gap-8 text-left bg-black bg-opacity-20
          rounded-l-3xl p-8 w-full relative"
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
              <p>{t('No se encontraron resultados')}</p>
            )}
          </DataSuspense>
          {!loading && hasNextPage && (
            <div ref={ref}>
              <LoadingSpinner />
            </div>
          )}
          {!!error && <ErrorMessage message={error.toString()} />}
        </div>
      </div>
    </Container>
  );
}
