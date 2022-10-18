import { changeLanguage } from "i18next";
import { useCallback, useTranslation } from "react";

export default function useLocalization() {
    const { i18n } = useTranslation();
    const setNewLocale = useCallback((lang) => {
        changeLanguage(lang);
    }, []);
    return {
        locale: i18n.language,
        locales: ["es", "fr", "en"],
        setLanguage: setNewLocale,
    };
}
