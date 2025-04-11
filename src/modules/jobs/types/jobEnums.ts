export const LOCATION_OPTIONS = ['online', 'hybrid', 'in-person'] as const;
type LocationOptionsList = typeof EMPLOYMENT_OPTIONS;
export type LocationEnum = LocationOptionsList[number];

export const EMPLOYMENT_OPTIONS = [
  'freelance',
  'determinate',
  'indeterminate',
] as const;
type EmploymentOptionsList = typeof EMPLOYMENT_OPTIONS;
export type EmploymentEnum = EmploymentOptionsList[number];

export const WORK_RADIUS_OPTIONS = [
  'local',
  'state',
  'national',
  'international',
] as const;
type WorkRadiusList = typeof EMPLOYMENT_OPTIONS;
export type WorkRadiusEnum = WorkRadiusList[number];
