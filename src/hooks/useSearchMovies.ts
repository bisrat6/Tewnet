import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { TMDB_CONFIG } from '@/config/tmdb';
import { Movie, TVShow, TMDBResponse } from '@/types/movie';

async function searchMovies(query: string, page = 1): Promise<TMDBResponse<Movie>> {
  if (!query.trim()) {
    return { page: 1, results: [], total_pages: 0, total_results: 0 };
  }
  
  try {
    if (!TMDB_CONFIG.API_KEY) {
      throw new Error('TMDB API key is not configured');
    }
    const { data } = await axios.get(`${TMDB_CONFIG.BASE_URL}${TMDB_CONFIG.ENDPOINTS.search}`, {
      params: {
        api_key: TMDB_CONFIG.API_KEY,
        query,
        page,
      },
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Invalid API key. Please check your TMDB API configuration.');
      }
      throw new Error(error.response?.data?.status_message || 'Failed to search movies. Please try again.');
    }
    throw error instanceof Error ? error : new Error('An unexpected error occurred while searching.');
  }
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
  try {
    if (!TMDB_CONFIG.API_KEY) {
      throw new Error('TMDB API key is not configured');
    }
    const { data } = await axios.get(`${TMDB_CONFIG.BASE_URL}${TMDB_CONFIG.ENDPOINTS.tvSearch}`, {
      params: { api_key: TMDB_CONFIG.API_KEY, query, page },
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Invalid API key. Please check your TMDB API configuration.');
      }
      throw new Error(error.response?.data?.status_message || 'Failed to search TV shows. Please try again.');
    }
    throw error instanceof Error ? error : new Error('An unexpected error occurred while searching.');
  }
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
