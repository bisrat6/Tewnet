import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { TMDB_CONFIG } from '@/config/tmdb';
import { Movie, TVShow, TMDBResponse } from '@/types/movie';

async function searchMovies(query: string, page = 1): Promise<TMDBResponse<Movie>> {
  if (!query.trim()) {
    return { page: 1, results: [], total_pages: 0, total_results: 0 };
  }
  
  const { data } = await axios.get(`${TMDB_CONFIG.BASE_URL}${TMDB_CONFIG.ENDPOINTS.search}`, {
    params: {
      api_key: TMDB_CONFIG.API_KEY,
      query,
      page,
    },
  });
  return data;
}

export function useSearchMovies(query: string, page = 1) {
  return useQuery({
    queryKey: ['search', query, page],
    queryFn: () => searchMovies(query, page),
    enabled: query.trim().length > 0,
    staleTime: 1000 * 60,
    retry: 0,
  });
}

async function searchTV(query: string, page = 1): Promise<TMDBResponse<TVShow>> {
  if (!query.trim()) {
    return { page: 1, results: [], total_pages: 0, total_results: 0 };
  }
  const { data } = await axios.get(`${TMDB_CONFIG.BASE_URL}${TMDB_CONFIG.ENDPOINTS.tvSearch}`, {
    params: { api_key: TMDB_CONFIG.API_KEY, query, page },
  });
  return data;
}

export function useSearchTV(query: string, page = 1) {
  return useQuery({
    queryKey: ['search-tv', query, page],
    queryFn: () => searchTV(query, page),
    enabled: query.trim().length > 0,
    staleTime: 1000 * 60,
    retry: 0,
  });
}
