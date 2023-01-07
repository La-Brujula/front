import { useMemo, useState } from "react"
import { where, orderBy, limit, startAt } from "firebase/firestore";
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
        page: 0
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
                    queries.push(where('language', "array-contains", filters.language.toLowerCase()))
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
                        where('searchName', '>=', filters.search),
                        where('searchName', '<=', filters.search + '\uf8ff')
                    )
            }
        }
        queries.push(orderBy(filters.sortByReviews ? 'reviewCount' : 'searchName', filters.sortByReviews ? 'desc' : 'asc'))
        let data = await brujula.queryUsers(queries);
        //name, lastname, nickname, search
        setResults(data);
        setLoading(false)
    }

    useMemo(() => {
        try {
            getResultsWithFilters(filters)
        } catch (e) {
            setError(e);
            setLoading(false);
            setResults(undefined);
        }
    }, [filters])

    const getPrevious = () => {
        if (filters.page > 0) setFilterObject({ page: filters.page - 1 })
    }

    const getNext = () => {
        setFilterObject({ page: filters.page + 1 })
    }


    return { results, loading, error, setFilterObject, getNext, getPrevious }
}