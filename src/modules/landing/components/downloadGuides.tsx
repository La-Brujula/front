import { Container } from '@shared/layout/container';
import Strip from './strip';
import { Trans, useTranslation } from 'react-i18next';

const BrujulasColors = {
  occidente: ['#63C7EB', '#1CAFE5', '#0091C8', '#006FAE'],
  centro: ['#E49DC0', '#ED2F79', '#BF5D86', '#961949'],
  norte: ['#FBF0C1', '#F8E048', '#DDC26A', '#A78C2B'],
  noreste: ['#FB8068', '#F12D27', '#B94B4D', '#BE1A1E'],
  sureste: ['#A6C37A', '#00933D', '#41A85A', '#00592D'],
};

function DownloadGuides() {
  const { t } = useTranslation('landing');
  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div
          className="text-left py-16 px-8 flex
        flex-row justify-end w-full"
        >
          <div className="max-w-lg">
            <h2 className="text-blue">
              <Trans
                i18nKey="landing"
                t={t}
              >
                Descarga <span className="text-blue">{'La Brújula'}</span> en
                PDF para utilizarla sin conexión
              </Trans>
            </h2>
          </div>
        </div>
        <div
          className="md:col-span-2 flex flex-col md:flex-row justify-end gap-4 font-bold text-lg
        text-right isolate transform overflow-hidden w-full"
        >
          <Strip
            colors={BrujulasColors.occidente}
            label={t('Occidente')}
            link="/guias/pdfs/laBrujulaOccidente2023.pdf"
          />
          <Strip
            colors={BrujulasColors.centro}
            label={t('Centro')}
            link="/guias/pdfs/labrujulaCentro2023.pdf"
          />
          <Strip
            colors={BrujulasColors.norte}
            label={t('Norte')}
            link="/guias/pdfs/labrujulaNorte2023.pdf"
          />
          <Strip
            colors={BrujulasColors.noreste}
            label={t('Noreste')}
            link="/guias/pdfs/labrujulaNoroeste2023.pdf"
          />
          <Strip
            colors={BrujulasColors.sureste}
            label={t('Sureste')}
            link="/guias/pdfs/labrujulaSureste2023.pdf"
          />
        </div>
      </div>
    </Container>
  );
}

export default DownloadGuides;
