import { JobDTO } from '../queries/jobSearchQuery';
import { JobCard } from './jobCard';
import { useTranslation } from 'react-i18next';

export const JobsList = ({ jobs }: { jobs?: JobDTO[] }) => {
  const { t } = useTranslation('search');
  return jobs != undefined && jobs.length > 0 ? (
    <div className="divide-y-2 divide-black divide-opacity-40 space-y-4">
      {jobs.map((job) => (
        <JobCard
          job={job}
          key={job.id}
        />
      ))}
    </div>
  ) : (
    <p>{t('Sin resultados')}</p>
  );
};
