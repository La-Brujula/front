import credits from '@shared/constants/credits.json';
import { Container } from '@shared/layout/container';
import React from 'react';
import { useTranslation } from 'react-i18next';

// i18next-parser static types

// title
// t('about:Dirección General')
// t('about:Traducción')
// t('about:Estrategia')
// t('about:Fotografía')
// t('about:Diseño gráfico y editorial')
// t('about:Captura')
// t('about:Comunicación')
// t('about:Abogado')
// t('about:Ciencia de datos')
// t('about:Administración')
// t('about:Tecnologías de la información')
// t('about:Mercadotecnia')
// t('about:Prensa y medios')

// name
// t('about:Romelia Álvarez')
// t('about:Camila Álvarez')
// t('about:Raúl Poiré')
// t('about:Pablo León')
// t('about:Romelia León')
// t('about:Alfonso Miranda y \nMariana Jauregui')
// t('about:Dejanira Álvarez')
// t('about:Ismael Guerra')
// t('about:Alejandro Morales')
// t('about:Victoria Hernández')
// t('about:Diego Palmerín, Daniel León \ny Emiliano Herendia')
// t('about:Andrea Jáuregui')
// t('about:Patricia Ornelas y \nPepe Quintanilla')

function Credit({ title, name }: { title: string; name: string }) {
  return (
    <div className="flex flex-col">
      <h3 className="font-bold">{title}</h3>
      <p>{name}</p>
    </div>
  );
}

function CreditsSection() {
  const { t } = useTranslation('about');
  return (
    <Container>
      <div className="flex flex-row gap-8">
        <div
          className="bg-primary w-4 rounded-sm
        lg:ml-16"
        />
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4
      text-left text-primary grow h-fit"
        >
          {credits.map(({ title, name }) => (
            <Credit
              title={t(title)}
              name={t(name)}
            />
          ))}
        </div>
      </div>
      <br></br>

      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '24px' }}>
          {t('SeeOurPoli')}&nbsp;
          <a
            href={
              import.meta.env.BASE_URL +
              'pdf/Políticas_de_uso_La_Brujula_Audiovisual.pdf'
            }
            className="text-primary"
          >
            {t('Politicas')}
          </a>
        </p>
      </div>
      <br></br>
    </Container>
  );
}

export default React.memo(CreditsSection);
