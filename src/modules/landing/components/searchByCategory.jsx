import { Container } from '@shared/layout/container';
import { useTranslation } from 'react-i18next';
import { PorCategorias } from '@modules/search/components/categorias';

function SearchByCategory() {
  const { t } = useTranslation('landing');

  return (
    <Container bg="lightblue">
      <h2 className="mb-4">{t('searchByCategory')}</h2>

      <PorCategorias
        categorias={[
          { iconUrl: 'PreprodIcon', label: 'Preproducción' },
          { iconUrl: 'TalentIcon', label: 'Talento' },
          { iconUrl: 'PeopleIcon', label: 'Equipo humano' },
          { iconUrl: 'ProductionIcon', label: 'Compañías de producción' },
          { iconUrl: 'RentalIcon', label: 'Renta de equipo' },
          {
            iconUrl: 'SupportIcon',
            label: 'Servicio de soporte a la producción',
          },
          { iconUrl: 'PostprodIcon', label: 'Compañías de postproducción' },
          { iconUrl: 'DistIcon', label: 'Distribuciones, exhibición y medios' },
          { iconUrl: 'ITIcon', label: 'Tecnologías de la información' },
          { iconUrl: 'MktIcon', label: 'Mercadotecnia, publicidad y diseño' },
          { iconUrl: 'AnimationIcon', label: 'Animación' },
          { iconUrl: 'EducationIcon', label: 'Escuelas y universidades' },
          { iconUrl: 'CommisionIcon', label: 'Comisiones de filmación' },
          {
            iconUrl: 'FestivalIcon',
            label: 'Festivales y mercados de cine en méxico',
          },
          { iconUrl: 'IntFestIcon', label: 'Festivales de cine en el mundo' },
          { iconUrl: 'AssocIcon', label: 'Asociaciones' },
        ]}
      />
    </Container>
  );
}

export default SearchByCategory;
