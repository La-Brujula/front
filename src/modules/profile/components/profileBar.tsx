import { IFirebaseProfile } from '@/shared/types/user';
import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined';
import SettingsOutlined from '@mui/icons-material/SettingsOutlined';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

export const ProfileBar = ({ user }: { user: IFirebaseProfile }) => {
  const { t } = useTranslation('profile');

  const savedJobs = 4,
    jobsApplied = 1;

  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-4 bg-black-light items-center px-4 py-3">
        <div className="max-w-5xl flex flex-row mx-auto w-full gap-6">
          <NavLink to="perfil">
            <AccountCircleOutlined className="!size-8" />
          </NavLink>
          <form
            action={import.meta.env.BASE_URL + 'buscar'}
            className="grow"
          >
            <input
              name="keyword"
              placeholder={t('Buscar empleos')}
              className="w-full"
            />
          </form>
          <NavLink to="/crear-usuario/basica">
            <SettingsOutlined className="!size-8" />
          </NavLink>
        </div>
      </div>
      <div className="flex flex-row w-full items-center px-2 py-2">
        <NavLink
          to="/profile/jobs/saved"
          className="px-2 flex flex-col items-center justify-center grow text-center text-blue"
        >
          <h2 className="text-xl">{savedJobs}</h2>
          <p className="font-normal text-sm">{t('Empleos guardados')}</p>
        </NavLink>
        <div className="bg-black w-[1px] self-stretch" />
        <NavLink
          to="/profile/jobs/applied"
          className="px-2 flex flex-col items-center justify-center grow text-center text-blue"
        >
          <h2 className="text-xl">{jobsApplied}</h2>
          <p className="font-normal text-sm">{t('Empleos solicitados')}</p>
        </NavLink>
        <div className="bg-black w-[1px] self-stretch" />
        <NavLink
          to="/profile/jobs/recommended"
          className="px-2 flex flex-col items-center justify-center grow text-center text-blue"
        >
          <EditOutlined className="!size-8" />
          <p className="font-normal text-sm">{t('Intereses de empleos')}</p>
        </NavLink>
      </div>
      <div className="bg-black h-[1px] mx-3 self-stretch" />
    </div>
  );
};