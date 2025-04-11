import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

import useLocalization from '../hooks/useLocalization';

export default function LocalizationMenu() {
  const { locale: currentLocale, locales, setLanguage } = useLocalization();

  return (
    <div
      id="locale-menu"
      className="relative flex flex-row gap-1"
    >
      <ToggleGroup
        type="single"
        onValueChange={setLanguage}
      >
        {locales.map((locale) => (
          <ToggleGroupItem
            key={locale}
            value={locale}
            className={[
              'px-2 py-1',
              currentLocale == locale ? 'bg-secondary' : 'bg-transparent',
            ].join(' ')}
          >
            {locale.toUpperCase()}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
