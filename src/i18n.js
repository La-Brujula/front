import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  .use(Backend)
  // .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['es'],
    nonExplicitSupportedLngs: true,
    lowerCaseLng: true,
    fallbackLng: ['es'],
    load: 'languageOnly', // all, languageOnly

    backend: {
      loadPath: import.meta.env.BASE_URL + 'locales/{{ns}}/{{lng}}.json',
    },

    defaultNS: 'common',
    fallbackNS: 'common',
    ns: ['common', 'auth'],

    keySeparator: '.',
    nsSeparator: ':',
    pluralSeparator: '_',
    contextSeparator: '_',

    saveMissing: true,
    debug: false,

    cache: {
      enabled: true,
    },

    // react-i18next options
    react: {
      useSuspense: true,
    },
  });

export default i18n;
