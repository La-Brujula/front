import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

export const PrivacyPolicy = () => {
  const { t } = useTranslation('profile');

  return (
    <div className="flex flex-col gap-4">
      <p>{t('readPrivacyPolicy')}:</p>
      <NavLink to={import.meta.env.BASE_URL + "aviso-privacidad"} className="self-center">
        <div
          className="button bg-secondary"
        >
          {t('privacyPolicy')}
        </div>
      </NavLink>
      <p>{t('privacyPolicyConfirmation')}:</p>
      <div
        className="flex flex-row gap-4 -mx-4 px-8 py-4
      text-secondary bg-black-light items-center"
      >
        <p className="grow text-left">{t('privacyAgree')}</p>
        <Button variant="contained">{t('yes')}</Button>
      </div>
    </div>
  );
};
