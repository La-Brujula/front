import aliades from '@shared/constants/aliades.json';
import { useTranslation } from 'react-i18next';
import { Container } from '@shared/layout/container';

export const SeccionAliades = () => {
  const { t } = useTranslation('landing');
  return (
    <Container bg="primary">
      <div className="text-center">
        <h2>{t('aliad@s')}</h2>
        <p className="text-xl font-bold">{t('graciasPorHacerPosible')}</p>
      </div>
      <div
        className="max-w-6xl grid grid-cols-3
        md:grid-cols-4 xl:grid-cols-6 mx-auto gap-8"
      >
        {aliades.map((aliade, i) => (
          <a href={aliade.linkUrl} key={i}>
            <img src={aliade.imageUrl} alt="" />
          </a>
        ))}
      </div>
    </Container>
  );
};
