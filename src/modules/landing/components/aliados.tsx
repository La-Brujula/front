import { useTranslation } from 'react-i18next';

import aliades from '@shared/constants/aliades.json';
import { Container } from '@shared/layout/container';

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
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
        {aliades.map((aliade, i) => (
          <a
            href={aliade.linkUrl}
            key={aliade.imageUrl}
            target="_blank"
            className="flex items-center justify-center"
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

export default SeccionAliades;
