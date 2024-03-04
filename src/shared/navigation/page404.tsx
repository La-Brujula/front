import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

export default () => {
  const { t } = useTranslation();
  return (
    <div className="bg-secondary h-footerAware bg-opacity-20 gap-10 flex flex-col items-center pt-32 pb-16 pl-8 pr-8">
      <div className="flex flex-col items-center gap-8 z-10">
        <div className=" items-center flex flex-col gap-4">
          <h1 className="text-5xl">{t('Esta página no existe')}</h1>
          <p className="text-lg">{t('Sentimos las molestias')}</p>
        </div>
        <div className="flex flex-row justify-center gap-8">
          <NavLink
            /* El tipado es incompleto, con -1 rediriges a la página anterior */
            // @ts-ignore
            to={-1}
            className="button bg-transparent text-current h-11"
          >
            {t('Regresar')}
          </NavLink>
          <NavLink
            to="/"
            className="button h-11"
          >
            {t('Página principal')}
          </NavLink>
        </div>
      </div>
      <img
        src={import.meta.env.BASE_URL + 'img/HalfLogo.svg'}
        alt=""
        className="absolute opacity-20 top-24 -translate-x-1/2 rotate-180 left-1/2 w-5/12"
      />
    </div>
  );
};
