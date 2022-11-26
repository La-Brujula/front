import { useTranslation } from 'react-i18next';
import { ProgressBar } from '@shared/components/progressBar';
import { ProfileHeader } from '../components/profileHeader';
import { useUserInfo } from '@shared/hooks/useUserInfo';
import { LoadingSpinner } from '@shared/components/loadingSpinner';
import { ErrorMessage } from '@shared/components/errorMessage';
import { Container } from '@shared/layout/container';
import { useAuth } from '@shared/context/firebaseContext';
import EmailOutlined from '@mui/icons-material/EmailOutlined';
import WhatsApp from '@mui/icons-material/WhatsApp';
import PhoneOutlined from '@mui/icons-material/PhoneOutlined';

export const LandingPage = () => {
  const { t } = useTranslation('profile');
  const { getUserEmail } = useAuth();
  const { user, loading, error } = useUserInfo(getUserEmail());

  return loading ? (
    <LoadingSpinner />
  ) : error ? (
    <ErrorMessage message={error.toString()} />
  ) : (
    <>
      <ProfileHeader user={user} />
      <Container>
        <div className="flex flex-col gap-8 justify-items-stretch mt-8">
          {!!user.headline && <p>{user.headline}</p>}

          <div
            className="grid grid-cols-[min-content_max-content] max-w-md
      text-left gap-4 mx-auto items-center gap-x-8"
          >
            <h3>
              <PhoneOutlined />
            </h3>
            <p>{user.phone}</p>
            <h3>
              <WhatsApp />
            </h3>
            <p>{user.whatsapp}</p>
            <h3>
              <EmailOutlined />
            </h3>
            <p>{user.email}</p>
          </div>
          <h3>Recomendar</h3>
          <h3>Universidad</h3>
          <h3>ProBono</h3>
          <h3>Características</h3>
          <h3>Idiomas</h3>
          <h3>Asociaciones</h3>
          <h3>Certificaciones</h3>
          <h3>Reconocimientos</h3>
          <h3>78 mil links sociales</h3>
        </div>
      </Container>
    </>
  );
};
