// @vitest-environment node

import { removeDiacritics, replaceSearchTermsFromIndex } from './busqueda';
import { expect, test } from 'vitest';

test('Removes all diacritics', () => {
  expect(removeDiacritics('àèìòùáéíóúäëïöüâãąêęēėįīîöôõōûū')).toBe(
    'aeiouaeiouaeiouaaaeeeeiiioooouu',
  );
});
test('Substitutes for id', () => {
  expect(replaceSearchTermsFromIndex('Showrunner')).toBe('101-04');
});
test('Substitutes for id leaves the rest', () => {
  expect(replaceSearchTermsFromIndex('Showrunner Macho')).toBe('101-04 Macho');
});
test('Substitutes for id leaves the rest, removes diacritics', () => {
  expect(replaceSearchTermsFromIndex('Showrunner Machò')).toBe('101-04 Macho');
});
test('Substitutes referents with diacritics', () => {
  expect(replaceSearchTermsFromIndex('Modèles')).toBe(
    '202-02 202-03 202-04 202-05',
  );
});
test('Substitutes referents for category', () => {
  expect(replaceSearchTermsFromIndex('Internet')).toBe(
    '801-01 801-02 801-03 802-01 802-02 802-03',
  );
});
