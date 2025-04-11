import { UseFormRegister, UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import Input from '@/shared/components/input';

import languages from '@shared/constants/languages.json';

import { Search } from '../types/searchParams';

export function ExtraFilters({
  filters,
  form,
}: {
  filters: Search;
  form: UseFormReturn<Search>;
}) {
  const { t } = useTranslation('search');
  return (
    <div className="flex flex-col gap-4 border-t border-black pt-4">
      {/* Tipo de persona */}
      <Input
        label={t('Remoto')}
        type="switch"
        fieldName="remote"
        form={form}
        inputClass="size-4 cursor-pointer"
        divClass="grid grid-cols-[1fr,2rem] gap-4 items-center text-left border-b border-b-black border-opacity-20"
      />
      <Input
        label={t('Tipo de persona')}
        type="select"
        fieldName="type"
        form={form}
        divClass="w-full dark"
        items={[
          { value: 'moral', label: 'Moral' },
          { value: 'fisica', label: 'Física' },
        ]}
      />
      {/* Idioma */}
      <Input
        label={t('Idioma')}
        type="select"
        fieldName="language"
        form={form}
        divClass="w-full dark"
        items={[
          ...languages.map((defLang) => ({
            value: defLang,
            label: t(defLang, { ns: 'languages' }),
          })),
          { value: 'other', label: t('Otro', { ns: 'languages' }) },
        ]}
      />
      {!!filters.language && !languages.includes(filters.language) && (
        <Input
          type="text"
          form={form}
          label={t('Language')}
          fieldName="language"
          placeholder={t('Escribe aquí el nombre del idioma')}
        />
      )}
      <Input
        label={t('Universidad')}
        fieldName="schools"
        form={form}
        type="text"
        divClass="grid gap-1 items-center text-left border-b border-b-black border-opacity-20"
      />
      <Input
        label={t('Disponible para servicio social o de becario')}
        fieldName="socialService"
        form={form}
        type="switch"
        inputClass="size-4 cursor-pointer"
        divClass="grid grid-cols-[1fr,2rem] gap-4 items-center text-left border-b border-b-black border-opacity-20"
      />
      <Input
        label={t('Asociaciones')}
        fieldName="associations"
        form={form}
        type="text"
        divClass="grid gap-1 items-center text-left border-b border-b-black border-opacity-20"
      />
      <Input
        label={t('Certificaciones')}
        fieldName="certifications"
        form={form}
        type="text"
        divClass="grid gap-1 items-center text-left border-b border-b-black border-opacity-20"
      />
    </div>
  );
}
