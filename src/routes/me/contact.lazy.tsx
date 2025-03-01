import { useCurrentProfile } from '@/shared/hooks/useCurrentProfile';
import { useUpdateMe } from '@/shared/hooks/useUpdateMe';
import { IUpdateBackendProfile } from '@/shared/types/user';
import EmailOutlined from '@mui/icons-material/EmailOutlined';
import PhoneOutlined from '@mui/icons-material/PhoneOutlined';
import {
  createLazyFileRoute,
  useNavigate,
  useRouter,
} from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StringArrayForm } from '../../modules/auth/components/stringArrayForm';
import DataSuspense from '@/shared/components/dataSuspense';
import ErrorMessage from '@/shared/components/errorMessage';
import { isApiError } from '@/shared/services/backendFetcher';
import Input from '@/shared/components/input';

export const Route = createLazyFileRoute('/me/contact')({
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

  const { register, handleSubmit, setValue, formState } =
    useForm<IUpdateBackendProfile>({
      defaultValues: {
        ...user,
        externalLinks: user?.externalLinks ?? [],
      },
    });

  const onSubmit = async (data: IUpdateBackendProfile) => {
    mutate(data, {
      onSuccess: () =>
        navigate({ to: '/me/characteristics', resetScroll: true }),
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
          className="flex flex-col
      text-right gap-4 mx-auto items-center"
        >
          <h2 className="text-secondary text-left">{t('Redes sociales')}</h2>
          <Input
            divClass="w-full"
            type="url"
            label={t('Página web')}
            fieldName="externalLinks.0"
            register={register}
            autoComplete="externalLinks"
            error={formState.errors.externalLinks?.[0]}
          />
          <Input
            divClass="w-full"
            type="tel"
            label={t('Whatsapp')}
            fieldName="whatsapp"
            register={register}
            error={formState.errors.whatsapp}
            country={user?.country}
          />
          <Input
            divClass="w-full"
            type="text"
            label={t('IMDB')}
            register={register}
            fieldName="imdb"
            error={formState.errors.imdb}
          />
          <Input
            divClass="w-full"
            type="text"
            label={t('Facebook')}
            register={register}
            fieldName="facebook"
            error={formState.errors.facebook}
          />
          <Input
            divClass="w-full"
            type="text"
            label={t('Instagram')}
            register={register}
            fieldName="instagram"
            error={formState.errors.instagram}
          />
          <Input
            divClass="w-full"
            type="text"
            label={t('Vimeo')}
            register={register}
            fieldName="vimeo"
            error={formState.errors.vimeo}
          />
          <Input
            divClass="w-full"
            type="text"
            label={t('Youtube')}
            register={register}
            fieldName="youtube"
            error={formState.errors.youtube}
          />
          <Input
            divClass="w-full"
            type="text"
            label={t('LinkedIn')}
            register={register}
            fieldName="linkedin"
            error={formState.errors.linkedin}
          />
          <Input
            divClass="w-full"
            type="text"
            label={t('Twitter')}
            register={register}
            fieldName="twitter"
            error={formState.errors.twitter}
          />
          <Input
            divClass="w-full"
            type="text"
            label={t('Tiktok')}
            register={register}
            fieldName="tiktok"
            error={formState.errors.tiktok}
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
        {!!error && (
          <ErrorMessage
            message={isApiError(error) ? error.errorCode : error.message}
          />
        )}
        <div className="flex flex-row gap-4 self-center">
          <div
            className="button font-bold bg-transparent border border-primary text-black"
            onClick={() => history.back()}
          >
            {t('Regresar')}
          </div>
          <input
            type="submit"
            className="border-none"
            disabled={user === undefined || isPending}
            value={t('Continuar')}
          />
        </div>
      </form>
    </DataSuspense>
  );
}

export default ContactPage;
