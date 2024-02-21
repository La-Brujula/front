// @vitest-environment node

import { getTitle } from './areaUtils';
import { expect, test } from 'vitest';

test('No activity', () => {
  expect(getTitle()).toBe(undefined);
});
test('Masculino en actividad con Masculino', () => {
  expect(getTitle('101-05', 'Masculino')).toBe('Asesor de guion');
});
test('Femenino en actividad con Femenino', () => {
  expect(getTitle('101-05', 'Femenino')).toBe('Asesora de guion');
});
test('No Binario en actividad con Alias Genérico', () => {
  expect(getTitle('101-05', 'No binario')).toBe('Asesoría de guion');
  expect(getTitle('101-05', 'Prefiero no decir')).toBe('Asesoría de guion');
});
test('Masculino en actividad sin Masculino', () => {
  expect(getTitle('201-02', 'Masculino')).toBe('Agencia de actores');
});
test('Género que no existe', () => {
  expect(() => getTitle('201-02', 'male')).toThrow();
});
