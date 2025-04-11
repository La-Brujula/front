import { Link } from '@tanstack/react-router';
import { Trans, useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';

function MigrationAnnouncement() {
  const { t } = useTranslation('migrationAnnouncement');
  return (
    <div className="">
      <h2>{t('La Brújula 2024')}</h2>
      <div className="mx-auto max-w-2xl text-justify text-black [text-align-last:center] *:mb-4">
        <p>
          <Trans
            t={t}
            i18nKey="EstrenamosVersion"
          >
            Estrenamos la versión 2024 de la plataforma que incluye búsquedas
            más rápidas y precisas, optimizaciones de desempeño y la opción de
            usar la plataforma en inglés.
          </Trans>
        </p>
        <p>
          <Trans
            t={t}
            i18nKey="HemosTrabajado"
          >
            Hemos trabajado en el desarrollo de nuevas funcionalidades para
            aumentar la seguridad y protección de los datos de nuestra
            comunidad. Es por eso que es muy importante actualizar tus datos de
            usuario y cambiar tu contraseña para que cumpla con los nuevos
            estándares de seguridad.
          </Trans>
        </p>
        <p>
          <Trans
            t={t}
            i18nKey="HacerloTeTomara"
          >
            Hacerlo te tomará solo un par de minutos en esta liga:
          </Trans>
        </p>
        <p>
          <Link to="/auth/reset-password">
            <Button>{t('Reiniciar contraseña')}</Button>
          </Link>
        </p>
        <p>
          <Trans
            t={t}
            i18nKey="GraciasPor"
          >
            ¡Gracias por contribuir a la comunidad audiovisual del país!
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

export default MigrationAnnouncement;
