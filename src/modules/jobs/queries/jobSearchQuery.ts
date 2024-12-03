import {
  infiniteQueryOptions,
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { JobSearch, TJobPosting } from '../types/searchParams';
import { getFetch, postFetch } from '@/shared/services/backendFetcher';

export type JobDetailDTO = {
  id: string;
  requesterId: string;
  contactStartDate: Date;
  contactEndDate: Date;
  contactEmail: string;
  whatsapp: string;
  phoneNumbers: string[];
  location: string;
  workRadius: 'local' | 'state' | 'national' | 'international';
  specialRequirements: string;
  employment: 'freelance' | 'determinate' | 'indeterminate';
  description: string;
  jobStartDate: Date;
  jobEndDate: Date;
  budgetLow?: number;
  budgetHigh?: number;
  benefits?: string;
  notes?: string;
  // Opening
  activity: string;
  count: number;
  probono: boolean;
  gender?: 'male' | 'female' | 'other';
  ageRangeMin?: number;
  ageRangeMax?: number;
  languages?: string;
};

export type JobDTO = {
  id: string;
  activity: string;
  count: number;
  probono: boolean;
  gender?: 'male' | 'female' | 'other';
  ageRangeMin?: number;
  ageRangeMax?: number;
  languages?: string;
  requester: string;
  location: string;
  workRadius: 'local' | 'state' | 'national' | 'international';
  employment: 'freelance' | 'determinate' | 'indeterminate';
  description: string;
  jobStartDate: Date;
  jobEndDate?: Date;
};

export const jobSearchQueryOptions = (search: JobSearch) =>
  infiniteQueryOptions({
    initialPageParam: 0,
    queryKey: ['jobs', search],
    queryFn: (queryParams) => {
      return getFetch<JobDTO[]>('/jobs', {
        params: {
          ...search,
          offset: queryParams.pageParam,
        },
        signal: queryParams.signal,
      });
    },
    getPreviousPageParam: (firstPage) => {
      const next = firstPage.meta.offset - firstPage.meta.limit;
      if (next <= 0) {
        return null;
      }
      return next;
    },
    getNextPageParam: (lastPage) => {
      const next = lastPage.meta.offset + lastPage.meta.limit;
      if (next >= lastPage.meta.total) {
        return null;
      }
      return next;
    },
  });

export const jobDetailOptions = (jobId: string) =>
  queryOptions({
    queryKey: ['jobs', jobId],
    queryFn: (queryOptions) =>
      getFetch<JobDetailDTO>(`/jobs/${jobId}`, {
        signal: queryOptions.signal,
      }).then((res) => res.entity),
  });

export const useCreateJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['jobs'],
    mutationFn: (job: TJobPosting) =>
      postFetch<JobDetailDTO>(`/jobs`, job).then((res) => res.entity),
    onSuccess: (job) => {
      queryClient.setQueryData(['jobs', job.id], () => job);
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });
};
