import languages from '@shared/constants/languages.json';
import { useTranslation } from 'react-i18next';
import { UniversidadesSelect } from '../../auth/components/universidadesSelect';
import { SearchFilters } from '@/shared/hooks/useSearch';
import { ChangeEvent } from 'react';

export function ExtraFilters({
  setFilters,
  filters,
  updateFilterValue,
}: {
  setFilters: (v: SearchFilters) => void;
  filters: SearchFilters;
  updateFilterValue: (
    fieldName: keyof SearchFilters,
  ) => (ev: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
}) {
  const { t } = useTranslation('search');
  const lang = filters.language;
  return (
    <div className="pt-4 border-t border-black flex flex-col gap-4">
      <div className="grid grid-cols-[min-content_1fr]">
        {/* Tipo de persona */}
        <div className="grid grid-cols-[1fr,2rem] gap-4 items-center text-left border-b border-b-black border-opacity-20">
          <label
            className="font-normal w-full cursor-pointer"
            htmlFor="remote"
          >
            {t('Remoto')}
          </label>
          <input
            type="checkbox"
            placeholder="remote"
            id="remote"
            onChange={updateFilterValue('remote')}
            className="size-4 cursor-pointer"
          />
        </div>
        <select
          onChange={updateFilterValue('type')}
          className="w-full dark"
          defaultValue={filters.type}
        >
          <option
            value=""
            selected
            unselectable="on"
          >
            {t('Tipo de persona')}
          </option>
          <option value="moral">{t('Moral')}</option>
          <option value="fisica">{t('Física')}</option>
        </select>
      </div>
      {/* Idioma */}
      <div className="flex flex-col gap-4 w-full">
        <select
          onChange={updateFilterValue('language')}
          defaultValue={lang}
          className="w-full dark"
        >
          <option value="">Idioma</option>
          {languages.map((defLang) => (
            <option
              value={defLang}
              key={defLang}
            >
              {t(defLang)}
            </option>
          ))}
          <option value="other">Otro</option>
        </select>
        {!!lang && !languages.includes(lang) && (
          <input
            type="text"
            onChange={updateFilterValue('language')}
            placeholder="Escribe aquí el nombre del idioma"
          />
        )}
      </div>
      {/* Escuela */}
      <UniversidadesSelect
        onChange={updateFilterValue('schools')}
        placeholder={t('Escuela o universidad')}
      />
      {/* Servicio de becario */}
      <div className="grid grid-cols-[1fr,2rem] gap-4 items-center text-left border-b border-b-black border-opacity-20">
        <label
          className="font-normal w-full cursor-pointer"
          htmlFor="socialService"
        >
          {t('Disponible para sevicio social o de becario')}
        </label>
        <input
          type="checkbox"
          placeholder=""
          id="socialService"
          onChange={updateFilterValue('socialService')}
          className="size-4 cursor-pointer"
        />
      </div>
      {/* Asociaciones */}
      <div className="grid gap-1 items-center text-left border-b border-b-black border-opacity-20">
        <label
          className="font-normal w-full cursor-pointer"
          htmlFor="associations"
        >
          {t('Asociaciones')}
        </label>
        <input
          type="text"
          placeholder=""
          id="associations"
          onChange={updateFilterValue('associations')}
          defaultValue={filters.associations}
        />
      </div>
      {/* Certificaciones */}
      <div className="grid gap-1 items-center text-left border-b border-b-black border-opacity-20">
        <label
          className="font-normal w-full cursor-pointer"
          htmlFor="certifications"
        >
          {t('Certificaciones')}
        </label>
        <input
          type="text"
          placeholder=""
          id="certifications"
          onChange={updateFilterValue('certifications')}
          defaultValue={filters.certifications}
        />
      </div>
    </div>
  );
}