import ErrorMessage from '@shared/components/errorMessage';
import { useMemo } from 'react';

import areas, { TArea, TSubArea } from '@shared/constants/areas';
import useLocalization from '@/shared/hooks/useLocalization';
import {
  Link,
  createLazyFileRoute,
  useNavigate,
  useParams,
  useSearch,
} from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { Container } from '@/shared/layout/container';

export const Route = createLazyFileRoute('/search/$label')({
  component: SubCategoryPage,
});

/**
 * Esta página espera que el campo de búsqueda contenga tres tipos de búsquedas:
 * - Un id de categoría
 * - Un id de sub-categoría
 * - Una lista de actividades
 * @returns
 */

function SubCategoryPage() {
  const { label } = useParams({ from: '/search/$label' });
  const { search } = useSearch({ from: '/search/$label' });
  const { locale } = useLocalization();

  const navigate = useNavigate();

  const { t } = useTranslation('search');

  if (search === null || label === undefined)
    return (
      <ErrorMessage
        message={t('Algo salió mal, por favor vuelve a casa AE00')}
      />
    );

  /**
   * Convertimos todos los diferentes tipos de búsqueda a un formato
   * estandarizado para su despliegue que contiene:
   *  - Nombre
   *  - Link
   */
  const linkList = useMemo((): {
    name: string;
    link: string;
    search: object;
  }[] => {
    let area: TArea | undefined, subarea: TSubArea | undefined;
    switch (search.length) {
      case 1:
        // Es una categoría
        area = areas!.find((area) => area.id.toString() == search);
        if (area === undefined) throw 'Something went wrong! AE01';
        return area.subareas.map((subarea) => ({
          name: subarea.name,
          link: `/search/${subarea.name}`,
          search: { search: subarea.id },
        }));
      case 3:
        // Es una sub-categoría
        area = areas!.find((area) => area.id.toString() == search.charAt(0));
        if (area === undefined) throw 'Something went wrong! AE01';
        subarea = area.subareas.find(
          (subarea) => subarea.id.toString() == search
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
            link: `/search/${activityName}`,
            search: { search: activity.id },
          };
        });
      case 6:
        navigate({
          to: '/search',
          search: { activity: search, category: search.slice(0, 3) },
        });
        return [];
      default:
        // Es una lista de actividades
        return search.split(' ').map((activityId) => {
          const areaId = activityId.charAt(0),
            subareaId = activityId.slice(0, 3);

          const area = areas.find((area) => area.id == areaId);
          if (area === undefined) throw 'Something went wrong! AE01';
          const subarea = area.subareas.find(
            (subarea) => subarea.id == subareaId
          );
          if (subarea === undefined) throw 'Something went wrong! AE02';
          const activity = subarea.activities.find(
            (activity) => activity.id == activityId
          );
          if (activity === undefined) throw 'Something went wrong! AE03';

          const neutralAlias = activity.genders.find(
            (gender) => gender.gender == 'Alias Genérico'
          );
          if (neutralAlias === undefined) throw 'Something went wrong! AE04';
          const localeLanguage = neutralAlias.titles.find(
            (title) => title.language == locale
          );
          if (localeLanguage === undefined) throw 'Something went wrong! AE05';
          return {
            name: localeLanguage.title || activityId,
            link: '/buscar',
            search: { activity: activityId, category: activityId.slice(0, 3) },
          };
        });
    }
  }, [search]);

  return (
    <Container>
      <h1 className="mb-8 text-secondary text-4xl ">{label}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-fr">
        {linkList.map((linkObject, i) => (
          <Link
            to={linkObject.link}
            search={linkObject.search}
            key={encodeURI(linkObject.name)}
            className={[
              'button font-bold flex flex-col items-center justify-center',
              !(i % 2) ? 'bg-primary' : 'bg-secondary',
            ].join(' ')}
          >
            {linkObject.name}
          </Link>
        ))}
      </div>
    </Container>
  );
}

export default SubCategoryPage;
