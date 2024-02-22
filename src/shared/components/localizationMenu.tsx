import TranslateOutlined from '@mui/icons-material/TranslateOutlined';
import { MouseEventHandler, useCallback, useState } from 'react';
import useLocalization, { SupportedLocal } from '../hooks/useLocalization';

const LocaleList = (props: {
  currentLocale: SupportedLocal;
  locales: SupportedLocal[];
  setLocale: (locale: SupportedLocal) => void;
}) => {
  return props.locales.map((locale) => (
    <button
      key={locale}
      className={
        props.currentLocale === locale ? 'bg-primary bg-opacity-20' : ''
      }
      onClick={() => props.setLocale(locale)}
    >
      <p>{locale.toUpperCase()}</p>
    </button>
  ));
};

const IconButtonMenu = (props: {
  isOpen: boolean;
  onClick: MouseEventHandler;
}) => {
  return (
    <button
      id="locale-button"
      aria-controls={props.isOpen ? 'locale-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={props.isOpen}
      onClick={props.onClick}
      className="text-white w-auto self-start bg-transparent"
    >
      <TranslateOutlined />
    </button>
  );
};

export default function LocalizationMenu(props: {
  onLocaleCallback?: Function;
}) {
  const { locale, locales, setLanguage } = useLocalization();
  const [isOpen, setIsOpen] = useState(false);

  const setLocale = (lang: SupportedLocal) => {
    setLanguage(lang);
    props.onLocaleCallback && props.onLocaleCallback();
  };

  const toggleOpen = useCallback(() => setIsOpen((v) => !v), [setIsOpen]);

  return (
    <div className="relative flex-col">
      <IconButtonMenu
        isOpen={isOpen}
        onClick={toggleOpen}
      />
      {isOpen && (
        <div
          id="locale-menu"
          className="relative"
        >
          <LocaleList
            currentLocale={locale}
            locales={locales}
            setLocale={setLocale}
          />
        </div>
      )}
    </div>
  );
}
