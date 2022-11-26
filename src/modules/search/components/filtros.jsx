import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearch } from '../../../shared/hooks/useSearch';
import RefList from '@shared/constants/RefList.json';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

export const PorFiltros = () => {
  const { t } = useTranslation('search');
  const {results, setFilterObject} = useSearch();

  const [search, setSearch] = useState("");
  const [activity, setActivity] = useState("");
  const [region, setRegion] = useState("");

  useEffect(() => {
    let filters = {}
    if(activity.length !== 0)
      filters["palabraClave"] = activity
    else if(search.length !== 0)
      filters["search"] = search
    setFilterObject(filters)
  }, [search, activity])
  

  return (
    <form
      action={import.meta.env.BASE_URL + 'buscar'}
      className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr_min-content]
      gap-4 justify-items-stretch
      bg-primary px-4 py-8 rounded-lg lg:-mx-4"
    >
      <input
        type="text"
        placeholder={t('search')}
        name="search"
        autoComplete="none"
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        className="font-bold border-2 border-white bg-transparent
        text-white placeholder:text-white grow"
      />


      <ReactSearchAutocomplete
        className="font-bold border-2 border-white bg-transparent
          text-white placeholder:text-white grow"
        name="actividad"
        defaultValue=""
        items={RefList && RefList.map((ref, i)=>{return {id: ref, name: ref}})}
        onSelect={(item) => {
          setActivity(item.name);
        }}
      >
        
      </ReactSearchAutocomplete>


      <select
        className="font-bold border-2 border-white bg-transparent
          text-white placeholder:text-white grow"
        name="region"
        defaultValue=""
      >
        <option value="" disabled>
          {t('region')}
        </option>
      </select>
      <input
        type="submit"
        value={t('search')}
        className="px-4 py-2 !bg-white !text-primary"
      />
    </form>
  );
};
