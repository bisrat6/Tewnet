import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS } from '@/utils/localStorage';
import { Movie } from '@/types/movie';

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage<Movie[]>(STORAGE_KEYS.FAVORITES, []);

  const isFavorite = (movieId: number) => {
    return favorites.some(movie => movie.id === movieId);
  };

  const addFavorite = (movie: Movie) => {
    if (!isFavorite(movie.id)) {
      setFavorites([...favorites, movie]);
    }
  };

  const removeFavorite = (movieId: number) => {
    setFavorites(favorites.filter(movie => movie.id !== movieId));
  };

  const toggleFavorite = (movie: Movie) => {
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return {
    favorites,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
  };
}
