import TranslateOutlined from "@mui/icons-material/TranslateOutlined";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useRef, useState } from "react";
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

const IconButtonMenu = ({ isOpen, onClick }) => {
    return (
        <IconButton
            id="locale-button"
            aria-controls={isOpen ? "locale-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={isOpen}
            onClick={onClick}
            className="!text-white w-auto self-start"
        >
            <TranslateOutlined />
        </IconButton>
    );
};

export default function LocalizationMenu({ onLocaleCallback }) {
    const { locale, locales, setLanguage } = useLocalization();
    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const setLocale = (lang) => {
        setLanguage(lang);
        handleClose();
        onLocaleCallback && onLocaleCallback();
    };

    return (
        <div className="relative flex-col">
            <IconButtonMenu
                isOpen={isOpen}
                onClick={handleClick}
            />
            <Menu
                id="locale-menu"
                open={isOpen}
                anchorEl={anchorEl}
                className="relative"
                onClose={handleClose}
            >
                <LocaleList
                    currentLocale={locale}
                    locales={locales}
                    setLocale={setLocale}
                />
            </Menu>
        </div>
    );
}
