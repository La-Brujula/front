import areasJson from './areas.json';

type Genders =
  | 'Femenino'
  | 'Masculino'
  | 'No Binario'
  | 'Persona Moral'
  | 'Alias Genérico';

type Languages = 'fr' | 'es' | 'en';

type ActivityGenders = {
  [gender in Genders]: {
    [language in Languages]: string | null;
  };
};

type JsonActivity = {
  Referentes: string[];
} & ActivityGenders;

type JsonAreas = {
  [areaName in keyof typeof areasJson]: {
    [subareaName in keyof (typeof areasJson)[areaName]]: {
      [activityId in keyof (typeof areasJson)[areaName][subareaName]]: JsonActivity;
    };
  };
};

export type TActivity = {
  id: string;
  referents: string[];
  genders: {
    gender: Genders;
    titles: {
      language: Languages;
      title: string;
    }[];
  }[];
};

export type TSubArea = {
  name: string;
  id: string;
  activities: TActivity[];
};

export type TArea = {
  name: keyof typeof areasJson;
  id: string;
  subareas: TSubArea[];
};

const areas = Object.entries(areasJson as JsonAreas).map(
  ([areaName, subareas], areaIndex) => ({
    name: areaName,
    id: (areaIndex + 1).toString(),
    subareas: Object.entries(subareas).map(
      ([subareaName, activities], subareaIndex) => ({
        name: subareaName,
        id: areaIndex + 1 + '' + (subareaIndex + 1).toString().padStart(2, '0'),
        activities: Object.entries(activities).map(([id, value]) => {
          const activityProperties = Object.entries(value as JsonActivity);
          return {
            id,
            genders: activityProperties
              .filter(([k, _]) => k != 'Referentes')
              .map(([gender, titles]) => ({
                gender: gender as Genders,
                titles: Object.entries(titles).map(([language, title]) => ({
                  language: language as Languages,
                  title,
                })),
              })),
            referents: (value as JsonActivity).Referentes,
          };
        }),
      }),
    ),
  }),
);

export default areas as TArea[];
