import { useTranslation } from 'react-i18next';
import categories from '@shared/constants/categories.json';
import { Link } from '@tanstack/react-router';

export const PorCategorias = ({
  categorias,
}: {
  categorias: typeof categories;
}) => {
  const { t } = useTranslation('categorias');
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-fr">
      {categorias.length > 0 &&
        categorias.map((cat, i) => (
          <Link
            key={cat.label}
            className={[
              'button font-bold flex flex-col items-center justify-center',
              !(i % 2) ? 'bg-primary' : 'bg-secondary',
            ].join(' ')}
            to={cat.search.length != 6 ? '/search/$label' : '/search'}
            params={{ label: cat.label }}
            search={{ search: cat.search }}
          >
            <img
              src={`${import.meta.env.BASE_URL}img/${cat.iconUrl}.svg`}
              alt={cat.label}
              className="h-16 mb-6 hidden lg:block"
              loading="lazy"
            />
            <span>{t(cat.label)}</span>
          </Link>
        ))}
    </div>
  );
};
