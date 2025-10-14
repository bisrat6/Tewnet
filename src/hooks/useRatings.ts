import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS } from '@/utils/localStorage';

export function useRatings() {
  const [ratings, setRatings] = useLocalStorage<Record<number, number>>(STORAGE_KEYS.RATINGS, {});

  const getRating = (movieId: number): number | undefined => {
    return ratings[movieId];
  };

  const setRating = (movieId: number, rating: number) => {
    setRatings({ ...ratings, [movieId]: rating });
  };

  const removeRating = (movieId: number) => {
    const newRatings = { ...ratings };
    delete newRatings[movieId];
    setRatings(newRatings);
  };

  return {
    ratings,
    getRating,
    setRating,
    removeRating,
  };
}
