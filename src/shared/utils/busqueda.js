'use strict';
import referents from '@/shared/constants/inductiveReferents.json';

let INDEX = Object.entries(referents).map(([term, id]) => [
  new RegExp('\\b' + term + '\\b', 'gi'),
  id,
]);

export function replaceSearchTermsFromIndex(query) {
  INDEX.forEach((v) => {
    query = query.replace(new RegExp(v[0], 'gi'), v[1]);
  });

  return removeDiacritics(query);
}

export function removeDiacritics(str) {
  return str.normalize('NFD').replace(/\p{Diacritic}/gu, '');
}
