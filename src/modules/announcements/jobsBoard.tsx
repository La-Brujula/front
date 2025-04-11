import { Link } from '@tanstack/react-router';
import { Trans, useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';

function JobsAnnouncement() {
  const { t } = useTranslation('jobsAnnouncement');
  return (
    <div className="">
      <h2>{t('La Brújula 2025')}</h2>
      <div className="mx-auto max-w-2xl text-justify text-black [text-align-last:center] *:mb-4">
        <p>
          <Trans
            t={t}
            i18nKey="fecha"
          >
            Abril 1ro 2025
          </Trans>
        </p>
        <p>
          <Trans
            t={t}
            i18nKey="EnLaBrujula"
          >
            En La Bújula siempre estamos trabajando para apoyar la creación de
            redes sólidas de trabajo en la industria. Es por esto que nos
            enorgullece presentar nuestra nueva Bolsa de Trabajo.
          </Trans>
        </p>
        <p>
          <Trans
            t={t}
            i18nKey="ConEstaNueva"
          >
            Con esta nueva sección de La Brújula, podrás crear ofertas laborales
            y aplicar a ellas. Permitiendo así el manejo de convocatorias,
            vacantes, contrataciones por eventualidad y muchas más
            interacciones.
          </Trans>
        </p>
        <p>
          <Trans
            t={t}
            i18nKey="NecesitarasTener"
          >
            Necesitarás tener una cuenta para poder ver ofertas y verificar tu
            correo para aplicar a ellas o crear las tuyas
          </Trans>
        </p>
        <p>
          <Link to="/jobs">
            <Button>{t('La Bolsa de Trabajo')}</Button>
          </Link>
        </p>
        <p>
          <Trans
            t={t}
            i18nKey="GraciasPor"
          >
            ¡Gracias por contribuir a la comunidad audiovisual!
          </Trans>
        </p>
        <p>
          <Trans
            t={t}
            i18nKey="Recibe un saludo"
          >
            Recibe un saludo del equipo de labrujula.com.mx
          </Trans>
        </p>
      </div>
    </div>
  );
}

export default JobsAnnouncement;
