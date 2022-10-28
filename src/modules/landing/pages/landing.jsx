import { Container } from '@shared/layout/container';
import { useTranslation } from 'react-i18next';
import { LoginForm } from '../../auth/components/loginForm';
import { PorCategorias } from '../../search/components/categorias';
import { PorFiltros } from '../../search/components/filtros';

export default () => {
  const { t } = useTranslation('landing');
  return (
    <>
      <Container bg="lightblue">
        <h2 className="mb-4">{t('login')}</h2>
        <LoginForm color="lightblue" />
      </Container>
      <Container>
        <h2 className="mb-4">{t('searchInBrujula')}</h2>
        <PorFiltros />
      </Container>
      <Container bg="lightblue">
        <h2 className="mb-4">{t('searchByCategory')}</h2>
        <PorCategorias
          categorias={[
            'Preproducción',
            'Talento',
            'Equipo Humano',
            'Producción',
            'Producción',
            'Producción',
            'Producción',
            'Producción',
            'Producción',
          ].map((v) => t(v))}
        />
      </Container>
    </>
  );
};
