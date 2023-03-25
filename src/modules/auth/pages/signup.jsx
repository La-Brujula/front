import { Container } from '@shared/layout/container';
import { useTranslation } from 'react-i18next';
import { SignupForm } from '../components/signupForm';

export default () => {
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
          'transform'
        ].join(' ')}
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className="transform h-full">
            <p>
            ¡Hola! 
            <br />
              Estás a un paso de formar parte de La Brújula. 
              Crea tu usuario y agrega tu información para que otros miembros de
              la industria audiovisual puedan encontrarte.
              <br />
              <br />
              Queremos que tu empresa, tu proyecto y tú mismo, sean parte de La
              Brújula.
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
        <SignupForm />
      </Container>
    </div>
  );
};
