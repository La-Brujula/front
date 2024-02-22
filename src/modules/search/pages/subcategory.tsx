import ErrorMessage from '@shared/components/errorMessage';
import areas from '@shared/constants/areas.json';
import categories from '@shared/constants/categories.json';
import {
  getActivityObject,
  getAreaByIndex,
  getAreaObjectFromId,
  getSubAreaFromId,
  getSubAreaObjectFromId,
  getTitle,
} from '@shared/utils/areaUtils';
import { NavLink, useParams } from 'react-router-dom';
import { getAreaFromId } from '../../../shared/utils/areaUtils';

function getSubAreaCode(areaCode: string) {
  const subareaObject = getSubAreaObjectFromId(areaCode);
  return Object.keys(subareaObject)[0].split('-')[0];
}

const SubCategoryPage = () => {
  const { category } = useParams();
  if (category == undefined)
    return <ErrorMessage message={'Algo salió mal, por favor vuelve a casa'} />;

  const selectedCategory = categories.filter(
    (cat) => cat.label == category,
  )[0] || {
    label:
      category.length == 1
        ? getAreaFromId(category)
        : getSubAreaFromId(category),
    search: Object.keys(getSubAreaObjectFromId(category)).join(' '),
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
                !!getTitle(id, 'No Binario') && (
                  <NavLink
                    to={`/buscar?activity=${id}`}
                    key={encodeURI(id)}
                    className={[
                      'button font-bold flex flex-col items-center justify-center',
                      !(i % 2) ? 'bg-primary' : 'bg-secondary',
                    ].join(' ')}
                  >
                    {getTitle(id, 'No Binario')}
                  </NavLink>
                ),
            )
          : selectedCategory.search.length == 1
            ? Object.keys(getAreaObjectFromId(selectedCategory.search)).map(
                (subarea, i) =>
                  !!getTitle(subarea, 'No Binario') && (
                    <NavLink
                      to={
                        '/buscar/' +
                        encodeURIComponent(
                          getSubAreaCode(selectedCategory.search),
                        )
                      }
                      key={encodeURI(subarea)}
                      className={[
                        'button font-bold flex flex-col items-center justify-center',
                        !(i % 2) ? 'bg-primary' : 'bg-secondary',
                      ].join(' ')}
                    >
                      {getTitle(subarea, 'No Binario')}
                    </NavLink>
                  ),
              )
            : Object.keys(getSubAreaObjectFromId(selectedCategory.search)).map(
                (activity, i) =>
                  !!getTitle(activity, 'No Binario') && (
                    <NavLink
                      to={
                        '/buscar?search=' +
                        encodeURIComponent(
                          getTitle(activity, 'No Binario') || '',
                        )
                      }
                      key={encodeURI(activity)}
                      className={[
                        'button font-bold flex flex-col items-center justify-center',
                        !(i % 2) ? 'bg-primary' : 'bg-secondary',
                      ].join(' ')}
                    >
                      {getTitle(activity, 'No Binario')}
                    </NavLink>
                  ),
              )}
      </div>
    </>
  );
};

export default SubCategoryPage;
