import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useMemo } from 'react';
import { ResultsFilter } from '../../modules/search/components/resultsFilters';
import { UsersList } from '../../modules/search/components/userList';
import { LoadingSpinner } from '@/shared/components/loadingSpinner';
import { useInView } from 'react-intersection-observer';
import ErrorMessage from '@/shared/components/errorMessage';
import { useInfiniteQuery } from '@tanstack/react-query';
import { searchQueryOptions } from '@/modules/search/queries/searchQuery';
import { useTranslation } from 'react-i18next';
import { Search } from '@/modules/search/types/searchParams';
import { useForm } from 'react-hook-form';
import Input from '@/shared/components/input';
import { SearchOutlined } from '@mui/icons-material';
import { Container } from '@/shared/layout/container';

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

  const { register, watch, handleSubmit, reset } = useForm<Search>({
    defaultValues: {},
    values: search,
  });

  const onSubmit = (data: Search) =>
    navigate({
      to: '/search',
      search: Object.fromEntries(
        Object.entries(data).filter(([_, value]) => !!value)
      ),
      replace: true,
    });

  useEffect(() => {
    const subscription = watch(() => handleSubmit(onSubmit)());
    return () => subscription.unsubscribe();
  }, [handleSubmit, watch]);

  const { t } = useTranslation('search');

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
    <Container>
      <div className="bg-primary absolute top-0 h-48 w-full left-0 -z-10" />
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
          <Input
            type="text"
            register={register}
            fieldName="query"
            label="query"
            labelClass="hidden"
            divClass="w-full"
            inputClass="border-none bg-transparent focus:outline-none"
          />
        </div>
        <p>
          {t('{{count}} resultado', {
            count: results?.pages[0].meta?.total || 0,
          })}
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[20rem_1fr] gap-12 mt-16">
        <ResultsFilter
          filters={search}
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
