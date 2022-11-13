import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

export const PrivacyPolicy = ({setValues}) => {
  const { t } = useTranslation('profile');

  return (
    <div className="flex flex-col gap-4">
      <p>{t('readPrivacyPolicy')}:</p>
      <NavLink to="aviso-privacidad" className="self-center">
        <div className="button bg-primary">{t('privacyPolicy')}</div>
      </NavLink>
      <p>{t('privacyPolicyConfirmation')}:</p>
      <div
        className="flex flex-row gap-4 py-8 text-secondary items-center h-48"
      >
        <div className="absolute left-0 -z-10 bg-black bg-opacity-20 w-full h-48 overflow-hidden"></div>
        <p className="grow text-left">{t('privacyAgree')}</p>
        <div
          className="w-24 h-24 font-bold text-white flex text-xl
        items-center justify-center rounded-full bg-primary"
          onClick={(ev) => {
            ev.preventDefault()
            setValues('acceptPrivacy', true)
          }}
        >
          {t('yes')}
        </div>
      </div>
    </div>
  );
};
