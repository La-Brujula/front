import ErrorMessage from '@shared/components/errorMessage';
import { getSubAreaObjectFromId, getTitle } from '@shared/utils/areaUtils';
import {
  NavLink,
  To,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { useMemo } from 'react';

import areas, { TArea, TSubArea } from '@shared/constants/areas';
import useLocalization from '@/shared/hooks/useLocalization';

/**
 * Esta página espera que el campo de búsqueda contenga tres tipos de búsquedas:
 * - Un id de categoría
 * - Un id de sub-categoría
 * - Una lista de actividades
 * @returns
 */

const SubCategoryPage = () => {
  const { label } = useParams();
  const [searchParams, _] = useSearchParams();
  const search = searchParams.get('search');
  const { locale } = useLocalization();

  const navigate = useNavigate();

  if (search === null || label === undefined)
    return (
      <ErrorMessage message={'Algo salió mal, por favor vuelve a casa AE00'} />
    );

  /**
   * Convertimos todos los diferentes tipos de búsqueda a un formato
   * estandarizado para su despliegue que contiene:
   *  - Nombre
   *  - Link
   */
  const linkList = useMemo((): { name: string; link: To }[] => {
    let area: TArea | undefined, subarea: TSubArea | undefined;
    switch (search.length) {
      case 1:
        // Es una categoría
        area = areas!.find((area) => area.id.toString() == search);
        if (area === undefined) throw 'Something went wrong! AE01';
        return area.subareas.map((subarea) => ({
          name: subarea.name,
          link: `/buscar/${subarea.name}?search=${subarea.id}`,
        }));
      case 3:
        // Es una sub-categoría
        area = areas!.find((area) => area.id.toString() == search.charAt(0));
        if (area === undefined) throw 'Something went wrong! AE01';
        subarea = area.subareas.find(
          (subarea) => subarea.id.toString() == search,
        );
        if (subarea === undefined) throw 'Something went wrong! AE02';
        return subarea.activities.map((activity) => {
          const activityName: string =
            activity.genders
              .find((v) => v.gender == 'Alias Genérico')
              ?.titles.find((title) => title.language == locale)?.title ||
            activity.id;
          return {
            name: activityName,
            link: `/buscar/${activityName}?search=${activity.id}`,
          };
        });
      case 6:
        navigate(`/buscar?activity=${search}`);
        return [];
      default:
        // Es una lista de actividades
        return search.split(' ').map((activityId) => {
          const areaId = activityId.charAt(0),
            subareaId = activityId.slice(0, 3);

          const area = areas.find((area) => area.id == areaId);
          if (area === undefined) throw 'Something went wrong! AE01';
          const subarea = area.subareas.find(
            (subarea) => subarea.id == subareaId,
          );
          if (subarea === undefined) throw 'Something went wrong! AE02';
          const activity = subarea.activities.find(
            (activity) => activity.id == activityId,
          );
          if (activity === undefined) throw 'Something went wrong! AE03';

          const neutralAlias = activity.genders.find(
            (gender) => gender.gender == 'Alias Genérico',
          );
          if (neutralAlias === undefined) throw 'Something went wrong! AE04';
          const localeLanguage = neutralAlias.titles.find(
            (title) => title.language == locale,
          );
          if (localeLanguage === undefined) throw 'Something went wrong! AE05';
          return {
            name: localeLanguage.title || activityId,
            link: `/buscar?activity=${activityId}` as To,
          };
        });
    }
  }, [search]);

  return (
    <>
      <h1 className="mb-8 text-secondary text-4xl ">{label}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-fr">
        {linkList.map((linkObject, i) => (
          <NavLink
            to={linkObject.link}
            key={encodeURI(linkObject.name)}
            className={[
              'button font-bold flex flex-col items-center justify-center',
              !(i % 2) ? 'bg-primary' : 'bg-secondary',
            ].join(' ')}
          >
            {linkObject.name}
          </NavLink>
        ))}
      </div>
    </>
  );
};

export default SubCategoryPage;
