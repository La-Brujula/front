import { getTitle } from '@shared/utils/areaUtils';
import { useTranslation } from 'react-i18next';
import { JobDTO } from '../queries/jobSearchQuery';
import { Link } from '@tanstack/react-router';

export const JobCard = ({ job }: { job: JobDTO }) => {
  const { t } = useTranslation('jobs');
  return (
    <Link
      to="/jobs/$jobId"
      params={{ jobId: job.id }}
      className="grid
      gap-4 pt-4 gap-y-4 items-center"
      resetScroll={false}
    >
      <div className="grid grid-cols-[1fr_max-content] gap-8">
        <div className="flex flex-col">
          {!!job.requester.profilePictureUrl ? (
            <img
              src={job.requester.profilePictureUrl}
              crossOrigin="anonymous"
              alt={`${job.requester.nickName || job.requester.fullName} profile picture`}
              className="size-20 rounded-full shrink-0 row-span-2 object-cover
          object-center"
            />
          ) : (
            <img
              src={
                job.requester.type == 'moral'
                  ? '/guias/fotoDePerfil/casita.jpg'
                  : '/guias/fotoDePerfil/Monito.jpg'
              }
              alt="ImagenPredeterminada"
              className="size-20 rounded-full bg-white shrink-0 row-span-2
          object-cover object-center"
              loading="eager"
            />
          )}
          <p className="text-lg opacity-80 font-bold">
            {t('{{requester}} busca a {{count}} {{title}}', {
              replace: {
                requester: job.requester.nickName || job.requester.fullName,
                count: job.count,
                title: getTitle(job.activity, job.gender || 'other'),
              },
            })}
          </p>
          <p className="text-sm opacity-70 text-black">{job.description}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-sm mt-2 font-medium">{t(job.location)} </p>
          {job.location === 'online' && (
            <span className="text-xs">{t(job.workRadius)}</span>
          )}
        </div>
      </div>
    </Link>
  );
};
