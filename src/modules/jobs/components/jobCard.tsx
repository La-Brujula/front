import { getTitle } from '@shared/utils/areaUtils';
import { useTranslation } from 'react-i18next';
import { JobDTO } from '../queries/jobSearchQuery';
import { Link } from '@tanstack/react-router';
import { UserCard } from '@/modules/search/components/userCard';

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
        <div className="flex flex-col gap-2">
          <div className="">
            <UserCard
              user={job.requester}
              showRecommendations={false}
              hasLink={false}
            />
          </div>
          <p className="text-lg opacity-80 text-primary font-bold">
            {t('Busca {{count}} {{title}}', {
              replace: {
                count: job.count,
                title: getTitle(job.activity, job.gender || 'other'),
              },
            })}
          </p>
          <p className="text-sm opacity-70 text-black">{job.description}</p>
        </div>
      </div>
    </Link>
  );
};
