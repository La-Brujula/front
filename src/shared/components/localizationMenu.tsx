import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

import useLocalization from '../hooks/useLocalization';

export default function LocalizationMenu() {
  const { locale, locales, setLanguage } = useLocalization();

  return (
    <div
      id="locale-menu"
      className="relative flex flex-row gap-1 rounded-md"
    >
      <ToggleGroup
        type="single"
        defaultValue={locale}
        onValueChange={setLanguage}
      >
        {locales.map((locale) => (
          <ToggleGroupItem
            key={locale}
            value={locale}
          >
            {locale.toUpperCase()}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
