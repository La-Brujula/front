import EmailOutlined from '@mui/icons-material/EmailOutlined';
import FacebookOutlined from '@mui/icons-material/FacebookOutlined';
import Instagram from '@mui/icons-material/Instagram';
import LinkOutlined from '@mui/icons-material/LinkOutlined';
import LinkedIn from '@mui/icons-material/LinkedIn';
import PhoneOutlined from '@mui/icons-material/PhoneOutlined';
import WhatsApp from '@mui/icons-material/WhatsApp';
import Twitter from '@mui/icons-material/X';
import YouTube from '@mui/icons-material/YouTube';
import { useAuth } from '@shared/context/firebaseContext';
import useSocials from '@shared/hooks/useSocials';
import { useUserInfo } from '@shared/hooks/useUserInfo';
import { brujulaUtils } from '@shared/utils/brujulaUtils';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const ContactPage = () => {
  const brujula = brujulaUtils();
  const { register, handleSubmit, setValue, watch } = useForm();
  const { t } = useTranslation('auth');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    for (const property in data) {
      data[property] = useSocials(property, data[property]);
    }

    await brujula.updateUserInfo(data);
    navigate('../caracteristicas');
  };

  const { getUserEmail } = useAuth();

  const { user } = useUserInfo(getUserEmail());
  useMemo(() => {
    !!user &&
      Object.entries(user).forEach(([key, value]) => setValue(key, value));
  }, [user]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-8 w-full items-stretch"
    >
      <div className="mb-8">
        <div className="absolute left-0 -z-10 bg-black bg-opacity-20 w-full h-16 overflow-hidden"></div>
        <h2>{t('Contacto')}</h2>
      </div>
      <div
        className="grid grid-cols-[min-content_1fr]
      text-right gap-4 mx-auto items-center gap-x-8"
      >
        <h3 className="col-span-full text-center">{t('Redes sociales')}</h3>
        <label htmlFor="website">
          <LinkOutlined />
        </label>
        <input
          type="url"
          {...register('website')}
          autoComplete="website"
        />
        <label htmlFor="whatsapp">
          <WhatsApp />
        </label>
        <input
          type="phone"
          {...register('whatsapp')}
          autoComplete="phone"
        />
        <label htmlFor="imdb">{t('imdb')}</label>
        <input
          type="url"
          {...register('imdb')}
          autoComplete="imdb"
        />
        <label htmlFor="facebook">
          <FacebookOutlined />
        </label>
        <input
          type="url"
          {...register('facebook')}
          autoComplete="facebook"
        />
        <label htmlFor="instagram">
          <Instagram />
        </label>
        <input
          type="url"
          {...register('instagram')}
          autoComplete="instagram"
        />
        <label htmlFor="vimeo">{t('vimeo')}</label>
        <input
          type="text"
          {...register('vimeo')}
          autoComplete="vimeo"
        />
        <label htmlFor="youtube">
          <YouTube />
        </label>
        <input
          type="url"
          {...register('youtube')}
          autoComplete="youtube"
        />
        <label htmlFor="linkedin">
          <LinkedIn />
        </label>
        <input
          type="url"
          {...register('linkedin')}
          autoComplete="linkedin"
        />
        <label htmlFor="twitter">
          <Twitter />
        </label>
        <input
          type="url"
          {...register('twitter')}
          autoComplete="twitter"
        />
        <label htmlFor="tiktok">{t('tiktok')}</label>
        <input
          type="url"
          {...register('tiktok')}
          autoComplete="tiktok"
        />
        <h3 className="col-span-full text-center mt-4">
          {t('Medios secundarios de contacto')}
        </h3>
        <label htmlFor="altPhone">
          <PhoneOutlined />
        </label>
        <input
          type="phone"
          {...register('altPhone')}
        />
        <label htmlFor="altPhone2">
          <PhoneOutlined />
        </label>
        <input
          type="phone"
          {...register('altPhone2')}
        />
        <label htmlFor="altEmail">
          <EmailOutlined />
        </label>
        <input
          type="email"
          {...register('altEmail')}
        />
        <label htmlFor="altEmail2">
          <EmailOutlined />
        </label>
        <input
          type="email"
          {...register('altEmail2')}
        />
      </div>
      <div className="flex flex-row gap-4 self-center">
        <div
          className="button font-bold bg-transparent border border-primary text-black"
          onClick={() => navigate(-1)}
        >
          {t('Regresar')}
        </div>
        <input
          type="submit"
          className="border-none"
          value={t('Continuar')}
        />
      </div>
    </form>
  );
};

export default ContactPage;
