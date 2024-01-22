import languages from '@shared/constants/languages.json';
import { useTranslation } from 'react-i18next';
import { UniversidadesSelect } from '../../auth/components/universidadesSelect';

export function ExtraFilters({ register, watch }) {
  const { t } = useTranslation('search');
  const lang = watch('language');
  return (
    <div className="pt-4 border-t border-black flex flex-col gap-4">
      <div className="grid grid-cols-[min-content_1fr]">
        {/* Tipo de persona */}
        <div className="grid grid-cols-[1fr,2rem] gap-4 items-center text-left border-b border-b-black border-opacity-20">
          <label className="font-normal w-full cursor-pointer" htmlFor="remote">
            {t('Remoto')}
          </label>
          <input
            type="checkbox"
            placeholder="remote"
            id="remote"
            {...register('remote')}
            className="w-4 h-4 cursor-pointer"
          />
        </div>
        <select {...register('type')} className="w-full dark">
          <option value="" selected unselectable>
            {t('Tipo de persona')}
          </option>
          <option value="moral">{t('Moral')}</option>
          <option value="fisica">{t('Física')}</option>
        </select>
      </div>
      {/* Idioma */}
      <div className="flex flex-col gap-4 w-full">
        <select {...register('language')} className="w-full dark">
          <option value="">Idioma</option>
          {Object.keys(languages).map((defLang) => (
            <option value={defLang} key={defLang}>
              {languages[defLang]}
            </option>
          ))}
          <option value="other">Otro</option>
        </select>
        {!!lang && !Object.keys(languages).includes(lang) && (
          <input
            type="text"
            onChange={(e) =>
              setValue('language', e.currentTarget.value, { shouldTouch: true })
            }
            placeholder="Escribe aquí el nombre del idioma"
          />
        )}
      </div>
      {/* Escuela */}
      <UniversidadesSelect
        fieldname="university"
        register={register}
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
          {...register('socialService')}
          className="w-4 h-4 cursor-pointer"
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
          {...register('associations')}
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
          {...register('certifications')}
        />
      </div>
    </div>
  );
}
