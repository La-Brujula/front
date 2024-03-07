import { useTranslation } from 'react-i18next';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

export interface SearchItem {
  [k: string]: any;
  name: string;
  id: string;
}

export const TextSelectField = (props: {
  defaultValue?: string;
  setValue: (value: string) => void;
  placeholder: string;
  items: SearchItem[];
  onSelect?: (value: SearchItem) => void;
}) => {
  const { t } = useTranslation('search');
  const { defaultValue, setValue, placeholder, items, onSelect } = props;
  return (
    <ReactSearchAutocomplete
      className="w-full min-w-64 max-w-xl"
      styling={{
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
      showItemsOnFocus={false}
      showNoResultsText={t('No se encontraron coincidencias')}
      maxResults={5}
      inputDebounce={300}
    />
  );
};
