import { Container } from '@shared/layout/container';
import { useTranslation } from 'react-i18next';
import { PorCategorias } from '@modules/search/components/categorias';
import { useSearch } from '../../../shared/hooks/useSearch';
import { useEffect } from 'react';

function SearchByCategory() {
  const {results, setFilterObject} = useSearch();

  const { t } = useTranslation('landing');
  
  useEffect(() => {
    setFilterObject({
      name: "Emiliano Heredia Garcia"
    })
  }, [])
  

  return (
    <Container bg="lightblue">
      <h2 className="mb-4">{t('searchByCategory')}</h2>
      
      <PorCategorias
        categorias={[
          { iconUrl: 'PreprodIcon', label: 'preproduccion' },
          { iconUrl: 'TalentIcon', label: 'talento' },
          { iconUrl: 'PeopleIcon', label: 'equipoHumano' },
          { iconUrl: 'ProductionIcon', label: 'companiaProd' },
          { iconUrl: 'RentalIcon', label: 'rentaEquipo' },
          { iconUrl: 'SupportIcon', label: 'servicioSoporte' },
          { iconUrl: 'PostprodIcon', label: 'companiaPostprod' },
          { iconUrl: 'DistIcon', label: 'distExhib' },
          { iconUrl: 'ITIcon', label: 'tecnologiasInfo' },
          { iconUrl: 'MktIcon', label: 'mercaPubl' },
          { iconUrl: 'AnimationIcon', label: 'animacion' },
          { iconUrl: 'EducationIcon', label: 'escuelasUniv' },
          { iconUrl: 'CommisionIcon', label: 'comisionesFilm' },
          { iconUrl: 'FestivalIcon', label: 'festivalesMex' },
          { iconUrl: 'IntFestIcon', label: 'festivalesInt' },
          { iconUrl: 'AssocIcon', label: 'asociaciones' },
        ]}
      />
    </Container>
  );
}

export default SearchByCategory;
