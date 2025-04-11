import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { UserCard } from '@/modules/search/components/userCard';

import { getTitle } from '@shared/utils/areaUtils';

import { JobDTO } from '../queries/jobSearchQuery';

export const JobCard = ({ job }: { job: JobDTO }) => {
  const { t } = useTranslation('jobs');

  return (
    <Link
      to="/jobs/$jobId"
      params={{ jobId: job.id }}
      className="grid items-center gap-4 gap-y-4 pt-4"
      resetScroll={false}
    >
      <div className="grid grid-cols-[1fr_max-content] gap-8">
        <div className="flex flex-col gap-2">
          <div className="">
            <UserCard
              user={job.requester}
              showRecommendations={false}
              hasLink={false}
            />
          </div>
          <p className="text-lg font-bold text-primary opacity-80">
            {t('Busca {{count}} {{title}}', {
              replace: {
                count: job.count,
                title: getTitle(job.activity, job.gender || 'other'),
              },
            })}
          </p>
          <p className="text-sm text-black opacity-70">{job.description}</p>
          <div className="flex w-full flex-row justify-between">
            <p className="text-sm text-black opacity-40">
              {t('Expira el {{fecha}}', {
                replace: {
                  fecha:
                    typeof job.contactEndDate?.toLocaleDateString === 'function'
                      ? job.contactEndDate.toLocaleDateString('es-MX')
                      : '...',
                },
              }).replace(/&#x2F;/g, '/')}
            </p>
            <p className="text-sm text-black opacity-40">
              {t('Han aplicado {{count}} personas', {
                count: job.applicantsCount,
              })}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};
