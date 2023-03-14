import categories from '@shared/constants/categories';
import areas from '@shared/constants/areas.json';
import { getTitle, getArea, getSubAreaFromId } from '@shared/utils/areaUtils';
import { NavLink, useParams } from 'react-router-dom';
import { ErrorMessage } from '@shared/components/errorMessage';

function getSubAreaCode(areaCode, subarea) {
  return Object.keys(areas[getArea(areaCode)][subarea])[0].split('-')[0];
}

const SubCategoryPage = () => {
  const { category } = useParams();
  if (!category)
    return <ErrorMessage message={'Algo salió mal, por favor vuelve a casa'} />;

  const selectedCategory = categories.filter((cat) => cat.label == category)[0];

  const idList = selectedCategory.search.split(' ').length > 1;

  return (
    <>
      <h1 className='mb-8'>{selectedCategory.label}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-fr">
        {idList
          ? selectedCategory.search.split(' ').map((id, i) => (
              <NavLink
                to={'/buscar?search=' + encodeURIComponent(id)}
                key={encodeURI(id)}
                className={[
                  'button font-bold flex flex-col items-center justify-center',
                  !(i % 2) ? 'bg-primary' : 'bg-secondary',
                ].join(' ')}
              >
                {getTitle(id, 'No Binario')}
              </NavLink>
            ))
          : selectedCategory.search.length == 1
          ? Object.keys(areas[getArea(selectedCategory.search)]).map(
              (subarea, i) => (
                <NavLink
                  to={
                    '/buscar?search=' +
                    encodeURIComponent(
                      getSubAreaCode(selectedCategory.search, subarea)
                    )
                  }
                  key={encodeURI(subarea)}
                  className={[
                    'button font-bold flex flex-col items-center justify-center',
                    !(i % 2) ? 'bg-primary' : 'bg-secondary',
                  ].join(' ')}
                >
                  {subarea}
                </NavLink>
              )
            )
          : Object.keys(
              areas[getArea(selectedCategory.search.slice(0, 1))][
                getSubAreaFromId(selectedCategory.search)
              ]
            ).map((activity, i) => (
              <NavLink
                to={'/buscar?search=' + encodeURIComponent(activity)}
                key={encodeURI(activity)}
                className={[
                  'button font-bold flex flex-col items-center justify-center',
                  !(i % 2) ? 'bg-primary' : 'bg-secondary',
                ].join(' ')}
              >
                {getTitle(activity, 'No Binario') ||
                  getTitle(activity, 'Persona Moral')}
              </NavLink>
            ))}
      </div>
    </>
  );
};

export default SubCategoryPage;
