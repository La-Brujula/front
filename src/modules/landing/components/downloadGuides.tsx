import { Container } from '@shared/layout/container';
import Strip from './strip';
import { Trans, useTranslation } from 'react-i18next';
import guides from '@shared/constants/guides.json';
import HorizontalStrip from './horizontalStrip';

const BrujulasColors = {
  occidente: ['#63C7EB', '#1CAFE5', '#0091C8', '#006FAE'],
  centro: ['#E49DC0', '#ED2F79', '#BF5D86', '#961949'],
  norte: ['#FBF0C1', '#F8E048', '#DDC26A', '#A78C2B'],
  noreste: ['#FB8068', '#F12D27', '#B94B4D', '#BE1A1E'],
  sureste: ['#A6C37A', '#00933D', '#41A85A', '#00592D'],
  guanajuato: ['#384c72', '#2c3059', '#a7ccf1', '#5776b7'],
  aguascalientes: ['#d09239', '#aa5f2a', '#e8ca9b', '#d29776'],
};

function DownloadGuides() {
  const { t } = useTranslation('landing');
  return (
    <Container bg="lightblue">
      <div className="grid grid-cols-1 gap-4">
        <div className="text-left flex flex-row justify-end w-full">
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
        <div
          className="grid-cols-2 md:grid-flow-col grid justify-end gap-4 font-bold text-lg
        text-right isolate transform overflow-hidden w-full"
        >
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
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 mt-16 gap-4">
        <div className="text-left flex lg:order-last flex-row justify-end w-full">
          <div className="text-left">
            <h2 className="">
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
        <div
          className="lg:col-span-2 flex flex-row justify-start gap-4 font-bold text-lg
        text-left isolate transform overflow-hidden w-full"
        >
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
