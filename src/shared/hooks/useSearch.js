import { useCallback, useEffect, useRef, useState } from "react"
import { where, orderBy, limit, startAfter } from "firebase/firestore";
import { brujulaUtils } from '@shared/utils/brujulaUtils';
import regions from '@shared/constants/regiones.json';
import { replaceSearchTermsFromIndex } from "../utils/busqueda";
import langs from '../../shared/constants/languages.json'

const bannedWords = new RegExp(["y", "la", ...Object.keys(langs)].map(w => `\\b${w}\\b`).join('|'), 'i')

export const useSearch = () => {
    const brujula = brujulaUtils();
    //Campos en donde search se buscara
    const [filters, setFilters] = useState({
        search: "",
        gender: "",
        schools: "",
        associations: "",
        type: "",
        remote: undefined,
        socialService: undefined,
        sortByReviews: undefined,
        state: "",
        category: ""
        //state
    })
    const results = useRef([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(undefined)
    const [hasMore, setHasMore] = useState(true)


    const setFilterObject = useCallback((filters) => {
        setFilters(oldFilters => {
            return { ...oldFilters, ...filters }
        })
    }, [filters])

    const getResultsWithFilters = useCallback(async (filters) => {
        const queries = []
        setLoading(true)
        setError(undefined)

        for (const property in filters) {
            if (filters[property] === "" ||
                filters[property] === undefined ||
                filters[property] === [])
                continue;
            switch (property) {
                case "name":
                    queries.push(where("name", '==', filters.name))
                    break;
                case "type":
                    queries.push(where('type', "==", filters.type))
                    break;
                case "city":
                    queries.push(where('city', "==", filters.city))
                    break;
                case "country":
                    queries.push(where('country', "==", filters.country))
                    break;
                case "gender":
                    queries.push(where('gender', "==", filters.gender))
                    break;
                case "state":
                    queries.push(where('state', "==", filters.state))
                    break;
                case "schools":
                    queries.push(where('university', "==", filters.schools));
                    break;
                case "associations":
                    queries.push(where('asociations', "==", filters.associations.toLowerCase()));
                    break;
                case "region":
                    queries.push(where('state', "in", regions[filters.region].estados));
                    break;
                case "remote":
                    if (!!filters.remote) queries.push(where('remoteWork', "==", filters.remote))
                    break;
                case "socialService":
                    queries.push(where('probono', "==", filters.socialService))
                    break;
            }
        }
        if (filters.search || filters.subarea || filters.area || filters.language || filters.activity || filters.category) {
            const search = !!filters.search && replaceSearchTermsFromIndex(filters.search.toLowerCase());
            const category = !!filters.category && replaceSearchTermsFromIndex(filters.category.toLowerCase());
            queries.push(
                where('searchName', 'array-contains-any',
                    [
                        filters.search,
                        ...(() => !!search ? search?.split(' ')?.filter(w => !bannedWords.test(w)).map(a => a.toLowerCase()) : [])(),
                        ...(() => !!category ? category?.split(' ') : [])(),
                        filters.activity || filters.subarea || filters.area,
                        filters.language && `lang:${filters.language}`,
                    ].filter(a => !!a).slice(0, 10))
            )
        }

        if (!!filters.sortByReviews) {
            queries.push(orderBy('reviewCount'))
        }

        queries.push(orderBy(!!filters.name ? 'lastName' : 'name'))


        if (results.current.length !== 0) {
            queries.push(startAfter(results.current[results.current.length - 1][!!filters.name ? 'lastName' : 'name']))
        }

        queries.push(limit(10))

        let data = await brujula.queryUsers(queries);
        if (!data) {
            queries.pop()
            data = await brujula.queryUsers(queries)
        }
        if (data.length <= 9) {
            setHasMore(false)
        } else {
            setHasMore(true)
        }
        return data
    }, [filters, hasMore])

    useEffect(() => {
        (async () => {
            try {
                results.current = []
                const data = await getResultsWithFilters(filters)
                results.current = data
            } catch (e) {
                console.error(e)
                setError("Hubo un error por favor intenta de nuevo más tarde.");
            }
            setLoading(false);
        })()
    }, [filters])

    const getNext = useCallback(() => {
        (async () => {
            try {
                const data = await getResultsWithFilters(filters)
                if (data.length == 0) setHasMore(false)
                results.current.push(...data)
            } catch (e) {
                console.error(e)
                setError("Hubo un error, por favor intenta de nuevo más tarde.");
            }
            setLoading(false);
        })()
    }, [filters])


    return { results: results.current, loading, error, setFilterObject, getNext, hasMore, filters }
}