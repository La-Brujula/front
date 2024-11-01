import TranslateOutlined from '@mui/icons-material/TranslateOutlined';
import { MouseEventHandler, useCallback } from 'react';
import useLocalization, { SupportedLocal } from '../hooks/useLocalization';

const LocaleList = (props: {
  currentLocale: SupportedLocal;
  locales: SupportedLocal[];
  setLocale: (locale: SupportedLocal) => MouseEventHandler;
}) => {
  return props.locales.map((locale) => (
    <button
      key={locale}
      className={[
        'px-2 py-1',
        props.currentLocale == locale ? 'bg-secondary' : 'bg-transparent',
      ].join(' ')}
      onClick={props.setLocale(locale)}
    >
      <p className="text-sm">{locale.toUpperCase()}</p>
    </button>
  ));
};

export default function LocalizationMenu(props: {
  onLocaleCallback?: Function;
}) {
  const { locale, locales, setLanguage } = useLocalization();

  const setLocale = useCallback(
    (lang: SupportedLocal) => () => {
      setLanguage(lang);
      props.onLocaleCallback !== undefined && props.onLocaleCallback();
    },
    [props.onLocaleCallback, setLanguage]
  );

  return (
    <div
      id="locale-menu"
      className="relative flex flex-row gap-1"
    >
      <LocaleList
        currentLocale={locale}
        locales={locales}
        setLocale={setLocale}
      />
    </div>
  );
}
