import ErrorMessage from '@shared/components/errorMessage';
import {
  AreaName,
  getAreaObjectByName,
  getSubAreaObjectByName,
  getTitle,
} from '@shared/utils/areaUtils';
import { NavLink, useParams } from 'react-router-dom';
import { useMemo } from 'react';

const SubCategoryPage = () => {
  const { category, subcategory } = useParams();
  if (category == undefined)
    return <ErrorMessage message={'Algo salió mal, por favor vuelve a casa'} />;

  const matrixObject = useMemo(() => {
    if (subcategory !== undefined)
      return getSubAreaObjectByName(category as AreaName, subcategory);
    console.log(category);

    return getAreaObjectByName(category);
  }, [category, subcategory]);

  return (
    <>
      <h1 className="mb-8 text-secondary text-4xl ">
        {subcategory || category}
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-fr">
        {Object.keys(matrixObject).map((id, i) => (
          <NavLink
            to={
              subcategory !== undefined
                ? `/buscar?activity=${id}`
                : `/buscar/${category}/${id}`
            }
            key={encodeURI(id)}
            className={[
              'button font-bold flex flex-col items-center justify-center',
              !(i % 2) ? 'bg-primary' : 'bg-secondary',
            ].join(' ')}
          >
            {subcategory !== undefined ? getTitle(id, 'No Binario') : id}
          </NavLink>
        ))}
      </div>
    </>
  );
};

export default SubCategoryPage;
