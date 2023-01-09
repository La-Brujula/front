import { useMemo, useRef, useState } from "react"
import { where, orderBy, limit, startAt, startAfter } from "firebase/firestore";
import { brujulaUtils } from '@shared/utils/brujulaUtils';
import RefList from '@shared/constants/RefList.json';
import RefToCode from '@shared/constants/RefToCode.json';
import regions from '@shared/constants/regiones.json';

export const useSearch = () => {
    const brujula = brujulaUtils();
    //Campos en donde search se buscara
    const [filters, setFilters] = useState({
        search: "",
        area: "",
        language: "",
        gender: "",
        schools: [],
        associations: "",
        type: "",
        remote: undefined,
        socialService: undefined,
        sortByReviews: undefined,
        activity: "",
        state: "",
        //state
    })
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(undefined)


    const setFilterObject = (filters) => {
        setFilters(oldFilters => {
            return { ...oldFilters, ...filters }
        })
    }

    const getResultsWithFilters = async (filters) => {
        const queries = []
        setLoading(true)
        setError(undefined)

        for (const property in filters) {
            if (filters[property] === "" ||
                filters[property] === undefined ||
                filters[property].length === 0)
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
                case "language":
                    queries.push(where('language', "array-contains",
                        filters.language.toLowerCase()))
                    break;
                case "schools":
                    queries.push(where('university', "in", filters.schools));
                    break;
                case "associations":
                    queries.push(where('asociations', "in", filters.associations.toLowerCase()));
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
                case "activity":
                    if (RefList.includes(filters[property])) {
                        let codes = RefToCode[filters[property]];
                        codes = codes.slice(0, 10);
                        queries.push(where("subareas", "array-contains-any", codes));
                    }
                    break;
                case "search":
                    queries.push(
                        where('searchName', 'array-contains-any',
                            filters.search.split().map(a => a.toLowerCase())),
                        where('searchName', 'array-contains-any',
                            filters.search.split().map(a => a.toLowerCase()))
                    )
            }
        }
        queries.push(orderBy(filters.sortByReviews ? 'reviewCount' : 'searchName',
            filters.sortByReviews ? 'desc' : 'asc'))
        if (results.length > 0) queries.push(startAfter(results[results.length - 1].email))
        queries.push(limit(10))
        let data = await brujula.queryUsers(queries);
        if (!data) {
            queries.pop()
            data = await brujula.queryUsers(queries)
        }
        //name, lastname, nickname, search
        setLoading(false)
        return data
    }

    useMemo(() => {
        try {
            setResults([])
            getResultsWithFilters(filters).then(data => setResults(data))
        } catch (e) {
            setError(e);
            setLoading(false);
        }
    }, [filters])

    const getNext = () => {
        getResultsWithFilters(filters).then(data => setResults([...results, ...data]))
    }


    return { results, loading, error, setFilterObject, getNext }
}