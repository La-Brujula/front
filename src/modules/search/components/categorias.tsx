import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';

import categories from '@shared/constants/categories.json';

export const PorCategorias = ({
  categorias,
}: {
  categorias: typeof categories;
}) => {
  const { t } = useTranslation('categorias');
  return (
    <div className="grid auto-rows-fr grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
      {categorias.length > 0 &&
        categorias.map((cat, i) => (
          <Link
            key={cat.label}
            to="/search/$label"
            params={{ label: cat.label }}
            search={cat.search}
            resetScroll
            className="flex h-full w-full flex-col items-center justify-center rounded-md bg-primary p-4 font-bold text-white odd:bg-secondary"
          >
            {!!cat.iconUrl && (
              <img
                src={`${import.meta.env.BASE_URL}img/${cat.iconUrl}.svg`}
                alt={cat.label}
                className="mb-6 hidden h-16 lg:block"
                loading="lazy"
              />
            )}
            <span className="block w-full text-center">{t(cat.label)}</span>
          </Link>
        ))}
    </div>
  );
};
