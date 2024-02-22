'use strict';
import referents from '@shared/constants/inductiveReferents.json';

let INDEX: [RegExp, string][] = Object.entries(referents).map(([term, id]) => [
  new RegExp('\\b' + term + '\\b', 'gi'),
  id,
]);

export function replaceSearchTermsFromIndex(query: string) {
  INDEX.forEach((v: [RegExp, string]) => {
    query = query.replace(new RegExp(v[0], 'gi'), v[1]);
  });

  return removeDiacritics(query);
}

export function removeDiacritics(str: string) {
  return str.normalize('NFD').replace(/\p{Diacritic}/gu, '');
}
