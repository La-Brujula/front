import { changeLanguage } from "i18next";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

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
