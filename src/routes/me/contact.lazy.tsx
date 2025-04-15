import {
  createLazyFileRoute,
  useNavigate,
  useRouter,
} from '@tanstack/react-router';
import { MailIcon, PhoneIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import useUpdateProfile from '@/modules/me/hooks/updateProfileHook';
import ErrorMessage from '@/shared/components/errorMessage';
import Input from '@/shared/components/input';
import { isApiError } from '@/shared/services/backendFetcher';
import { TProfileUpdateForm } from '@/shared/types/user';

import { StringArrayForm } from '../../modules/auth/components/stringArrayForm';

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

  const { form, updateProfile, isPending, error, user } = useUpdateProfile();

  const onSubmit = async (data: TProfileUpdateForm) => {
    updateProfile(data, {
      onSuccess: () =>
        navigate({ to: '/me/characteristics', resetScroll: true }),
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col items-stretch gap-8"
      >
        <div className="mx-auto flex flex-col items-center gap-4 text-left">
          <h2 className="text-left text-secondary">{t('Redes sociales')}</h2>
          <Input
            divClass="w-full"
            type="url"
            label={t('Página web')}
            fieldName="externalLinks.0"
            form={form}
            autoComplete="externalLinks"
          />
          <Input
            divClass="w-full"
            type="tel"
            label={t('Whatsapp')}
            fieldName="whatsapp"
            form={form}
            country={user?.country}
          />
          <Input
            divClass="w-full"
            type="text"
            label={t('IMDB')}
            form={form}
            fieldName="imdb"
          />
          <Input
            divClass="w-full"
            type="text"
            label={t('Facebook')}
            form={form}
            fieldName="facebook"
          />
          <Input
            divClass="w-full"
            type="text"
            label={t('Instagram')}
            form={form}
            fieldName="instagram"
          />
          <Input
            divClass="w-full"
            type="text"
            label={t('Vimeo')}
            form={form}
            fieldName="vimeo"
          />
          <Input
            divClass="w-full"
            type="text"
            label={t('Youtube')}
            form={form}
            fieldName="youtube"
          />
          <Input
            divClass="w-full"
            type="text"
            label={t('LinkedIn')}
            form={form}
            fieldName="linkedin"
          />
          <Input
            divClass="w-full"
            type="text"
            label={t('Twitter')}
            form={form}
            fieldName="twitter"
          />
          <Input
            divClass="w-full"
            type="text"
            label={t('Tiktok')}
            form={form}
            fieldName="tiktok"
          />
        </div>
        <div className="mx-auto flex flex-col gap-8 text-left">
          <h2 className="col-span-full text-secondary">
            {t('Medios secundarios de contacto')}
          </h2>
          <div className="flex flex-col gap-4">
            <label htmlFor="altPhone">
              <PhoneIcon /> {t('Teléfonos')}
            </label>
            <StringArrayForm
              fieldName="phoneNumbers"
              form={form}
              inputType="tel"
              label={t('teléfono')}
            />
          </div>
          <div className="flex w-full flex-col gap-4">
            <label htmlFor="altEmail">
              <MailIcon /> {t('Correos alternativos')}
            </label>
            <StringArrayForm
              fieldName="secondaryEmails"
              form={form}
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
          <Button
            variant="outline"
            onClick={() => history.back()}
          >
            {t('Regresar')}
          </Button>
          <Button
            type="submit"
            disabled={isPending}
          >
            {t('Continuar')}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default ContactPage;
