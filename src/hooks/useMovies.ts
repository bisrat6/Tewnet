import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { TMDB_CONFIG } from '@/config/tmdb';
import { Movie, TVShow, TMDBResponse } from '@/types/movie';

async function fetchMovies(endpoint: string, page = 1): Promise<TMDBResponse<Movie>> {
  const { data } = await axios.get(`${TMDB_CONFIG.BASE_URL}${endpoint}`, {
    params: {
      api_key: TMDB_CONFIG.API_KEY,
      page,
    },
  });
  return data;
}

export function usePopularMovies(page = 1) {
  return useQuery({
    queryKey: ['movies', 'popular', page],
    queryFn: () => fetchMovies(TMDB_CONFIG.ENDPOINTS.popular, page),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}

export function useTopRatedMovies(page = 1) {
  return useQuery({
    queryKey: ['movies', 'topRated', page],
    queryFn: () => fetchMovies(TMDB_CONFIG.ENDPOINTS.topRated, page),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}

export function useTrendingMovies(page = 1) {
  return useQuery({
    queryKey: ['movies', 'trending', page],
    queryFn: () => fetchMovies(TMDB_CONFIG.ENDPOINTS.trending, page),
    staleTime: 1000 * 60 * 2,
    retry: 1,
  });
}

export function useNowPlayingMovies(page = 1) {
  return useQuery({
    queryKey: ['movies', 'nowPlaying', page],
    queryFn: () => fetchMovies(TMDB_CONFIG.ENDPOINTS.nowPlaying, page),
    staleTime: 1000 * 60 * 2,
    retry: 1,
  });
}

async function fetchTV(endpoint: string, page = 1): Promise<TMDBResponse<TVShow>> {
  const { data } = await axios.get(`${TMDB_CONFIG.BASE_URL}${endpoint}`, {
    params: {
      api_key: TMDB_CONFIG.API_KEY,
      page,
    },
  });
  return data;
}

export function usePopularTV(page = 1) {
  return useQuery({
    queryKey: ['tv', 'popular', page],
    queryFn: () => fetchTV(TMDB_CONFIG.ENDPOINTS.tvPopular, page),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}

export function useTopRatedTV(page = 1) {
  return useQuery({
    queryKey: ['tv', 'topRated', page],
    queryFn: () => fetchTV(TMDB_CONFIG.ENDPOINTS.tvTopRated, page),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}

export function useTrendingTV(page = 1) {
  return useQuery({
    queryKey: ['tv', 'trending', page],
    queryFn: () => fetchTV(TMDB_CONFIG.ENDPOINTS.tvTrending, page),
    staleTime: 1000 * 60 * 2,
    retry: 1,
  });
}

export function useOnAirTV(page = 1) {
  return useQuery({
    queryKey: ['tv', 'onAir', page],
    queryFn: () => fetchTV(TMDB_CONFIG.ENDPOINTS.tvOnAir, page),
    staleTime: 1000 * 60 * 2,
    retry: 1,
  });
}
