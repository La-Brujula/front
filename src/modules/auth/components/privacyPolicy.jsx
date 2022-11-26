import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

export const PrivacyPolicy = ({ setValues }) => {
  const { t } = useTranslation('profile');

  return (
    <div className="flex flex-col gap-4">
      <p>{t('Antes de continuar revisa nuestro aviso de privacidad.')}:</p>
      <NavLink to="aviso-privacidad" className="self-center">
        <div className="button bg-primary">{t('Aviso de privacidad')}</div>
      </NavLink>
      <p>
        {t('En La Brújula sabemos que la información es un asunto serio.')}
        <br />
        <br />
        {t('Por favor confirma tu acuerdo con el uso de tu información.')}:
      </p>
      <div className="flex flex-row gap-4 py-8 text-primary items-center h-48">
        <div className="absolute left-0 -z-10 bg-black bg-opacity-20 w-full h-48 overflow-hidden"></div>
        <p className="grow text-left">{t('Estoy de acuerdo con el uso de mi información según se describe en el aviso de privacidad.')}</p>
        <div
          className="w-24 h-24 font-bold text-white flex text-xl
        items-center justify-center rounded-full bg-primary cursor-pointer"
          onClick={(ev) => {
            ev.preventDefault();
            setValues('acceptPrivacy', true);
          }}
        >
          {t('SÍ')}
        </div>
      </div>
    </div>
  );
};
