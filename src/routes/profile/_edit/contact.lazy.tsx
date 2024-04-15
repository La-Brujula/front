import { useCurrentProfile } from '@/shared/hooks/useCurrentProfile';
import { useUpdateMe } from '@/shared/hooks/useUpdateMe';
import { IUpdateBackendProfile } from '@/shared/types/user';
import EmailOutlined from '@mui/icons-material/EmailOutlined';
import FacebookOutlined from '@mui/icons-material/FacebookOutlined';
import Instagram from '@mui/icons-material/Instagram';
import LinkOutlined from '@mui/icons-material/LinkOutlined';
import LinkedIn from '@mui/icons-material/LinkedIn';
import PhoneOutlined from '@mui/icons-material/PhoneOutlined';
import WhatsApp from '@mui/icons-material/WhatsApp';
import Twitter from '@mui/icons-material/X';
import YouTube from '@mui/icons-material/YouTube';
import {
  createLazyFileRoute,
  useNavigate,
  useRouter,
} from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StringArrayForm } from '../../../modules/auth/components/stringArrayForm';
import DataSuspense from '@/shared/components/dataSuspense';
import ErrorMessage from '@/shared/components/errorMessage';
import Vimeo from '@/shared/icons/vimeo';
import IMDB from '@/shared/icons/imdb';
import TikTok from '@/shared/icons/tiktok';
import { Tooltip } from '@mui/material';

export const Route = createLazyFileRoute('/profile/_edit/contact')({
  component: ContactPage,
});

interface ContactForm {
  facebook: string;
  imdb: string;
  instagram: string;
  linkedin: string;
  tiktok: string;
  twitter: string;
  vimeo: string;
  externalLinks: string;
  whatsapp: string;
  youtube: string;
  secondaryEmails: string[];
  phoneNumbers: string[];
}

function ContactPage() {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const { history } = useRouter();
  const { mutate, error, isPending } = useUpdateMe();
  const { data: user, isLoading, error: profileError } = useCurrentProfile();

  const { register, handleSubmit, setValue } = useForm<ContactForm>({
    defaultValues: {
      ...user,
      externalLinks:
        user?.externalLinks === undefined ? undefined : user?.externalLinks[0],
    },
  });

  const onSubmit = async (data: ContactForm) => {
    const processedData = {
      ...data,
      externalLinks: [data.externalLinks],
    } as IUpdateBackendProfile;
    mutate(processedData, {
      onSuccess: () => navigate({ to: '/profile/edit/characteristics' }),
    });
  };

  return (
    <DataSuspense
      loading={isLoading}
      error={profileError}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 w-full items-stretch"
      >
        <div
          className="grid grid-cols-[min-content_1fr]
      text-right gap-4 mx-auto items-center gap-x-8"
        >
          <h2 className="col-span-full text-secondary text-left">
            {t('Redes sociales')}
          </h2>
          <label htmlFor="website">
            <Tooltip title={t('Página web')}>
              <LinkOutlined />
            </Tooltip>
          </label>
          <input
            type="url"
            {...register('externalLinks')}
            autoComplete="externalLinks"
          />
          <label htmlFor="whatsapp">
            <Tooltip title="Whatsapp">
              <WhatsApp />
            </Tooltip>
          </label>
          <input
            type="phone"
            {...register('whatsapp')}
            autoComplete="phone"
          />
          <label htmlFor="imdb">
            <Tooltip title="IMDB">
              <IMDB />
            </Tooltip>
          </label>
          <input
            type="text"
            {...register('imdb')}
            autoComplete="imdb"
          />
          <label htmlFor="facebook">
            <Tooltip title="Facebook">
              <FacebookOutlined />
            </Tooltip>
          </label>
          <input
            type="text"
            {...register('facebook')}
            autoComplete="facebook"
          />
          <label htmlFor="instagram">
            <Tooltip title="Instagram">
              <Instagram />
            </Tooltip>
          </label>
          <input
            type="text"
            {...register('instagram')}
            autoComplete="instagram"
          />
          <label htmlFor="vimeo">
            <Tooltip title="Vimeo">
              <Vimeo />
            </Tooltip>
          </label>
          <input
            type="text"
            {...register('vimeo')}
            autoComplete="vimeo"
          />
          <label htmlFor="youtube">
            <Tooltip title="Youtube">
              <YouTube />
            </Tooltip>
          </label>
          <input
            type="text"
            {...register('youtube')}
            autoComplete="youtube"
          />
          <label htmlFor="linkedin">
            <Tooltip title="LinkedIn">
              <LinkedIn />
            </Tooltip>
          </label>
          <input
            type="text"
            {...register('linkedin')}
            autoComplete="linkedin"
          />
          <label htmlFor="twitter">
            <Tooltip title="Twitter">
              <Twitter />
            </Tooltip>
          </label>
          <input
            type="text"
            {...register('twitter')}
            autoComplete="twitter"
          />
          <label htmlFor="tiktok">
            <Tooltip title="Tiktok">
              <TikTok />
            </Tooltip>
          </label>
          <input
            type="text"
            {...register('tiktok')}
            autoComplete="tiktok"
          />
        </div>
        <div className="flex flex-col text-left gap-8 mx-auto">
          <h2 className="col-span-full text-secondary">
            {t('Medios secundarios de contacto')}
          </h2>
          <div className="flex flex-col gap-4">
            <label htmlFor="altPhone">
              <PhoneOutlined /> {t('Teléfonos')}
            </label>
            <StringArrayForm
              name="phoneNumbers"
              setValue={setValue}
              defaultState={user!.phoneNumbers}
              inputType="tel"
              label={t('teléfono')}
            />
          </div>
          <div className="flex flex-col gap-4 w-full">
            <label htmlFor="altEmail">
              <EmailOutlined /> {t('Correos alternativos')}
            </label>
            <StringArrayForm
              name="secondaryEmails"
              setValue={setValue}
              defaultState={user!.secondaryEmails}
              inputType="email"
              label={t('correo')}
            />
          </div>
        </div>
        {!!error && <ErrorMessage message={error.message} />}
        <div className="flex flex-row gap-4 self-center">
          <div
            className="button font-bold bg-transparent border border-primary text-black"
            onClick={history.back}
          >
            {t('Regresar')}
          </div>
          <input
            type="submit"
            className="border-none"
            disabled={isPending}
            value={t('Continuar')}
          />
        </div>
      </form>
    </DataSuspense>
  );
}

export default ContactPage;
