import { useTranslation } from 'react-i18next';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

export const TextSelectField = ({
  defaultValue,
  setValue,
  placeholder,
  items,
  onSelect,
}) => {
  const { t } = useTranslation('search');
  return (
    <ReactSearchAutocomplete
      className="w-full min-w-64 max-w-xl"
      styling={{
        fontWeight: '700',
        border: '1px solid #575756',
        backgroundColor: '#EDEDED',
        hoverBackgroundColor: '#EDEDED',
        iconColor: '#575756',
        borderRadius: '0.375rem',
        placeholderColor: 'rgb(var(--black))',
        color: 'rgb(var(--white))',
        zIndex: 1,
        fontFamily: 'Montserrat',
      }}
      fuseOptions={{
        threshold: 0.2,
      }}
      placeholder={defaultValue || placeholder}
      items={items}
      inputSearchString={''}
      onSelect={
        !!onSelect
          ? onSelect
          : (item) => {
              setValue(item.name);
            }
      }
      onClear={() => {
        setValue('');
      }}
      showIcon={false}
      showNoResults={true}
      showItemsOnFocus={true}
      showNoResultsText={t('noResults')}
      maxResults={5}
      inputDebounce={300}
    />
  );
};