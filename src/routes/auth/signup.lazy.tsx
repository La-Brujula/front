import { Container } from '@shared/layout/container';
import { Trans, useTranslation } from 'react-i18next';
import { SignUpForm } from '../../modules/auth/components/signupForm';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/auth/signup')({
  component: SignUpPage,
});

function SignUpPage() {
  const { t } = useTranslation('auth');
  return (
    <div className="flex flex-col xl:flex-row w-full">
      <div
        className={[
          'bg-primary bg-opacity-20',
          'w-full',
          'px-4',
          'md:px-8',
          'py-8',
          'text-center',
          'flex',
          'flex-col',
          'justify-center',
          'transform',
        ].join(' ')}
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className="transform h-full">
            <p>
              <Trans
                i18nKey="signUpParagraph"
                t={t}
              >
                ¡Hola!
                <br />
                Estás a un paso de formar parte de La Brújula. Crea tu usuario y
                agrega tu información para que otros miembros de la industria
                audiovisual puedan encontrarte.
                <br />
                <br />
                Queremos que tu empresa, tu proyecto y tú mismo, sean parte de
                La Brújula.
              </Trans>
            </p>
          </div>
        </div>
        <img
          src={import.meta.env.BASE_URL + 'img/HalfLogo.svg'}
          alt=""
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 hidden xl:block z-10"
        />
      </div>
      <Container>
        <h1 className="mb-8 text-secondary text-4xl">{t('createUser')}</h1>
        <SignUpForm />
      </Container>
    </div>
  );
}
