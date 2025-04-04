import { changeLanguage } from 'i18next';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export type SupportedLocal = 'es' | 'en';

export default function useLocalization() {
  const { i18n } = useTranslation();
  const setNewLocale = useCallback((lang: SupportedLocal) => {
    changeLanguage(lang);
  }, []);
  return {
    locale: i18n.language as SupportedLocal,
    locales: ['es', 'en'] as SupportedLocal[],
    setLanguage: setNewLocale,
  };
}
