import { Trans, useTranslation } from 'react-i18next';

import guides from '@shared/constants/guides.json';
import { Container } from '@shared/layout/container';

import HorizontalStrip from './horizontalStrip';
import Strip from './strip';

const BrujulasColors = {
  occidente: ['#63C7EB', '#1CAFE5', '#0091C8', '#006FAE'],
  centro: ['#E49DC0', '#ED2F79', '#BF5D86', '#961949'],
  norte: ['#FBF0C1', '#F8E048', '#DDC26A', '#A78C2B'],
  noreste: ['#FB8068', '#F12D27', '#B94B4D', '#BE1A1E'],
  sureste: ['#A6C37A', '#00933D', '#41A85A', '#00592D'],
  guanajuato: ['#384c72', '#2c3059', '#a7ccf1', '#5776b7'],
  aguascalientes: ['#d09239', '#aa5f2a', '#e8ca9b', '#d29776'],
  colombia: ['#8d1630', '#e7254d', '#b41d40', '#cc1f3c'],
};

function DownloadGuides() {
  const { t } = useTranslation('landing');
  return (
    <Container bg="lightblue">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="flex w-full flex-row justify-end text-left">
          <div className="md:max-w-lg">
            <h2 className="">
              <Trans
                i18nKey="regionalGuides"
                t={t}
              >
                Descarga los directorios regionales para utilizar{' '}
                <span className="text-blue">La Brújula</span> sin conexión
              </Trans>
            </h2>
          </div>
        </div>
        <div className="isolate grid w-full transform grid-cols-1 justify-end gap-4 overflow-hidden text-right text-lg font-bold sm:grid-cols-2 md:col-span-2 md:flex md:flex-row">
          <Strip
            colors={BrujulasColors.occidente}
            label={t('Occidente')}
            link="/guias/pdfs/La_Brujula_2024_OCCIDENTE.pdf"
          />
          <Strip
            colors={BrujulasColors.centro}
            label={t('Centro')}
            link="/guias/pdfs/La_Brujula_2024_CENTRO.pdf"
          />
          <Strip
            colors={BrujulasColors.norte}
            label={t('Norte')}
            link="/guias/pdfs/La_Brujula_2024_NORTE.pdf"
          />
          <Strip
            colors={BrujulasColors.noreste}
            label={t('Noroeste')}
            link="/guias/pdfs/La_Brujula_2024_NOROESTE.pdf"
          />
          <Strip
            colors={BrujulasColors.sureste}
            label={t('Sureste')}
            link="/guias/pdfs/La_Brujula_2024_SURESTE.pdf"
          />
          <div className="h-0.5 w-11/12 justify-self-center bg-black opacity-20 sm:hidden" />
          <Strip
            colors={BrujulasColors.colombia}
            label={t('Colombia')}
          />
        </div>
      </div>
      <div className="mt-16 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="flex w-full flex-row justify-end text-left lg:order-last">
          <div className="text-left">
            <h2 className="text-xl">
              <Trans
                i18nKey="specialGuides"
                t={t}
              >
                Conoce los directorios especiales, realizados con el apoyo de
                nuestros Estados Aliados.
              </Trans>
            </h2>
          </div>
        </div>
        <div className="isolate grid w-full transform grid-cols-1 flex-row justify-start gap-4 overflow-hidden text-left text-lg font-bold sm:grid-cols-2 md:flex lg:col-span-2">
          {guides.specials.map((guide, i) => (
            <HorizontalStrip
              colors={
                BrujulasColors[
                  guide.name.toLowerCase() as keyof typeof BrujulasColors
                ]
              }
              label={t(guide.name)}
              link={guide.link}
            />
          ))}
        </div>
      </div>
    </Container>
  );
}

export default DownloadGuides;
