import { changeLanguage } from 'i18next';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export type SupportedLocal = 'es';

export default function useLocalization() {
  const { i18n } = useTranslation();
  const setNewLocale = useCallback((lang: SupportedLocal) => {
    changeLanguage(lang);
  }, []);
  return {
    locale: i18n.language as SupportedLocal,
    locales: ['es', 'fr', 'en'] as SupportedLocal[],
    setLanguage: setNewLocale,
  };
}
