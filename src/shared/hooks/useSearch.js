import { useEffect, useMemo, useState } from "react"
import { where } from "firebase/firestore";  
import { brujulaUtils } from '@shared/utils/brujulaUtils';
import RefList from '@shared/constants/RefList.json';
import RefToCode from '@shared/constants/RefToCode.json';

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
        remote: false,
        socialService: false,
        sortByReviews: true,
        palabraClave: "",
        state: ""
        //region
    })
    const [results, setResults] = useState([])

    
    const setFilterObject = (filters) => {
        setFilters(oldFilters=> {
            return {...oldFilters, ...filters}
        })
    }

    const getResultsWithFilters = async (filters) => {
        const queries = []
        for (const property in filters) {
            if (filters[property] === "" || property === 'sortByReviews' || filters[property].length === 0 )
                continue;
            switch(property){
                case "area":
                case "type":
                case "city":
                case "country":
                case "gender":
                    queries.push(where(property, "==", filters[property].toLowerCase()))
                    break;    
                case "state":
                    queries.push(where(property, "==", filters[property]))
                    break;                                    
                case "language":
                    queries.push(where(property, "array-contains", filters[property].toLowerCase()))
                    break;
                case "schools":
                case "associations":
                case "estados":
                    queries.push(where(property, "in", filters[property].toLowerCase()));
                    break;
                case "remote":
                case "socialService":
                    if(filters[property] == true)
                        queries.push(where(property, "==", true))
                    break;
                case "palabraClave":
                    
                    if(RefList.includes(filters[property])){
                        let codes = RefToCode[filters[property]];
                        codes = codes.slice(0, 10);
                        queries.push(where("subarea", "in", codes));
                        
                    }
                    break;
            }
        }
        let data = await brujula.queryUsers(queries);
        //name, lastname, nickname, search
        if(filters['search'].length !== 0) 
            data = data.filter(user => {
                for(const property of incompleteSearch){
                    if(user[property] && (user[property].toLowerCase()).includes(filters['search'].toLowerCase()))
                        return true;
                }
                return false;
            })
        if(filters['sortByReviews']){
        }
        console.log("Results: ", data);
        setResults(data);
    }

    useEffect(() => {
        getResultsWithFilters(filters)
    }, [filters])
    

    return {results, setFilterObject}
}