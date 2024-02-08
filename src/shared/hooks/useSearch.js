import { useCallback, useEffect, useRef, useState } from 'react';
import {
  where,
  orderBy,
  limit,
  startAfter,
  getCountFromServer,
} from 'firebase/firestore';
import { brujulaUtils } from '@shared/utils/brujulaUtils';
import regions from '@shared/constants/regiones.json';
import langs from '../../shared/constants/languages.json';

const bannedWords = new RegExp(
  ['y', 'la', ...Object.keys(langs)].map((w) => `\\b${w}\\b`).join('|'),
  'i'
);

const getQueries = (filters) => {
  const queries = [];
  for (const property in filters) {
    if (
      filters[property] === '' ||
      filters[property] === undefined ||
      filters[property]?.length === 0
    )
      continue;
    switch (property) {
      case 'name':
        queries.push(where('name', '==', filters.name));
        break;
      case 'type':
        queries.push(where('type', '==', filters.type));
        break;
      case 'city':
        queries.push(where('city', '==', filters.city));
        break;
      case 'country':
        queries.push(where('country', '==', filters.country));
        break;
      case 'gender':
        queries.push(where('gender', '==', filters.gender));
        break;
      case 'state':
        queries.push(where('state', '==', filters.state));
        break;
      case 'schools':
        queries.push(where('university', '==', filters.schools));
        break;
      case 'associations':
        queries.push(
          where('asociations', '==', filters.associations.toLowerCase())
        );
        break;
      case 'certifications':
        queries.push(
          where('certifications', '==', filters.certifications.toLowerCase())
        );
        break;
      case 'region':
        queries.push(where('state', 'in', regions[filters.region].estados));
        break;
      case 'remote':
        if (!!filters.remote)
          queries.push(where('remoteWork', '==', filters.remote));
        break;
      case 'socialService':
        queries.push(where('probono', '==', filters.socialService));
        break;
    }
  }

  if (
    filters.search ||
    filters.subarea ||
    filters.area ||
    filters.activity ||
    filters.category
  ) {
    queries.push(
      where(
        'searchName',
        'array-contains-any',
        [
          (
            filters.activity ||
            filters.subarea ||
            filters.area ||
            filters.category
          )?.split(' '),
          ...(() =>
            !!filters.search
              ? filters.search
                  ?.split(' ')
                  ?.filter((w) => !bannedWords.test(w))
                  .map((a) => a.toLowerCase())
              : [])(),
          filters.search,
        ]
          .flat()
          .filter((a) => !!a)
          .slice(0, 10)
      )
    );
  }

  if (!!filters.sortByReviews) {
    queries.push(orderBy('reviewCount'));
  }

  queries.push(orderBy(!!filters.name ? 'lastName' : 'name'));
  return queries;
};

export const useSearch = () => {
  const brujula = brujulaUtils();
  //Campos en donde search se buscara
  const [filters, setFilters] = useState({
    name: '',
    search: '',
    gender: '',
    schools: '',
    associations: '',
    type: '',
    remote: undefined,
    socialService: undefined,
    sortByReviews: undefined,
    state: '',
    category: '',
    area: '',
    subarea: '',
    activity: '',
  });
  const results = useRef([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(undefined);

  const setFilterObject = useCallback(
    (filters) => {
      setTotal(undefined);
      setFilters((oldFilters) => {
        return { ...oldFilters, ...filters };
      });
    },
    [setFilters]
  );

  const getTotal = useCallback(async (queries) => {
    const total = await brujula.getTotalQuerySize(queries);
    setTotal(total);
  }, []);

  const getResultsWithFilters = useCallback(
    async (queries) => {
      setLoading(true);
      setError(undefined);
      if (total == undefined) {
        getTotal(queries);
      }
      queries.push(limit(10));
      if (results.current.length !== 0) {
        queries.push(
          startAfter(
            results.current[results.current.length - 1][
              !!filters.name ? 'lastName' : 'name'
            ]
          )
        );
      }

      let data = await brujula.queryUsers(queries);
      if (!data) {
        queries.pop();
        data = await brujula.queryUsers(queries);
      }
      return data;
    },
    [filters]
  );

  useEffect(() => {
    (async () => {
      try {
        results.current = [];
        const queries = getQueries(filters);
        if (queries.length == 1) {
          setError('Agrega al menos un filtro');
          setLoading(false);
          setHasMore(false);
          return;
        }
        const data = await getResultsWithFilters(queries);
        results.current = data;
        setHasMore(!!data.length && data.length > 4);
      } catch (e) {
        console.error(e);
        setError('Hubo un error por favor intenta de nuevo más tarde.');
      }
      setLoading(false);
    })();
  }, [filters]);

  const getNext = useCallback(() => {
    (async () => {
      try {
        const queries = getQueries(filters);
        const data = await getResultsWithFilters(queries);
        results.current.push(...data);
        setHasMore(!!data.length && data.length > 9);
      } catch (e) {
        console.error(e);
        setError('Hubo un error, por favor intenta de nuevo más tarde.');
      }
      setLoading(false);
    })();
  }, [filters]);

  return {
    results: results.current,
    loading,
    error,
    setFilterObject,
    getNext,
    hasMore,
    filters,
    total,
  };
};
