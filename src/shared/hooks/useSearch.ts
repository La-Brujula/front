import regions from '@shared/constants/regiones.json';
import { brujulaUtils } from '@shared/utils/brujulaUtils';
import {
  QueryConstraint,
  limit,
  orderBy,
  startAfter,
  where,
} from 'firebase/firestore';
import { useCallback, useEffect, useRef, useState } from 'react';
import langs from '../constants/languages.json';
import { IFirebaseProfile } from '../types/user';

export interface SearchFilters {
  name?: string;
  search?: string;
  gender?: string;
  schools?: string;
  associations?: string;
  type?: string;
  remote?: boolean;
  socialService?: boolean;
  sortByReviews?: boolean;
  state?: string;
  category?: string;
  area?: string;
  subarea?: string;
  activity?: string;
  city?: string;
  country?: string;
  certifications?: string;
  region?: number;
  language?: string;
}

const bannedWords = new RegExp(
  ['y', 'la', ...Object.keys(langs)].map((w) => `\\b${w}\\b`).join('|'),
  'i',
);

const getQueries = (filters: SearchFilters) => {
  const queries = [];
  for (const filter in Object.entries(filters)) {
    const [property, value] = filter;
    if (property === '' || property === undefined || property?.length === 0)
      continue;
    switch (property) {
      case 'name':
        queries.push(where('name', '==', value));
        break;
      case 'type':
        queries.push(where('type', '==', value));
        break;
      case 'city':
        queries.push(where('city', '==', value));
        break;
      case 'country':
        queries.push(where('country', '==', value));
        break;
      case 'gender':
        queries.push(where('gender', '==', value));
        break;
      case 'state':
        queries.push(where('state', '==', value));
        break;
      case 'schools':
        queries.push(where('university', '==', value));
        break;
      case 'associations':
        queries.push(where('asociations', '==', value.toLowerCase()));
        break;
      case 'certifications':
        queries.push(where('certifications', '==', value.toLowerCase()));
        break;
      case 'region':
        if (typeof value === typeof 0)
          queries.push(
            where('state', 'in', regions[value as unknown as number].estados),
          );
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
          .slice(0, 10),
      ),
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
  const [filters, setFilters] = useState<SearchFilters>({
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
    certifications: '',
    city: '',
    country: '',
    region: undefined,
    language: '',
  });
  const results = useRef<IFirebaseProfile[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState<number | undefined>(undefined);

  const setFilterObject = useCallback(
    (filters: SearchFilters) => {
      setTotal(undefined);
      setFilters((oldFilters) => {
        return { ...oldFilters, ...filters };
      });
    },
    [setFilters],
  );

  const getTotal = useCallback(async (queries: QueryConstraint[]) => {
    const total = await brujula.getTotalQuerySize(queries);
    setTotal(total);
  }, []);

  const getResultsWithFilters = useCallback(
    async (queries: QueryConstraint[]) => {
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
              !!filters.name ? 'lastname' : 'name'
            ],
          ),
        );
      }

      let data = await brujula.queryUsers(queries);
      if (!data) {
        queries.pop();
        data = await brujula.queryUsers(queries);
      }
      return data as IFirebaseProfile[];
    },
    [filters],
  );

  useEffect(() => {
    (async () => {
      try {
        results.current = [];
        const queries = getQueries(filters);
        if (queries.length == 1) {
          setLoading(false);
          setHasMore(false);
          setError('Agrega al menos un filtro');
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
        if (queries.length == 1) {
          setLoading(false);
          setHasMore(false);
          setError('Agrega al menos un filtro');
          return;
        }
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
