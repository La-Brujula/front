import { TranslateOutlined } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import useLocalization from "../hooks/useLocalization";

const LocaleList = ({ currentLocale, locales, setLocale }) => {
    return locales.map((locale) => (
        <MenuItem
            key={locale}
            selected={currentLocale === locale}
            onClick={() => setLocale(locale)}
        >
            <p>{locale.toUpperCase()}</p>
        </MenuItem>
    ));
};

export default function LocalizationMenu({ onLocaleCallback }) {
    const { locale, locales, setLanguage } = useLocalization();
    const [isOpen, setIsOpen] = useState(false);

    const setLocale = (lang) => {
        setLanguage(lang);
        setIsOpen(false);
        onLocaleCallback && onLocaleCallback();
    };

    return (
        <>
            <IconButton
                id="locale-button"
                aria-controls={isOpen ? "locale-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={isOpen}
                onClick={() => setIsOpen(true)}
                disableElevation
            >
                <TranslateOutlined />
            </IconButton>
            <Menu id="locale-menu" anchorEl={anchorEl} open={isOpen}>
                <LocaleList
                    currentLocale={locale}
                    locales={locales}
                    setLocale={setLocale}
                />
            </Menu>
        </>
    );
}
