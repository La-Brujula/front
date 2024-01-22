import { useTranslation } from 'react-i18next';
import RefList from '@shared/constants/RefList.json';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

export const ReferenceField = ({ defaultValue, setValue }) => {
  const { t } = useTranslation('search');

  return (
    <ReactSearchAutocomplete
      className="font-bold border-2 border-white bg-transparent
        text-white placeholder:text-white grow"
      styling={{
        backgroundColor: 'rgb(45 123 191 / var(--tw-bg-opacity))',
        fontWeight: '700',
        border: '2px solid #dfe1e5',
        borderColor: 'rgb(237 237 237 / var(--tw-border-opacity))',
        hoverBackgroundColor: 'rgb(27 167 227 / var(--tw-bg-opacity))',
        borderWidth: '2px',
        flexGrow: '1',
        iconColor: 'white',
        borderRadius: '0.375rem',
        placeholderColor: 'white',
        color: 'rgb(237 237 237 / var(--tw-text-opacity))',
        zIndex: 1,
      }}
      fuseOptions={{
        threshold: 0.2,
      }}
      placeholder={defaultValue || t('searchForActivity')}
      items={
        RefList &&
        RefList.map((ref) => {
          return { id: ref, name: ref };
        })
      }
      inputSearchString={''}
      onSelect={(item) => {
        setValue(item.name);
      }}
      onClear={() => {
        setValue('');
      }}
      showIcon={true}
      showNoResults={true}
      showItemsOnFocus={true}
      showNoResultsText={t('noResults')}
      maxResults={5}
    />
  );
};
