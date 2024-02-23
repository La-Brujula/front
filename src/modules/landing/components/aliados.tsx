import aliades from '@shared/constants/aliades.json';
import { Container } from '@shared/layout/container';
import { useTranslation } from 'react-i18next';

export const SeccionAliades = () => {
  const { t } = useTranslation('landing');
  return (
    <Container bg="primary">
      <div className="text-center text-white">
        <h2>{t('Aliad@s')}</h2>
        <p className="text-xl font-bold">
          {t('Gracias por hacer posible La Brújula')}
        </p>
      </div>
      <div
        className="max-w-6xl grid grid-cols-3
        md:grid-cols-4 xl:grid-cols-6 mx-auto gap-8"
      >
        {aliades.map((aliade, i) => (
          <a
            href={aliade.linkUrl}
            key={aliade.imageUrl}
            target="_blank"
          >
            <img
              src={aliade.imageUrl}
              alt=""
            />
          </a>
        ))}
      </div>
    </Container>
  );
};
