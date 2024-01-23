import { useTranslation } from 'react-i18next';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import RefList from '@shared/constants/RefToCode.json';
import { useMemo } from 'react';

export function ActivityLookupField({ setValue }) {
  const { t } = useTranslation('auth');

  const OnlyMapsToOneId = useMemo(
    () =>
      RefList &&
      Object.entries(RefList)
        .map(([name, ids], i) => {
          if (ids.length == 1 && ids[0].length == 6) {
            return { id: 'activityMap' + i, name, activity: ids[0] };
          }
        })
        .filter((a) => !!a),
    [RefList]
  );

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
      placeholder={t('Buscar actividad')}
      items={OnlyMapsToOneId}
      inputSearchString={''}
      onSelect={(item) => {
        setValue(item.activity);
      }}
      onClear={() => {
        setValue('');
      }}
      showIcon={true}
      showNoResults={true}
      showItemsOnFocus={true}
      showNoResultsText={t('No se encontraron resultados')}
      maxResults={5}
    />
  );
}
