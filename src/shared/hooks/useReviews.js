import { useEffect, useState } from "react"
import { brujulaUtils } from '@shared/utils/brujulaUtils';

export const useReviews = (email) => {
    const brujula = brujulaUtils();
    const [reviews, setReviews] = useState([])
    
    const getReviews = async () => {
        const data = await brujula.getReviews(email);
        setReviews([...data]);
    }

    useEffect(() => {
      getReviews()
    }, [])

    const addReview = async (userRecomended, rating) => {
        await brujula.addReview(email, userRecomended, rating);
        getReviews();
    }

    const removeReview = async(userRecomended) => {
        await brujula.removeReview(email, userRecomended)
        getReviews();
    }

    return {reviews, addReview, removeReview}
    

}