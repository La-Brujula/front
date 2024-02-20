import { brujulaUtils } from '@shared/utils/brujulaUtils';
import { useEffect, useState } from 'react';

export const useReviews = (email) => {
  const brujula = brujulaUtils();
  const [reviews, setReviews] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const getReviews = async () => {
    if (email !== '') {
      const data = await brujula.getReviews(email);
      setReviews(data);
      setCount(data?.length || 0);
    }
  };

  useEffect(() => {
    setLoading(true);
    getReviews();
    setLoading(false);
  }, []);

  const addReview = async (userRecomending) => {
    setLoading(true);
    await brujula.addReview(userRecomending, email);
    getReviews();
    setLoading(false);
  };

  const removeReview = async (userRecomending) => {
    setLoading(true);
    await brujula.removeReviews(userRecomending, email);
    getReviews();
    setLoading(false);
  };

  return { reviews, count, addReview, removeReview, loading };
};
