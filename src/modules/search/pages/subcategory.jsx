import categories from '@shared/constants/categories';
import areas from '@shared/constants/areas.json';
import { getTitle, getArea, getSubAreaFromId } from '@shared/utils/areaUtils';
import { NavLink, useParams } from 'react-router-dom';
import { ErrorMessage } from '@shared/components/errorMessage';
import { getAreaFromId } from '../../../shared/utils/areaUtils';

function getSubAreaCode(areaCode, subarea) {
  return Object.keys(areas[getArea(areaCode)][subarea])[0].split('-')[0];
}

const SubCategoryPage = () => {
  const { category } = useParams();
  if (!category)
    return <ErrorMessage message={'Algo salió mal, por favor vuelve a casa'} />;

  const selectedCategory = categories.filter(
    (cat) => cat.label == category
  )[0] || {
    label:
      category.length == 1 ? getArea(category) : getSubAreaFromId(category),
    search: Object.keys(
      areas[getAreaFromId(category)][getSubAreaFromId(category)]
    ).join(' '),
  };

  const idList = selectedCategory.search.split(' ').length > 1;

  return (
    <>
      <h1 className="mb-8 text-secondary text-4xl ">
        {selectedCategory.label}
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-fr">
        {idList
          ? selectedCategory.search.split(' ').map(
              (id, i) =>
                !!getTitle(id, 'Alias Genérico') && (
                  <NavLink
                    to={`/buscar?activity=${id}`}
                    key={encodeURI(id)}
                    className={[
                      'button font-bold flex flex-col items-center justify-center',
                      !(i % 2) ? 'bg-primary' : 'bg-secondary',
                    ].join(' ')}
                  >
                    {getTitle(id, 'Alias Genérico')}
                  </NavLink>
                )
            )
          : selectedCategory.search.length == 1
          ? Object.keys(areas[getArea(selectedCategory.search)]).map(
              (subarea, i) =>
                !!getTitle(subarea, 'Alias Genérico') && (
                  <NavLink
                    to={
                      '/buscar/' +
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
                    {getTitle(subarea, 'Alias Genérico')}
                  </NavLink>
                )
            )
          : Object.keys(
              areas[getArea(selectedCategory.search.slice(0, 1))][
                getSubAreaFromId(selectedCategory.search)
              ]
            ).map(
              (activity, i) =>
                !!getTitle(activity, 'Alias Genérico') && (
                  <NavLink
                    to={
                      '/buscar?search=' +
                      encodeURIComponent(getTitle(activity, 'Alias Genérico'))
                    }
                    key={encodeURI(activity)}
                    className={[
                      'button font-bold flex flex-col items-center justify-center',
                      !(i % 2) ? 'bg-primary' : 'bg-secondary',
                    ].join(' ')}
                  >
                    {getTitle(activity, 'Alias Genérico')}
                  </NavLink>
                )
            )}
      </div>
    </>
  );
};

export default SubCategoryPage;
