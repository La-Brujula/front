import { useEffect, useMemo, useState } from "react"
import { where } from "firebase/firestore";  
import { brujulaUtils } from '@shared/utils/brujulaUtils';

export const useSearch = () => {
    const brujula = brujulaUtils();
    const [filters, setFilters] = useState({
        name: "",
        activity: "",
        region: "",
        keyword: "",
        category: "",
        language: "",
        gender: "",
        schools: [],
        associations: "",
        type: "",
        remote: false,
        socialService: false,
        sortByReviews: true
    })
    const [results, setResults] = useState([])

    
    const setFilterObject = (filters) => {
        setFilters(oldFilters=> {return {...oldFilters, ...filters}})
    }

    const getResultsWithFilters = async (filters) => {
        const queries = []
        for (const property in filters) {
            if (filters[property] === "" || property === 'sortByReviews' || filters[property].length === 0 )
                continue;
            switch(property){
                case "category":
                case "type":
                case "name":
                case "gender":
                    queries.push(where(property, "==", filters[property]))
                    break;                    
                case "language":
                    queries.push(where(property, "array-contains", filters[property]))
                case "schools":
                case "associations":
                    queries.push(where(property, "in", filters[property]));
                    break;
            }
        }
        const data = await brujula.queryUsers(queries);
        console.log(data);
        setResults(data);
    }

    useEffect(() => {
        getResultsWithFilters(filters)
    }, [filters])
    

    return {results, setFilterObject}
}