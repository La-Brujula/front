import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import { initReactI18next } from 'react-i18next';

i18n
  .use(Backend)
  // .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['es', 'en'],
    nonExplicitSupportedLngs: true,
    lowerCaseLng: true,
    fallbackLng: ['en'],
    load: 'languageOnly', // all, languageOnly

    backend: {
      loadPath: import.meta.env.BASE_URL + 'locales/{{ns}}/{{lng}}.json',
    },

    defaultNS: 'common',
    fallbackNS: 'common',
    ns: ['common', 'auth', 'landing'],

    keySeparator: '.',
    nsSeparator: ':',
    pluralSeparator: '_',
    contextSeparator: '_',

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
