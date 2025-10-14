import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { TMDB_CONFIG } from '@/config/tmdb';
import { Movie, TMDBResponse } from '@/types/movie';

async function fetchSimilarMovies(movieId: number): Promise<TMDBResponse<Movie>> {
  const { data } = await axios.get(
    `${TMDB_CONFIG.BASE_URL}${TMDB_CONFIG.ENDPOINTS.similarMovies(movieId)}`,
    {
      params: { api_key: TMDB_CONFIG.API_KEY },
    }
  );
  return data;
}

export function useSimilarMovies(movieId: number) {
  return useQuery({
    queryKey: ['movie', movieId, 'similar'],
    queryFn: () => fetchSimilarMovies(movieId),
    enabled: !!movieId,
  });
}
