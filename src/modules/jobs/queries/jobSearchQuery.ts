import {
  infiniteQueryOptions,
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { JobSearch, TJobPosting } from '../types/searchParams';
import { getFetch, postFetch } from '@/shared/services/backendFetcher';
import { IBackendProfile } from '@/shared/types/user';
import { UserDTO } from '@/modules/profile/queries/userProfile';

export type JobDetailDTO = {
  id: string;
  requester: {
    id: string;
    primaryEmail: string;
    type: 'fisica' | 'moral';
    fullName: string;
    searchable: boolean;
    subscriber: boolean;
    recommendationsCount: number;
    verified: boolean;
    nickName: string;
    profilePictureUrl: string;
    location: string;
  };
  count: number;
  activity: string;
  probono: boolean;
  gender: 'male' | 'female' | 'other';
  location: 'online' | 'hybrid' | 'in-person';
  workRadius: 'local' | 'state' | 'national' | 'international';
  employment: 'freelance' | 'determinate' | 'indeterminate';
  description: string;
  jobStartDate: Date;
  jobEndDate?: Date;
  notes?: string;
  phoneNumbers?: string[];
  benefits?: string;
  whatsapp?: string;
  contactEmail?: string;
  specialRequirements?: string;
  budgetLow?: number;
  budgetHigh?: number;
  contactEndDate: Date;
  contactStartDate: Date;
  createdAt: Date;
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
  requester: {
    id: string;
    primaryEmail: string;
    type: 'fisica' | 'moral';
    fullName: string;
    searchable: boolean;
    subscriber: boolean;
    recommendationsCount: number;
    verified: boolean;
    profilePictureUrl?: string;
    nickName: string;
  };
  location: string;
  workRadius: 'local' | 'state' | 'national' | 'international';
  employment: 'freelance' | 'determinate' | 'indeterminate';
  description: string;
  jobStartDate: Date;
  jobEndDate?: Date;
};

export const getCreatedJobs = () =>
  queryOptions({
    queryKey: ['jobs', 'created'],
    queryFn: (ctx) => {
      return getFetch<JobDTO[]>('/jobs/me', {
        signal: ctx.signal,
      });
    },
    refetchOnWindowFocus: true,
  });
export const jobSearchQueryOptions = (search: JobSearch) =>
  infiniteQueryOptions({
    initialPageParam: 0,
    queryKey: ['jobs', search],
    refetchOnWindowFocus: true,
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
      })
        .then((res) => res.entity)
        .then((job) => ({
          ...job,
          createdAt: new Date(job.createdAt),
          contactStartDate: new Date(job.contactStartDate),
          contactEndDate: new Date(job.contactEndDate),
          jobStartDate: new Date(job.jobStartDate),
          jobEndDate: job.jobEndDate ? new Date(job.jobEndDate) : undefined,
        })),
  });

export const jobApplicantsOptions = (jobId: string) =>
  queryOptions({
    queryKey: ['jobs', jobId, 'applicants'],
    queryFn: (queryOptions) =>
      getFetch<UserDTO[]>(`/jobs/${jobId}/applicants`, {
        signal: queryOptions.signal,
      }).then((res) => res.entity),
  });

export const useCreateJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['jobs'],
    mutationFn: (job: TJobPosting) =>
      postFetch<JobDetailDTO>(`/jobs`, job).then((res) => res.entity),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });
};
export const useApplyToJob = (jobId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['jobs', jobId, 'applicants'],
    mutationFn: () =>
      postFetch<JobDetailDTO>(`/jobs/${jobId}/applicants`).then(
        (res) => res.entity
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs', jobId] });
    },
  });
};
