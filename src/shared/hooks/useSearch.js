import { useMemo, useState } from "react"
import { where } from "firebase/firestore";
import { brujulaUtils } from '@shared/utils/brujulaUtils';
import RefList from '@shared/constants/RefList.json';
import RefToCode from '@shared/constants/RefToCode.json';
import regions from '@shared/constants/regiones.json';

export const useSearch = () => {
    const brujula = brujulaUtils();
    //Campos en donde search se buscara
    const incompleteSearch = ["name", "lastname", "nickname"]
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
        state: ""
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
                property === 'sortByReviews' ||
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
            }
        }
        let data = await brujula.queryUsers(queries);
        //name, lastname, nickname, search
        if (filters.search.length !== 0 || filters.state.length !== 0)
            data = data.filter(user => {
                for (const property of incompleteSearch) {
                    if (user[property] && filters['search'].length !== 0 && (user[property].toLowerCase()).includes(filters['search'].toLowerCase()))
                        return true;
                }
                if (user['state'] && filters['state'].length !== 0 && (user['state']) === (filters['state'])) {
                    return true;
                }
                return false;
            })
        if (filters['sortByReviews']) {
            data = data.sort((a, b) => b.recommended - a.recommended)
        }
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

    const getNext = () => {

    }


    return { results, loading, error, setFilterObject, getNext }
}