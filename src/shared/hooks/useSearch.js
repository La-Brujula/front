import { useCallback, useEffect, useMemo, useState } from "react"
import { where, orderBy, limit, startAfter } from "firebase/firestore";
import { brujulaUtils } from '@shared/utils/brujulaUtils';
import regions from '@shared/constants/regiones.json';
import { replaceSearchTermsFromIndex } from "../utils/busqueda";

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
        //state
    })
    const [results, setResults] = useState([])
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
                case "area":
                    queries.push(where('area', "==", filters.area))
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
                    queries.push(where('remoteWork', "==", filters.remote))
                    break;
                case "socialService":
                    queries.push(where('probono', "==", filters.socialService))
                    break;
                case "search":
                    const search = replaceSearchTermsFromIndex(filters.search.toLowerCase())
                    console.log(search.split(' ').map(a => a.toLowerCase()));
                    queries.push(
                        where('searchName', 'array-contains-any',
                            search.split(' ').map(a => a.toLowerCase()))
                    )
            }
        }
        queries.push(orderBy(filters.sortByReviews ? 'reviewCount' : 'searchName',
            filters.sortByReviews ? 'desc' : 'asc'))
        if (results.length > 0) {
            queries.push(startAfter(results[results.length - 1].email))
        }
        queries.push(limit(10))
        let data = await brujula.queryUsers(queries);
        if (!data) {
            queries.pop()
            data = await brujula.queryUsers(queries)
        }
        if (data.length < 10) {
            setHasMore(false)
        }
        return data
    }, [filters, hasMore])

    useEffect(() => {
        (async () => {
            try {
                setResults([])
                const data = await getResultsWithFilters(filters)
                setResults(data)
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
                setResults([...results, ...data])
            } catch (e) {
                console.error(e)
                setError("Hubo un error, por favor intenta de nuevo más tarde.");
            }
            setLoading(false);
        })()
    }, [])


    return { results, loading, error, setFilterObject, getNext, hasMore, filters }
}