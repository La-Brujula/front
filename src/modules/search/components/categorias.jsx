import { NavLink } from 'react-router-dom';

export const PorCategorias = ({ categorias }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {categorias.length > 0 &&
        categorias.map((cat, i) => (
          <NavLink
            key={i}
            className={[
              'button font-bold flex items-center justify-center',
              !(i % 2) ? 'bg-primary' : 'bg-secondary',
            ].join(' ')}
          >
            <span>{cat}</span>
          </NavLink>
        ))}
    </div>
  );
};
