import { useNavigate } from '@tanstack/react-router';
import { SearchIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Search } from '@/modules/search/types/searchParams';
import CountrySelect from '@/shared/components/countrySelect';
import Input from '@/shared/components/input';

export const NameSearchField = () => {
  const { t } = useTranslation('landing');
  const form = useForm<Search>({
    defaultValues: {
      query: '',
      country: 'MX',
    },
  });

  const navigate = useNavigate();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => {
          navigate({
            to: '/search',
            search: values,
            resetScroll: true,
          });
        })}
        className="grid w-full flex-grow grid-cols-2 items-center justify-items-stretch gap-4 rounded-lg bg-primary p-4 font-bold text-white md:grid-cols-[1fr_min-content_min-content]"
      >
        <Input
          type="text"
          fieldName="query"
          form={form}
          placeholder={t('search')}
        />
        <CountrySelect
          fieldName="country"
          filterFn={() => ['MX', 'CO', 'CL']}
          form={form}
          hasLabel={false}
        />
        <Button
          type="submit"
          size="icon"
          className="rounded-full bg-white p-4 text-black"
        >
          <SearchIcon />
        </Button>
      </form>
    </Form>
  );
};
