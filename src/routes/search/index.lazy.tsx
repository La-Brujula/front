import { useCallback, useEffect, useMemo } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';

import { Form } from '@/components/ui/form';
import DownloadResultsButton from '@/modules/search/components/downloadResults';
import { ResultsFilter } from '@/modules/search/components/resultsFilters';
import { UsersList } from '@/modules/search/components/userList';
import { searchQueryOptions } from '@/modules/search/queries/searchQuery';
import { DEFAULT_SEARCH, Search } from '@/modules/search/types/searchParams';
import CountrySelect from '@/shared/components/countrySelect';
import DataSuspense from '@/shared/components/dataSuspense';
import ErrorMessage from '@/shared/components/errorMessage';
import Input from '@/shared/components/input';
import { LoadingSpinner } from '@/shared/components/loadingSpinner';
import useDebounce from '@/shared/hooks/useDebounce';
import { Container } from '@/shared/layout/container';

export const Route = createLazyFileRoute('/search/')({
  component: SearchHomepage,
});

function SearchHomepage() {
  const search = Route.useSearch();
  const { t } = useTranslation(['search', 'countries']);
  const { ref, inView } = useInView();
  const navigate = useNavigate();

  const queryOptions = useMemo(() => searchQueryOptions(search), [search]);

  const {
    data: results,
    isLoading: loading,
    error,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(queryOptions);

  const users = useMemo(
    () =>
      results !== undefined
        ? [...results.pages.flatMap((page) => page.entity)]
        : [],
    [results]
  );

  const form = useForm<Search>({
    defaultValues: {
      ...DEFAULT_SEARCH,
      ...search,
    },
  });

  const reset = useCallback(() => {
    form.reset(DEFAULT_SEARCH);
  }, [form.reset]);

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

  const filters = form.watch();

  useEffect(() => {
    const timeout = setTimeout(() => onSubmit(filters), 400);
    return () => clearTimeout(timeout);
  }, [filters]);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
    <>
      <Container bg="primary">
        <Form {...form}>
          <form className="grid w-full grid-cols-[max-content_1fr_max-content] items-end gap-4 px-4 font-bold text-white">
            <CountrySelect
              form={form}
              fieldName="country"
              hasLabel
              filterFn={() => ['CO', 'MX', 'CL']}
            />
            <Input
              label={t('Búsqueda')}
              form={form}
              fieldName="query"
              type="text"
            />
            <div className="flex flex-row items-center gap-2">
              <p>
                {t('{{count}} resultado', {
                  count: results?.pages[0].meta?.total || 0,
                })}
              </p>
              <DownloadResultsButton search={search} />
            </div>
          </form>
        </Form>
      </Container>
      <Container className="relative">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[20rem_1fr]">
          <ResultsFilter
            filters={filters}
            form={form}
            reset={reset}
          />
          <div className="relative flex w-full flex-col gap-8 rounded-l-3xl bg-black bg-opacity-20 p-8 text-left">
            <div className="absolute left-[100%] top-0 -z-10 hidden h-full w-[50vw] bg-black bg-opacity-20"></div>
            <DataSuspense
              loading={loading}
              error={error}
            >
              {users.length > 0 ? (
                <UsersList users={users} />
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
    </>
  );
}
