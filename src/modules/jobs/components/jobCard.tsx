import { getTitle } from '@shared/utils/areaUtils';
import { useTranslation } from 'react-i18next';
import { JobDTO } from '../queries/jobSearchQuery';
import { Link } from '@tanstack/react-router';

export const JobCard = ({ job }: { job: JobDTO }) => {
  return (
    <Link
      to="/jobs/$jobId"
      params={{ jobId: job.id }}
      className="grid grid-cols-[5rem_1fr_1fr] lg:grid-cols-[5rem_5fr_4fr] lg:gap-4
      gap-4 pt-4 gap-y-4 items-center"
      resetScroll={false}
    >
      <div className="">
        {!!job.activity && (
          <p className="text-sm opacity-80 font-bold">
            {getTitle(job.activity, job.gender || 'other')}
          </p>
        )}
        <p className="text-xs mt-2 font-medium">{job.location} </p>
      </div>
      <div className="grid lg:grid-cols-[4rem_1fr] lg:gap-4 items-center justify-center">
        <img
          src={import.meta.env.BASE_URL + 'img/LogoBlue.svg'}
          alt=""
          className="max-h-[2rem] w-full"
        />
      </div>
      {!!job.description && (
        <p className="text-sm opacity-70 text-black col-span-2">
          {job.description}
        </p>
      )}
    </Link>
  );
};
