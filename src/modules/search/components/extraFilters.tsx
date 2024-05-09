import languages from '@shared/constants/languages.json';
import { Search } from '../types/searchParams';
import { useTranslation } from 'react-i18next';
import Input from '@/shared/components/input';
import { UseFormRegister } from 'react-hook-form';

export function ExtraFilters({
  filters,
  register,
}: {
  filters: Search;
  register: UseFormRegister<Search>;
}) {
  const { t } = useTranslation('search');
  return (
    <div className="pt-4 border-t border-black flex flex-col gap-4">
      <div className="grid grid-cols-[min-content_1fr]">
        {/* Tipo de persona */}
        <Input
          label={t('Remoto')}
          type="checkbox"
          fieldName="remote"
          register={register}
          inputClass="size-4 cursor-pointer"
          divClass="grid grid-cols-[1fr,2rem] gap-4 items-center text-left border-b border-b-black border-opacity-20"
        />
        <Input
          label={t('Tipo de persona')}
          type="select"
          fieldName="type"
          register={register}
          divClass="w-full dark"
          items={[
            { key: 'moral', label: 'Moral' },
            { key: 'fisica', label: 'Física' },
          ]}
        />
      </div>
      {/* Idioma */}
      <div className="flex flex-col gap-4 w-full">
        <Input
          label={t('Idioma')}
          type="select"
          fieldName="language"
          register={register}
          divClass="w-full dark"
          items={[
            ...languages.map((defLang) => ({
              key: defLang,
              label: t(defLang, { ns: 'languages' }),
            })),
            { key: 'other', label: t('Otro', { ns: 'languages' }) },
          ]}
        />
        {!!filters.language && !languages.includes(filters.language) && (
          <Input
            type="text"
            register={register}
            label={t('Language')}
            fieldName="language"
            placeholder={t('Escribe aquí el nombre del idioma')}
          />
        )}
      </div>
      <Input
        label={t('Universidad')}
        fieldName="schools"
        register={register}
        type="text"
        divClass="grid gap-1 items-center text-left border-b border-b-black border-opacity-20"
      />
      <Input
        label={t('Disponible para servicio social o de becario')}
        fieldName="socialService"
        register={register}
        type="checkbox"
        inputClass="size-4 cursor-pointer"
        divClass="grid grid-cols-[1fr,2rem] gap-4 items-center text-left border-b border-b-black border-opacity-20"
      />
      <Input
        label={t('Asociaciones')}
        fieldName="associations"
        register={register}
        type="text"
        divClass="grid gap-1 items-center text-left border-b border-b-black border-opacity-20"
      />
      <Input
        label={t('Certificaciones')}
        fieldName="certifications"
        register={register}
        type="text"
        divClass="grid gap-1 items-center text-left border-b border-b-black border-opacity-20"
      />
    </div>
  );
}
