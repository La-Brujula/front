import credits from '@shared/constants/credits.json';
import { Container } from '@shared/layout/container';
import { useTranslation } from 'react-i18next';

function Credit({ title, name }: { title: string; name: string }) {
  return (
    <div className="flex flex-col">
      <h3 className="font-bold">{title}</h3>
      <p>{name}</p>
    </div>
  );
}

export function CreditsSection() {
  const { t } = useTranslation('navigation');
  return (
    <Container>
      <div className="flex flex-row gap-8">
        <div
          className="bg-primary w-4 rounded-sm
        lg:ml-16"
        />
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4
      text-left text-primary grow h-fit"
        >
          {credits.map(({ title, name }) => (
            <Credit
              title={title}
              name={name}
            />
          ))}
        </div>
      </div>
      <br></br>

      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '24px' }}>
          {t('SeeOurPoli')}&nbsp;
          <a
            href={
              import.meta.env.BASE_URL +
              'pdf/Políticas_de_uso_La_Brujula_Audiovisual.pdf'
            }
            className="text-primary"
          >
            {t('Politicas')}
          </a>
        </p>
      </div>
      <br></br>
    </Container>
  );
}
