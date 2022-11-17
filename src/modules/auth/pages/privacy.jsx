import { useTranslation } from 'react-i18next';
import { ProgressBar } from '@shared/components/progressBar';
import { ProfileBadge } from '@modules/profile/components/profileBadge';
import { PrivacyPolicy } from '../components/privacyPolicy';
import { NavLink, useNavigate } from 'react-router-dom';
import { useUserInfo } from '@shared/hooks/useUserInfo';
import { LoadingSpinner } from '@shared/components/loadingSpinner';
import { ErrorMessage } from '@shared/components/errorMessage';
import { Container } from '@shared/layout/container';
import { useForm } from 'react-hook-form';
import { brujulaUtils } from '../../../shared/utils/brujulaUtils';
import { useEffect } from 'react';

export const PrivacyStep = () => {
  const { t } = useTranslation('profile');
  const { user, loading, error } = useUserInfo();
  const navigate = useNavigate();
  const brujula = brujulaUtils();

  const { setValue, handleSubmit, register, watch } = useForm({
    defaultValues: { acceptPrivacy: false },
  });

  const agreed = watch('acceptPrivacy');

  useEffect(() => {
    if (!!user && user.acceptPrivacy) navigate('../destaca', { replace: true });
  }, [user]);

  const sendPrivacyAgreement = (data) => {
    if (!agreed) return;
    brujula.updateUserInfo(data);
    navigate('../destaca')
  };

  return loading ? (
    <LoadingSpinner />
  ) : error ? (
    <ErrorMessage message={error.toString()} />
  ) : (
    <>
      <Container>
        <div className="flex flex-col gap-8 justify-items-stretch mt-8">
          <div className="flex flex-col gap-4 w-full items-center content-center">
            <p>{t('yourUserInformationProgress')}:</p>
            <ProgressBar progress={30} />
          </div>
          {!agreed && <PrivacyPolicy setValues={setValue} />}
          <form
            onSubmit={handleSubmit(sendPrivacyAgreement)}
            className="flex flex-row gap-6 self-center"
          >
            <input {...register('acceptPrivacy')} type="hidden" required />
            <NavLink to="../revisar">
              <div className="button">{t('reviewUser')}</div>
            </NavLink>
            <input type="submit" value={t('completeUser')} />
          </form>
        </div>
      </Container>
    </>
  );
};

export default PrivacyStep;
