import { useEffect, useState } from "react"
import { brujulaUtils } from '@shared/utils/brujulaUtils';

export const useReviews = (email) => {
    const brujula = brujulaUtils();
    const [reviews, setReviews] = useState([])
    const [avarage, setAvarage] = useState(0)
    const [count, setCount] = useState(0)
    
    const getReviews = async () => {
        if(email !== ''){
            const data = await brujula.getReviews(email);
            setReviews([...data]);
            if(data.length !== 0){
                let sum = 0;
                data.forEach(e=>{
                    sum += e.rating
                })
                setCount(data.length)
                setAvarage(sum/data.length)
            }else {
                setCount(0)
                setAvarage('~')
            }
        }
    }

    useEffect(() => {
      getReviews()
    }, [])

    const addReview = async (userRecomending, rating) => {
        await brujula.addReview(userRecomending, email, rating);
        getReviews();
    }

    const removeReview = async(userRecomending) => {
        await brujula.removeReviews(userRecomending, email)
        getReviews();
    }

    return {reviews, count, avarage, addReview, removeReview}
    

}