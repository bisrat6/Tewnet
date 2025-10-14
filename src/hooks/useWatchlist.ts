import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS } from '@/utils/localStorage';
import { Movie } from '@/types/movie';

export function useWatchlist() {
  const [watchlist, setWatchlist] = useLocalStorage<Movie[]>(STORAGE_KEYS.WATCHLIST, []);

  const isInWatchlist = (movieId: number) => {
    return watchlist.some(movie => movie.id === movieId);
  };

  const addToWatchlist = (movie: Movie) => {
    if (!isInWatchlist(movie.id)) {
      setWatchlist([...watchlist, movie]);
    }
  };

  const removeFromWatchlist = (movieId: number) => {
    setWatchlist(watchlist.filter(movie => movie.id !== movieId));
  };

  const toggleWatchlist = (movie: Movie) => {
    if (isInWatchlist(movie.id)) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  return {
    watchlist,
    isInWatchlist,
    addToWatchlist,
    removeFromWatchlist,
    toggleWatchlist,
  };
}
