import { brujulaUtils } from '@shared/utils/brujulaUtils';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Instagram from '@mui/icons-material/Instagram';
import LinkedIn from '@mui/icons-material/LinkedIn';
import Twitter from '@mui/icons-material/Twitter';
import YouTube from '@mui/icons-material/YouTube';
import WhatsApp from '@mui/icons-material/WhatsApp';
import FacebookOutlined from '@mui/icons-material/FacebookOutlined';
import { useUserInfo } from '../../../shared/hooks/useUserInfo';
import { useAuth } from '../../../shared/context/firebaseContext';
import { useMemo } from 'react';
import useSocials from '../../../shared/hooks/useSocials';

export const ContactPage = () => {
  const brujula = brujulaUtils();
  const { register, handleSubmit, setValue, watch } = useForm();
  const { t } = useTranslation('auth');
  const navigate = useNavigate();


  const onSubmit = async (data) => {
    for( const property in data) {
      data[property] = useSocials(property, data[property])
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
        <label htmlFor="whatsapp">
          <WhatsApp />
        </label>
        <input type="phone" {...register('whatsapp')} autoComplete="phone" />
        <label htmlFor="imdb">{t('imdb')}</label>
        <input type="text" {...register('imdb')} autoComplete="imdb" />
        <label htmlFor="facebook">
          <FacebookOutlined />
        </label>
        <input type="text" {...register('facebook')} autoComplete="facebook" />
        <label htmlFor="instagram">
          <Instagram />
        </label>
        <input type="text" {...register('instagram')} autoComplete="instagram" />
        <label htmlFor="vimeo">{t('vimeo')}</label>
        <input type="text" {...register('vimeo')} autoComplete="vimeo" />
        <label htmlFor="youtube">
          <YouTube />
        </label>
        <input type="text" {...register('youtube')} autoComplete="youtube" />
        <label htmlFor="linkedin">
          <LinkedIn />
        </label>
        <input type="text" {...register('linkedin')} autoComplete="linkedin" />
        <label htmlFor="twitter">
          <Twitter />
        </label>
        <input type="text" {...register('twitter')} autoComplete="twitter" />
        <label htmlFor="tiktok">{t('tiktok')}</label>
        <input type="text" {...register('tiktok')} autoComplete="tiktok" />
      </div>
      <div className="flex flex-row gap-4 self-center">
        <div className="button font-bold" onClick={() => navigate(-1)}>
          {t('Regresar')}
        </div>
        <input type="submit" className="border-none" value={t('Continuar')} />
      </div>
    </form>
  );
};

export default ContactPage;
