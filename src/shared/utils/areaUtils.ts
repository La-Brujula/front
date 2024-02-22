import areas from '@shared/constants/areas.json';
import { EnumGender } from '../types/genders';

interface translations {
  fr: string | null;
  es: string | null;
  en: string | null;
}

type Activity = {
  Femenino: translations;
  Masculino: translations;
  'No Binario': translations;
  'Persona Moral': translations;
  'Alias Genérico': translations;
  Referentes: string[];
};

type Subarea = Record<string, Activity>;
type Area = Record<string, Subarea>;
type AreaName = keyof typeof areas;
type AreasFile = Record<string, Area>;

export function getTitle(
  userActivity: string,
  gender: EnumGender = 'No Binario',
): string {
  let genderForTitle: keyof Activity;
  if (!userActivity) return '';
  if (
    ![
      'Femenino',
      'Masculino',
      'No Binario',
      'Persona Moral',
    ].includes(gender)
  ) {
    throw Error(
      'Unknown gender please use one of "Femenino", "Masculino", "No binario"' +
        gender,
    );
  }
  if (
    gender == 'No Binario' ||
    gender == 'Persona Moral'
  ) {
    genderForTitle = 'Alias Genérico';
  } else {
    genderForTitle = gender;
  }
  const area: Area = areas[getAreaFromId(userActivity)];
  const subarea: Subarea = area[getSubAreaFromId(userActivity)];
  const activity: Activity = subarea[userActivity];
  return !!activity[genderForTitle].es
    ? activity[genderForTitle].es || ''
    : activity['Alias Genérico'].es || '';
}

export function getAreaObjectByIndex(area: number) {
  if (typeof area !== typeof 0) throw 'noesnumero';
  return Object.entries(areas)[area - 1][1];
}

export function getAreaObjectByName(areaName: string) {
  if (!Object.hasOwn(areas, areaName)) throw 'Not a valida area';
  // @ts-expect-error
  return areas[areaName] as Area;
}

export function getAreaByIndex(area: number): keyof typeof areas {
  return Object.keys(areas)[area - 1] as keyof typeof areas;
}

export function getSubAreaObjectByName(
  area: keyof typeof areas,
  subareaName: string,
) {
  // @ts-expect-error
  return areas[area][subareaName];
}

export function getSubAreaObject(
  area: keyof typeof areas,
  subareaIndex: number,
) {
  return Object.entries(areas[area])[subareaIndex - 1][1];
}

export function getSubAreaByIndex(area: Area, subareaIndex: number): string {
  return Object.keys(area)[subareaIndex - 1];
}

export function getActivityObject(activity: string) {
  const subarea: Subarea = getSubAreaObjectFromId(activity);
  return subarea[activity];
}

export function getAreaObjectFromId(activity: string) {
  return getAreaObjectByIndex(parseInt(activity.charAt(0)));
}

export function getAreaFromId(activity: string): keyof typeof areas {
  return getAreaByIndex(parseInt(activity.charAt(0)));
}

export function getSubAreaObjectFromId(activity: string) {
  return getSubAreaObject(
    getAreaFromId(activity),
    parseInt(activity.split('-')[0].slice(1)),
  );
}

export function getSubAreaFromId(activity: string): string {
  return getSubAreaByIndex(
    getAreaObjectFromId(activity),
    parseInt(activity.split('-')[0].slice(1)),
  );
}
