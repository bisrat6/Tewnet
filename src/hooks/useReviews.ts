import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS } from '@/utils/localStorage';

export function useReviews() {
  const [reviews, setReviews] = useLocalStorage<Record<number, string>>(STORAGE_KEYS.REVIEWS, {});

  const getReview = (movieId: number): string | undefined => {
    return reviews[movieId];
  };

  const setReview = (movieId: number, review: string) => {
    setReviews({ ...reviews, [movieId]: review });
  };

  const removeReview = (movieId: number) => {
    const newReviews = { ...reviews };
    delete newReviews[movieId];
    setReviews(newReviews);
  };

  return {
    reviews,
    getReview,
    setReview,
    removeReview,
  };
}
