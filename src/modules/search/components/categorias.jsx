import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

export const PorCategorias = ({ categorias }) => {
  const { t } = useTranslation('categorias');
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-fr">
      {categorias.length > 0 &&
        categorias.map((cat, i) => (
          <NavLink
            key={i}
            className={[
              'button font-bold flex flex-col items-center justify-center',
              !(i % 2) ? 'bg-primary' : 'bg-secondary',
            ].join(' ')}
            to={`/buscar?category=${cat.label}`}
          >
            <img
              src={`${import.meta.env.BASE_URL}img/${cat.iconUrl}.svg`}
              alt={cat.label}
              className="h-16 mb-6 hidden lg:block"
              loading="lazy"
            />
            <span>{t(cat.label)}</span>
          </NavLink>
        ))}
    </div>
  );
};
