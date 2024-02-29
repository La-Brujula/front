import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
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
    ns: [
      'common',
      'auth',
      'landing',
      'about',
      'contact',
      'guides',
      'navigation',
      'passwordReset',
      'profile',
      'search',
    ],

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
      bindI18n: 'languageChanged',
      bindI18nStore: '',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
      useSuspense: true,
    },
  });

export default i18n;
