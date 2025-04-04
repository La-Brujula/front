import { useCallback, useEffect, useMemo } from 'react';

import { SearchOutlined } from '@mui/icons-material';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useInfiniteQuery } from '@tanstack/react-query';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useInView } from 'react-intersection-observer';

import { Container } from '@/shared/layout/container';
import CountrySelect from '@/shared/components/countrySelect';
import ErrorMessage from '@/shared/components/errorMessage';
import { LoadingSpinner } from '@/shared/components/loadingSpinner';

import { Search, defaultSearch } from '@/modules/search/types/searchParams';
import { searchQueryOptions } from '@/modules/search/queries/searchQuery';
import DownloadResultsButton from '@/modules/search/components/downloadResults';
import { ResultsFilter } from '@/modules/search/components/resultsFilters';
import { UsersList } from '@/modules/search/components/userList';

export const Route = createLazyFileRoute('/search/')({
  component: SearchHomepage,
});

function SearchHomepage() {
  const search = Route.useSearch();

  const queryOptions = useMemo(() => searchQueryOptions(search), [search]);

  const {
    data: results,
    isLoading: loading,
    error,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(queryOptions);

  const { ref, inView } = useInView();

  const users = useMemo(
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
        to: '/search',
        search: Object.fromEntries(
          Object.entries(data).filter(([_, value]) => !!value) || []
        ) as Search,
        replace: true,
        resetScroll: true,
      });
    },
    [navigate]
  );

  useEffect(() => {
    const subscription = watch((data) =>
      onSubmit({ ...data, country: data.country || 'MX' })
    );
    return () => subscription.unsubscribe();
  }, [onSubmit, watch]);

  const { t } = useTranslation(['search', 'countries']);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
    <Container className="relative">
      <div className="bg-primary absolute top-0 h-24 w-full left-0 -z-10" />
      <div
        className="w-full grid grid-cols-[max-content_1fr_max-content]
      gap-4 text-white font-bold items-center px-4"
      >
        <CountrySelect
          setValue={setValue}
          fieldName="country"
          value={filters.country}
          filterFn={() => ['CO', 'MX', 'CL']}
          className="!size-10"
        />
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
      <div className="grid grid-cols-1 lg:grid-cols-[20rem_1fr] gap-12 mt-16">
        <ResultsFilter
          filters={filters}
          register={register}
          reset={reset}
        />
        <div
          className="flex flex-col gap-8 text-left bg-black bg-opacity-20
          rounded-l-3xl p-8 w-full relative"
        >
          <div
            className="w-[50vw] absolute left-[100%] top-0 h-full bg-black
          bg-opacity-20 -z-10 hidden"
          ></div>
          {!!users && users.length > 0 ? (
            <UsersList users={users} />
          ) : (
            !loading && !error && <p>{t('No se encontraron resultados')}</p>
          )}
          {loading && <LoadingSpinner />}
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
