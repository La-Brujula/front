import { useEffect, useState } from "react"
import { brujulaUtils } from '@shared/utils/brujulaUtils';

export const useReviews = (email) => {
    const brujula = brujulaUtils();
    const [reviews, setReviews] = useState([])
    const [count, setCount] = useState(0)
    
    const getReviews = async () => {
        if(email !== ''){
            const data = await brujula.getReviews(email);
            setReviews([...data]);
            setCount(data.length)
        }
    }

    useEffect(() => {
      getReviews()
    }, [])

    const addReview = async (userRecomending) => {
        await brujula.addReview(userRecomending, email);
        getReviews();
    }

    const removeReview = async(userRecomending) => {
        await brujula.removeReviews(userRecomending, email)
        getReviews();
    }

    return {reviews, count, addReview, removeReview}
    

}