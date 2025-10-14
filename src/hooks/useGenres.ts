import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { TMDB_CONFIG } from '@/config/tmdb';
import { Genre } from '@/types/movie';

async function fetchGenres(mediaType: 'movie' | 'tv'): Promise<Genre[]> {
  const endpoint = mediaType === 'movie' ? TMDB_CONFIG.ENDPOINTS.genres : TMDB_CONFIG.ENDPOINTS.tvGenres;
  const { data } = await axios.get(`${TMDB_CONFIG.BASE_URL}${endpoint}`, {
    params: { api_key: TMDB_CONFIG.API_KEY },
  });
  return data.genres;
}

export function useGenres(mediaType: 'movie' | 'tv' = 'movie') {
  return useQuery({
    queryKey: ['genres', mediaType],
    queryFn: () => fetchGenres(mediaType),
    staleTime: Infinity, // Genres rarely change
  });
}
