import areas from '@shared/constants/areas.json';

export function getTitle(userActivity, gender = 'Alias Genérico') {
  if (!userActivity) return;
  if (
    !['Femenino', 'Masculino', 'No binario', 'Prefiero no decir'].includes(
      gender,
    )
  ) {
    throw Error(
      'Unknown gender please use one of "Femenino", "Masculino", "No binario", "Prefiero no decir"',
    );
  }
  if (['No binario', 'Prefiero no decir'].includes(gender)) {
    gender = 'Alias Genérico';
  }
  const activity =
    areas[getAreaFromId(userActivity)][getSubAreaFromId(userActivity)][
      userActivity
    ];
  return !!activity[gender].es
    ? activity[gender].es
    : activity['Alias Genérico'].es;
}

export function getArea(area) {
  try {
    return Object.keys(areas)[area - 1];
  } catch (e) {
    console.error(e);
    return area;
  }
}

export function getSubArea(area, subareaIndex) {
  try {
    return Object.keys(areas[area])[subareaIndex - 1];
  } catch (e) {
    console.error(e);
    return subareaIndex;
  }
}

export function getAreaFromId(activity) {
  try {
    return getArea(parseInt(activity.charAt(0)));
  } catch (e) {
    console.error(e);
    return activity;
  }
}

export function getSubAreaFromId(activity) {
  try {
    return getSubArea(
      getAreaFromId(activity),
      parseInt(activity.split('-')[0].slice(1)),
    );
  } catch (e) {
    console.error(e);
    return activity;
  }
}
